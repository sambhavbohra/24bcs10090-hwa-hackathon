import Image from 'next/image';
import Link from 'next/link';
import { products, safetyGuide } from '@/lib/products';
import EmotionCurve from '@/components/EmotionCurve';
import ProductCard from '@/components/ProductCard';
import SubscriptionBanner from '@/components/SubscriptionBanner';
import DogMatchQuiz from '@/components/DogMatchQuiz';
import Icon from '@/components/Icon';

const ticker = [
  'Measured meals, not treats',
  'Your scent in the first bay',
  'Six timed moments',
  'Your voice before you return',
  'A 10-hour cold window',
];

const phases = [
  {
    time: '0–30 min',
    title: 'The spike',
    text: 'The door closes and the house changes. Stay meets the dog before the silence does: one bay already open, a frozen lick disc, and the scent of your worn t-shirt.',
  },
  {
    time: 'Mid-day',
    title: 'The long middle',
    text: 'Boredom is not a bowl problem. Six different bays rotate through scent searches, puzzle discs and frozen licks, so there is always something small to look forward to.',
  },
  {
    time: 'Last 20 min',
    title: 'The wait',
    text: 'Nothing opens. Your recorded voice plays softly, so the dog settles at the door calm instead of pacing.',
  },
];

const day = [
  {
    time: '07:30',
    bay: 'Bay 01',
    title: 'Departure',
    text: 'Bay one is already open when you leave. A frozen lick disc, with a strip of your worn t-shirt in the slot. Licking is rhythmic and soothing; your scent makes the room read home, not empty.',
  },
  {
    time: '09:30',
    bay: 'Bay 02',
    title: 'Settle',
    text: 'A small portion, released quietly. Nothing pops or plays. The goal is a calm body, not a busy one.',
  },
  {
    time: '11:30',
    bay: 'Bay 03',
    title: 'Scent search',
    text: 'Food is hidden across the bay so the dog works nose-first. A problem to solve, not a bowl to empty.',
  },
  {
    time: '13:30',
    bay: 'Bay 04',
    title: 'Puzzle disc',
    text: 'A frozen disc to nudge and lick. Slow, satisfying work for the long middle of the day.',
  },
  {
    time: '15:30',
    bay: 'Bay 05',
    title: 'Frozen lick',
    text: 'Something to hold and work through. The kind of quiet occupation that lasts.',
  },
  {
    time: '17:00',
    bay: 'Bay 06',
    title: 'Anticipate',
    text: "The last of the day's measured food, timed close to your return. Something to look forward to at the end of the day.",
  },
  {
    time: '17:40',
    bay: 'Voice only',
    title: 'The last twenty minutes',
    text: 'No bay opens. Only your recorded voice, played softly. The dog waits at the door calm — not frantic.',
    voice: true,
  },
];

const why = [
  {
    icon: 'bowl',
    title: 'Real meals, not treats',
    text: "Stay holds only the dog's own measured daily food. You're relocating breakfast and dinner, never adding treats on top.",
  },
  {
    icon: 'shirt',
    title: 'Your scent, not a stranger\u2019s',
    text: 'A strip of your worn t-shirt sits in the first bay, so the room smells like home while you are gone.',
  },
  {
    icon: 'wave',
    title: 'The shape of the day',
    text: 'Six bays open at the moments that matter: the spike, the long middle, the wait. Not all at once, not evenly.',
  },
  {
    icon: 'speaker',
    title: 'Your voice before you return',
    text: 'The last twenty minutes belong to you. A recorded cue settles the dog at the door.',
  },
];

