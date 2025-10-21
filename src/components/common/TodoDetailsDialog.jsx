import React from "react";
import {
  X,
  Calendar,
  Clock,
  Tag,
  Flag,
  CheckCircle,
  Circle,
  Edit,
  Trash2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useUpdateTodo } from "@/hooks/useUpdateTodo";
import { useDeleteTodo } from "@/hooks/useDeleteTodo";
import { Button } from "@/components/ui/button";

export const TodoDetailsDialog = () => {
  const {
    showDetailsDialog,
    setShowDetailsDialog,
    detailsTodo,
    setDetailsTodo,
    setEditingTodo,
    setShowAddModal,
    setShowDeleteDialog,
    setDeleteTodo,
  } = useApp();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  if (!showDetailsDialog || !detailsTodo) return null;

  const handleClose = () => {
    setShowDetailsDialog(false);
    setDetailsTodo(null);
  };

  const handleEdit = () => {
    setEditingTodo(detailsTodo);
    setShowAddModal(true);
    handleClose();
  };

  const handleDelete = () => {
    setDeleteTodo(detailsTodo);
    setShowDeleteDialog(true);
    handleClose();
  };

  const toggleComplete = () => {
    updateTodo.mutate({
      id: detailsTodo.id,
      updates: { completed: !detailsTodo.completed },
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date set";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "No reminder set";
    return new Date(dateTimeString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold">Task Details</h2>
          <Button onClick={handleClose} variant="ghost" size="icon">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {/* Status and Title */}
          <div className="flex items-start gap-3">
            <Button
              onClick={toggleComplete}
              variant="ghost"
              size="icon"
              className="focus:outline-none"
            >
              {detailsTodo.completed ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <Circle className="w-6 h-6 text-gray-400" />
              )}
            </Button>
            <div className="flex-1">
              <h3
                className={`text-xl font-semibold ${
                  detailsTodo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {detailsTodo.title}
              </h3>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${getPriorityColor(
                  detailsTodo.priority
                )}`}
              >
                <Flag className="w-3 h-3 inline mr-1" />
                {detailsTodo.priority} priority
              </span>
            </div>
          </div>

          {/* Description */}
          {detailsTodo.description && (
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Description</h4>
              <p className="text-gray-600 bg-gray-50 rounded-lg p-3">
                {detailsTodo.description}
              </p>
            </div>
          )}

          {/* Category */}
          {detailsTodo.category &&
            (Array.isArray(detailsTodo.category)
              ? detailsTodo.category.length > 0
              : true) && (
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(detailsTodo.category)
                    ? detailsTodo.category
                    : [detailsTodo.category]
                  ).map((cat, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {/* Due Date */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div>
              <span className="text-sm text-gray-500">Due Date:</span>
              <span className="ml-2 font-medium">
                {formatDate(detailsTodo.dueDate)}
              </span>
            </div>
          </div>

          {/* Reminder Time */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <div>
              <span className="text-sm text-gray-500">Reminder:</span>
              <span className="ml-2 font-medium">
                {formatDateTime(detailsTodo.reminderTime)}
              </span>
            </div>
          </div>

          {/* Tags */}
          {detailsTodo.tags && detailsTodo.tags.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {detailsTodo.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Completion Status */}
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Status:</span>
              <span
                className={`font-medium ${
                  detailsTodo.completed ? "text-green-600" : "text-orange-600"
                }`}
              >
                {detailsTodo.completed ? "Completed" : "Pending"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-around border-t p-4 gap-2">
          <Button onClick={handleDelete} variant="destructive">
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
          <Button onClick={handleEdit}>
            <Edit className="w-4 h-4" />
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};
