import React, { useState } from 'react';
import { Sparkles, Plus, Check, ArrowRight, Eye, Droplet, Star } from 'lucide-react';

export interface FlavorItem {
  id: string;
  name: string;
  tagline: string;
  flavorProfile: string;
  src: string;
  bg: string;
  panel: string;
  price: number;
  calories: number;
  origin: string;
  tags: string[];
  metrics: {
    sweetness: number; // 1-5
    creaminess: number; // 1-5
    intensity: number; // 1-5
    crunch: number; // 1-5
  };
  notes: string[];
  pairing: string;
}

export const SIGNATURE_FLAVORS: FlavorItem[] = [
  {
    id: 'mango-passion',
    name: 'MANGO PASSION SWIRL',
    tagline: 'Sun-Drenched Alphonso Terroir',
    flavorProfile: 'Alphonso Mango & Honey Passion Coulis',
    src: '/images/ice_cream_1.png',
    bg: '#F4845F',
    panel: '#F79B7F',
    price: 7.5,
    calories: 210,
    origin: 'Ratnagiri Estate, India',
    tags: ['Single-Origin', 'Glaze Swirl', 'Tropical'],
    metrics: { sweetness: 4, creaminess: 5, intensity: 5, crunch: 3 },
    notes: ['Ripe Alphonso Pulp', 'Wild Passion Nectar', 'Caramelized Waffle', 'Wild Honey'],
    pairing: 'Sparkling Prosecco or Cold-Brew Jasmine Tea',
  },
  {
    id: 'pistachio-matcha',
    name: 'PISTACHIO MATCHA CRUNCH',
    tagline: 'Kyoto Ceremonial x Bronte Terroir',
    flavorProfile: 'Stone-Ground Uji Matcha & Sicilian Pistachios',
    src: '/images/ice_cream_2.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
    price: 8.0,
    calories: 235,
    origin: 'Uji, Kyoto & Bronte, Sicily',
    tags: ['Aromatic', 'Praline Crunch', 'Ceremonial'],
    metrics: { sweetness: 2, creaminess: 5, intensity: 4, crunch: 5 },
    notes: ['Ceremonial Matcha', 'Roasted Green Pistachio', 'Sweet Cream', 'Toasted Malt'],
    pairing: 'Hot Genmaicha or Double Espresso',
  },
  {
    id: 'wild-strawberry',
    name: 'WILD BERRY RASPBERRY',
    tagline: 'Sub-Alpine Mountain Harvest',
    flavorProfile: 'Dolomite Wild Berries & Ruby Nectar',
    src: '/images/ice_cream_3.png',
    bg: '#E882B4',
    panel: '#ED9DC4',
    price: 7.5,
    calories: 195,
    origin: 'Dolomites Alpine Valleys, Italy',
    tags: ['Vibrant Tart', 'Freeze-Dried Bits', 'Ruby Syrup'],
    metrics: { sweetness: 3, creaminess: 4, intensity: 5, crunch: 2 },
    notes: ['Wild Alpine Berry', 'Tart Ruby Coulis', 'Spearmint Leaf', 'Golden Butter Cone'],
    pairing: 'Dry Rosé Champagne or Elderflower Tonic',
  },
  {
    id: 'electric-blueberry',
    name: 'ELECTRIC BLUEBERRY FROST',
    tagline: 'Atlantic Coastline Harvest',
    flavorProfile: 'Wild Indigo Blueberry & Spun Sugar Crystal',
    src: '/images/ice_cream_4.png',
    bg: '#6EB5FF',
    panel: '#8DC4FF',
    price: 7.5,
    calories: 205,
    origin: 'Bar Harbor Barrens, Maine',
    tags: ['Cryo-Spun', 'Sugar Crystals', 'Indigo Swirl'],
    metrics: { sweetness: 4, creaminess: 5, intensity: 4, crunch: 4 },
    notes: ['Indigo Blueberry Churn', 'Crystalline Sugar Pearls', 'Tahitian Vanilla', 'Sweet Malt'],
    pairing: 'Earl Grey Iced Latte or Mineral Sparkling Water',
  },
];

interface FlavourVaultProps {
  onSelectFlavor: (flavor: FlavorItem) => void;
  onAddToCart: (flavor: FlavorItem) => void;
  onJumpToBoxBuilder: () => void;
}

