import {beforeEach, describe, expect, it, vi} from 'vitest';

const permanentRedirect = vi.fn();

vi.mock('next/navigation', () => ({
  permanentRedirect
}));

describe('root page', () => {
  beforeEach(() => {
    permanentRedirect.mockClear();
  });

  it('permanently redirects to the default locale', async () => {
    const {default: RootPage} = await import('./(root)/page');
    RootPage();

    expect(permanentRedirect).toHaveBeenCalledWith('/fr/');
  });
});
