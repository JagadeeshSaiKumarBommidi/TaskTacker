import type { Task } from "@shared/schema";

interface SidebarProps {
  stats: {
    total: number;
    completed: number;
    pending: number;
  };
  tasks: Task[];
}

export default function Sidebar({ stats, tasks }: SidebarProps) {
  const getCategoryStats = () => {
    const categories = ["work", "personal", "health"] as const;
    return categories.map(category => ({
      name: category,
      count: tasks.filter(task => task.category === category).length,
      color: category === "work" ? "bg-purple-400" : 
             category === "personal" ? "bg-blue-400" : "bg-green-400"
    }));
  };

  const categoryStats = getCategoryStats();

  return (
    <aside className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Total Tasks</span>
            </div>
            <span className="text-lg font-semibold text-blue-600">{stats.total}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Completed</span>
            </div>
            <span className="text-lg font-semibold text-green-600">{stats.completed}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Pending</span>
            </div>
            <span className="text-lg font-semibold text-amber-600">{stats.pending}</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
          <div className="space-y-2">
            {categoryStats.map((category) => (
              <button
                key={category.name}
                className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 ${category.color} rounded-full`}></div>
                  <span className="text-sm text-gray-700 capitalize">{category.name}</span>
                </div>
                <span className="text-xs text-gray-500">{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
