export const CURRENCY = 'INR';

export const products = [
  {
    id: 'stay-station',
    slug: 'stay-station',
    name: 'Stay Station',
    category: 'The station',
    shortDescription: 'A departure enrichment station for the hours your dog spends alone.',
    image: '/images/station-hero.jpg',
    description:
      "Stay is built around the hardest thirty minutes of being home alone, and the long day after. Six sealed bays hold your dog's own measured food, a frozen core keeps it fresh, and one quiet motor opens a single bay at a time. Your scent, your voice and a little curiosity do the rest.",
    price: 8999,
    displayPrice: 'From ₹8,999',
    art: 'station',
    badge: 'The original',
    variants: [
      {
        id: 'size',
        label: 'Size',
        type: 'button',
        options: [
          { id: 'small-medium', label: 'Small / Medium', priceDelta: 0, note: 'Up to 20 kg' },
          { id: 'large', label: 'Large', priceDelta: 1000, note: '20 kg and up' },
        ],
      },
      {
        id: 'colour',
        label: 'Colour',
        type: 'swatch',
        options: [
          { id: 'oat', label: 'Oat', priceDelta: 0, image: '/images/station-oat.jpg', swatch: '#E8DCC8' },
          { id: 'slate', label: 'Slate', priceDelta: 0, image: '/images/station-slate.jpg', swatch: '#6E7C86' },
        ],
      },
    ],
    highlights: [
      {
        title: 'The first thirty minutes',
        text: 'Bay one is already open when you leave: a frozen lick disc with a strip of your worn t-shirt. Licking is rhythmic and soothing, and your scent makes the room read home.',
      },
      {
        title: 'Six moments, not one drop',
        text: 'One bay opens at a time, timed to the shape of the day rather than an even spread of food.',
      },
      {
        title: 'Cold for the workday',
        text: 'A frozen core wraps the drum and holds temperature for 10+ hours, so fresh and wet food stays safe.',
      },
      {
        title: 'It knows what was eaten',
        text: 'A scale in the base weighs what leaves each bay, so you see what was actually taken, not just dispensed.',
      },
    ],
    includes: [
      'Stay Station',
      'Frozen cold core',
      'USB-C cable',
      'Quick-start card',
    ],
    details: [
      { label: 'Footprint', text: 'About the size of a kitchen bin — 34 × 34 × 46 cm.' },
      { label: 'Bays', text: 'Six sealed compartments, one open at a time.' },
      { label: 'Cold core', text: 'Frozen pack holds temperature for 10+ hours.' },
      { label: 'Scale', text: 'Base-mounted, tracks the food taken from each bay.' },
      { label: 'Voice', text: 'Recorded cues, played softly in the last twenty minutes.' },
      { label: 'Power', text: 'USB-C, with a 12-hour backup.' },
    ],
  },
  {
    id: 'starter-bundle',
    slug: 'starter-bundle',
    name: 'Stay Starter Bundle',
    category: 'The bundle',
    shortDescription: 'The whole first day, in one box.',
    image: '/images/station-oat.jpg',
    description:
      'Everything a dog needs for the first day alone: the Stay Station, a set of Frozen Lick Discs, Scent Search Cartridges and the Puzzle Insert Set — together for less than buying them separately.',
    price: 10499,
    displayPrice: '₹10,499',
    art: 'bundle',
    badge: 'Best seller',
    variants: [
      {
        id: 'size',
        label: 'Size',
        type: 'button',
        options: [
          { id: 'small-medium', label: 'Small / Medium', priceDelta: 0, note: 'Up to 20 kg' },
          { id: 'large', label: 'Large', priceDelta: 0, note: '20 kg and up' },
        ],
      },
      {
        id: 'colour',
        label: 'Colour',
        type: 'swatch',
        options: [
          { id: 'oat', label: 'Oat', priceDelta: 0, image: '/images/station-oat.jpg', swatch: '#E8DCC8' },
          { id: 'slate', label: 'Slate', priceDelta: 0, image: '/images/station-slate.jpg', swatch: '#6E7C86' },
        ],
      },
    ],
    highlights: [
      {
        title: 'One calm first day',
        text: 'The station plus the three modules that make the day feel less empty.',
      },
      {
        title: 'Better together',
        text: 'A lower price than buying the station and the modules separately.',
      },
      {
        title: 'Choose size and colour',
        text: 'Same price for Small / Medium and Large, in Oat or Slate.',
      },
    ],
    includes: [
      'Stay Station',
      'Frozen Lick Discs (6-pack)',
      'Scent Search Cartridges (4-pack)',
      'Puzzle Insert Set',
      'Frozen cold core',
      'USB-C cable',
      'Quick-start card',
    ],
    details: [
      { label: 'Includes', text: 'Station, lick discs, scent cartridges and puzzle insert set.' },
      { label: 'Sizes', text: 'Small / Medium or Large — same bundle price.' },
      { label: 'Colours', text: 'Oat or Slate.' },
      { label: 'Shipping', text: 'Free, 3–5 days.' },
    ],
  },
  {
    id: 'frozen-lick-discs',
    slug: 'frozen-lick-discs',
    name: 'Frozen Lick Discs',
    category: 'Refill',
    shortDescription: 'The first thirty minutes, on a disc.',
    image: '/images/frozen-lick-discs.jpg',
    description:
      "Six frozen lick discs that fit the first bay. Spread a little of your dog's own food, freeze, and let slow licking do the calming. One simple flavour, nothing extra.",
    price: 749,
    displayPrice: '₹749',
    art: 'discs',
    badge: '6-pack',
    variants: [],
    highlights: [
      {
        title: 'Calm by licking',
        text: 'Slow, rhythmic licking is naturally soothing — a job for the body while the house goes quiet.',
      },
      {
        title: 'No extra calories',
        text: 'Use part of the day\'s measured food, so the disc relocates a meal instead of adding a treat.',
      },
      {
        title: 'Fits bay one',
        text: 'Sized for the first compartment, ready before you walk out of the door.',
      },
    ],
    includes: ['6 frozen lick discs'],
    details: [
      { label: 'Pack', text: 'Six discs.' },
      { label: 'Use', text: 'Fill, freeze, and place in bay one.' },
      { label: 'Care', text: 'Dishwasher-safe.' },
    ],
  },
  {
    id: 'scent-cartridges',
    slug: 'scent-cartridges',
    name: 'Scent Search Cartridges',
    category: 'Refill',
    shortDescription: 'A nose-first game for the long middle.',
    image: '/images/scent-cartridges.jpg',
    description:
      'Four scent search cartridges in the scent you choose. Each one turns a bay into a small search, so the dog works nose-first instead of waiting for a bowl.',
    price: 899,
    displayPrice: '₹899',
    art: 'cartridges',
    badge: '4-pack',
    variants: [
      {
        id: 'scent',
        label: 'Scent',
        type: 'swatch',
        options: [
          { id: 'forest', label: 'Forest', priceDelta: 0, swatch: '#6F8B6A' },
          { id: 'meadow', label: 'Meadow', priceDelta: 0, swatch: '#B7C98A' },
          { id: 'ocean', label: 'Ocean', priceDelta: 0, swatch: '#7FA9C4' },
        ],
      },
    ],
    highlights: [
      {
        title: 'A problem to solve',
        text: 'The dog follows the scent instead of emptying a bowl in seconds.',
      },
      {
        title: 'Three scents',
        text: 'Forest, Meadow or Ocean — one chosen scent, four cartridges.',
      },
      {
        title: 'For the long middle',
        text: 'Timed for the quiet part of the day, when boredom arrives.',
      },
    ],
    includes: ['4 scent cartridges in one chosen scent'],
    details: [
      { label: 'Pack', text: 'Four cartridges.' },
      { label: 'Scents', text: 'Forest, Meadow or Ocean.' },
      { label: 'Use', text: 'Drop into a bay for a nose-first search.' },
    ],
  },
  {
    id: 'puzzle-insert-set',
    slug: 'puzzle-insert-set',
    name: 'Puzzle Insert Set',
    category: 'Refill',
    shortDescription: 'Three levels of something to solve.',
    image: '/images/puzzle-inserts.jpg',
    description:
      'Three puzzle inserts — one for each difficulty level — that drop into a bay. Start easy, then let the dog work up to the harder shapes as the day goes on.',
    price: 1299,
    displayPrice: '₹1,299',
    art: 'puzzle',
    badge: '3 levels',
    variants: [],
    highlights: [
      {
        title: 'Three difficulties',
        text: 'Level one is a nudge; level three is a proper puzzle.',
      },
      {
        title: 'Rotate the day',
        text: 'Different inserts keep the same bay interesting across the week.',
      },
      {
        title: 'Mind work, not just food',
        text: 'Solving is what actually tires a dog, not simply eating.',
      },
    ],
    includes: ['Level 1 insert', 'Level 2 insert', 'Level 3 insert'],
    details: [
      { label: 'Set', text: 'Three inserts, one per difficulty level.' },
      { label: 'Fit', text: 'Drops into any Stay bay.' },
      { label: 'Care', text: 'Dishwasher-safe.' },
    ],
  },
  {
    id: 'spare-cold-core',
    slug: 'spare-cold-core',
    name: 'Spare Cold Core',
    category: 'Refill',
    shortDescription: 'One in the station, one in the freezer.',
    image: '/images/cold-core.jpg',
    description:
      'A second frozen core so the station never waits for a refreeze. Swap it in the morning and keep the day cold without a gap.',
    price: 1099,
    displayPrice: '₹1,099',
    art: 'core',
    badge: 'Spare',
    variants: [],
    highlights: [
      {
        title: 'No cold gap',
        text: 'Swap a frozen core in while the other refreezes.',
      },
      {
        title: 'Fits both sizes',
        text: 'The same core works in Small / Medium and Large.',
      },
      {
        title: '10+ hours',
        text: 'The same all-day cold that keeps fresh food safe.',
      },
    ],
    includes: ['1 spare cold core'],
    details: [
      { label: 'Compatibility', text: 'Small / Medium and Large.' },
      { label: 'Cold', text: 'Holds temperature for 10+ hours.' },
      { label: 'Care', text: 'Wipe clean, refreeze overnight.' },
    ],
  },
  {
    id: 'refill-subscription',
    slug: 'refill-subscription',
    name: 'Stay Refill Subscription',
    category: 'Subscription',
    shortDescription: 'Fresh refills, without thinking about it.',
    image: '/images/modules.jpg',
    description:
      'Six Frozen Lick Discs and four Scent Search Cartridges, delivered on your schedule. Choose a scent once; change it whenever you like. Buy it on its own or alongside a station.',
    price: 899,
    displayPrice: '₹2,499 / quarter',
    defaultSelection: { billing: 'quarterly', scent: 'forest' },
    art: 'subscription',
    badge: 'Save ₹198 quarterly',
    variants: [
      {
        id: 'billing',
        label: 'Billing',
        type: 'button',
        options: [
          { id: 'monthly', label: 'Monthly', priceDelta: 0, note: 'Every month' },
          { id: 'quarterly', label: 'Quarterly', priceDelta: 1600, note: 'Every 3 months · save ₹198' },
        ],
      },
      {
        id: 'scent',
        label: 'Scent',
        type: 'swatch',
        options: [
          { id: 'forest', label: 'Forest', priceDelta: 0, swatch: '#6F8B6A' },
          { id: 'meadow', label: 'Meadow', priceDelta: 0, swatch: '#B7C98A' },
          { id: 'ocean', label: 'Ocean', priceDelta: 0, swatch: '#7FA9C4' },
        ],
      },
    ],
    highlights: [
      {
        title: 'The refills that matter',
        text: 'Six lick discs and four scent cartridges, delivered together.',
      },
      {
        title: 'Monthly or quarterly',
        text: 'Pay ₹899 a month, or ₹2,499 every three months and save ₹198.',
      },
      {
        title: 'Buy it alone',
        text: 'Works with a Stay Station, or as a gift for someone who already has one.',
      },
    ],
    includes: ['6 Frozen Lick Discs', '4 Scent Search Cartridges', 'One chosen scent', 'Free delivery'],
    details: [
      { label: 'Monthly', text: '₹899, delivered every month.' },
      { label: 'Quarterly', text: '₹2,499 every three months — save ₹198.' },
      { label: 'Scent', text: 'Forest, Meadow or Ocean. Change any time.' },
      { label: 'Cancel', text: 'Pause or cancel whenever you like.' },
    ],
  },
];

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug) || null;
}

