import { useState } from "react";
import { type Task } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useUpdateTask, useDeleteTask } from "@/hooks/use-tasks";
import { formatDistanceToNow, format } from "date-fns";
import { Edit, Trash2, Calendar, Clock } from "lucide-react";

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || "",
  });

  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const toggleComplete = async () => {
    try {
      await updateTaskMutation.mutateAsync({
        id: task.id,
        updates: { completed: !task.completed },
      });
    } catch (error) {
      console.error("Failed to toggle task:", error);
    }
  };

  const handleEdit = async () => {
    try {
      await updateTaskMutation.mutateAsync({
        id: task.id,
        updates: editData,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTaskMutation.mutateAsync(task.id);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-amber-100 text-amber-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return <svg className="w-3 h-3 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414 6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>;
      case "medium": return <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>;
      case "low": return <svg className="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 15.586l3.293-3.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
      default: return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "work": return "bg-purple-400";
      case "personal": return "bg-blue-400";
      case "health": return "bg-green-400";
      default: return "bg-gray-400";
    }
  };

  const formatDueDate = (dueDate: string | null) => {
    if (!dueDate) return null;
    try {
      const date = new Date(dueDate);
      const today = new Date();
      const isToday = date.toDateString() === today.toDateString();
      const isTomorrow = date.toDateString() === new Date(today.getTime() + 24 * 60 * 60 * 1000).toDateString();
      
      if (isToday) return "Today";
      if (isTomorrow) return "Tomorrow";
      return format(date, "MMM d, yyyy");
    } catch {
      return dueDate;
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow ${task.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start space-x-4">
        <button
          onClick={toggleComplete}
          className={`mt-1 w-5 h-5 border-2 rounded transition-colors flex items-center justify-center ${
            task.completed 
              ? 'border-blue-500 bg-blue-500' 
              : 'border-gray-300 hover:border-blue-500'
          }`}
          disabled={updateTaskMutation.isPending}
        >
          {task.completed && (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`text-base font-medium text-gray-900 mb-1 ${task.completed ? 'line-through' : ''}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
              )}
              
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 ${getCategoryColor(task.category)} rounded-full`}></div>
                  <span className="capitalize">{task.category}</span>
                </div>
                {task.dueDate && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span>{formatDueDate(task.dueDate)}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span>{formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</span>
                </div>
                {task.completed && (
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Completed</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                {getPriorityIcon(task.priority)}
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
              <div className="flex items-center space-x-1">
                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-1 h-6 w-6 text-gray-400 hover:text-blue-500">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Task</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                        <Input
                          value={editData.title}
                          onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <Textarea
                          value={editData.description}
                          onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                          rows={3}
                        />
                      </div>
                      <div className="flex justify-end space-x-3 pt-4">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleEdit} disabled={updateTaskMutation.isPending}>
                          {updateTaskMutation.isPending ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleDelete}
                  className="p-1 h-6 w-6 text-gray-400 hover:text-red-500"
                  disabled={deleteTaskMutation.isPending}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
