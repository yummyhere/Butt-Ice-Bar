import React from 'react';
import { ShoppingBag, Sparkles, Compass } from 'lucide-react';

export type PageTab = 'hero' | 'collection' | 'craft' | 'custom-box' | 'locations';

interface NavbarProps {
  currentTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  activeColor: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  cartCount,
  onOpenCart,
  activeColor,
}) => {
  const navItems: { id: PageTab; label: string }[] = [
    { id: 'hero', label: '3D Stage' },
    { id: 'collection', label: 'Flavour Vault' },
    { id: 'craft', label: 'The 3D Craft' },
    { id: 'custom-box', label: 'Tasting Box Lab' },
    { id: 'locations', label: 'Boutiques' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 transition-colors duration-300 backdrop-blur-md border-b border-white/10"
      style={{
        backgroundColor: currentTab === 'hero' ? 'rgba(0,0,0,0.25)' : 'rgba(15,15,18,0.92)',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => onSelectTab('hero')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-stone-900 transition-transform group-hover:scale-105 shadow-md"
            style={{ backgroundColor: activeColor }}
          >
            <Sparkles size={18} />
          </div>
          <div className="flex flex-col">
            <span
              className="text-base sm:text-lg font-black tracking-widest text-white uppercase leading-none"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              TOONHUB
            </span>
            <span className="text-[10px] tracking-widest text-white/60 font-medium uppercase mt-0.5">
              3D GELATO ATELIER
            </span>
          </div>
        </button>

        {/* Desktop Navigation Tabs */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/10">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-stone-900 shadow-md font-bold'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: activeColor,
                      }
                    : {}
                }
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Action: Cart & Jump to Experience */}
        <div className="flex items-center gap-3">
          {currentTab === 'hero' ? (
            <button
              type="button"
              onClick={() => onSelectTab('collection')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 hover:bg-white/25 text-white border border-white/20 transition-all cursor-pointer"
            >
              <Compass size={14} />
              <span>Explore Menu</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onSelectTab('hero')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all cursor-pointer"
            >
              <span>Back to 3D Stage</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenCart}
            aria-label="View tasting flight cart"
            className="relative flex items-center justify-center w-11 h-11 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-transform active:scale-95 cursor-pointer shadow-lg"
          >
            <ShoppingBag size={20} strokeWidth={2} />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center text-stone-900 shadow-md animate-bounce"
                style={{ backgroundColor: activeColor }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Tabs */}
      <div className="flex md:hidden overflow-x-auto scrollbar-none gap-2 mt-3 pt-2 border-t border-white/10">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all ${
                isActive
                  ? 'text-stone-900 shadow-sm'
                  : 'text-white/70 bg-white/5 border border-white/10'
              }`}
              style={
                isActive
                  ? {
                      backgroundColor: activeColor,
                    }
                  : {}
              }
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
