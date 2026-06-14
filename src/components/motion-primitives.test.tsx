import React from 'react';
import {render, screen} from '@testing-library/react';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {
  MotionPageCard,
  MotionPressable,
  MotionStaggerGroup,
  MotionStaggerItem
} from './motion-primitives';

let shouldReduceMotion = false;
const motionProps = vi.fn();

vi.mock('framer-motion', () => {
  const motion = new Proxy(
    {},
    {
      get:
        (_target, tag: string) =>
        ({children, ...props}: React.PropsWithChildren<Record<string, unknown>>) => {
          motionProps(props);
          const domProps = {...props};
          delete domProps.animate;
          delete domProps.initial;
          delete domProps.transition;
          delete domProps.variants;
          delete domProps.whileHover;
          delete domProps.whileTap;
          return React.createElement(tag, domProps, children);
        }
    }
  );

  return {
    motion,
    useReducedMotion: () => shouldReduceMotion
  };
});

describe('motion primitives', () => {
  beforeEach(() => {
    shouldReduceMotion = false;
    motionProps.mockClear();
  });

  it('renders page cards and stagger groups with supplied classes', () => {
    render(
      <>
        <MotionPageCard className="card-extra">Card</MotionPageCard>
        <MotionStaggerGroup className="group-extra">Group</MotionStaggerGroup>
      </>
    );

    expect(screen.getByText('Card')).toHaveClass('page-card', 'card-extra');
    expect(screen.getByText('Group')).toHaveClass('group-extra');
    expect(motionProps.mock.calls[0][0]).toMatchObject({initial: 'hidden', animate: 'show'});
  });

  it('disables initial and press animations when reduced motion is preferred', () => {
    shouldReduceMotion = true;
    render(
      <>
        <MotionPageCard>Card</MotionPageCard>
        <MotionPressable>Pressable</MotionPressable>
      </>
    );

    expect(motionProps.mock.calls[0][0].initial).toBe(false);
    expect(motionProps.mock.calls[1][0].whileHover).toBeUndefined();
    expect(motionProps.mock.calls[1][0].whileTap).toBeUndefined();
  });

  it('only adds hover movement to interactive stagger items', () => {
    const {rerender} = render(<MotionStaggerItem>Static</MotionStaggerItem>);
    expect(motionProps.mock.calls.at(-1)?.[0].whileHover).toBeUndefined();

    rerender(<MotionStaggerItem interactive>Interactive</MotionStaggerItem>);
    expect(motionProps.mock.calls.at(-1)?.[0].whileHover).toEqual({y: -3, scale: 1.01});

    shouldReduceMotion = true;
    rerender(<MotionStaggerItem interactive>Reduced</MotionStaggerItem>);
    expect(motionProps.mock.calls.at(-1)?.[0].whileHover).toBeUndefined();
  });
});
