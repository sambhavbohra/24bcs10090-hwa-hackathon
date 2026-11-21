export default function EmotionCurve() {
  const curve =
    'M 30 212 C 80 212 78 92 132 80 C 186 68 196 208 258 212 C 330 217 366 188 438 196 C 520 205 566 198 650 200 C 724 202 760 182 820 144 C 868 114 914 98 968 102';

  return (
    <svg
      viewBox="0 0 1000 300"
      className="curve-svg"
      role="img"
      aria-label="A curve of a dog's day alone: a spike in the first thirty minutes, a long flat middle, and a rise in the last twenty minutes"
    >
      <line x1="24" y1="252" x2="976" y2="252" stroke="#C9D9E6" strokeWidth="1.5" strokeDasharray="4 8" />
      <path d={`${curve} L 968 252 L 30 252 Z`} fill="#E0795C" opacity="0.1" />
      <path d={curve} fill="none" stroke="#E0795C" strokeWidth="4" strokeLinecap="round" />

      <g stroke="#C9D9E6" strokeWidth="1.5" strokeDasharray="3 7">
        <line x1="132" y1="80" x2="132" y2="252" />
        <line x1="520" y1="201" x2="520" y2="252" />
        <line x1="900" y1="110" x2="900" y2="252" />
      </g>

      <g>
        <circle cx="132" cy="80" r="8" fill="#FFFFFF" stroke="#E0795C" strokeWidth="3" />
        <circle cx="132" cy="80" r="3" fill="#E0795C" />
        <text x="132" y="46" textAnchor="middle" fontSize="12" fontWeight="700" letterSpacing="2" fill="#C75F43">
          0–30 MIN
        </text>
        <text x="132" y="64" textAnchor="middle" fontSize="13" fontWeight="600" letterSpacing="1.5" fill="#22333F">
          THE SPIKE
        </text>
      </g>

      <g>
        <circle cx="520" cy="201" r="8" fill="#FFFFFF" stroke="#E0795C" strokeWidth="3" />
        <circle cx="520" cy="201" r="3" fill="#E0795C" />
        <text x="520" y="228" textAnchor="middle" fontSize="12" fontWeight="700" letterSpacing="2" fill="#C75F43">
          MID-DAY
        </text>
        <text x="520" y="246" textAnchor="middle" fontSize="13" fontWeight="600" letterSpacing="1.5" fill="#22333F">
          THE LONG MIDDLE
        </text>
      </g>

      <g>
        <circle cx="900" cy="110" r="8" fill="#FFFFFF" stroke="#E0795C" strokeWidth="3" />
        <circle cx="900" cy="110" r="3" fill="#E0795C" />
        <text x="900" y="70" textAnchor="middle" fontSize="12" fontWeight="700" letterSpacing="2" fill="#C75F43">
          LAST 20 MIN
        </text>
        <text x="900" y="88" textAnchor="middle" fontSize="13" fontWeight="600" letterSpacing="1.5" fill="#22333F">
          THE WAIT
        </text>
      </g>
    </svg>
  );
}
