import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Task } from '@/utils/taskStorage';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const isOverdue =
    task.dueDate && task.dueDate < Date.now() && !task.completed;
  
  const dueDateStr = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : null;

  return (
    <View
      className={`mb-3 rounded-lg border p-4 ${
        task.completed
          ? 'border-green-500/30 bg-green-500/5'
          : isOverdue
            ? 'border-red-500/30 bg-red-500/5'
            : 'border-orange-500/20 bg-orange-500/5'
      }`}
    >
      <View className="mb-2 flex-row items-start gap-3">
        <TouchableOpacity
          onPress={onToggle}
          className={`mt-1 h-6 w-6 items-center justify-center rounded-md border-2 ${
            task.completed
              ? 'border-green-500 bg-green-500'
              : 'border-orange-500/50'
          }`}
        >
          {task.completed && (
            <Ionicons name="checkmark" size={16} color="#fff" />
          )}
        </TouchableOpacity>

        <View className="flex-1">
          <Text
            className={`text-base font-semibold ${
              task.completed
                ? 'line-through text-zinc-400'
                : 'text-white'
            }`}
          >
            {task.title}
          </Text>
          {task.description && (
            <Text className="mt-1 text-sm text-zinc-400">
              {task.description}
            </Text>
          )}
          {dueDateStr && (
            <View className="mt-2 flex-row items-center gap-1">
              <Ionicons
                name="calendar-outline"
                size={12}
                color={isOverdue ? '#ef4444' : '#f97316'}
              />
              <Text
                className={`text-xs ${
                  isOverdue ? 'text-red-400' : 'text-orange-400'
                }`}
              >
                {isOverdue ? 'Overdue: ' : 'Due: '}
                {dueDateStr}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View className="flex-row justify-end gap-2">
        <TouchableOpacity
          onPress={onEdit}
          className="rounded-md bg-blue-500/20 p-2"
        >
          <Ionicons name="pencil" size={16} color="#60a5fa" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          className="rounded-md bg-red-500/20 p-2"
        >
          <Ionicons name="trash" size={16} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
