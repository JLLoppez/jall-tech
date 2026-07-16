import type { Product } from '@/lib/data/products';
import DynamicIcon from './DynamicIcon';
import Badge from './Badge';

const statusVariant = {
  Live: 'success',
  Beta: 'info',
  'In Development': 'gold'
} as const;

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div id={product.slug} className="card card-hover group p-7 h-full flex flex-col scroll-mt-24">
      <div className="flex items-center justify-between mb-5">
        <div
          className="h-12 w-12 rounded-lg flex items-center justify-center transition-transform duration-300 ease-smooth group-hover:scale-110"
          style={{ backgroundColor: `${product.color}1A` }}
        >
          <DynamicIcon name={product.icon} size={22} color={product.color} />
        </div>
        <Badge variant={statusVariant[product.status]}>{product.status}</Badge>
      </div>
      <h3 className="mb-1 transition-colors duration-200 group-hover:text-gold-600">{product.name}</h3>
      <p className="text-xs font-heading font-semibold uppercase tracking-wide text-gray-medium mb-3">
        {product.tagline}
      </p>
      <p className="text-sm text-gray-medium mb-4 flex-1">{product.summary}</p>
      <p className="text-xs font-heading font-semibold text-midnight">{product.industry}</p>
    </div>
  );
}
