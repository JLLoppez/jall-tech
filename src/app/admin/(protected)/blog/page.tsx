import Link from 'next/link';
import { Plus } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import ToggleSwitch from '@/components/admin/ToggleSwitch';
import ConfirmDeleteButton from '@/components/admin/ConfirmDeleteButton';
import { togglePostPublished, deleteBlogPost } from '@/lib/actions/admin';

export const metadata = { title: 'Blog' };
export const dynamic = 'force-dynamic';

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-1">Blog Posts</h1>
          <p className="mb-0">{posts.length} post{posts.length === 1 ? '' : 's'} total.</p>
        </div>
        <Link href="/admin/blog/new" className="btn-primary">
          <Plus size={16} /> New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="card p-10 text-center text-gray-medium">
          No blog posts yet. Create your first one.
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Published</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="font-heading font-semibold text-midnight">{post.title}</td>
                  <td>
                    <span className="badge bg-gray-light text-gray-dark">{post.category}</span>
                  </td>
                  <td className="text-sm text-gray-medium">{post.author}</td>
                  <td>
                    <ToggleSwitch
                      checked={post.published}
                      label={`Publish ${post.title}`}
                      onToggle={async (next) => {
                        'use server';
                        await togglePostPublished(post.id, next);
                      }}
                    />
                  </td>
                  <td>
                    <ConfirmDeleteButton
                      confirmMessage={`Delete "${post.title}"?`}
                      action={async () => {
                        'use server';
                        await deleteBlogPost(post.id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
