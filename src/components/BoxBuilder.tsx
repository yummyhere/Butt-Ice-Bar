import React, { useState } from 'react';
import { Package, Plus, Trash2, Check, Sparkles, Flame, ShieldCheck, ShoppingBag } from 'lucide-react';
import {
  ScoopSelection,
  ConeOption,
  CONE_OPTIONS,
  calculateBoxPrice,
  calculateTotalCalories,
  isBoxComplete,
} from '../boxBuilderLogic.ts';
import { SIGNATURE_FLAVORS, FlavorItem } from './FlavourVault.tsx';

interface BoxBuilderProps {
  onAddFlightToCart: (flight: {
    id: string;
    title: string;
    size: 4 | 6;
    scoops: ScoopSelection[];
    cone: ConeOption;
    giftBox: boolean;
    price: number;
    calories: number;
  }) => void;
}

export const BoxBuilder: React.FC<BoxBuilderProps> = ({ onAddFlightToCart }) => {
  const [boxSize, setBoxSize] = useState<4 | 6>(4);
  const [selectedScoops, setSelectedScoops] = useState<ScoopSelection[]>([
    {
      id: 'mango-passion',
      name: 'MANGO PASSION SWIRL',
      flavor: 'Alphonso Mango & Honey Passion',
      price: 7.5,
      calories: 210,
      color: '#F4845F',
      image: '/images/ice_cream_1.png',
    },
    {
      id: 'pistachio-matcha',
      name: 'PISTACHIO MATCHA CRUNCH',
      flavor: 'Ceremonial Matcha & Roasted Pistachio',
      price: 8.0,
      calories: 235,
      color: '#6BBF7A',
      image: '/images/ice_cream_2.png',
    },
  ]);
  const [selectedCone, setSelectedCone] = useState<ConeOption>(CONE_OPTIONS[0]);
  const [giftBox, setGiftBox] = useState<boolean>(true);
  const [flightAdded, setFlightAdded] = useState<boolean>(false);

  const availableScoops: ScoopSelection[] = SIGNATURE_FLAVORS.map((f) => ({
    id: f.id,
    name: f.name,
    flavor: f.flavorProfile,
    price: f.price,
    calories: f.calories,
    color: f.bg,
    image: f.src,
  }));

  const handleAddScoop = (scoop: ScoopSelection) => {
    if (selectedScoops.length < boxSize) {
      setSelectedScoops([...selectedScoops, scoop]);
    }
  };

  const handleRemoveScoop = (index: number) => {
    setSelectedScoops(selectedScoops.filter((_, i) => i !== index));
  };

  const boxConfig = {
    boxSize,
    selectedScoops,
    coneType: selectedCone,
    giftPackaging: giftBox,
  };

  const totalPrice = calculateBoxPrice(boxConfig);
  const totalCalories = calculateTotalCalories(selectedScoops);
  const complete = isBoxComplete(boxConfig);

  const handleCompleteOrder = () => {
    if (!complete) return;
    onAddFlightToCart({
      id: `flight-${Date.now()}`,
      title: `${boxSize}-Pack 3D Tasting Flight`,
      size: boxSize,
      scoops: selectedScoops,
      cone: selectedCone,
      giftBox,
      price: totalPrice,
      calories: totalCalories,
    });
    setFlightAdded(true);
    setTimeout(() => setFlightAdded(false), 2500);
  };

  return (
    <section className="py-24 px-4 sm:px-8 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Package size={14} />
            <span>CUSTOM TASTING FLIGHT LAB</span>
          </div>
          <h2
            className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            BUILD YOUR 3D CRYO FLIGHT BOX
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-3">
            Select your favorite signature 3D scoops, waffle cone variety, and custom cryo insulation. Shipped in dry ice at -40°C.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Configuration Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Flight Size Selector */}
            <div className="p-6 rounded-3xl bg-neutral-900 border border-white/10">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-3">
                Step 01 // Select Flight Size
              </span>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setBoxSize(4);
                    if (selectedScoops.length > 4) {
                      setSelectedScoops(selectedScoops.slice(0, 4));
                    }
                  }}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                    boxSize === 4
                      ? 'bg-amber-400 text-stone-900 border-amber-400 font-bold shadow-lg'
                      : 'bg-white/5 border-white/10 text-white hover:border-white/30'
                  }`}
                >
                  <span className="text-xl font-black block" style={{ fontFamily: "'Anton', sans-serif" }}>
                    4-SCOOP TASTING FLIGHT
                  </span>
                  <span className="text-xs opacity-80 mt-1 block">
                    Ideal for couple tasting &bull; $28.00 base
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setBoxSize(6)}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                    boxSize === 6
                      ? 'bg-amber-400 text-stone-900 border-amber-400 font-bold shadow-lg'
                      : 'bg-white/5 border-white/10 text-white hover:border-white/30'
                  }`}
                >
                  <span className="text-xl font-black block" style={{ fontFamily: "'Anton', sans-serif" }}>
                    6-SCOOP RESERVE FLIGHT
                  </span>
                  <span className="text-xs opacity-80 mt-1 block">
                    Party & connoisseur flight &bull; $38.00 base
                  </span>
                </button>
              </div>
            </div>

            {/* Step 2: Choose Scoops */}
            <div className="p-6 rounded-3xl bg-neutral-900 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Step 02 // Pick 3D Scoops ({selectedScoops.length} of {boxSize} selected)
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {boxSize - selectedScoops.length} slots left
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableScoops.map((scoop) => {
                  const count = selectedScoops.filter((s) => s.id === scoop.id).length;
                  const isFull = selectedScoops.length >= boxSize;

                  return (
                    <div
                      key={scoop.id}
                      className="p-3 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-between gap-3 hover:border-white/20 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={scoop.image}
                          alt={scoop.name}
                          className="w-12 h-14 object-contain drop-shadow"
                        />
                        <div>
                          <p className="text-xs font-bold text-white uppercase leading-tight line-clamp-1">
                            {scoop.name}
                          </p>
                          <p className="text-[10px] text-stone-400">{scoop.calories} kcal</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {count > 0 && (
                          <span
                            className="w-5 h-5 rounded-full text-stone-900 text-xs font-bold flex items-center justify-center shadow-xs"
                            style={{ backgroundColor: scoop.color }}
                          >
                            {count}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleAddScoop(scoop)}
                          disabled={isFull}
                          aria-label={`Add ${scoop.name} to box`}
                          className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all cursor-pointer"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Cone Selection */}
            <div className="p-6 rounded-3xl bg-neutral-900 border border-white/10">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-3">
                Step 03 // Select Hand-Rolled Waffle Cones
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CONE_OPTIONS.map((cone) => (
                  <button
                    key={cone.id}
                    type="button"
                    onClick={() => setSelectedCone(cone)}
                    className={`p-3.5 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                      selectedCone.id === cone.id
                        ? 'border-amber-400 bg-amber-400/10 text-white font-semibold'
                        : 'border-white/10 bg-white/5 text-stone-300 hover:border-white/20'
                    }`}
                  >
                    <span className="text-xs">{cone.name}</span>
                    <span className="text-xs font-mono text-amber-400">
                      {cone.price === 0 ? 'Included' : `+$${cone.price}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Cryo Packaging */}
            <div className="p-6 rounded-3xl bg-neutral-900 border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase">
                    Sub-Zero Cryo Dry-Ice Gift Box
                  </p>
                  <p className="text-[11px] text-stone-400">
                    Insulated custom aluminum casing guaranteed chilled for 48 hours (+ $4.00)
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={giftBox}
                onChange={(e) => setGiftBox(e.target.checked)}
                className="w-5 h-5 accent-amber-400 cursor-pointer shrink-0"
              />
            </div>
          </div>

          {/* Right Column: Live Flight Preview & Checkout (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-amber-400/30 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-amber-400" />
                  <h3
                    className="text-2xl font-black uppercase text-white tracking-wide"
                    style={{ fontFamily: "'Anton', sans-serif" }}
                  >
                    FLIGHT TRAY SUMMARY
                  </h3>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/10 text-stone-300">
                  {selectedScoops.length}/{boxSize} SLOTS
                </span>
              </div>

              {/* Visual Box Slots Grid */}
              <div className="grid grid-cols-2 gap-3 min-h-[160px]">
                {Array.from({ length: boxSize }).map((_, slotIndex) => {
                  const scoop = selectedScoops[slotIndex];
                  return (
                    <div
                      key={slotIndex}
                      className={`relative rounded-2xl p-3 border flex flex-col items-center justify-center transition-all min-h-[110px] ${
                        scoop
                          ? 'bg-neutral-800/90 border-white/20'
                          : 'bg-white/5 border-dashed border-white/15 text-stone-500'
                      }`}
                    >
                      {scoop ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleRemoveScoop(slotIndex)}
                            aria-label={`Remove slot ${slotIndex + 1}`}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 hover:bg-red-500/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <Trash2 size={12} />
                          </button>
                          <img
                            src={scoop.image}
                            alt={scoop.name}
                            className="w-12 h-14 object-contain drop-shadow"
                          />
                          <span className="text-[10px] font-bold text-white uppercase text-center mt-1 line-clamp-1">
                            {scoop.name}
                          </span>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <Plus size={18} className="opacity-40" />
                          <span className="text-[10px] uppercase font-bold tracking-wider">
                            Empty Slot {slotIndex + 1}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 py-4 border-t border-white/10 text-xs">
                <div className="flex justify-between text-stone-300">
                  <span>Base Flight ({boxSize} Scoops)</span>
                  <span className="font-mono">${boxSize === 4 ? '28.00' : '38.00'}</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Waffle Cone ({selectedCone.name})</span>
                  <span className="font-mono">
                    {selectedCone.price === 0 ? 'Free' : `+$${selectedCone.price}.00`}
                  </span>
                </div>
                {giftBox && (
                  <div className="flex justify-between text-stone-300">
                    <span>Cryo Dry-Ice Insulation Box</span>
                    <span className="font-mono">+$4.00</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-300">
                  <span>Total Calories (approx.)</span>
                  <span className="font-mono text-amber-400 font-bold">{totalCalories} kcal</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                  <span>Total Flight Price</span>
                  <span className="text-xl text-amber-400 font-mono">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleCompleteOrder}
                disabled={!complete}
                className="w-full py-4 rounded-2xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: flightAdded ? '#10B981' : complete ? '#F59E0B' : '#374151',
                  color: complete ? '#111827' : '#9CA3AF',
                }}
              >
                {flightAdded ? (
                  <>
                    <Check size={18} className="stroke-[3]" />
                    <span>Flight Box Added to Cart!</span>
                  </>
                ) : complete ? (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add Complete Flight to Cart &bull; ${totalPrice.toFixed(2)}</span>
                  </>
                ) : (
                  <span>Select {boxSize - selectedScoops.length} more scoop(s) to finish</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
