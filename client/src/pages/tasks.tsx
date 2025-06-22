import { useState } from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import TaskForm from "@/components/task-form";
import TaskList from "@/components/task-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, SortAsc, Plus } from "lucide-react";
import { useTasks } from "@/hooks/use-tasks";

export default function TasksPage() {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileForm, setShowMobileForm] = useState(false);
  const { data: tasks = [] } = useTasks();

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    if (filter === "active") return !task.completed && matchesSearch;
    if (filter === "completed") return task.completed && matchesSearch;
    return false;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header completedToday={stats.completed} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Sidebar stats={stats} tasks={tasks} />
          
          <div className="lg:col-span-3">
            {/* Task Creation Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Task</h2>
              <TaskForm />
            </div>

            {/* Filter and Search Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <Button
                      variant={filter === "all" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setFilter("all")}
                      className="text-xs"
                    >
                      All <span className="ml-1 opacity-70">{stats.total}</span>
                    </Button>
                    <Button
                      variant={filter === "active" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setFilter("active")}
                      className="text-xs"
                    >
                      Active <span className="ml-1 opacity-70">{stats.pending}</span>
                    </Button>
                    <Button
                      variant={filter === "completed" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setFilter("completed")}
                      className="text-xs"
                    >
                      Completed <span className="ml-1 opacity-70">{stats.completed}</span>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search tasks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64 pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                  <Button variant="ghost" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <SortAsc className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <TaskList tasks={filteredTasks} />
          </div>
        </div>
      </main>

      {/* Mobile FAB */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <Button
          onClick={() => setShowMobileForm(true)}
          className="w-14 h-14 rounded-full shadow-lg hover:scale-105 transition-transform"
          size="sm"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
