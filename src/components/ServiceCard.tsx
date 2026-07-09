import type { Service } from '@/lib/data/services';
import DynamicIcon from './DynamicIcon';

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="card p-7 h-full flex flex-col" id={service.slug}>
      <div className="h-12 w-12 rounded-lg bg-midnight flex items-center justify-center mb-5">
        <DynamicIcon name={service.icon} size={22} color="#D4A017" />
      </div>
      <h3 className="mb-2">{service.name}</h3>
      <p className="text-sm text-gray-medium mb-0">{service.summary}</p>
    </div>
  );
}
