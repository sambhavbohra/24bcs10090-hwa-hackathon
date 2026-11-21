export default function Icon({ name, size = 24 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  switch (name) {
    case 'bowl':
      return (
        <svg {...common}>
          <path d="M4 11h16a8 8 0 0 1-16 0Z" />
          <path d="M9 7c0-1.2 1.3-2 3-2s3 .8 3 2" />
        </svg>
      );
    case 'shirt':
      return (
        <svg {...common}>
          <path d="M9 4 5 6 3 10l3 2 1-1v9h10v-9l1 1 3-2-2-4-4-2a4 4 0 0 1-6 0Z" />
        </svg>
      );
    case 'wave':
      return (
        <svg {...common}>
          <path d="M3 16c2.5 0 2.5-8 5-8s2.5 8 5 8 2.5-6 5-6 2.5 4 3 4" />
        </svg>
      );
    case 'speaker':
      return (
        <svg {...common}>
          <path d="M4 10v4h3l5 4V6L7 10H4Z" />
          <path d="M16 9c1.3 1.3 1.3 4.7 0 6" />
          <path d="M19 6c2.7 2.7 2.7 9.3 0 12" />
        </svg>
      );
    case 'snow':
      return (
        <svg {...common}>
          <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5 4.2 16.5" />
          <path d="m9 5 3 2 3-2M9 19l3-2 3 2M5 10l3 1-1 3M19 10l-3 1 1 3" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </svg>
      );
    case 'paw':
      return (
        <svg {...common}>
          <ellipse cx="12" cy="16" rx="4.5" ry="3.5" />
          <circle cx="6.5" cy="10.5" r="1.8" />
          <circle cx="10" cy="7.5" r="1.8" />
          <circle cx="14" cy="7.5" r="1.8" />
          <circle cx="17.5" cy="10.5" r="1.8" />
        </svg>
      );
    case 'check':
      return (
        <svg {...common}>
          <path d="m5 12.5 4.5 4.5L19 7" />
        </svg>
      );
    case 'arrow':
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case 'leaf':
      return (
        <svg {...common}>
          <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z" />
          <path d="M5 19c3-5 6-8 11-10" />
        </svg>
      );
    default:
      return null;
  }
}
