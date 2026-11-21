const R = 158;
const C = 2 * Math.PI * R;
const SEG = C / 6;
const GAP = 9;
const DASH = SEG - GAP;
const REST = C - DASH;

const labels = [
  { time: '07:30', x: 220, y: 62, open: true },
  { time: '09:30', x: 356.83, y: 141 },
  { time: '11:30', x: 356.83, y: 299 },
  { time: '13:30', x: 220, y: 378 },
  { time: '15:30', x: 83.17, y: 299 },
  { time: '17:00', x: 83.17, y: 141 },
];

export default function DayDial() {
  return (
    <div className="dial-wrap">
      <div className="dial-glow" aria-hidden="true" />
      <svg
        className="dial-svg"
        viewBox="0 0 440 440"
        role="img"
        aria-label="A dial of six timed bays around a cold core, with the first bay open at departure"
      >
        <circle cx="220" cy="220" r="194" fill="none" stroke="#C9D9E6" strokeWidth="1" opacity="0.7" />
        <circle cx="220" cy="220" r="182" fill="none" stroke="#C9D9E6" strokeWidth="1" strokeDasharray="2 10" opacity="0.8" />
        <circle cx="220" cy="220" r={R} fill="none" stroke="#DDE8F0" strokeWidth="42" />
        <g transform="rotate(-120 220 220)">
          <circle
            cx="220"
            cy="220"
            r={R}
            fill="none"
            stroke="#2A4150"
            strokeWidth="38"
            strokeDasharray={`${DASH} ${GAP}`}
          />
        </g>
        <g transform="rotate(-120 220 220)" className="dial-open">
          <circle
            cx="220"
            cy="220"
            r={R}
            fill="none"
            stroke="#E0795C"
            strokeWidth="38"
            strokeDasharray={`${DASH} ${REST}`}
          />
        </g>
        <circle cx="220" cy="220" r="94" fill="#1F303B" />
        <circle cx="220" cy="220" r="94" fill="none" stroke="#F7F0E4" strokeWidth="1" opacity="0.08" />
        <circle cx="220" cy="220" r="72" fill="none" stroke="#F7F0E4" strokeWidth="1" strokeDasharray="2 8" opacity="0.16" />
        {labels.map((label) => (
          <text
            key={label.time}
            x={label.x}
            y={label.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="13.5"
            fontWeight="600"
            letterSpacing="1.4"
            fill={label.open ? '#FFF6EE' : '#F7F0E4'}
          >
            {label.time}
          </text>
        ))}
        <g fill="#F7F0E4" opacity="0.5">
          <circle cx="220" cy="42" r="2.5" />
          <circle cx="398" cy="220" r="2.5" />
          <circle cx="220" cy="398" r="2.5" />
          <circle cx="42" cy="220" r="2.5" />
        </g>
      </svg>

      <div className="dial-core">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5 4.2 16.5" />
          <path d="m9 5 3 2 3-2M9 19l3-2 3 2M5 10l3 1-1 3M19 10l-3 1 1 3" />
        </svg>
        <strong>10+ hrs</strong>
        <span>cold core</span>
      </div>

      <div className="dial-card">
        <span className="dial-card-label">Bay 01 · open</span>
        <span className="dial-card-text">Frozen lick disc + your scent</span>
      </div>

      <div className="dial-chip">
        <span className="dial-chip-dot" />
        17:40 · your voice
      </div>
    </div>
  );
}
