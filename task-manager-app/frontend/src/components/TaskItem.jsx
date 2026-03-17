import { format } from 'date-fns';
import { Edit2, Trash2, Calendar, CheckCircle2, Clock, PlayCircle } from 'lucide-react';

const TaskItem = ({ task, onEdit, onDelete, onStatusChange }) => {
  const statusColors = {
    'pending': 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20',
    'in-progress': 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20',
    'completed': 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20',
  };

  const statusIcons = {
    'pending': <Clock size={14} className="mr-1.5" />,
    'in-progress': <PlayCircle size={14} className="mr-1.5" />,
    'completed': <CheckCircle2 size={14} className="mr-1.5" />,
  };

  const statusLabels = {
    'pending': 'Pending',
    'in-progress': 'In Progress',
    'completed': 'Completed',
  };

  // Convert status to readable format with uppercase first letter
  const formattedStatus = statusLabels[task.status] || task.status;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative group flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 pr-4">
          <h3 className={`text-lg font-bold text-slate-800 leading-tight ${task.status === 'completed' ? 'line-through text-slate-500' : ''}`}>
            {task.title}
          </h3>
        </div>
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-4 bg-white/80 backdrop-blur-sm p-1 rounded-lg">
          <button
            onClick={onEdit}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit task"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <p className="text-slate-600 text-sm mb-6 flex-grow line-clamp-3">
        {task.description}
      </p>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
        <div className="flex items-center text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
          <Calendar size={14} className="mr-1.5 text-slate-400" />
          {format(new Date(task.createdAt), 'MMM d, yyyy')}
        </div>
        
        <div className="relative inline-block">
          <select
            value={task.status}
            onChange={(e) => onStatusChange(e.target.value)}
            className={`appearance-none font-medium text-xs px-3 py-1.5 pr-8 rounded-full border ring-4 border-transparent outline-none cursor-pointer transition-all ${statusColors[task.status]}`}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ${statusColors[task.status].split(' ')[1]}`}>
            <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
             {statusIcons[task.status]}
          </div>
          <style>{`
            select { text-indent: 16px; }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
