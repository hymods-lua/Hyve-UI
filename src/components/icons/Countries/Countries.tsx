import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
}

export const MXIcon: React.FC<IconProps> = ({ size = 24, ...props }) => {
    const clipPathId1 = "mx_clip_1";
    const clipPathId2 = "mx_clip_2";

    return (
        <svg 
            width={size} 
            viewBox="0 0 22 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g clipPath={`url(#${clipPathId1})`}>
                <g clipPath={`url(#${clipPathId2})`}>
                    <rect width="22" height="16" rx="2" fill="white"/>
                    <rect x="16" width="6" height="16" fill="#F93939"/>
                    <rect width="6" height="16" fill="#249F58"/>
                    <path 
                        fillRule="evenodd" 
                        clipRule="evenodd" 
                        d="M13.9766 8.00055C13.9919 8.10958 13.9999 8.22098 13.9999 8.33356C13.9999 9.80601 12.6566 11 10.9999 11C9.34327 11 7.99994 9.80601 7.99994 8.33356C7.99994 8.22098 8.00794 8.10958 8.02327 7.99996C8.20794 9.02386 9.46994 9.81489 10.9999 9.81489C12.5299 9.81489 13.7919 9.02327 13.9766 7.99996V8.00055Z" 
                        fill="#249F58"
                    />
                    <ellipse cx="11" cy="6.93334" rx="1.57143" ry="1.6" fill="#AE6A3E"/>
                </g>
            </g>
            <defs>
                <clipPath id={clipPathId1}>
                    <rect width="22" height="16" fill="white"/>
                </clipPath>
                <clipPath id={clipPathId2}>
                    <rect width="22" height="16" rx="2" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    );
};

export const USIcon: React.FC<IconProps> = ({ size = 24, ...props }) => {
    const clipPathId1 = "us_clip_1";
    const clipPathId2 = "us_clip_2";

    return (
        <svg 
            width={size} 
            viewBox="0 0 22 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g clipPath={`url(#${clipPathId1})`}>
                <g clipPath={`url(#${clipPathId2})`}>
                    <rect width="22" height="16" rx="2" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 0H9.42857V7.46667H0V0Z" fill="#1A47B8"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.42857 0V1.06667H22V0H9.42857ZM9.42857 2.13333V3.2H22V2.13333H9.42857ZM9.42857 4.26667V5.33333H22V4.26667H9.42857ZM9.42857 6.4V7.46667H22V6.4H9.42857ZM0 8.53333V9.6H22V8.53333H0ZM0 10.6667V11.7333H22V10.6667H0ZM0 12.8V13.8667H22V12.8H0ZM0 14.9333V16H22V14.9333H0Z" fill="#F93939"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.04762 1.06667V2.13333H2.09524V1.06667H1.04762ZM3.14286 1.06667V2.13333H4.19048V1.06667H3.14286ZM5.2381 1.06667V2.13333H6.28572V1.06667H5.2381ZM7.33334 1.06667V2.13333H8.38096V1.06667H7.33334ZM6.28572 2.13333V3.2H7.33334V2.13333H6.28572ZM4.19048 2.13333V3.2H5.2381V2.13333H4.19048ZM2.09524 2.13333V3.2H3.14286V2.13333H2.09524ZM1.04762 3.2V4.26667H2.09524V3.2H1.04762ZM3.14286 3.2V4.26667H4.19048V3.2H3.14286ZM5.2381 3.2V4.26667H6.28572V3.2H5.2381ZM7.33334 3.2V4.26667H8.38096V3.2H7.33334ZM1.04762 5.33333V6.4H2.09524V5.33333H1.04762ZM3.14286 5.33333V6.4H4.19048V5.33333H3.14286ZM5.2381 5.33333V6.4H6.28572V5.33333H5.2381ZM7.33334 5.33333V6.4H8.38096V5.33333H7.33334ZM6.28572 4.26667V5.33333H7.33334V4.26667H6.28572ZM4.19048 4.26667V5.33333H5.2381V4.26667H4.19048ZM2.09524 4.26667V5.33333H3.14286V4.26667H2.09524Z" fill="white"/>
                </g>
            </g>
            <defs>
                <clipPath id={clipPathId1}>
                    <rect width="22" height="16" fill="white"/>
                </clipPath>
                <clipPath id={clipPathId2}>
                    <rect width="22" height="16" rx="2" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    );
};