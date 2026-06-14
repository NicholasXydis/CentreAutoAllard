import React, {useEffect} from 'react';
import {act, render, screen, waitFor} from '@testing-library/react';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

let pathname = '/fr';

vi.mock('next/navigation', () => ({
  usePathname: () => pathname
}));

vi.mock('next/script', () => ({
  default: function ScriptMock({
    children,
    id,
    onReady,
    src
  }: React.PropsWithChildren<{id?: string; onReady?: () => void; src?: string}>) {
    useEffect(() => {
      onReady?.();
    }, [onReady]);

    return (
      <script data-testid={id ?? 'external-script'} data-src={src}>
        {children}
      </script>
    );
  }
}));

describe('GoogleAnalytics', () => {
  beforeEach(() => {
    pathname = '/fr';
    vi.resetModules();
    vi.unstubAllEnvs();
    delete (window as Window & {gtag?: unknown}).gtag;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('renders nothing when the measurement ID is absent', async () => {
    vi.stubEnv('NEXT_PUBLIC_GA_MEASUREMENT_ID', '');
    const {GoogleAnalytics} = await import('./google-analytics');
    const {container} = render(<GoogleAnalytics />);

    expect(container).toBeEmptyDOMElement();
  });

  it('loads encoded scripts and sends a page view when ready', async () => {
    vi.stubEnv('NEXT_PUBLIC_GA_MEASUREMENT_ID', 'G-TEST ID');
    const gtag = vi.fn();
    (window as Window & {gtag?: typeof gtag}).gtag = gtag;
    document.title = 'Test title';
    const {GoogleAnalytics} = await import('./google-analytics');

    render(<GoogleAnalytics />);

    expect(screen.getByTestId('external-script')).toHaveAttribute(
      'data-src',
      'https://www.googletagmanager.com/gtag/js?id=G-TEST%20ID'
    );
    expect(screen.getByTestId('google-analytics').textContent).toContain(
      "gtag('config', 'G-TEST ID', {send_page_view: false})"
    );
    await waitFor(() =>
      expect(gtag).toHaveBeenCalledWith('event', 'page_view', {
        page_location: window.location.href,
        page_path: '/fr',
        page_title: 'Test title'
      })
    );
  });

  it('does not fail when gtag is unavailable and tracks later route changes', async () => {
    vi.stubEnv('NEXT_PUBLIC_GA_MEASUREMENT_ID', 'G-TEST');
    const {GoogleAnalytics} = await import('./google-analytics');
    const {rerender} = render(<GoogleAnalytics />);

    await act(async () => {});
    const gtag = vi.fn();
    (window as Window & {gtag?: typeof gtag}).gtag = gtag;
    pathname = '/fr/services';
    rerender(<GoogleAnalytics />);

    await waitFor(() =>
      expect(gtag).toHaveBeenCalledWith(
        'event',
        'page_view',
        expect.objectContaining({page_path: '/fr/services'})
      )
    );
  });
});
