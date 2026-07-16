import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://jalltechnologies.com';

  const staticRoutes = [
    '',
    '/services',
    '/products',
    '/case-studies',
    '/about',
    '/blog',
    '/careers',
    '/contact',
    '/privacy',
    '/terms'
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date()
  }));

  // NOTE: blog post and case study detail pages (/blog/[slug],
  // /case-studies/[slug]) don't exist yet — the listing pages currently
  // show summaries only, by design (see the comment in blog/page.tsx).
  // Once those detail routes are built, list published posts/case studies
  // here individually. Until then, only the static routes are real URLs.
  return staticRoutes;
}
