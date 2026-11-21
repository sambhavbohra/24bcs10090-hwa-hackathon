const INK = '#22333F';
const INK_2 = '#2E4756';
const INK_3 = '#16232C';
const CREAM = '#F7F0E4';
const CORAL = '#E0795C';
const CORAL_DARK = '#C75F43';
const CORAL_SOFT = '#F7DCD2';
const SAGE = '#9BB394';
const SAGE_DARK = '#7E9A78';
const DOG = '#D8B58C';
const DOG_DARK = '#BE9868';
const DOG_LIGHT = '#EFDCC0';
const AMBER = '#E8B76A';
const BLUE = '#A9CBE0';
const BLUE_LIGHT = '#CFE5F1';

function StationShape({ withDog = true }) {
  return (
    <g>
      <ellipse cx="200" cy="288" rx="120" ry="14" fill={INK} opacity="0.1" />
      <rect x="108" y="70" width="184" height="212" rx="46" fill={INK} />
      <rect x="100" y="52" width="200" height="46" rx="23" fill={INK_2} />
      <ellipse cx="200" cy="74" rx="68" ry="19" fill={INK_3} />
      <ellipse cx="200" cy="74" rx="55" ry="13" fill="#0E181E" />
      <circle cx="200" cy="74" r="28" fill={CORAL} />
      <circle cx="200" cy="74" r="28" fill="none" stroke={CORAL_DARK} strokeWidth="2" opacity="0.55" />
      <circle cx="200" cy="74" r="9" fill={CORAL_DARK} opacity="0.55" />
      <rect x="164" y="134" width="72" height="24" rx="12" fill={CREAM} opacity="0.1" />
      <text
        x="200"
        y="151"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        letterSpacing="4"
        fill={CREAM}
      >
        STAY
      </text>
      <g>
        <circle cx="150" cy="196" r="4.5" fill={CORAL} />
        <circle cx="170" cy="196" r="4.5" fill={CREAM} opacity="0.55" />
        <circle cx="190" cy="196" r="4.5" fill={CREAM} opacity="0.55" />
        <circle cx="210" cy="196" r="4.5" fill={CREAM} opacity="0.55" />
        <circle cx="230" cy="196" r="4.5" fill={CREAM} opacity="0.55" />
        <circle cx="250" cy="196" r="4.5" fill={CREAM} opacity="0.55" />
      </g>
      <g fill={CREAM} opacity="0.28">
        <circle cx="184" cy="228" r="1.8" />
        <circle cx="196" cy="228" r="1.8" />
        <circle cx="208" cy="228" r="1.8" />
        <circle cx="220" cy="228" r="1.8" />
        <circle cx="184" cy="238" r="1.8" />
        <circle cx="196" cy="238" r="1.8" />
        <circle cx="208" cy="238" r="1.8" />
        <circle cx="220" cy="238" r="1.8" />
        <circle cx="184" cy="248" r="1.8" />
        <circle cx="196" cy="248" r="1.8" />
        <circle cx="208" cy="248" r="1.8" />
        <circle cx="220" cy="248" r="1.8" />
      </g>
      <rect x="128" y="268" width="28" height="10" rx="5" fill="#18252E" />
      <rect x="244" y="268" width="28" height="10" rx="5" fill="#18252E" />

      {withDog ? (
        <g>
          <ellipse cx="334" cy="268" rx="34" ry="7" fill={INK} opacity="0.08" />
          <path d="M360 226q20-4 14 14" stroke={DOG_DARK} strokeWidth="9" fill="none" strokeLinecap="round" />
          <ellipse cx="334" cy="232" rx="28" ry="36" fill={DOG} />
          <rect x="320" y="256" width="10" height="20" rx="5" fill={DOG_DARK} />
          <rect x="338" y="256" width="10" height="20" rx="5" fill={DOG_DARK} />
          <circle cx="334" cy="182" r="21" fill={DOG} />
          <path d="M319 163c-8 2-12 12-10 22 1 7 7 11 12 8 4-2 5-9 4-16-1-6-3-11-6-14Z" fill={DOG_DARK} />
          <path d="M349 163c8 2 12 12 10 22-1 7-7 11-12 8-4-2-5-9-4-16 1-6 3-11 6-14Z" fill={DOG_DARK} />
          <ellipse cx="334" cy="191" rx="12" ry="8.5" fill={DOG_LIGHT} />
          <circle cx="327.5" cy="176.5" r="1.9" fill={INK} />
          <circle cx="340.5" cy="176.5" r="1.9" fill={INK} />
          <ellipse cx="334" cy="187.5" rx="3.2" ry="2.4" fill={INK} />
          <path d="M334 190v3M334 193c-2.2 2-5 1.4-6.2-.4M334 193c2.2 2 5 1.4 6.2-.4" stroke={INK} strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <circle cx="334" cy="204" r="4" fill={CORAL} />
        </g>
      ) : null}
    </g>
  );
}

