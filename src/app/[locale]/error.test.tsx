import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import ErrorPage from './error';

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string) =>
    ({
      title: 'Something went wrong',
      message: 'We could not load this page.',
      retry: 'Try again',
      home: 'Return home'
    })[key]
}));

vi.mock('next/link', () => ({
  default: ({children, href, ...props}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={String(href)} {...props}>
      {children}
    </a>
  )
}));

vi.mock('next/image', () => ({
  default: (
    props: React.ImgHTMLAttributes<HTMLImageElement> & {fill?: boolean; priority?: boolean}
  ) => {
    const imageProps = {...props};
    delete imageProps.fill;
    delete imageProps.priority;

    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={imageProps.alt ?? ''} {...imageProps} />;
  }
}));

vi.mock('framer-motion', () => {
  const ignored = new Set([
    'animate',
    'initial',
    'transition',
    'variants',
    'whileHover',
    'whileTap'
  ]);
  const motion = new Proxy(
    {},
    {
      get:
        (_target, tag: string) =>
        ({children, ...props}: React.PropsWithChildren<Record<string, unknown>>) => {
          for (const key of ignored) {
            delete props[key];
          }
          return React.createElement(tag, props, children);
        }
    }
  );

  return {
    motion,
    useReducedMotion: () => false
  };
});

describe('localized error page', () => {
  it('shows recovery actions, invokes reset, and links to the current locale home', () => {
    const reset = vi.fn();
    render(<ErrorPage reset={reset} />);

    expect(screen.getByRole('heading', {name: 'Something went wrong'})).toBeInTheDocument();
    expect(screen.getByText('We could not load this page.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', {name: 'Try again'}));
    expect(reset).toHaveBeenCalledOnce();
    expect(screen.getByRole('link', {name: 'Return home'})).toHaveAttribute('href', '/en');
  });
});
