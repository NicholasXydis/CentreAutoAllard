import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {LangToggle} from './lang-toggle';
import {Navbar} from './navbar';
import {SiteShell} from './site-shell';
import {Button, buttonVariants} from './ui/button';

let locale = 'fr';
let pathname = '/fr';
let shouldReduceMotion = false;
const push = vi.fn();

vi.mock('next-intl', () => ({
  useLocale: () => locale,
  useTranslations: (namespace: string) => (key: string) => {
    const translations: Record<string, string> = {
      'nav.label': 'Main navigation',
      'nav.home': 'Home',
      'nav.services': 'Services',
      'nav.contact': 'Contact',
      'language.en': 'Switch to English',
      'language.fr': 'Switch to French'
    };
    return translations[`${namespace}.${key}`] ?? key;
  }
}));

vi.mock('next/navigation', () => ({
  usePathname: () => pathname,
  useRouter: () => ({push})
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
    'exit',
    'initial',
    'layoutId',
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
    AnimatePresence: ({children}: React.PropsWithChildren) => children,
    motion,
    useReducedMotion: () => shouldReduceMotion
  };
});

describe('shared components', () => {
  beforeEach(() => {
    locale = 'fr';
    pathname = '/fr';
    shouldReduceMotion = false;
    push.mockClear();
  });

  it('renders both decorative WebP background variants and page content', () => {
    const {container} = render(
      <SiteShell>
        <p>Page content</p>
      </SiteShell>
    );

    const images = container.querySelectorAll('img');
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', '/shop-front.webp');
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('renders button variants and supports Radix asChild composition', () => {
    const {rerender} = render(<Button variant="secondary">Submit</Button>);
    expect(screen.getByRole('button', {name: 'Submit'})).toHaveClass('bg-secondary');
    expect(buttonVariants({variant: 'ghost', size: 'sm'})).toContain('hover:bg-accent');

    rerender(
      <Button asChild variant="outline">
        <a href="https://example.com/destination">Destination</a>
      </Button>
    );
    expect(screen.getByRole('link', {name: 'Destination'})).toHaveAttribute(
      'href',
      'https://example.com/destination'
    );
  });

  it('marks only the normalized current navigation route active', () => {
    pathname = '/fr/services/';
    render(<Navbar />);

    expect(screen.getByRole('navigation', {name: 'Main navigation'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Services'})).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', {name: 'Home'})).not.toHaveAttribute('aria-current');
  });

  it('renders navigation and language controls with reduced motion on an unmatched root path', () => {
    pathname = '/';
    shouldReduceMotion = true;
    render(<Navbar />);

    expect(screen.getAllByRole('link')).toHaveLength(4);
    expect(screen.queryByRole('link', {current: 'page'})).not.toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Switch to English'})).toBeEnabled();
  });

  it('switches French routes to the matching English route', () => {
    pathname = '/fr/contact';
    render(<LangToggle className="custom-class" />);

    const toggle = screen.getByRole('button', {name: 'Switch to English'});
    expect(toggle).toHaveClass('custom-class');
    expect(toggle).toHaveTextContent('EN');
    fireEvent.click(toggle);
    expect(push).toHaveBeenCalledWith('/en/contact');
  });

  it('switches English routes to the matching French route', () => {
    locale = 'en';
    pathname = '/en/services';
    render(<LangToggle />);

    const toggle = screen.getByRole('button', {name: 'Switch to French'});
    expect(toggle).toHaveTextContent('FR');
    fireEvent.click(toggle);
    expect(push).toHaveBeenCalledWith('/fr/services');
  });
});
