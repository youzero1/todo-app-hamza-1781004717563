import clsx from 'clsx';
import { Filter } from '@/types';

type FilterBarProps = {
  filter: Filter;
  onFilterChange: (f: Filter) => void;
};

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function FilterBar({ filter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-5">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={clsx(
            'flex-1 py-2 rounded-lg text-sm font-medium transition-all',
            filter === f.value
              ? 'bg-white text-brand shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
