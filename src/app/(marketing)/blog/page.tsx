import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { Newspaper } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on software, AI, cloud, and building technology for African markets.'
};

export const revalidate = 3600;

async function getPosts() {
  try {
    return await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' }
    });
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <section className="bg-midnight">
        <div className="container py-20 max-w-3xl">
          <span className="eyebrow">Blog</span>
          <h1 className="text-white mb-6">Notes from the build</h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Engineering write-ups, product decisions, and lessons from building across
            African markets.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {posts.length === 0 ? (
            <div className="text-center max-w-lg mx-auto py-12">
              <div className="h-16 w-16 rounded-full bg-gray-light flex items-center justify-center mx-auto mb-5">
                <Newspaper className="text-gray-medium" size={26} />
              </div>
              <h3 className="mb-2">No posts published yet</h3>
              <p className="mb-0">
                New posts appear here automatically the moment they&apos;re published in the
                content database \u2014 no redeploy needed.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article key={post.id} className="card p-7 flex flex-col">
                  <span className="badge bg-gray-light text-gray-dark mb-4 self-start">
                    {post.category}
                  </span>
                  <h3 className="mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-medium mb-4 flex-1">{post.excerpt}</p>
                  <p className="text-xs font-heading font-semibold text-midnight mb-0">
                    {post.author}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