export function getProductById(id) {
  return products.find((product) => product.id === id) || null;
}

export function getVariantGroup(product, groupId) {
  return (product.variants || []).find((group) => group.id === groupId) || null;
}

export function getOption(product, groupId, optionId) {
  const group = getVariantGroup(product, groupId);
  if (!group) return null;
  return group.options.find((option) => option.id === optionId) || null;
}

export function resolveSelection(product, selection = {}) {
  const resolved = {};
  for (const group of product.variants || []) {
    const requested = selection && typeof selection === 'object' ? selection[group.id] : undefined;
    const defaultId = product.defaultSelection?.[group.id];
    const match = group.options.find((option) => option.id === requested);
    const defaultMatch = group.options.find((option) => option.id === defaultId);
    resolved[group.id] = (match || defaultMatch || group.options[0]).id;
  }
  return resolved;
}

export function selectionOptions(product, selection = {}) {
  const resolved = resolveSelection(product, selection);
  const result = [];
  for (const group of product.variants || []) {
    const option = group.options.find((item) => item.id === resolved[group.id]);
    if (option) result.push({ group, option });
  }
  return result;
}

export function resolveProductImage(product, selection = {}) {
  const selectedImage = selectionOptions(product, selection).find(
    ({ option }) => option.image
  );
  return selectedImage?.option.image || product.image;
}

