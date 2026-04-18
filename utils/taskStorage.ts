import AsyncStorage from "@react-native-async-storage/async-storage";

const TASKS_STORAGE_KEY = "@smart_toolkit_tasks";

export const taskStorage = {
  async getTasks(): Promise<Task[]> {
    try {
      const data = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error reading tasks:", error);
      return [];
    }
  },

  async addTask(
    title: string,
    description: string,
    dueDate?: number,
  ): Promise<Task> {
    try {
      const tasks = await this.getTasks();
      const newTask: Task = {
        id: Date.now().toString(),
        title,
        description,
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        dueDate,
      };
      tasks.push(newTask);
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
      return newTask;
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<Task | null> {
    try {
      const tasks = await this.getTasks();
      const taskIndex = tasks.findIndex((t) => t.id === id);

      if (taskIndex === -1) return null;

      const updatedTask = {
        ...tasks[taskIndex],
        ...updates,
        id: tasks[taskIndex].id,
        createdAt: tasks[taskIndex].createdAt,
        updatedAt: Date.now(),
      };

      tasks[taskIndex] = updatedTask;
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
      return updatedTask;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  async toggleTaskCompletion(id: string): Promise<Task | null> {
    try {
      const tasks = await this.getTasks();
      const task = tasks.find((t) => t.id === id);

      if (!task) return null;

      return await this.updateTask(id, { completed: !task.completed });
    } catch (error) {
      console.error("Error toggling task:", error);
      throw error;
    }
  },

  async deleteTask(id: string): Promise<boolean> {
    try {
      const tasks = await this.getTasks();
      const filtered = tasks.filter((t) => t.id !== id);

      if (filtered.length === tasks.length) return false;

      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  },

  async clearAllTasks(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TASKS_STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing tasks:", error);
      throw error;
    }
  },
};
