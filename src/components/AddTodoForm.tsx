import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Priority } from '@/types';
import clsx from 'clsx';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const PRIORITIES: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-700 border-green-200' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-700 border-red-200' },
];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand text-gray-800 placeholder-gray-400 text-sm"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-brand hover:bg-brand-dark disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 font-medium mr-1">Priority:</span>
        {PRIORITIES.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPriority(p.value)}
            className={clsx(
              'px-3 py-1 rounded-lg border text-xs font-medium transition-all',
              priority === p.value
                ? clsx(p.color, 'ring-2 ring-offset-1 ring-brand/30')
                : 'bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100'
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
    </form>
  );
}
