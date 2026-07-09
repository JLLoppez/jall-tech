import Image from 'next/image';

type LogoVariant = 'color' | 'dark';

/**
 * Real Jall Technologies icon mark, extracted and cleaned from the brand
 * guideline sheets (public/brand/icon-color.png and icon-dark.png) rather
 * than an approximation. Two variants:
 *  - 'color': navy/gold mark on a transparent background, for light surfaces
 *  - 'dark':  the reversed mark on its navy tile, for use on navy surfaces
 *             (footer, admin sidebar, portal header) where it blends
 *             seamlessly since the tile color matches --jt-midnight exactly.
 */
export default function Logo({
  className = 'h-10 w-10',
  variant = 'color'
}: {
  className?: string;
  variant?: LogoVariant;
}) {
  const src = variant === 'dark' ? '/brand/icon-dark.png' : '/brand/icon-color.png';

  return (
    <span className={`relative inline-block shrink-0 ${className}`}>
      <Image
        src={src}
        alt="Jall Technologies"
        fill
        sizes="48px"
        className="object-contain"
        priority
      />
    </span>
  );
}
