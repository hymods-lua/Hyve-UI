export type HomePageDictionary = {
    home: string;
    welcome: string;
    hero: Record<string, unknown>;
    about?: Record<string, unknown>;
    projects?: Record<string, unknown>;
    stack?: Record<string, unknown>;
    contact?: Record<string, unknown>;
}

export type TermsPageDictionary = {
    title: string
    last_updated:string 
    intro:       string 
    sections: {
        title:      string
        content:    string
    }[],
    contact_title: string
    contact_text:  string
}