export function variantLabel(product, selection = {}) {
  return selectionOptions(product, selection)
    .map(({ option }) => option.label)
    .join(' · ');
}

export function resolveUnitPrice(product, selection = {}) {
  let price = product.price;
  for (const group of product.variants || []) {
    const resolved = resolveSelection(product, selection);
    const option = group.options.find((item) => item.id === resolved[group.id]);
    if (!option) continue;
    if (typeof option.price === 'number') price = option.price;
    else if (typeof option.priceDelta === 'number') price += option.priceDelta;
  }
  return price;
}

export function validateSelection(product, selection) {
  if (selection === undefined || selection === null) return { ok: true };
  if (typeof selection !== 'object' || Array.isArray(selection)) {
    return { ok: false, message: 'variant must be an object of variant ids to option ids.' };
  }
  for (const [groupId, optionId] of Object.entries(selection)) {
    const group = getVariantGroup(product, groupId);
    if (!group) {
      return { ok: false, message: `Unknown variant "${groupId}" for ${product.name}.` };
    }
    if (typeof optionId !== 'string' || !group.options.some((option) => option.id === optionId)) {
      return {
        ok: false,
        message: `Unknown option "${String(optionId)}" for variant "${groupId}" on ${product.name}.`,
      };
    }
  }
  return { ok: true };
}

export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function publicProduct(product) {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    shortDescription: product.shortDescription,
    image: product.image,
    defaultSelection: product.defaultSelection,
    currency: CURRENCY,
    variants: (product.variants || []).map((group) => ({
      id: group.id,
      label: group.label,
      options: group.options.map((option) => ({
        id: option.id,
        label: option.label,
        image: option.image,
        priceDelta: typeof option.priceDelta === 'number' ? option.priceDelta : undefined,
      })),
    })),
  };
}
