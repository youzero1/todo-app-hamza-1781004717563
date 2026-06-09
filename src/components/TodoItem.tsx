import { useState, useRef, useEffect } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import { Todo } from '@/types';
import clsx from 'clsx';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const PRIORITY_STYLES: Record<string, string> = {
  low: 'border-l-4 border-l-green-400',
  medium: 'border-l-4 border-l-yellow-400',
  high: 'border-l-4 border-l-red-400',
};

const PRIORITY_BADGE: Record<string, string> = {
  low: 'bg-green-50 text-green-600',
  medium: 'bg-yellow-50 text-yellow-600',
  high: 'bg-red-50 text-red-600',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  function handleEditSave() {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    } else {
      setEditText(todo.text);
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleEditSave();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  }

  return (
    <li
      className={clsx(
        'group bg-white rounded-2xl shadow-sm px-4 py-3.5 flex items-center gap-3 transition-all hover:shadow-md',
        PRIORITY_STYLES[todo.priority]
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
          todo.completed
            ? 'bg-brand border-brand'
            : 'border-gray-300 hover:border-brand'
        )}
        aria-label="Toggle todo"
      >
        {todo.completed && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
      </button>

      {/* Text / Edit */}
      {editing ? (
        <input
          ref={inputRef}
          value={editText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 text-sm px-2 py-1 border border-brand rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
      ) : (
        <span
          className={clsx(
            'flex-1 text-sm leading-snug',
            todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
          )}
        >
          {todo.text}
        </span>
      )}

      {/* Priority Badge */}
      {!editing && (
        <span
          className={clsx(
            'hidden sm:inline-block text-xs font-medium px-2 py-0.5 rounded-full capitalize',
            PRIORITY_BADGE[todo.priority]
          )}
        >
          {todo.priority}
        </span>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {editing ? (
          <>
            <button
              onClick={handleEditSave}
              className="p-1.5 rounded-lg text-green-500 hover:bg-green-50 transition-colors"
              aria-label="Save"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setEditText(todo.text); setEditing(false); }}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors"
              aria-label="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-brand transition-colors"
              aria-label="Edit"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
              aria-label="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