export const FlavourVault: React.FC<FlavourVaultProps> = ({
  onSelectFlavor,
  onAddToCart,
  onJumpToBoxBuilder,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'fruity' | 'nutty' | 'sweet'>('all');
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredFlavors = SIGNATURE_FLAVORS.filter((item) => {
    if (activeFilter === 'fruity') return item.id === 'mango-passion' || item.id === 'wild-strawberry' || item.id === 'electric-blueberry';
    if (activeFilter === 'nutty') return item.id === 'pistachio-matcha';
    if (activeFilter === 'sweet') return item.metrics.sweetness >= 4;
    return true;
  });

  const handleAdd = (flavor: FlavorItem) => {
    onAddToCart(flavor);
    setAddedId(flavor.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section className="py-24 px-4 sm:px-8 bg-neutral-950 text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-amber-400 mb-3">
              <Sparkles size={16} />
              <span>THE 3D FLAVOUR VAULT</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              CRAFTED BY NATURE. SCULPTED IN 3D.
            </h2>
            <p className="text-stone-400 text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
              Every cone is a single-estate architectural sculpture. Hand-folded with raw cream, flash-churned under liquid nitrogen, and poured into bespoke waffle cones.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All 3D Creations' },
              { id: 'fruity', label: 'Orchard & Berry' },
              { id: 'nutty', label: 'Earthy & Praline' },
              { id: 'sweet', label: 'Sweet Tooth' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-white text-stone-900 shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column Grid of 3D Sculptures */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFlavors.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-neutral-900/60 backdrop-blur-md flex flex-col transition-all duration-300 hover:border-white/30 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                boxShadow: `0 10px 30px -15px ${item.bg}44`,
              }}
            >
              {/* Top Accent Bar */}
              <div
                className="h-2 w-full transition-all group-hover:h-3"
                style={{ backgroundColor: item.bg }}
              />

              {/* 3D Figurine Showcase */}
              <div
                className="relative h-72 sm:h-80 w-full flex items-center justify-center p-6 overflow-hidden transition-colors"
                style={{
                  background: `radial-gradient(circle at center, ${item.bg}22 0%, transparent 70%)`,
                }}
              >
                {/* Floating Tags */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-20">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-black/60 backdrop-blur-md text-white/90 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Calorie & Terroir badge */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-white/10 text-white/90 backdrop-blur-md border border-white/15">
                  {item.calories} kcal
                </div>

                {/* 3D Ice Cream Figurine Image */}
                <img
                  src={item.src}
                  alt={item.name}
                  className="h-full w-auto object-contain object-bottom drop-shadow-[0_20px_25px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:scale-110"
                />

                {/* Quick Inspect Button on Hover */}
                <button
                  type="button"
                  onClick={() => onSelectFlavor(item)}
                  aria-label={`Inspect ${item.name} notes`}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-30"
                >
                  <span className="px-4 py-2 rounded-full bg-white text-stone-900 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye size={14} />
                    <span>View Terroir Notes</span>
                  </span>
                </button>
              </div>

              {/* Flavor Details */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-neutral-900/90">
                <div>
                  <p
                    className="text-xs font-bold tracking-wider uppercase mb-1"
                    style={{ color: item.panel }}
                  >
                    {item.origin}
                  </p>

                  <h3
                    className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-tight mb-2"
                    style={{ fontFamily: "'Anton', sans-serif" }}
                  >
                    {item.name}
                  </h3>

                  <p className="text-xs text-stone-400 leading-relaxed mb-4 line-clamp-2">
                    {item.flavorProfile}
                  </p>

                  {/* Flavor Metrics */}
                  <div className="space-y-1.5 py-3 border-y border-white/10 mb-4 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Creaminess</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((dot) => (
                          <div
                            key={dot}
                            className={`w-1.5 h-1.5 rounded-full ${
                              dot <= item.metrics.creaminess ? 'bg-amber-400' : 'bg-white/10'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Sweetness</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((dot) => (
                          <div
                            key={dot}
                            className={`w-1.5 h-1.5 rounded-full ${
                              dot <= item.metrics.sweetness ? 'bg-amber-400' : 'bg-white/10'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price and Add Button */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest block">
                      Single Cone
                    </span>
                    <span className="text-lg font-black text-white">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAdd(item)}
                    className="px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md"
                    style={{
                      backgroundColor: addedId === item.id ? '#10B981' : item.panel,
                      color: '#111827',
                    }}
                  >
                    {addedId === item.id ? (
                      <>
                        <Check size={14} className="stroke-[3]" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus size={14} strokeWidth={2.5} />
                        <span>Add Scoop</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tasting Flight CTA Banner */}
        <div className="mt-16 p-8 rounded-3xl border border-white/15 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
              <Star size={32} />
            </div>
            <div>
              <h4
                className="text-2xl font-black uppercase text-white tracking-wide"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                CURATE YOUR OWN 4-FLAVOR FLIGHT BOX
              </h4>
              <p className="text-sm text-stone-400 mt-1 max-w-xl">
                Pick your 4 favourite 3D cones, custom waffle crunch types, and receive them in sub-zero cryo dry-ice packaging directly to your doorstep.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onJumpToBoxBuilder}
            className="px-6 py-3.5 rounded-full bg-white text-stone-900 font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-stone-200 transition-all active:scale-95 cursor-pointer shadow-xl shrink-0"
          >
            <span>Launch Box Builder</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
