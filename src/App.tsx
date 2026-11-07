/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ArrowRight, ArrowUp, Info, Mail, Sparkles, X, Check, Flame } from 'lucide-react';
import { getRole, getNextIndex, getRoleStyles, CarouselRole } from './carouselLogic.ts';

interface IceCreamProduct {
  id: string;
  name: string;
  shortName: string;
  flavor: string;
  src: string;
  bg: string;
  panel: string;
  calories: string;
  origin: string;
  profile: string[];
  description: string;
}

const IMAGES: IceCreamProduct[] = [
  {
    id: 'mango-passion',
    name: 'MANGO PASSION SWIRL',
    shortName: 'MANGO',
    flavor: 'Alphonso Mango & Passion Coulis',
    src: '/images/ice_cream_1.png',
    bg: '#F4845F',
    panel: '#F79B7F',
    calories: '210 kcal',
    origin: 'Ratnagiri, India',
    profile: ['Sun-Ripened Mango', 'Tangy Passionfruit', 'Crisp Butter Waffle', 'Honey Glaze'],
    description: 'Slow-churned velvet cream infused with sun-ripened Alphonso mangoes and finished with glistening tropical passionfruit honey coulis in a caramelized waffle cone.',
  },
  {
    id: 'pistachio-matcha',
    name: 'PISTACHIO MATCHA CRUNCH',
    shortName: 'MATCHA',
    flavor: 'Ceremonial Matcha & Sicilian Pistachio',
    src: '/images/ice_cream_2.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
    calories: '235 kcal',
    origin: 'Uji, Kyoto & Bronte, Sicily',
    profile: ['Ceremonial Matcha', 'Roasted Pistachio Praline', 'Sweet Cream', 'Toasted Waffle'],
    description: 'First-harvest Uji ceremonial matcha folded into rich sweet cream, topped generously with stone-crushed Sicilian roasted pistachios for an aromatic, earthy crunch.',
  },
  {
    id: 'wild-strawberry',
    name: 'WILD BERRY RASPBERRY',
    shortName: 'BERRY',
    flavor: 'Alpine Wild Berry & Ruby Syrup',
    src: '/images/ice_cream_3.png',
    bg: '#E882B4',
    panel: '#ED9DC4',
    calories: '195 kcal',
    origin: 'Dolomites, Italy',
    profile: ['Alpine Wild Strawberry', 'Ruby Raspberry Coulis', 'Fresh Mint Sprig', 'Golden Cone'],
    description: 'Vibrant wild mountain berries swirled with silky sweet cream and drenched in artisanal raspberry syrup, garnished with fresh freeze-dried berry crumbles.',
  },
  {
    id: 'electric-blueberry',
    name: 'ELECTRIC BLUEBERRY FROST',
    shortName: 'FROST',
    flavor: 'Wild Blueberry & Spun Sugar Crystal',
    src: '/images/ice_cream_4.png',
    bg: '#6EB5FF',
    panel: '#8DC4FF',
    calories: '205 kcal',
    origin: 'Maine, USA',
    profile: ['Deep Blue Indigo Berry', 'Crystalline Sugar Pearls', 'Bourbon Vanilla', 'Caramelized Cone'],
    description: 'An electric swirl of cold-pressed wild indigo berries and pure Bourbon vanilla cream, crowned with iridescent sugar frost crystals that snap with icy coolness.',
  },
  {
    id: 'belgian-chocolate',
    name: 'BELGIAN CHOCO CARAMEL',
    shortName: 'CHOCO',
    flavor: 'Dark Belgian Cocoa & Sea Salt Caramel',
    src: '/images/ice_cream_5.png',
    bg: '#9A3412',
    panel: '#C2410C',
    calories: '260 kcal',
    origin: 'Brussels, Belgium',
    profile: ['72% Belgian Dark Cocoa', 'Salted Fleur de Sel Caramel', 'Dark Chocolate Shavings', 'Malt Cone'],
    description: 'Luxurious double-churned dark Belgian chocolate infused with molten ribbons of salted butter caramel and dusted with artisan dark chocolate flakes.',
  },
  {
    id: 'royal-violet',
    name: 'ROYAL VIOLET BLACKBERRY',
    shortName: 'VIOLET',
    flavor: 'Provence Lavender & Wild Blackberry Coulis',
    src: '/images/ice_cream_6.png',
    bg: '#7C3AED',
    panel: '#A78BFA',
    calories: '190 kcal',
    origin: 'Provence, France',
    profile: ['French Lavender Infusion', 'Wild Mountain Blackberry', 'Edible Violet Leaves', 'Crisp Waffle'],
    description: 'Fragrant culinary French lavender cream swirled with tart wild mountain blackberries, dripping with dark berry coulis and decorated with edible purple petals.',
  },
  {
    id: 'golden-honeycomb',
    name: 'GOLDEN HONEYCOMB BLOSSOM',
    shortName: 'HONEY',
    flavor: 'Wildflower Honey & Crunch Honeycomb Toffee',
    src: '/images/ice_cream_7.png',
    bg: '#D97706',
    panel: '#FBBF24',
    calories: '240 kcal',
    origin: 'Tasmania, Australia',
    profile: ['Wildflower Honey Churn', 'Crispy Golden Honeycomb Toffee', 'Vanilla Bean', 'Butter Cone'],
    description: 'Creamy golden wildflower honey churn folded with crunchy shattered honeycomb toffee clusters that crackle with caramelized sweetness in every bite.',
  },
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalItems = IMAGES.length;

  // Preload all 7 images on mount
  useEffect(() => {
    IMAGES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });
  }, []);

  // Update isMobile on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation handler with 650ms animation lock
  const navigate = useCallback(
    (direction: 'next' | 'prev') => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((prev) => getNextIndex(prev, direction, totalItems));
      setTimeout(() => {
        setIsAnimating(false);
      }, 650);
    },
    [isAnimating, totalItems]
  );

  // Advance the flavour carousel every three seconds while the detail modal is closed.
  useEffect(() => {
    if (isModalOpen) return;
    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => getNextIndex(prev, 'next', totalItems));
    }, 3000);
    return () => window.clearInterval(intervalId);
  }, [isModalOpen, totalItems]);

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX < 0) navigate('next');
      else navigate('prev');
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        navigate('next');
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        navigate('prev');
      } else if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const activeProduct = IMAGES[activeIndex];

  // SVG fractalNoise grain data URI
  const grainSvgUri = useMemo(() => {
    const svgString = `<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
      <filter id='noiseFilter'>
        <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/>
        <feColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.08 0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(%23noiseFilter)'/>
    </svg>`;
    return `url("data:image/svg+xml;utf8,${encodeURIComponent(svgString)}")`;
  }, []);

  return (
    <>
    <div
      id="top"
      style={{
        backgroundColor: activeProduct.bg,
        transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
        fontFamily: "'Inter', sans-serif",
      }}
      className="relative w-full h-screen overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 50,
          backgroundImage: grainSvgUri,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
          opacity: 0.4,
        }}
        aria-hidden="true"
      />

      {/* 2. Giant ghost text: Active flavour name */}
      <div
        className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{
          zIndex: 2,
          top: '18%',
        }}
        aria-hidden="true"
      >
        <span
          key={activeProduct.shortName}
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(90px, 28vw, 380px)',
            fontWeight: 900,
            color: 'white',
            opacity: 1,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {activeProduct.shortName}
        </span>
      </div>

      {/* 3. Top-left brand label "TOONHUB" */}
      <header
        className="absolute top-6 left-4 sm:left-8 flex items-center gap-3"
        style={{ zIndex: 60 }}
      >
        <div className="flex flex-col">
          <span
            className="text-xs sm:text-sm font-bold uppercase text-white tracking-widest"
            style={{
              opacity: 0.95,
              letterSpacing: '0.18em',
            }}
          >
            Butt Ice Bar
          </span>
        </div>
      </header>

      {/* Top-right flavor pill */}
      <div
        className="hidden sm:flex absolute top-6 right-4 sm:right-8 items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-sm"
        style={{ zIndex: 60 }}
      >
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-[11px] font-medium tracking-wider text-white uppercase">
          {activeProduct.flavor}
        </span>
      </div>

      {/* 4. Carousel */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
        {IMAGES.map((item, index) => {
          const role: CarouselRole = getRole(index, activeIndex, totalItems);
          const { style, zIndex } = getRoleStyles(role, isMobile);

          return (
            <div
              key={item.id}
              role="group"
              aria-label={`Ice cream slide ${index + 1}: ${item.name}`}
              className="pointer-events-auto cursor-pointer"
              onClick={() => {
                if (role === 'right') navigate('next');
                else if (role === 'left') navigate('prev');
                else if (role === 'center') setIsModalOpen(true);
              }}
              style={{
                position: 'absolute',
                zIndex,
                willChange: 'transform, filter, opacity, left, height, bottom',
                transition:
                  'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), height 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1)',
                ...style,
              }}
            >
              <img
                src={item.src}
                alt={item.name}
                draggable={false}
                className="w-full h-full object-contain object-bottom drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)]"
              />
            </div>
          );
        })}
      </div>



      {/* 6. Bottom-right link "DISCOVER IT" */}
      <div
        className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10"
        style={{ zIndex: 60 }}
      >
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          aria-label={`Discover ${activeProduct.name}`}
          className="flex items-center gap-2 sm:gap-4 text-white uppercase no-underline cursor-pointer transition-opacity duration-200 hover:opacity-100 focus:outline-none group"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(20px, 4vw, 56px)',
            fontWeight: 400,
            opacity: 0.95,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          <span>DISCOVER IT</span>
          <ArrowRight
            className="w-5 h-5 sm:w-8 sm:h-8 transition-transform duration-200 group-hover:translate-x-1.5"
            strokeWidth={2.25}
          />
        </button>
      </div>

      {/* Flavor Detail Modal (Opens on "DISCOVER IT" or clicking center ice cream) */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-flavor-title"
          className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-neutral-900/95 border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: `0 20px 50px -10px ${activeProduct.bg}66`,
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Flavor Preview Badge */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-yellow-300 mb-2">
              <Sparkles size={14} />
              <span>3D Gourmet Reserve Collection &bull; 0{activeIndex + 1}/0{totalItems}</span>
            </div>

            <h2
              id="modal-flavor-title"
              className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              {activeProduct.name}
            </h2>

            <p className="text-sm text-white/80 font-medium mb-4">
              {activeProduct.flavor} &bull; {activeProduct.calories}
            </p>

            <div className="flex items-center gap-4 my-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <img
                src={activeProduct.src}
                alt={activeProduct.name}
                className="w-20 h-28 object-contain drop-shadow-md"
              />
              <div className="text-xs text-white/80 space-y-1">
                <p className="font-semibold text-white">Origin & Terroir:</p>
                <p className="text-amber-300 font-medium">{activeProduct.origin}</p>
                <p className="text-[11px] text-white/60 leading-relaxed mt-1">
                  {activeProduct.description}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs font-semibold tracking-wider uppercase text-white/60 mb-2">
                Flavor Notes & Texture
              </p>
              <div className="flex flex-wrap gap-2">
                {activeProduct.profile.map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/15 text-white"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Order Action Button */}
            <button
              type="button"
              onClick={() => {
                setOrderPlaced(true);
                setTimeout(() => setOrderPlaced(false), 2500);
              }}
              className="w-full py-4 rounded-2xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-transform duration-150 active:scale-98 cursor-pointer shadow-lg"
              style={{
                backgroundColor: activeProduct.panel,
                color: '#111827',
              }}
            >
              {orderPlaced ? (
                <>
                  <Check size={18} className="stroke-[3]" />
                  <span>Order Reserved! Preparing Fresh Churn</span>
                </>
              ) : (
                <>
                  <Flame size={18} />
                  <span>Order This 3D Figurine Now</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
    <nav
      aria-label="Quick links"
      className="fixed right-4 top-1/2 z-[70] flex -translate-y-1/2 flex-col gap-3"
    >
      <a
        href="#about"
        aria-label="About Butt Ice Bar"
        title="About"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-[#5b2b20]/75 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-[#5b2b20]"
      >
        <Info size={18} />
      </a>
      <a
        href="#contact"
        aria-label="Contact Butt Ice Bar"
        title="Contact"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-[#5b2b20]/75 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-[#5b2b20]"
      >
        <Mail size={18} />
      </a>
      <a
        href="#top"
        aria-label="Back to top"
        title="Back to top"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-[#5b2b20]/75 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-[#5b2b20]"
      >
        <ArrowUp size={18} />
      </a>
    </nav>

    <main className="select-text bg-[#fff4e8] font-sans text-[#45251e]">
      <section id="about" className="relative overflow-hidden px-6 py-24 sm:px-10 sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 top-4 font-black uppercase leading-none"
          style={{
            color: activeProduct.bg,
            opacity: 0.1,
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(140px, 30vw, 390px)',
          }}
        >
          ABOUT
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div>
            <p
              className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: activeProduct.bg }}
            >
              A little joy, made fresh
            </p>
            <h2
              className="max-w-xl text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-7xl"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              MADE WITH
              <br />
              A LOT OF
              <br />
              <span style={{ color: activeProduct.bg }}>SCOOP.</span>
            </h2>
            <p className="mt-7 max-w-lg text-base leading-7 text-[#68473d] sm:text-lg">
              At Butt Ice Bar, every scoop starts with beautiful ingredients and a playful
              imagination. We churn in small batches, make our sauces in-house, and serve each
              flavour with the kind of care that turns a quick treat into your favourite moment.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-3 border-b-2 pb-2 text-sm font-bold uppercase tracking-widest text-[#45251e] transition hover:gap-5"
              style={{ borderColor: activeProduct.bg }}
            >
              Come say hello <ArrowRight size={17} />
            </a>
          </div>
          <div
            className="relative mx-auto flex min-h-[340px] w-full max-w-md items-center justify-center overflow-hidden rounded-[2rem] px-8 py-10 shadow-[0_25px_70px_rgba(114,52,34,0.18)] sm:min-h-[440px]"
            style={{ backgroundColor: activeProduct.bg }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 20%, white 0 1px, transparent 1.5px)',
                backgroundSize: '12px 12px',
              }}
            />
            <span
              className="absolute left-7 top-7 text-xs font-bold uppercase tracking-[0.25em] text-white/85"
            >
              REAL INGREDIENTS
            </span>
            <img
              src={activeProduct.src}
              alt={`${activeProduct.name} ice cream cone`}
              className="relative z-10 h-[300px] w-full object-contain drop-shadow-[0_22px_20px_rgba(83,37,23,0.3)] sm:h-[390px]"
            />
            <span
              className="absolute bottom-7 right-7 text-xs font-bold uppercase tracking-[0.25em] text-white/85"
            >
              BIG SCOOP ENERGY
            </span>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative overflow-hidden bg-[#29362f] px-6 py-20 text-[#fff4e8] sm:px-10 sm:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -top-20 select-none font-black uppercase leading-none text-white/[0.035]"
          style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(180px, 34vw, 440px)' }}
        >
          SCOOP
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p
              className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: activeProduct.panel }}
            >
              Questions, cravings, good ideas?
            </p>
            <h2
              className="max-w-2xl text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-7xl"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              LET’S
              <br />
              TALK SCOOPS.
            </h2>
          </div>
          <div className="border-t border-white/20 pt-6 md:border-t-0 md:border-l md:pl-10">
            <p className="max-w-md text-base leading-7 text-white/80">
              Have a flavour request, event idea, or just want to tell us about your favourite
              scoop? We’d love to hear from you.
            </p>
            <a
              href="mailto:hello@butticebar.com"
              className="mt-7 inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-bold uppercase tracking-wider text-[#30231d] transition hover:brightness-110"
              style={{ backgroundColor: activeProduct.panel }}
            >
              <Mail size={17} />
              hello@butticebar.com
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#45251e] px-6 py-8 text-white sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="#top"
            className="text-sm font-bold uppercase tracking-[0.2em] transition hover:text-[#f9a184]"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            Butt Ice Bar
          </a>
          <p className="text-xs tracking-wide text-white/65">
            Small batches. Big smiles. © {new Date().getFullYear()} Butt Ice Bar.
          </p>
          <a
            href="mailto:hello@butticebar.com"
            className="text-xs font-bold uppercase tracking-widest text-white/85 transition hover:text-[#f9a184]"
          >
            Get in touch
          </a>
        </div>
      </footer>
    </main>
    </>
  );
}
