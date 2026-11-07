import React, { useState } from 'react';
import { MapPin, Clock, Sparkles, Navigation, Phone, Check } from 'lucide-react';

interface Boutique {
  id: string;
  city: string;
  neighborhood: string;
  address: string;
  hours: string;
  status: string;
  exclusiveFlavor: string;
  phone: string;
  imageBg: string;
}

const BOUTIQUES: Boutique[] = [
  {
    id: 'tokyo',
    city: 'TOKYO',
    neighborhood: 'Shibuya Cat Street Atelier',
    address: '5-11-2 Jingumae, Shibuya-ku, Tokyo 150-0001',
    hours: '11:00 AM – 10:00 PM Daily',
    status: 'Live Nitrogen Churn Active',
    exclusiveFlavor: 'Black Sesame Charcoal & Yuzu Blossom 3D',
    phone: '+81 3-5485-9201',
    imageBg: 'from-emerald-950/40 to-neutral-900',
  },
  {
    id: 'milan',
    city: 'MILANO',
    neighborhood: 'Brera Design District Laboratory',
    address: 'Via Fiori Chiari 14, 20121 Milano MI, Italy',
    hours: '12:00 PM – 11:30 PM Daily',
    status: 'Fresh Waffle Baking Now',
    exclusiveFlavor: 'Bronte Pistachio & Wild Fig Mostarda 3D',
    phone: '+39 02 8739 4410',
    imageBg: 'from-amber-950/40 to-neutral-900',
  },
  {
    id: 'newyork',
    city: 'NEW YORK',
    neighborhood: 'SoHo Cast-Iron Reserve',
    address: '472 Broome St, New York, NY 10013',
    hours: '11:30 AM – Midnight (Fri-Sat to 1:00 AM)',
    status: 'Tasting Flights In Session',
    exclusiveFlavor: 'Smoked Bourbon Vanilla & Salted Pretzel 3D',
    phone: '+1 (212) 941-8820',
    imageBg: 'from-orange-950/40 to-neutral-900',
  },
  {
    id: 'london',
    city: 'LONDON',
    neighborhood: 'Mayfair Gourmet Gallery',
    address: '28 Mount St, Mayfair, London W1K 2SX',
    hours: '11:00 AM – 10:30 PM Daily',
    status: 'Walk-ins & Flights Welcome',
    exclusiveFlavor: 'Clotted Cream Lavender & Earl Grey Honey 3D',
    phone: '+44 20 7493 5522',
    imageBg: 'from-blue-950/40 to-neutral-900',
  },
];

export const LocationsSection: React.FC = () => {
  const [selectedBoutique, setSelectedBoutique] = useState<string>('tokyo');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const active = BOUTIQUES.find((b) => b.id === selectedBoutique) || BOUTIQUES[0];

  const handleCopy = (boutique: Boutique) => {
    navigator.clipboard?.writeText(`${boutique.city}: ${boutique.address}`);
    setCopiedId(boutique.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <section className="py-24 px-4 sm:px-8 bg-neutral-950 text-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
              <MapPin size={16} />
              <span>GLOBAL CRYO-LABS & ATELIERS</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              VISIT OUR 3D TASTING ROOMS
            </h2>
          </div>
          <p className="text-stone-400 text-xs sm:text-sm max-w-md">
            Experience the -196°C liquid nitrogen fog and sculptured cone bar live at our architectural flagships around the world.
          </p>
        </div>

        {/* City Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {BOUTIQUES.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setSelectedBoutique(b.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedBoutique === b.id
                  ? 'border-amber-400 bg-amber-400 text-stone-900 font-black shadow-xl'
                  : 'border-white/10 bg-white/5 text-stone-300 hover:border-white/20'
              }`}
            >
              <span
                className="text-2xl font-black block uppercase tracking-wide leading-none"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                {b.city}
              </span>
              <span className="text-[11px] opacity-80 mt-1 block line-clamp-1 font-sans">
                {b.neighborhood.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Boutique Showcase Card */}
        <div
          className={`p-8 sm:p-12 rounded-3xl border border-white/15 bg-gradient-to-br ${active.imageBg} shadow-2xl relative overflow-hidden`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{active.status}</span>
              </div>

              <div>
                <h3
                  className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white"
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  {active.city} &bull; {active.neighborhood}
                </h3>
                <p className="text-stone-300 text-sm mt-2 flex items-center gap-2">
                  <MapPin size={16} className="text-amber-400 shrink-0" />
                  <span>{active.address}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
                <div className="space-y-1">
                  <span className="text-stone-400 uppercase tracking-wider block font-semibold">
                    Operating Hours:
                  </span>
                  <div className="flex items-center gap-2 text-white font-medium">
                    <Clock size={14} className="text-amber-400" />
                    <span>{active.hours}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-400 uppercase tracking-wider block font-semibold">
                    Boutique Direct Line:
                  </span>
                  <div className="flex items-center gap-2 text-white font-medium">
                    <Phone size={14} className="text-amber-400" />
                    <span>{active.phone}</span>
                  </div>
                </div>
              </div>

              {/* City Exclusive Flavor */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-3">
                <Sparkles size={18} className="text-amber-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-amber-400 uppercase font-bold tracking-widest block">
                    City Exclusive 3D Scoop:
                  </span>
                  <span className="text-sm font-bold text-white">{active.exclusiveFlavor}</span>
                </div>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => handleCopy(active)}
                className="w-full py-3.5 rounded-2xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 bg-white text-stone-900 hover:bg-stone-200 transition-all cursor-pointer shadow-lg active:scale-95"
              >
                {copiedId === active.id ? (
                  <>
                    <Check size={16} className="stroke-[3]" />
                    <span>Address Copied!</span>
                  </>
                ) : (
                  <>
                    <Navigation size={16} />
                    <span>Copy Address for GPS</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-stone-400">
                Reservations recommended for 8-course Cryo Tasting Flight tables.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
