import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createBlogPost } from '@/lib/actions/admin';

export const metadata = { title: 'New Blog Post' };

export default function NewBlogPostPage() {
  return (
    <div className="max-w-2xl">
      <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-medium hover:text-midnight mb-4">
        <ArrowLeft size={14} /> Back to Blog
      </Link>
      <h1 className="mb-8">New Blog Post</h1>

      <form action={createBlogPost} className="card p-8 space-y-5">
        <div>
          <label htmlFor="title" className="field-label">Title</label>
          <input id="title" name="title" type="text" required className="field-input" />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="author" className="field-label">Author</label>
            <input
              id="author"
              name="author"
              type="text"
              required
              defaultValue="Jall Technologies Team"
              className="field-input"
            />
          </div>
          <div>
            <label htmlFor="category" className="field-label">Category</label>
            <input id="category" name="category" type="text" required placeholder="Engineering" className="field-input" />
          </div>
        </div>

        <div>
          <label htmlFor="excerpt" className="field-label">Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={2}
            required
            className="field-input resize-y"
            placeholder="A one to two sentence summary for the blog listing page"
          />
        </div>

        <div>
          <label htmlFor="content" className="field-label">Content</label>
          <textarea
            id="content"
            name="content"
            rows={12}
            required
            className="field-input resize-y font-mono text-xs"
            placeholder="Markdown or plain text content"
          />
        </div>

        <label className="flex items-center gap-2.5 text-sm font-medium text-gray-dark">
          <input type="checkbox" name="published" className="h-4 w-4 rounded border-gray-300" />
          Publish immediately
        </label>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="btn-primary">Save Post</button>
          <Link href="/admin/blog" className="btn-ghost">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
