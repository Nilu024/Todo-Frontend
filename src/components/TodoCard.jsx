import React from "react";
import { CheckCircle, Circle, Eye } from "lucide-react";
import { useUpdateTodo } from "@/hooks/useUpdateTodo";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";

const TodoCard = ({ todo }) => {
  const updateTodo = useUpdateTodo();
  const { setShowDetailsDialog, setDetailsTodo } = useApp();

  const toggleComplete = () => {
    updateTodo.mutate({ id: todo.id, updates: { completed: !todo.completed } });
  };

  const handleViewDetails = () => {
    setDetailsTodo(todo);
    setShowDetailsDialog(true);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-4 border border-gray-100 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between">
        <Button onClick={toggleComplete} variant="ghost" size="icon" className="focus:outline-none">
          {todo.completed ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <Circle className="w-6 h-6 text-gray-400" />
          )}
        </Button>

        <div className="flex-1 mx-3">
          <h3
            className={`font-semibold ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.title}
          </h3>
          <p className="text-sm text-gray-500">{todo.description}</p>
          <p className="text-xs text-gray-400 mt-1">
            Due: {todo.dueDate || "No deadline"}
          </p>
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={handleViewDetails}
            variant="ghost"
            size="icon"
          >
            <Eye className="w-4 h-4 text-blue-600" />
          </Button>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {(Array.isArray(todo.category) ? todo.category : []).map((cat) => (
          <span
            key={cat}
            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
          >
            {cat}
          </span>
        ))}
        {todo.tags?.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TodoCard;
