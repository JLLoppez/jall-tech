import { describe, it, expect } from 'vitest';
import { services } from './data/services';
import { products } from './data/products';

describe('services data', () => {
  it('has no duplicate slugs', () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('every service has a non-empty name, summary, and description', () => {
    for (const service of services) {
      expect(service.name.length).toBeGreaterThan(0);
      expect(service.summary.length).toBeGreaterThan(0);
      expect(service.description.length).toBeGreaterThan(0);
    }
  });

  it('matches the 9 service lines from the brand documents', () => {
    expect(services.length).toBe(9);
  });
});

describe('products data', () => {
  it('has no duplicate slugs', () => {
    const slugs = products.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('every product has a valid status', () => {
    const allowed = ['Live', 'In Development', 'Beta'];
    for (const product of products) {
      expect(allowed).toContain(product.status);
    }
  });

  it('every product accent color is a valid hex code', () => {
    const hexPattern = /^#[0-9A-Fa-f]{6}$/;
    for (const product of products) {
      expect(product.color).toMatch(hexPattern);
    }
  });
});