function StationArt() {
  return (
    <svg viewBox="0 0 400 320" className="art-svg" role="img" aria-label="Stay Station with six bays and a dog sitting beside it">
      <StationShape />
      <g stroke={AMBER} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7">
        <path d="M262 40q10-10 20 0" />
        <path d="M270 28q10-10 20 0" />
      </g>
    </svg>
  );
}

function BundleArt() {
  return (
    <svg viewBox="0 0 400 320" className="art-svg" role="img" aria-label="The Stay Starter Bundle with the station and four module packs">
      <ellipse cx="200" cy="286" rx="158" ry="15" fill={INK} opacity="0.08" />
      <g transform="translate(18 34) scale(0.74)">
        <rect x="108" y="70" width="184" height="212" rx="46" fill={INK} />
        <rect x="100" y="52" width="200" height="46" rx="23" fill={INK_2} />
        <ellipse cx="200" cy="74" rx="68" ry="19" fill={INK_3} />
        <ellipse cx="200" cy="74" rx="55" ry="13" fill="#0E181E" />
        <circle cx="200" cy="74" r="28" fill={CORAL} />
        <rect x="164" y="134" width="72" height="24" rx="12" fill={CREAM} opacity="0.1" />
        <text x="200" y="151" textAnchor="middle" fontSize="12" fontWeight="700" letterSpacing="4" fill={CREAM}>
          STAY
        </text>
        <g>
          <circle cx="170" cy="196" r="5" fill={CORAL} />
          <circle cx="190" cy="196" r="5" fill={CREAM} opacity="0.5" />
          <circle cx="210" cy="196" r="5" fill={CREAM} opacity="0.5" />
          <circle cx="230" cy="196" r="5" fill={CREAM} opacity="0.5" />
        </g>
      </g>

      <g>
        <rect x="252" y="86" width="58" height="58" rx="18" fill="#FFFFFF" />
        <circle cx="281" cy="115" r="17" fill={CORAL} />
        <circle cx="281" cy="115" r="7" fill={CORAL_DARK} opacity="0.5" />
      </g>
      <g>
        <rect x="322" y="86" width="58" height="58" rx="18" fill="#FFFFFF" />
        <rect x="340" y="102" width="22" height="30" rx="11" fill={SAGE} />
        <ellipse cx="351" cy="102" rx="11" ry="4" fill={SAGE_DARK} />
      </g>
      <g>
        <rect x="252" y="156" width="58" height="58" rx="18" fill="#FFFFFF" />
        <circle cx="281" cy="185" r="18" fill="none" stroke={AMBER} strokeWidth="6" />
        <circle cx="281" cy="185" r="7" fill={INK} opacity="0.2" />
      </g>
      <g>
        <rect x="322" y="156" width="58" height="58" rx="18" fill="#FFFFFF" />
        <rect x="342" y="168" width="18" height="34" rx="9" fill={BLUE} />
        <path d="M351 175v20M344 185h14M346 179l10 12M356 179l-10 12" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function DiscsArt() {
  return (
    <svg viewBox="0 0 400 320" className="art-svg" role="img" aria-label="A stack of frozen lick discs">
      <ellipse cx="200" cy="280" rx="112" ry="14" fill={INK} opacity="0.08" />
      <g>
        <ellipse cx="200" cy="240" rx="92" ry="30" fill={CORAL_DARK} />
        <ellipse cx="200" cy="228" rx="92" ry="30" fill={CORAL} />
        <ellipse cx="200" cy="228" rx="62" ry="18" fill={CORAL_SOFT} />
        <ellipse cx="200" cy="200" rx="92" ry="30" fill={CORAL_DARK} />
        <ellipse cx="200" cy="188" rx="92" ry="30" fill="#E88A6E" />
        <ellipse cx="200" cy="188" rx="62" ry="18" fill="#FBE7DF" />
        <ellipse cx="200" cy="160" rx="92" ry="30" fill={CORAL_DARK} />
        <ellipse cx="200" cy="148" rx="92" ry="30" fill={CORAL} />
        <ellipse cx="200" cy="148" rx="62" ry="18" fill={CORAL_SOFT} />
      </g>
      <g fill={CREAM} opacity="0.85">
        <ellipse cx="200" cy="158" rx="9" ry="7" />
        <circle cx="186" cy="146" r="4" />
        <circle cx="194" cy="141" r="4" />
        <circle cx="204" cy="141" r="4" />
        <circle cx="212" cy="146" r="4" />
      </g>
      <g fill="#FFFFFF" opacity="0.6">
        <circle cx="124" cy="104" r="3" />
        <circle cx="286" cy="116" r="2.5" />
        <circle cx="300" cy="94" r="2" />
        <circle cx="112" cy="126" r="2" />
      </g>
    </svg>
  );
}

function CartridgesArt() {
  return (
    <svg viewBox="0 0 400 320" className="art-svg" role="img" aria-label="Three scent search cartridges in Forest, Meadow and Ocean">
      <ellipse cx="200" cy="272" rx="112" ry="14" fill={INK} opacity="0.08" />
      <g>
        <rect x="96" y="122" width="60" height="132" rx="28" fill="#6F8B6A" />
        <ellipse cx="126" cy="122" rx="30" ry="11" fill="#5C7758" />
        <rect x="108" y="164" width="36" height="14" rx="7" fill={CREAM} opacity="0.85" />
      </g>
      <g>
        <rect x="170" y="122" width="60" height="132" rx="28" fill="#B7C98A" />
        <ellipse cx="200" cy="122" rx="30" ry="11" fill="#9DB471" />
        <rect x="182" y="164" width="36" height="14" rx="7" fill={CREAM} opacity="0.85" />
      </g>
      <g>
        <rect x="244" y="122" width="60" height="132" rx="28" fill="#7FA9C4" />
        <ellipse cx="274" cy="122" rx="30" ry="11" fill="#6793AF" />
        <rect x="256" y="164" width="36" height="14" rx="7" fill={CREAM} opacity="0.85" />
      </g>
      <g strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.75">
        <path d="M112 96q8-12 16 0" stroke="#6F8B6A" />
        <path d="M186 96q8-12 16 0" stroke="#9DB471" />
        <path d="M260 96q8-12 16 0" stroke="#6793AF" />
        <path d="M118 82q8-12 16 0" stroke="#6F8B6A" opacity="0.5" />
        <path d="M192 82q8-12 16 0" stroke="#9DB471" opacity="0.5" />
        <path d="M266 82q8-12 16 0" stroke="#6793AF" opacity="0.5" />
      </g>
    </svg>
  );
}

function PuzzleArt() {
  return (
    <svg viewBox="0 0 400 320" className="art-svg" role="img" aria-label="A three-level puzzle insert set">
      <ellipse cx="200" cy="276" rx="108" ry="14" fill={INK} opacity="0.08" />
      <circle cx="200" cy="160" r="98" fill={CREAM} />
      <circle cx="200" cy="160" r="98" fill="none" stroke={INK} strokeWidth="4" opacity="0.12" />
      <circle cx="200" cy="160" r="70" fill={SAGE} />
      <circle cx="200" cy="160" r="70" fill="none" stroke={INK} strokeWidth="4" opacity="0.12" />
      <circle cx="200" cy="160" r="42" fill={AMBER} />
      <circle cx="200" cy="160" r="42" fill="none" stroke={INK} strokeWidth="4" opacity="0.12" />
      <circle cx="200" cy="160" r="18" fill={INK} />
      <g fill={CREAM}>
        <ellipse cx="200" cy="164" rx="7" ry="5.5" />
        <circle cx="189" cy="155" r="3" />
        <circle cx="196" cy="151" r="3" />
        <circle cx="204" cy="151" r="3" />
        <circle cx="211" cy="155" r="3" />
      </g>
      <g fill={CORAL}>
        <circle cx="200" cy="90" r="9" />
        <circle cx="270" cy="160" r="9" />
        <circle cx="200" cy="230" r="9" />
        <circle cx="130" cy="160" r="9" />
      </g>
      <circle cx="200" cy="160" r="86" fill="none" stroke={CREAM} strokeWidth="3" strokeDasharray="5 12" opacity="0.5" />
      <circle cx="200" cy="160" r="58" fill="none" stroke={CREAM} strokeWidth="3" strokeDasharray="5 12" opacity="0.5" />
    </svg>
  );
}

function CoreArt() {
  return (
    <svg viewBox="0 0 400 320" className="art-svg" role="img" aria-label="A spare frozen cold core">
      <ellipse cx="200" cy="278" rx="86" ry="13" fill={INK} opacity="0.08" />
      <rect x="148" y="58" width="104" height="196" rx="52" fill={BLUE} />
      <rect x="162" y="72" width="76" height="168" rx="38" fill={BLUE_LIGHT} />
      <rect x="148" y="92" width="104" height="18" fill="#FFFFFF" opacity="0.28" />
      <g stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" fill="none">
        <path d="M200 116v84M168 137l64 42M232 137l-64 42" />
        <path d="m191 122 9 6 9-6M191 194l9-6 9 6M173 143l9 3-3 9M227 143l-9 3 3 9" />
      </g>
      <g fill="#FFFFFF" opacity="0.7">
        <circle cx="130" cy="96" r="3" />
        <circle cx="278" cy="120" r="2.5" />
        <circle cx="286" cy="214" r="2" />
        <circle cx="120" cy="220" r="2.5" />
      </g>
      <rect x="172" y="250" width="56" height="8" rx="4" fill={INK} opacity="0.12" />
    </svg>
  );
}

function SubscriptionArt() {
  const dots = Array.from({ length: 12 }, (_, index) => {
    const angle = (index / 12) * Math.PI * 2 - Math.PI / 2;
    const round = (value) => Math.round(value * 100) / 100;
    return {
      x: round(200 + Math.cos(angle) * 112),
      y: round(158 + Math.sin(angle) * 112),
      r: index % 3 === 0 ? 5 : 3,
      fill: index % 3 === 0 ? CORAL : SAGE,
    };
  });

  return (
    <svg viewBox="0 0 400 320" className="art-svg" role="img" aria-label="A monthly refill cycle with lick discs and scent cartridges">
      <ellipse cx="200" cy="278" rx="112" ry="14" fill={INK} opacity="0.08" />
      <circle cx="200" cy="158" r="112" fill="none" stroke={SAGE} strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" opacity="0.8" />
      {dots.map((dot, index) => (
        <circle key={index} cx={dot.x} cy={dot.y} r={dot.r} fill={dot.fill} opacity="0.85" />
      ))}
      <g>
        <rect x="170" y="118" width="42" height="78" rx="21" fill={SAGE} />
        <ellipse cx="191" cy="118" rx="21" ry="8" fill={SAGE_DARK} />
        <rect x="178" y="146" width="26" height="10" rx="5" fill={CREAM} opacity="0.85" />
      </g>
      <g>
        <circle cx="228" cy="178" r="38" fill={CORAL} />
        <circle cx="228" cy="178" r="38" fill="none" stroke={CORAL_DARK} strokeWidth="2" opacity="0.5" />
        <circle cx="228" cy="178" r="12" fill={CORAL_DARK} opacity="0.45" />
      </g>
      <g>
        <path d="M88 158a112 112 0 0 1 30-77" stroke={CORAL} strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="m112 76 10 2-6 9Z" fill={CORAL} />
        <path d="M312 158a112 112 0 0 1-30 77" stroke={CORAL} strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="m288 240-10-2 6-9Z" fill={CORAL} />
      </g>
    </svg>
  );
}

const ART = {
  station: StationArt,
  bundle: BundleArt,
  discs: DiscsArt,
  cartridges: CartridgesArt,
  puzzle: PuzzleArt,
  core: CoreArt,
  subscription: SubscriptionArt,
};

export default function ProductArt({ art = 'station', className = '' }) {
  const Component = ART[art] || StationArt;
  return (
    <div className={`product-art-inner ${className}`.trim()}>
      <Component />
    </div>
  );
}
