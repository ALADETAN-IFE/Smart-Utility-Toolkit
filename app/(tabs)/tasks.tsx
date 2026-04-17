import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TaskForm, TaskItem } from '@/components/TaskComponents';
import { Task, TaskStorage } from '@/utils/taskStorage';

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const loadedTasks = await TaskStorage.getAllTasks();
      setTasks(loadedTasks.sort((a, b) => b.createdAt - a.createdAt));
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [loadTasks]),
  );

  const handleAddTask = useCallback(
    async (title: string, description: string) => {
      try {
        await TaskStorage.addTask({ title, description, completed: false });
        setShowForm(false);
        loadTasks();
      } catch (error) {
        console.error('Failed to add task:', error);
      }
    },
    [loadTasks],
  );

  const handleUpdateTask = useCallback(
    async (title: string, description: string) => {
      if (!editingTask) return;
      try {
        await TaskStorage.updateTask(editingTask.id, { title, description });
        setEditingTask(null);
        loadTasks();
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    },
    [editingTask, loadTasks],
  );

  const handleToggleTask = useCallback(
    async (id: string) => {
      try {
        await TaskStorage.toggleTaskCompletion(id);
        loadTasks();
      } catch (error) {
        console.error('Failed to toggle task:', error);
      }
    },
    [loadTasks],
  );

  const handleDeleteTask = useCallback(
    async (id: string) => {
      try {
        await TaskStorage.deleteTask(id);
        loadTasks();
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    },
    [loadTasks],
  );

  const completedCount = tasks?.filter((t) => t.completed).length || 0;
  const totalCount = tasks?.length || 0;

  return (
    <View className="flex-1 bg-gradient-to-b from-slate-950 to-slate-900 pt-4">
      <ScrollView className="px-4 pb-24">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-xs font-extrabold uppercase tracking-[2px] text-orange-300">
            Task Manager
          </Text>
          <Text className="mt-2 text-2xl font-bold text-slate-50">My Checklist</Text>

          {/* Progress */}
          <View className="mt-4 rounded-lg bg-slate-800/50 p-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-slate-300">
                Progress: {completedCount} of {totalCount}
              </Text>
              <View className="h-2 flex-1 ml-3 overflow-hidden rounded-full bg-slate-700">
                <View
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                  style={{
                    width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%',
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Form */}
        {(showForm || editingTask) && (
          <View className="mb-6">
            <TaskForm
              initialTask={editingTask || undefined}
              onSubmit={editingTask ? handleUpdateTask : handleAddTask}
              onCancel={() => {
                setShowForm(false);
                setEditingTask(null);
              }}
              submitLabel={editingTask ? 'Update Task' : 'Add Task'}
            />
          </View>
        )}

        {/* Add Task Button */}
        {!showForm && !editingTask && (
          <TouchableOpacity
            onPress={() => setShowForm(true)}
            className="mb-6 flex-row items-center justify-center gap-2 rounded-lg bg-orange-500/20 border border-orange-500/40 py-3"
          >
            <Ionicons name="add-circle-outline" size={20} color="#f97316" />
            <Text className="font-bold text-orange-300">Add New Task</Text>
          </TouchableOpacity>
        )}

        {/* Tasks List */}
        {loading ? (
          <View className="items-center justify-center py-8">
            <Text className="text-slate-400">Loading tasks...</Text>
          </View>
        ) : tasks && tasks.length > 0 ? (
          <View>
            {/* Active Tasks */}
            {tasks.some((t) => !t.completed) && (
              <View className="mb-6">
                <Text className="mb-3 text-sm font-bold uppercase text-slate-400">
                  Active
                </Text>
                {tasks
                  .filter((t) => !t.completed)
                  .map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={handleToggleTask}
                      onDelete={handleDeleteTask}
                      onEdit={(t) => {
                        setEditingTask(t);
                        setShowForm(false);
                      }}
                    />
                  ))}
              </View>
            )}

            {/* Completed Tasks */}
            {tasks.some((t) => t.completed) && (
              <View>
                <Text className="mb-3 text-sm font-bold uppercase text-slate-400">
                  Completed
                </Text>
                {tasks
                  .filter((t) => t.completed)
                  .map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={handleToggleTask}
                      onDelete={handleDeleteTask}
                      onEdit={(t) => {
                        setEditingTask(t);
                        setShowForm(false);
                      }}
                    />
                  ))}
              </View>
            )}
          </View>
        ) : (
          <View className="items-center justify-center py-12">
            <Ionicons name="checkmark-done-circle-outline" size={48} color="#a1a5b4" />
            <Text className="mt-4 text-slate-400">No tasks yet. Create one to get started!</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
