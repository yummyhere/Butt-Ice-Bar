import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ShieldCheck, ArrowRight, Check, Sparkles } from 'lucide-react';

export interface CartItem {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  quantity: number;
  image?: string;
  details?: string[];
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Tomorrow');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 || items.length === 0 ? 0 : 6.0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutComplete(false);
      onClose();
    }, 2800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-70 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-neutral-900 border-l border-white/10 flex flex-col shadow-2xl text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-amber-400" />
            <h2
              id="cart-drawer-title"
              className="text-xl font-black uppercase text-white tracking-wide"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              TASTING FLIGHT CART
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-500">
                <ShoppingBag size={28} />
              </div>
              <p className="text-sm font-semibold uppercase text-stone-400">
                Your tasting flight is empty
              </p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our 3D Flavour Vault or construct a custom 4-scoop cryo box.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-neutral-800/80 border border-white/10 flex gap-4 items-center justify-between"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-16 object-contain drop-shadow"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white uppercase leading-tight truncate">
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <p className="text-[11px] text-stone-400 truncate">{item.subtitle}</p>
                  )}
                  {item.details && item.details.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.details.map((d, i) => (
                        <span
                          key={i}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-stone-300 font-mono"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="text-xs font-mono text-amber-400 font-bold block mt-1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs cursor-pointer font-bold"
                  >
                    -
                  </button>
                  <span className="text-xs font-mono w-4 text-center">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs cursor-pointer font-bold"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label={`Remove ${item.title}`}
                    className="w-7 h-7 rounded-lg text-stone-400 hover:text-red-400 flex items-center justify-center cursor-pointer ml-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}

          {items.length > 0 && (
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 flex items-center gap-2">
              <ShieldCheck size={18} className="shrink-0" />
              <span>Ships in -40°C dry ice cryo containers. Guaranteed frozen for 48 hours.</span>
            </div>
          )}
        </div>

        {/* Footer with Summary and Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-neutral-950 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-400">
                <span>Subtotal</span>
                <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Cryo Courier Shipping</span>
                <span className="font-mono text-white">
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                <span>Estimated Total</span>
                <span className="text-lg text-amber-400 font-mono">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={checkoutComplete}
              className="w-full py-4 rounded-2xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 bg-amber-400 text-stone-900 hover:bg-amber-300 transition-all cursor-pointer shadow-xl disabled:opacity-75"
            >
              {checkoutComplete ? (
                <>
                  <Check size={18} className="stroke-[3]" />
                  <span>Cryo Order Dispatched! Check Email</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Dispatch Cryo Tasting Box &bull; ${total.toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
