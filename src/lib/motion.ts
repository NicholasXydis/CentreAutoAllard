import type {Transition, Variants} from 'framer-motion';

export const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export const DURATION = {
  micro: 0.14,
  page: 0.3,
  content: 0.42
} as const;

export const STAGGER = {
  content: 0.07
} as const;

export const pressTransition: Transition = {
  type: 'spring',
  stiffness: 520,
  damping: 28,
  mass: 0.55
};

export const pressableHover = {y: -2, scale: 1.015} as const;
export const pressableTap = {y: 1, scale: 0.965} as const;

export const pageCascade: Variants = {
  hidden: {opacity: 0, y: 12},
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.content,
      ease: EASE,
      delayChildren: DURATION.micro,
      staggerChildren: STAGGER.content
    }
  }
};

export const staggerContainer: Variants = {
  hidden: {opacity: 0},
  show: {
    opacity: 1,
    transition: {
      duration: DURATION.page,
      ease: EASE,
      delayChildren: DURATION.micro,
      staggerChildren: STAGGER.content
    }
  }
};

export const staggerItem: Variants = {
  hidden: {opacity: 0, y: 12},
  show: {
    opacity: 1,
    y: 0,
    transition: {duration: DURATION.content, ease: EASE}
  }
};
