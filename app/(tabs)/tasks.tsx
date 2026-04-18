import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TaskForm, TaskItem } from "@/components/TaskComponents";
import { taskStorage } from "@/utils/taskStorage";

type Task = Awaited<ReturnType<typeof taskStorage.getTasks>>[number];

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!error) return;

    const timeoutId = setTimeout(() => {
      setError(null);
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [error]);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const loadedTasks = await taskStorage.getTasks();
      setTasks(
        loadedTasks.sort((a: Task, b: Task) => b.createdAt - a.createdAt),
      );
    } catch (error) {
      console.error("Failed to load tasks:", error);
      setError("Failed to load tasks");
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
    async (title: string, description: string, dueDate?: number) => {
      try {
        const newTask = await taskStorage.addTask(title, description, dueDate);
        setTasks((currentTasks) => [newTask, ...currentTasks]);
        setShowForm(false);
        setError(null);
      } catch (error) {
        console.error("Failed to add task:", error);
        setError("Failed to add task");
      }
    },
    [],
  );

  const handleUpdateTask = useCallback(
    async (title: string, description: string, dueDate?: number) => {
      if (!editingTask) return;
      try {
        const updatedTask = await taskStorage.updateTask(editingTask.id, {
          title,
          description,
          dueDate,
        });
        if (updatedTask) {
          setTasks((currentTasks) =>
            currentTasks.map((task) =>
              task.id === updatedTask.id ? updatedTask : task,
            ),
          );
        }
        setEditingTask(null);
        setError(null);
      } catch (error) {
        console.error("Failed to update task:", error);
        setError("Failed to update task");
      }
    },
    [editingTask],
  );

  const handleToggleTask = useCallback(
    async (id: string) => {
      try {
        const updatedTask = await taskStorage.toggleTaskCompletion(id);
        if (updatedTask) {
          setTasks((currentTasks) =>
            currentTasks.map((task) =>
              task.id === updatedTask.id ? updatedTask : task,
            ),
          );
        }
        setError(null);
      } catch (error) {
        console.error("Failed to toggle task:", error);
        setError("Failed to toggle task");
      }
    },
    [],
  );

  const handleDeleteTask = useCallback(
    async (id: string) => {
      try {
        const deleted = await taskStorage.deleteTask(id);
        if (deleted) {
          setTasks((currentTasks) =>
            currentTasks.filter((task) => task.id !== id),
          );
        }
        setError(null);
      } catch (error) {
        console.error("Failed to delete task:", error);
        setError("Failed to delete task");
      }
    },
    [],
  );

  const completedCount = tasks?.filter((t) => t.completed).length || 0;
  const totalCount = tasks?.length || 0;

  return (
    <View className="flex-1 bg-[#0a0a0c]">
      <View
        pointerEvents="none"
        className="absolute -left-16 top-14 h-52 w-52 rounded-full bg-orange-500/20"
      />
      <View
        pointerEvents="none"
        className="absolute -right-20 top-40 h-60 w-60 rounded-full bg-red-500/15"
      />

      <ScrollView
        contentContainerStyle={{
          gap: 20,
          paddingHorizontal: 20,
          paddingBottom: 112,
          paddingTop: 56,
        }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-3 rounded-3xl border border-zinc-700/45 bg-zinc-950/88 p-5">
          <Text className="text-xs font-extrabold uppercase tracking-[1.4px] text-orange-300">
            Task Manager
          </Text>
          <Text className="text-[31px] font-extrabold leading-9 tracking-[-0.4px] text-zinc-50">
            My Checklist
          </Text>
          <View className="rounded-2xl border border-zinc-700/50 bg-slate-950/82 p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-sm font-semibold text-slate-200">
                  Progress
                </Text>
                <Text className="text-xs text-slate-400">
                  {completedCount} completed of {totalCount} total
                </Text>
              </View>
              <Text className="text-sm font-bold text-orange-300">
                {totalCount > 0
                  ? `${Math.round((completedCount / totalCount) * 100)}%`
                  : "0%"}
              </Text>
            </View>
            <View className="mt-3 h-2 overflow-hidden rounded-full bg-slate-700/90">
              <View
                className="h-full rounded-full"
                style={{
                  width:
                    totalCount > 0
                      ? `${(completedCount / totalCount) * 100}%`
                      : "0%",
                  backgroundColor: "#f97316",
                }}
              />
            </View>
          </View>
        </View>

        {error && (
          <View className="rounded-2xl border border-red-400/50 bg-red-500/10 p-4">
            <View className="flex-row items-center justify-between gap-3">
              <Text className="flex-1 text-sm text-red-200">{error}</Text>
              <View className="flex-row items-center gap-2">
                <TouchableOpacity
                  onPress={loadTasks}
                  className="rounded-md border border-red-300/60 px-3 py-1"
                >
                  <Text className="text-xs font-semibold text-red-100">
                    Retry
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setError(null)}
                  className="rounded-md border border-zinc-400/50 px-3 py-1"
                >
                  <Text className="text-xs font-semibold text-zinc-200">
                    Dismiss
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {(showForm || editingTask) && (
          <View>
            <TaskForm
              visible={showForm || Boolean(editingTask)}
              onClose={() => {
                setShowForm(false);
                setEditingTask(null);
              }}
              initialTask={editingTask || undefined}
              onSubmit={editingTask ? handleUpdateTask : handleAddTask}
              onCancel={() => {
                setShowForm(false);
                setEditingTask(null);
              }}
              submitLabel={editingTask ? "Update Task" : "Add Task"}
            />
          </View>
        )}

        {!showForm && !editingTask && (
          <TouchableOpacity
            onPress={() => setShowForm(true)}
            className="flex-row items-center justify-center gap-2 rounded-2xl border border-orange-500/35 bg-orange-500/10 py-3.5"
          >
            <Ionicons name="add-circle-outline" size={20} color="#f97316" />
            <Text className="font-bold text-orange-300">Add New Task</Text>
          </TouchableOpacity>
        )}

        {/* Tasks List */}
        {loading ? (
          <View className="items-center justify-center rounded-2xl border border-zinc-700/45 bg-zinc-950/88 py-8">
            <Text className="text-slate-400">Loading tasks...</Text>
          </View>
        ) : tasks && tasks.length > 0 ? (
          <View>
            {/* Active Tasks */}
            {tasks.some((t) => !t.completed) && (
              <View className="mb-2">
                <Text className="mb-3 text-[13px] font-bold uppercase tracking-[0.8px] text-slate-200">
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
                <Text className="mb-3 text-[13px] font-bold uppercase tracking-[0.8px] text-slate-200">
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
          <View className="items-center justify-center rounded-2xl border border-zinc-700/45 bg-zinc-950/88 py-12">
            <Ionicons
              name="checkmark-done-circle-outline"
              size={48}
              color="#a1a5b4"
            />
            <Text className="mt-4 text-slate-400">
              No tasks yet. Create one to get started!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
