export type CarouselRole = 'center' | 'left' | 'right' | 'back-left' | 'back-right' | 'back';

export interface IceCreamItem {
  id: string;
  name: string;
  flavor: string;
  src: string;
  bg: string;
  panel: string;
  calories: string;
  origin: string;
  profile: string[];
  description: string;
}

/**
 * Calculates the visual role of an item given the active carousel index.
 * Works seamlessly for any number of items (e.g. 4 or 7).
 */
export function getRole(itemIndex: number, activeIndex: number, total = 7): CarouselRole {
  const diff = (itemIndex - activeIndex + total) % total;
  if (diff === 0) return 'center';
  if (diff === 1) return 'right';
  if (diff === total - 1) return 'left';
  if (diff === 2) return 'back-right';
  if (diff === total - 2) return 'back-left';
  return 'back';
}

/**
 * Calculates the next or previous index in a circular list.
 */
export function getNextIndex(
  currentIndex: number,
  direction: 'next' | 'prev',
  total = 7
): number {
  if (direction === 'next') {
    return (currentIndex + 1) % total;
  }
  return (currentIndex + total - 1) % total;
}

/**
 * Generates exact responsive role styles:
 * - center: active foreground, scale 1.25 (mobile) / 1.68 (desktop), no blur, opacity 1, zIndex 20
 * - left: left flank, scale 1, blur 2px, opacity 0.85, zIndex 10, left 20%/30%
 * - right: right flank, scale 1, blur 2px, opacity 0.85, zIndex 10, left 80%/70%
 * - back-left / back-right / back: faded background, scale 0.7-0.8, opacity 0 for smooth entrance/exit
 */
export function getRoleStyles(
  role: CarouselRole,
  isMobile: boolean
): {
  style: React.CSSProperties;
  zIndex: number;
} {
  switch (role) {
    case 'center':
      return {
        zIndex: 20,
        style: {
          transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
          filter: 'none',
          opacity: 1,
          left: '50%',
          height: isMobile ? '60%' : '92%',
          bottom: isMobile ? '22%' : '0',
          aspectRatio: '0.6 / 1',
          pointerEvents: 'auto',
        },
      };

    case 'left':
      return {
        zIndex: 10,
        style: {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(2px)',
          opacity: 0.85,
          left: isMobile ? '20%' : '30%',
          height: isMobile ? '16%' : '28%',
          bottom: isMobile ? '32%' : '12%',
          aspectRatio: '0.6 / 1',
          pointerEvents: 'auto',
        },
      };

    case 'right':
      return {
        zIndex: 10,
        style: {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(2px)',
          opacity: 0.85,
          left: isMobile ? '80%' : '70%',
          height: isMobile ? '16%' : '28%',
          bottom: isMobile ? '32%' : '12%',
          aspectRatio: '0.6 / 1',
          pointerEvents: 'auto',
        },
      };

    case 'back-left':
      return {
        zIndex: 4,
        style: {
          transform: 'translateX(-50%) scale(0.75)',
          filter: 'blur(4px)',
          opacity: 0,
          left: isMobile ? '5%' : '15%',
          height: isMobile ? '13%' : '22%',
          bottom: isMobile ? '32%' : '12%',
          aspectRatio: '0.6 / 1',
          pointerEvents: 'none',
        },
      };

    case 'back-right':
      return {
        zIndex: 4,
        style: {
          transform: 'translateX(-50%) scale(0.75)',
          filter: 'blur(4px)',
          opacity: 0,
          left: isMobile ? '95%' : '85%',
          height: isMobile ? '13%' : '22%',
          bottom: isMobile ? '32%' : '12%',
          aspectRatio: '0.6 / 1',
          pointerEvents: 'none',
        },
      };

    case 'back':
    default:
      return {
        zIndex: 2,
        style: {
          transform: 'translateX(-50%) scale(0.5)',
          filter: 'blur(6px)',
          opacity: 0,
          left: '50%',
          height: isMobile ? '10%' : '18%',
          bottom: isMobile ? '32%' : '12%',
          aspectRatio: '0.6 / 1',
          pointerEvents: 'none',
        },
      };
  }
}
