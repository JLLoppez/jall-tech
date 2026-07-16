import type { Service } from '@/lib/data/services';
import DynamicIcon from './DynamicIcon';

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="card card-hover group p-7 h-full flex flex-col" id={service.slug}>
      <div className="h-12 w-12 rounded-lg bg-midnight flex items-center justify-center mb-5 transition-transform duration-300 ease-smooth group-hover:scale-110 group-hover:rotate-3">
        <DynamicIcon name={service.icon} size={22} color="#D4A017" />
      </div>
      <h3 className="mb-2 transition-colors duration-200 group-hover:text-gold-600">{service.name}</h3>
      <p className="text-sm text-gray-medium mb-0">{service.summary}</p>
    </div>
  );
}
