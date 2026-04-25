export interface MoveColorConfig {
  bg: string;
  badge: string;
}

// Full Tailwind class strings must appear here so they are not purged from the build
export const MOVE_COLORS: Record<string, MoveColorConfig> = {
  introduction: {
    bg: 'bg-red-100',
    badge: 'bg-red-500 text-white',
  },
  purpose: {
    bg: 'bg-orange-100',
    badge: 'bg-orange-500 text-white',
  },
  method: {
    bg: 'bg-amber-100',
    badge: 'bg-amber-600 text-white',
  },
  result: {
    bg: 'bg-green-100',
    badge: 'bg-green-600 text-white',
  },
  discussion: {
    bg: 'bg-blue-100',
    badge: 'bg-blue-500 text-white',
  },
  uncertain: {
    bg: 'bg-gray-100',
    badge: 'bg-gray-500 text-white',
  },
};
