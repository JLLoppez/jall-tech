import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createCaseStudy } from '@/lib/actions/admin';
import { products } from '@/lib/data/products';

export const metadata = { title: 'New Case Study' };

export default function NewCaseStudyPage() {
  return (
    <div className="max-w-2xl">
      <Link href="/admin/case-studies" className="inline-flex items-center gap-1.5 text-sm text-gray-medium hover:text-midnight mb-4">
        <ArrowLeft size={14} /> Back to Case Studies
      </Link>
      <h1 className="mb-8">New Case Study</h1>

      <form action={createCaseStudy} className="card p-8 space-y-5">
        <div>
          <label htmlFor="title" className="field-label">Title</label>
          <input id="title" name="title" type="text" required className="field-input" />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="clientName" className="field-label">Client name</label>
            <input id="clientName" name="clientName" type="text" required className="field-input" />
          </div>
          <div>
            <label htmlFor="industry" className="field-label">Industry</label>
            <input id="industry" name="industry" type="text" required className="field-input" />
          </div>
        </div>

        <div>
          <label htmlFor="productTag" className="field-label">
            Related product <span className="text-gray-medium font-normal">(optional)</span>
          </label>
          <select id="productTag" name="productTag" className="field-input">
            <option value="">None</option>
            {products.map((p) => (
              <option key={p.slug} value={p.name}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="summary" className="field-label">Summary</label>
          <textarea id="summary" name="summary" rows={4} required className="field-input resize-y" />
        </div>

        <label className="flex items-center gap-2.5 text-sm font-medium text-gray-dark">
          <input type="checkbox" name="published" defaultChecked className="h-4 w-4 rounded border-gray-300" />
          Publish immediately
        </label>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="btn-primary">Save Case Study</button>
          <Link href="/admin/case-studies" className="btn-ghost">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
