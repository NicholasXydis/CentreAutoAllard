import React from 'react';
import {render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import NotFound from './not-found';

vi.mock('next-intl/server', () => ({
  getLocale: async () => 'fr',
  getTranslations: async () => (key: string) =>
    ({
      message: "Cette page n'existe pas ou a été déplacée.",
      back: "Retour à l'accueil"
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
  const motion = new Proxy(
    {},
    {
      get:
        (_target, tag: string) =>
        ({children, ...props}: React.PropsWithChildren<Record<string, unknown>>) => {
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
    useReducedMotion: () => false
  };
});

describe('localized not-found page', () => {
  it('shows the localized message and recovery link', async () => {
    render(await NotFound());

    expect(screen.getByRole('heading', {name: '404'})).toBeInTheDocument();
    expect(screen.getByText("Cette page n'existe pas ou a été déplacée.")).toBeInTheDocument();
    expect(screen.getByRole('link', {name: "Retour à l'accueil"})).toHaveAttribute('href', '/fr');
  });
});
