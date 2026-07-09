/**
 * Original abstract artwork \u2014 a stylized Cape Town skyline with Table
 * Mountain's flat silhouette, built entirely from vector shapes in the
 * brand palette. This is NOT stock photography and isn't meant to pass as
 * such; it's a license-free placeholder for visual richness until real,
 * licensed photography (or a commissioned shoot) is available.
 */
export default function AbstractSkyline({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 300"
      fill="none"
      className={className}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      {/* Table Mountain silhouette */}
      <path
        d="M0 300 L0 210 L160 210 L230 150 L520 150 L580 210 L1200 210 L1200 300 Z"
        fill="currentColor"
        opacity="0.9"
      />
      {/* City block skyline, layered in front */}
      <g fill="currentColor" opacity="1">
        <rect x="60" y="240" width="26" height="60" />
        <rect x="96" y="220" width="20" height="80" />
        <rect x="126" y="255" width="30" height="45" />
        <rect x="700" y="230" width="24" height="70" />
        <rect x="732" y="250" width="18" height="50" />
        <rect x="760" y="215" width="22" height="85" />
        <rect x="790" y="245" width="26" height="55" />
        <rect x="900" y="235" width="20" height="65" />
        <rect x="928" y="255" width="30" height="45" />
        <rect x="966" y="210" width="18" height="90" />
        <rect x="992" y="240" width="24" height="60" />
      </g>
      {/* Gold accent \u2014 a rising sun / horizon arc behind the mountain */}
      <circle cx="380" cy="165" r="46" fill="#D4A017" opacity="0.35" />
    </svg>
  );
}