const faqs = [
  {
    q: 'Does Stay add extra calories?',
    a: "No. Load only the dog's own measured daily food. Stay relocates breakfast and dinner across the day and never adds extra treats or toppers on top.",
  },
  {
    q: 'What kind of food can it hold?',
    a: 'Fresh, wet, raw or dry. Keep fresh and wet food within the 10-hour cold window, and discard anything uneaten at the end of the day.',
  },
  {
    q: 'How does it know what my dog ate?',
    a: 'A scale in the base weighs what leaves each bay, so you see what was actually taken, not just what was dispensed.',
  },
  {
    q: 'What happens in the last twenty minutes?',
    a: 'Nothing opens. Stay plays your recorded voice softly, so the dog settles at the door instead of pacing.',
  },
  {
    q: 'Do I need an app?',
    a: 'No. You set the day once in the morning and Stay runs it. The point is less screen time, not more.',
  },
  {
    q: 'Is it hard to clean?',
    a: 'Lift the six trays out and run them through the dishwasher. Wipe the drum weekly, then refreeze the cold core overnight.',
  },
  {
    q: 'Is Stay suitable for every dog?',
    a: 'Supervise the first few uses so you can see how your dog approaches the station. It is not suitable for dogs who chew through hard plastic.',
  },
  {
    q: 'Can Stay treat separation anxiety?',
    a: 'No. Stay is enrichment, not a treatment for severe separation anxiety. If your dog panics, destroys things or soils the home when left, seek advice from a vet or qualified behaviourist.',
  },
  {
    q: 'Can I buy the subscription on its own?',
    a: 'Yes. The refill subscription works with a Stay Station or as a gift for someone who already has one.',
  },
  {
    q: 'What if my dog is a large breed?',
    a: 'Choose Large. Same six-bay day, sized for 20 kg and up.',
  },
];

const rangeProducts = products.filter(
  (product) => product.id !== 'refill-subscription'
);

