import { CheckCircle2, Circle } from 'lucide-react';

type StatsBarProps = {
  activeCount: number;
  completedCount: number;
};

export default function StatsBar({ activeCount, completedCount }: StatsBarProps) {
  const total = activeCount + completedCount;
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-5">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <Circle className="w-4 h-4 text-brand" />
            <span>{activeCount} active</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span>{completedCount} done</span>
          </div>
        </div>
        <span className="text-sm font-semibold text-brand">{percent}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand to-brand-light rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
