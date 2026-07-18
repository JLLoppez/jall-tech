import type { SVGProps } from 'react';

/**
 * Minimal brand marks for the footer's social links.
 *
 * These used to be imported directly from lucide-react (`Linkedin`,
 * `Twitter`, `Github`, `Facebook`), but Lucide's v1.0 release dropped all
 * trademarked brand icons from the package entirely — importing them now
 * fails to resolve. Rather than add a whole extra icon-library dependency
 * for four glyphs, they're defined here as small inline SVGs, sized and
 * stroked to match the surrounding lucide-react icons (24x24 viewBox,
 * `currentColor`, same `size` prop shape) so they sit visually consistent
 * next to them.
 */
type BrandIconProps = SVGProps<SVGSVGElement> & { size?: number };

function base(size = 24) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    xmlns: 'http://www.w3.org/2000/svg'
  } as const;
}

export function LinkedInIcon({ size, ...props }: BrandIconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M6.94 8.5H3.56V20.5H6.94V8.5Z" />
      <path d="M5.25 7.06C6.35 7.06 7.06 6.31 7.06 5.34C7.04 4.35 6.35 3.6 5.27 3.6C4.19 3.6 3.46 4.35 3.46 5.34C3.46 6.31 4.17 7.06 5.23 7.06H5.25Z" />
      <path d="M9.83 20.5H13.21V13.9C13.21 13.55 13.24 13.2 13.34 12.95C13.62 12.25 14.26 11.53 15.34 11.53C16.75 11.53 17.31 12.6 17.31 14.17V20.5H20.69V13.78C20.69 10.66 19.03 9.21 16.82 9.21C15.01 9.21 14.22 10.21 13.77 10.9H13.8V9.5H10.42C10.46 10.44 10.42 20.5 10.42 20.5H9.83Z" />
    </svg>
  );
}

export function XIcon({ size, ...props }: BrandIconProps) {
  return (
    <svg {...base(size)} {...props} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M4 4L20 20" />
      <path d="M20 4L4 20" />
    </svg>
  );
}

export function GitHubIcon({ size, ...props }: BrandIconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.58 2 12.21C2 16.71 4.87 20.53 8.84 21.87C9.34 21.96 9.53 21.65 9.53 21.38C9.53 21.14 9.52 20.35 9.52 19.51C7 20 6.35 18.89 6.15 18.32C6.04 18.03 5.55 17.14 5.12 16.9C4.77 16.71 4.27 16.22 5.11 16.21C5.9 16.2 6.46 16.94 6.65 17.24C7.55 18.76 8.98 18.33 9.55 18.07C9.64 17.41 9.9 16.97 10.19 16.72C7.95 16.47 5.6 15.6 5.6 11.71C5.6 10.6 5.99 9.68 6.67 8.97C6.56 8.72 6.21 7.67 6.77 6.26C6.77 6.26 7.65 5.98 9.53 7.27C10.32 7.05 11.16 6.94 12 6.94C12.84 6.94 13.68 7.05 14.47 7.27C16.35 5.97 17.23 6.26 17.23 6.26C17.79 7.67 17.44 8.72 17.33 8.97C18.01 9.68 18.4 10.59 18.4 11.71C18.4 15.61 16.04 16.47 13.8 16.72C14.16 17.03 14.47 17.63 14.47 18.56C14.47 19.89 14.46 20.94 14.46 21.38C14.46 21.65 14.65 21.97 15.15 21.87C19.14 20.53 22 16.71 22 12.21C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  );
}

export function FacebookIcon({ size, ...props }: BrandIconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M13.5 21.5V13.15H16.35L16.77 9.85H13.5V7.74C13.5 6.79 13.76 6.14 15.12 6.14H16.88V3.19C16.05 3.1 15.21 3.06 14.37 3.07C11.9 3.07 10.2 4.58 10.2 7.41V9.85H7.44V13.15H10.2V21.5H13.5Z" />
    </svg>
  );
}
