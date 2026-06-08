import {describe, expect, it} from 'vitest';
import {cn} from './utils';

describe('cn', () => {
  it('merges conditional classes and resolves Tailwind conflicts', () => {
    expect(cn('px-2', true && 'py-3', false && 'hidden', 'px-4')).toBe('py-3 px-4');
  });
});
