export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';

export interface HttpOptions {
    timeoutMs?:number;
    retries?: number;
    signal?: AbortSignal;
}

export class HttpError extends Error {
    constructor(
        public status: number,
        public code: string,
        public data?: unknown
    ) { super(code); }
}

const sleep = ( ms: number ) => new Promise(r => setTimeout(r, ms));

export async function httpFetch<T>(
    endpoint: string,
    init: RequestInit = {},
    options: HttpOptions = {}
): Promise<T> {
    const { timeoutMs = 20000, retries = 0, signal } = options;
    const controller = new AbortController();
    const id = setTimeout(()=> controller.abort(), timeoutMs);
    const composite = new AbortController();
    const BASE_URL = import.meta.env.VITE_API_URL;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${BASE_URL}${cleanEndpoint}`;

    if( signal ) signal.addEventListener('abort', () => composite.abort(), { once: true });

    try {
        let attempt = 0;
        while (true) {
            try {
                const res = await fetch (url, {
                    ...init, 
                    credentials: 'include',
                    signal: composite.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        ...(init.headers),
                    }
                });

                const text = await res.text();
                const isJson = res.headers.get('content-type')?.includes('application/json');
                const data = isJson ? JSON.parse(text || '{}') : (text as unknown as T);

                if (!res.ok) {
                    throw new HttpError(res.status, 'HTTP_ERROR', data);
                }
                return data as T;
            }
            catch (e: any){
                const retriable = 
                    (e.name === 'AbortError' && !signal?.aborted) || 
                    (e instanceof HttpError && e.status >= 500 && e.status <= 600);
                if (retriable && attempt < retries) {
                    attempt += 1;
                    await sleep(2 ** attempt * 200);
                    continue;
                }
                throw e;
            }
        }
    }
    finally {
        clearTimeout(id);
    }
} 