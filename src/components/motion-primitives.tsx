'use client';

import {motion, useReducedMotion} from 'framer-motion';
import {
  pageCascade,
  pressableHover,
  pressableTap,
  pressTransition,
  staggerContainer,
  staggerItem
} from '@/lib/motion';
import {cn} from '@/lib/utils';

export function MotionPageCard({
  children,
  className
}: Readonly<{children: React.ReactNode; className?: string}>) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={pageCascade}
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="show"
      className={cn('page-card', className)}
    >
      {children}
    </motion.div>
  );
}

export function MotionStaggerGroup({
  children,
  className
}: Readonly<{children: React.ReactNode; className?: string}>) {
  return (
    <motion.div variants={staggerContainer} className={className}>
      {children}
    </motion.div>
  );
}

export function MotionStaggerItem({
  children,
  className,
  interactive = false
}: Readonly<{children: React.ReactNode; className?: string; interactive?: boolean}>) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={staggerItem}
      whileHover={interactive && !shouldReduceMotion ? {y: -3, scale: 1.01} : undefined}
      transition={pressTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionPressable({
  children,
  className
}: Readonly<{children: React.ReactNode; className?: string}>) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={staggerItem}
      whileHover={shouldReduceMotion ? undefined : pressableHover}
      whileTap={shouldReduceMotion ? undefined : pressableTap}
      transition={pressTransition}
      className={cn('touch-manipulation [&>*]:w-full', className)}
    >
      {children}
    </motion.div>
  );
}
