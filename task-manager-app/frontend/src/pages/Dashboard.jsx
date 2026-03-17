import { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import { Search, Filter, Plus, FileQuestion } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  
  // Filtering and pagination state
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const { API_URL } = useContext(AuthContext);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timerId);
  }, [search]);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      queryParams.append('page', page);
      if (debouncedSearch) queryParams.append('search', debouncedSearch);
      if (status) queryParams.append('status', status);

      const { data } = await axios.get(`${API_URL}/tasks?${queryParams.toString()}`);
      
      setTasks(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching tasks', error);
    } finally {
      setLoading(false);
    }
  }, [API_URL, page, debouncedSearch, status]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setShowTaskForm(true);
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
    setTaskToEdit(null);
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${API_URL}/tasks/${id}`);
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task', error);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/tasks/${id}`, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Your Tasks</h1>
          <p className="text-slate-500 mt-1">Manage, organize, and track your daily tasks.</p>
        </div>
        <button
          onClick={() => setShowTaskForm(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 transition-all duration-200"
        >
          <Plus size={20} />
          <span>New Task</span>
        </button>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search tasks by title..."
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm bg-slate-50 focus:bg-white"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="relative sm:w-64 min-w-[200px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-slate-400" />
          </div>
          <select
            className="appearance-none block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm bg-slate-50 focus:bg-white cursor-pointer"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
             <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
               <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
             </svg>
          </div>
        </div>
      </div>

      <div className="space-y-4 min-h-[400px]">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center flex flex-col justify-center items-center mt-10">
            <div className="h-16 w-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
              <FileQuestion size={32} />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No tasks found</h3>
            <p className="text-slate-500 max-w-sm mb-6">
              {search || status
                ? "We couldn't find any tasks matching your filters. Try adjusting them."
                : "You don't have any tasks yet. Create your first task to get started!"}
            </p>
            {(!search && !status) && (
              <button
                onClick={() => setShowTaskForm(true)}
                className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
               >
                Create a task
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onEdit={() => handleEditTask(task)}
                onDelete={() => handleDeleteTask(task._id)}
                onStatusChange={(status) => handleStatusChange(task._id, status)}
              />
            ))}
          </div>
        )}
      </div>

      {!loading && tasks.length > 0 && pagination.pages > 1 && (
        <div className="flex justify-center mt-12 gap-2">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-1">
            {[...Array(pagination.pages).keys()].map(num => (
              <button
                key={num + 1}
                onClick={() => setPage(num + 1)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                  page === num + 1 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {num + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === pagination.pages}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      )}

      {showTaskForm && (
        <TaskForm
          onClose={handleCloseForm}
          onSuccess={() => {
            fetchTasks();
            handleCloseForm();
          }}
          taskToEdit={taskToEdit}
        />
      )}
    </div>
  );
};

export default Dashboard;
