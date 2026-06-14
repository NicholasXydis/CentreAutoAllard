import React from 'react';
import {render, screen} from '@testing-library/react';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {Hero} from './hero';

let shouldReduceMotion = false;
const motionProps = vi.fn();

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: (namespace: string) => (key: string) =>
    (
      ({
        'hero.title': "Centre D'Auto Allard",
        'hero.eyebrow': 'Family service since 1968',
        'hero.subtitle': 'Honest service and expert mechanics.',
        'hero.explore': 'Our services',
        'nav.contact': 'Contact'
      }) as Record<string, string>
    )[`${namespace}.${key}`]
}));

vi.mock('next/link', () => ({
  default: ({children, href, ...props}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={String(href)} {...props}>
      {children}
    </a>
  )
}));

vi.mock('framer-motion', () => {
  const motion = new Proxy(
    {},
    {
      get:
        (_target, tag: string) =>
        ({children, ...props}: React.PropsWithChildren<Record<string, unknown>>) => {
          motionProps({...props});
          for (const key of [
            'animate',
            'initial',
            'transition',
            'variants',
            'whileHover',
            'whileTap'
          ]) {
            delete props[key];
          }
          return React.createElement(tag, props, children);
        }
    }
  );

  return {
    motion,
    useReducedMotion: () => shouldReduceMotion
  };
});

describe('Hero', () => {
  beforeEach(() => {
    shouldReduceMotion = false;
    motionProps.mockClear();
  });

  it('renders localized content and all primary actions', () => {
    render(<Hero />);

    expect(screen.getByRole('heading', {name: "Centre D'Auto Allard"})).toBeInTheDocument();
    expect(screen.getByText('Family service since 1968')).toBeInTheDocument();
    expect(screen.getByRole('link', {name: '(514) 768-4455'})).toHaveAttribute(
      'href',
      'tel:+15147684455'
    );
    expect(screen.getByRole('link', {name: 'Contact'})).toHaveAttribute('href', '/en/contact');
    expect(screen.getByRole('link', {name: 'Our services'})).toHaveAttribute(
      'href',
      '/en/services'
    );
  });

  it('disables the initial hero animation when reduced motion is preferred', () => {
    shouldReduceMotion = true;
    render(<Hero />);

    const animatedContainer = motionProps.mock.calls.find(([props]) => props.animate === 'show');
    expect(animatedContainer?.[0].initial).toBe(false);
  });
});
