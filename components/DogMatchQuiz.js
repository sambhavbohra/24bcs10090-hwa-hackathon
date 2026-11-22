'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  formatINR,
  getProductById,
  resolveProductImage,
  resolveUnitPrice,
} from '@/lib/products';
import Icon from './Icon';
import { useCart } from './CartProvider';

const questions = [
  {
    id: 'time',
    title: 'How long is your dog usually alone?',
    helper: 'Think about a typical day, not the longest one.',
    options: [
      {
        id: 'short',
        label: '2–4 hours',
        note: 'A shorter stretch on most days',
        story:
          'A few hours alone is a manageable stretch, so the goal is to make each visit feel rewarding.',
      },
      {
        id: 'half',
        label: '4–6 hours',
        note: 'Around half a school or work day',
        story:
          'Around five hours is long enough for boredom to settle in, but short enough to build a calm routine.',
      },
      {
        id: 'long',
        label: '6–8 hours',
        note: 'Most of a workday',
        story:
          'Six to eight hours is a long day, so it needs steady moments of work rather than one big meal.',
      },
      {
        id: 'full',
        label: '8–10 hours',
        note: 'A full workday or longer',
        story:
          'Eight to ten hours is a long day, so the station needs to carry your dog through the first hour, the quiet middle and the wait before you return.',
      },
    ],
  },
  {
    id: 'leaving',
    title: 'How do they handle you leaving?',
    helper: 'Choose the answer that sounds most like a normal day.',
    options: [
      {
        id: 'calm',
        label: 'Settle and wait calmly',
        note: 'They get comfortable quickly',
        story:
          'They settle at the door, so the station can turn a calm departure into a day of gentle activity.',
      },
      {
        id: 'whine',
        label: 'Whine or watch the door',
        note: 'Some noise at first',
        story:
          'A little door noise is worth easing gently, so an open lick bay gives them something soothing to do as you leave.',
      },
      {
        id: 'struggle',
        label: 'Bark, pace or scratch',
        note: 'Leaving is difficult',
        story:
          'Struggling at the door means the first bay matters most: a frozen lick and your scent can turn watching you leave into a calmer start.',
      },
      {
        id: 'panic',
        label: 'Panic or damage things',
        note: 'Very distressed when left',
        story:
          'Panic at the door is a sign to pause and speak with a vet or qualified behaviourist before choosing an enrichment setup.',
      },
    ],
  },
  {
    id: 'enjoys',
    title: 'What do they enjoy most?',
    helper: 'Pick the activity that keeps them interested longest.',
    options: [
      {
        id: 'licking',
        label: 'Licking and slow chewing',
        note: 'Takes their time with food',
        story:
          'They enjoy licking, so the frozen discs give them a soothing, rhythmic job at departure.',
      },
      {
        id: 'scenting',
        label: 'Scent games and sniffing',
        note: 'Loves using their nose',
        story:
          'They love scent work, so the cartridges turn the long middle of the day into small nose-first searches.',
      },
      {
        id: 'puzzles',
        label: 'Puzzles and problem-solving',
        note: 'Likes to work things out',
        story:
          'They enjoy puzzles, so the three insert levels give their clever side something satisfying to do all day.',
      },
      {
        id: 'active',
        label: 'Running, walks and active play',
        note: 'Needs physical movement',
        story:
          'They enjoy physical play, so use the station as a calm complement to a proper walk, not a replacement for exercise.',
      },
    ],
  },
  {
    id: 'size',
    title: 'How big are they?',
    helper: 'Choose the closest fit for their adult weight.',
    options: [
      {
        id: 'small',
        label: 'Small',
        note: 'Up to 10 kg',
        story:
          'Choose the Small / Medium station so every bay fits their smaller portions and their reach.',
      },
      {
        id: 'medium',
        label: 'Medium',
        note: '10–20 kg',
        story:
          'The Small / Medium setup gives them a comfortable fit and room to work.',
      },
      {
        id: 'large',
        label: 'Large',
        note: '20 kg and up',
        story:
          'Choose the Large station, with roomier bays and the same six-moment day.',
      },
    ],
  },
];