function spanFor(id) {
  if (id === 'stay-station') return 'span-7';
  if (id === 'starter-bundle') return 'span-5';
  return 'span-3';
}

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-dot" />
              A departure enrichment station
            </p>
            <h1>
              You leave.
              <br />
              The day <em>doesn&apos;t have to</em> stop.
            </h1>
            <p className="lede">
              Stay turns the hours alone into a day that still feels like home:
              measured meals, your scent, six small moments of curiosity, and your
              voice before you walk back in.
            </p>
            <div className="hero-actions">
              <Link href="/products/stay-station" className="btn btn-primary">
                Meet the Station
              </Link>
              <a href="#day" className="btn btn-ghost">
                See the day <span aria-hidden="true">↓</span>
              </a>
            </div>
            <ul className="hero-trust">
              <li>
                <Icon name="check" size={16} /> No extra calories
              </li>
              <li>
                <Icon name="check" size={16} /> 10-hour cold window
              </li>
              <li>
                <Icon name="check" size={16} /> Free shipping · 3–5 days
              </li>
            </ul>
          </div>
          <div className="hero-visual">
            <div className="hero-photo">
              <Image
                src="/images/lifestyle.jpg"
                alt="Stay Station beside a resting dog at home"
                fill
                preload
                sizes="(max-width: 900px) 100vw, 48vw"
                className="hero-photo-image"
              />
              <div className="hero-photo-badge">10-hour cold window</div>
              <div className="hero-photo-card">
                <span>Made for the hours alone</span>
                <strong>Six moments. One calmer day.</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((group) => (
            <div className="ticker-group" key={group}>
              {ticker.map((item) => (
                <span className="ticker-item" key={`${group}-${item}`}>
                  {item}
                  <span className="ticker-dot" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="section problem-section" id="problem">
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="eyebrow">The shape of being alone</p>
            <h2>
              Most feeders fill a bowl.
              <br />
              Stay fills a day.
            </h2>
            <p className="lede">
              A dog alone does not experience the day as an even stretch of hours.
              It has peaks and troughs: the spike at the door, the long quiet
              middle, the anticipation before you return.
            </p>
          </div>

          <div className="curve-card reveal">
            <EmotionCurve />
            <p className="curve-caption">
              The day has an emotional shape. Stay follows it.
            </p>
          </div>

          <div className="phase-grid">
            {phases.map((phase, index) => (
              <article
                className="phase-card reveal"
                key={phase.title}
                style={{ '--d': `${index * 0.08}s` }}
              >
                <span className="phase-time">{phase.time}</span>
                <h3>{phase.title}</h3>
                <p>{phase.text}</p>
              </article>
            ))}
          </div>

          <p className="contrast reveal">
            Every other product on the market dispenses all at once, or evenly.{' '}
            <strong>Stay follows the emotional shape of being alone.</strong>
          </p>
        </div>
      </section>

      <section className="section day-section" id="day">
        <div className="wrap">
          <div className="day-card">
            <div className="day-head reveal">
              <p className="eyebrow light">One day with Stay</p>
              <h2>
                One morning portion.
                <br />
                Six moments of company.
              </h2>
              <p>
                You load the day&apos;s measured food once, in the morning. Stay
                spreads it across the hours in the shape of a dog&apos;s day — not
                all at once, not evenly.
              </p>
              <div className="day-badges">
                <span>6 bays</span>
                <span>10-hour cold window</span>
                <span>1 voice</span>
              </div>
            </div>

            <ol className="timeline">
              {day.map((item, index) => (
                <li
                  className={`timeline-item ${item.voice ? 'is-voice' : ''} reveal`}
                  key={item.time}
                  style={{ '--d': `${index * 0.05}s` }}
                >
                  <div className="timeline-time">{item.time}</div>
                  <div className="timeline-dot" aria-hidden="true" />
                  <div className="timeline-content">
                    <span className="timeline-bay">{item.bay}</span>
                    <h3>
                      {item.voice ? (
                        <>
                          <Icon name="speaker" size={18} /> {item.title}
                        </>
                      ) : (
                        item.title
                      )}
                    </h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section range-section" id="range">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">The range</p>
            <h2>
              Start with the station.
              <br />
              Add the day as you go.
            </h2>
            <p className="lede">
              Every piece works on its own. Together, they cover the first thirty
              minutes, the long middle, and the wait at the door.
            </p>
          </div>

          <div className="range-grid">
            {rangeProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                className={`${spanFor(product.id)} reveal`}
              />
            ))}
          </div>

          <SubscriptionBanner />
        </div>
      </section>

      <DogMatchQuiz />

      <section className="section why-section" id="why">
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="eyebrow">Why Stay</p>
            <h2>
              Other products dispense evenly.
              <br />
              Stay follows the day.
            </h2>
          </div>

          <div className="why-grid">
            {why.map((item, index) => (
              <article
                className="why-card reveal"
                key={item.title}
                style={{ '--d': `${index * 0.06}s` }}
              >
                <span className="why-icon">
                  <Icon name={item.icon} size={24} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className="spec-strip reveal">
            <div>
              <strong>6</strong>
              <span>sealed bays</span>
            </div>
            <div>
              <strong>10 hrs</strong>
              <span>cold window</span>
            </div>
            <div>
              <strong>1</strong>
              <span>bay open at a time</span>
            </div>
            <div>
              <strong>0</strong>
              <span>extra calories</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section safety-section" id="safe-use">
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="eyebrow">Safe use</p>
            <h2>A careful setup makes a better day.</h2>
            <p className="lede">{safetyGuide.intro}</p>
          </div>

          <div className="safety-grid">
            {safetyGuide.checks.map((item, index) => (
              <article
                className="safety-card reveal"
                key={item.title}
                style={{ '--d': `${index * 0.05}s` }}
              >
                <span className="safety-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <aside className="safety-warning reveal">
            <span className="safety-warning-label">Please read</span>
            <h3>{safetyGuide.warningTitle}</h3>
            <p>{safetyGuide.warning}</p>
          </aside>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="wrap faq-wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Questions</p>
            <h2>A few things owners ask.</h2>
          </div>

          <div className="faq-list reveal">
            {faqs.map((faq) => (
              <details className="faq-item" key={faq.q}>
                <summary>
                  {faq.q}
                  <span className="faq-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
