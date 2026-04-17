import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Task } from '@/utils/taskStorage';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  return (
    <View className="mb-3 flex-row items-start gap-3 rounded-lg border border-orange-500/30 bg-slate-900/50 p-3">
      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        className={`mt-1 h-6 w-6 items-center justify-center rounded border-2 ${
          task.completed ? 'border-green-500 bg-green-500/30' : 'border-orange-400'
        }`}
      >
        {task.completed && <Ionicons name="checkmark" size={16} color="#22c55e" />}
      </TouchableOpacity>

      <View className="flex-1">
        <Text
          className={`text-base font-semibold ${
            task.completed ? 'line-through text-slate-400' : 'text-slate-50'
          }`}
        >
          {task.title}
        </Text>
        {task.description && (
          <Text className="mt-1 text-sm text-slate-300">{task.description}</Text>
        )}
      </View>

      <View className="flex-row gap-2">
        <TouchableOpacity
          onPress={() => onEdit(task)}
          className="items-center justify-center rounded p-2"
        >
          <Ionicons name="pencil" size={18} color="#f97316" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(task.id)}
          className="items-center justify-center rounded p-2"
        >
          <Ionicons name="trash" size={18} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (title: string, description: string) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export function TaskForm({ initialTask, onSubmit, onCancel, submitLabel = 'Add Task' }: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit(title, description);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <View className="gap-3 rounded-lg bg-slate-800 p-4">
      <TextInput
        className="rounded-lg border border-orange-500/40 bg-slate-900 px-3 py-2 text-slate-50 placeholder:text-slate-400"
        placeholder="Task title"
        placeholderTextColor="#a1a5b4"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        className="max-h-20 rounded-lg border border-orange-500/40 bg-slate-900 px-3 py-2 text-slate-50 placeholder:text-slate-400"
        placeholder="Description (optional)"
        placeholderTextColor="#a1a5b4"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
      />

      <View className="flex-row gap-2">
        <TouchableOpacity
          onPress={handleSubmit}
          className="flex-1 items-center justify-center rounded-lg bg-orange-500 py-2"
        >
          <Text className="font-bold text-slate-50">{submitLabel}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onCancel}
          className="flex-1 items-center justify-center rounded-lg border border-slate-600 bg-slate-800 py-2"
        >
          <Text className="font-bold text-slate-300">Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