const bundle = getProductById('starter-bundle');
const colourOptions =
  bundle.variants.find((group) => group.id === 'colour')?.options || [];

function answerFor(questionIndex, answerId) {
  return questions[questionIndex].options.find((option) => option.id === answerId);
}

function buildStory(answers) {
  return [
    answerFor(0, answers.time)?.story,
    answerFor(1, answers.leaving)?.story,
    answerFor(2, answers.enjoys)?.story,
    answerFor(3, answers.size)?.story,
  ]
    .filter(Boolean)
    .join(' ');
}

export default function DogMatchQuiz() {
  const { addItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [view, setView] = useState('questions');
  const [answers, setAnswers] = useState({});
  const [colour, setColour] = useState('oat');
  const [added, setAdded] = useState(false);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  const question = questions[step];
  const selectedAnswer = answers[question.id];
  const selection = useMemo(
    () => ({
      size: answers.size === 'large' ? 'large' : 'small-medium',
      colour,
    }),
    [answers.size, colour]
  );
  const bundlePrice = useMemo(
    () => resolveUnitPrice(bundle, selection),
    [selection]
  );
  const story = useMemo(() => buildStory(answers), [answers]);
  const needsAdvice = answers.leaving === 'panic';

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [isOpen]);

  function openQuiz() {
    setAnswers({});
    setStep(0);
    setView('questions');
    setColour('oat');
    setAdded(false);
    setIsOpen(true);
  }

  function closeQuiz() {
    setIsOpen(false);
  }

  function selectAnswer(optionId) {
    setAnswers((current) => ({ ...current, [question.id]: optionId }));
    setAdded(false);
  }

  function continueQuiz() {
    if (!selectedAnswer) return;
    if (step === questions.length - 1) {
      setView('result');
      return;
    }
    setStep((current) => current + 1);
  }

  function addBundle() {
    if (needsAdvice) return;
    addItem(bundle.id, selection, 1);
    setAdded(true);
  }

  return (
    <>
      <section className="section match-section" id="dog-match">
        <div className="wrap">
          <div className="match-card reveal">
            <div className="match-card-copy">
              <p className="eyebrow light">A little help</p>
              <h2>Not sure what your dog needs?</h2>
              <p className="match-card-lede">
                Tell us a little about their day and we&apos;ll suggest the right
                place to start with Stay.
              </p>
              <button
                type="button"
                className="btn btn-primary match-start-btn"
                onClick={openQuiz}
              >
                Find their match <span aria-hidden="true">→</span>
              </button>
              <div className="match-card-facts" aria-label="Quiz details">
                <span>4 quick questions</span>
                <span>About 1 minute</span>
                <span>Personalised match</span>
              </div>
            </div>

            <div className="match-visual">
              <Image
                src="/images/lifestyle.jpg"
                alt="A dog relaxing at home while its owner is away"
                fill
                sizes="(max-width: 900px) 100vw, 48vw"
              />
              <div className="match-visual-note">
                <span>Not sure?</span>
                <strong>We&apos;ll help you start well.</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isOpen ? (
        <div
          className="match-modal"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeQuiz();
          }}
        >
          <div
            className="match-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="match-dialog-title"
            ref={dialogRef}
          >
            <button
              type="button"
              className="match-close"
              aria-label="Close dog match quiz"
              onClick={closeQuiz}
              ref={closeButtonRef}
            >
              <span aria-hidden="true">×</span>
            </button>

            {view === 'questions' ? (
              <div className="match-question-view" key={step}>
                <div
                  className="match-progress"
                  aria-label={`Question ${step + 1} of ${questions.length}`}
                >
                  {questions.map((item, index) => (
                    <span
                      key={item.id}
                      className={`${index === step ? 'is-active' : ''} ${
                        index < step ? 'is-complete' : ''
                      }`}
                    />
                  ))}
                </div>
                <p className="match-step-count">
                  Question {step + 1} of {questions.length}
                </p>
                <h2 id="match-dialog-title">{question.title}</h2>
                <p className="match-question-helper">{question.helper}</p>

                <div className="match-options">
                  {question.options.map((option) => {
                    const isSelected = selectedAnswer === option.id;
                    return (
                      <button
                        type="button"
                        className={`match-option ${isSelected ? 'is-selected' : ''}`}
                        key={option.id}
                        onClick={() => selectAnswer(option.id)}
                        aria-pressed={isSelected}
                      >
                        <span className="match-option-check" aria-hidden="true">
                          {isSelected ? <Icon name="check" size={15} /> : null}
                        </span>
                        <span>
                          <strong>{option.label}</strong>
                          <small>{option.note}</small>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="match-dialog-actions">
                  {step > 0 ? (
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => setStep((current) => current - 1)}
                    >
                      Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    className="btn btn-primary match-continue-btn"
                    onClick={continueQuiz}
                    disabled={!selectedAnswer}
                  >
                    {step === questions.length - 1 ? 'See my match' : 'Continue'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="match-result-view" aria-live="polite">
                <p className="match-result-kicker">We&apos;d start you with</p>
                <h2 id="match-dialog-title">The Starter Bundle</h2>

                <div className="match-result-card">
                  <div className="match-result-copy">
                    <p className="match-result-story">{story}</p>
                    {needsAdvice ? (
                      <p className="match-advice-note">
                        Stay is enrichment, not a treatment for severe separation
                        anxiety. Please speak with a vet or qualified behaviourist
                        before using it.
                      </p>
                    ) : null}
                    <div className="match-answer-list">
                      {questions.map((item, index) => {
                        const answer = answerFor(index, answers[item.id]);
                        return (
                          <span key={item.id}>
                            <small>{item.title}</small>
                            <strong>{answer?.label}</strong>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="match-recommendation">
                    <div className="match-product-image">
                      <Image
                        src={resolveProductImage(bundle, selection)}
                        alt={`Stay Starter Bundle in ${colour}`}
                        fill
                        sizes="112px"
                      />
                    </div>
                    <div className="match-product-copy">
                      <span className="match-product-category">Recommended set</span>
                      <h3>{bundle.name}</h3>
                      <strong className="match-product-price">
                        {formatINR(bundlePrice)}
                      </strong>
                      <p>
                        Station, lick discs, scent cartridges, puzzle inserts and
                        cold core.
                      </p>
                      <div className="match-colour-picker">
                        <span className="match-colour-label">Colour</span>
                        <div
                          className="match-colour-options"
                          role="group"
                          aria-label="Choose bundle colour"
                        >
                          {colourOptions.map((option) => {
                            const isActive = colour === option.id;
                            return (
                              <button
                                type="button"
                                className={`match-colour-option ${
                                  isActive ? 'is-active' : ''
                                }`}
                                key={option.id}
                                onClick={() => {
                                  setColour(option.id);
                                  setAdded(false);
                                }}
                                aria-pressed={isActive}
                              >
                                <span
                                  className="match-colour-swatch"
                                  style={{ background: option.swatch }}
                                  aria-hidden="true"
                                />
                                <span>{option.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="match-product-action">
                      <button
                        type="button"
                        className="btn btn-primary match-add-btn"
                        onClick={addBundle}
                        disabled={needsAdvice}
                      >
                        {needsAdvice
                          ? 'Speak to a professional first'
                          : added
                            ? 'Added to cart'
                            : 'Add bundle to cart'}
                      </button>
                      {added ? (
                        <Link href="/cart" className="match-cart-link">
                          View cart →
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="match-result-actions">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => {
                      setAnswers({});
                      setStep(0);
                      setView('questions');
                      setColour('oat');
                      setAdded(false);
                    }}
                  >
                    Retake quiz
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={closeQuiz}
                  >
                    Keep browsing
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
