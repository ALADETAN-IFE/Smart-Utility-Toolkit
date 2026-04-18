import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const TaskFormModal: React.FC<TaskFormProps> = ({
  visible,
  onClose,
  onSubmit,
  editingTask,
}) => {
  const [title, setTitle] = useState(editingTask?.title || "");
  const [description, setDescription] = useState(
    editingTask?.description || "",
  );
  const [dueDate, setDueDate] = useState<string>(
    editingTask?.dueDate
      ? new Date(editingTask.dueDate).toISOString().split("T")[0]
      : "",
  );

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    const dueDateMs = dueDate ? new Date(dueDate).getTime() : undefined;
    onSubmit(title, description, dueDateMs);

    setTitle("");
    setDescription("");
    setDueDate("");
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/60">
        <View className="w-[90%] rounded-2xl bg-[#1c1917] p-6 shadow-xl">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-white">
              {editingTask ? "Edit Task" : "New Task"}
            </Text>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={24} color="#fff7ed" />
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="Task title"
            placeholderTextColor="#a1a1a1"
            value={title}
            onChangeText={setTitle}
            className="mb-3 rounded-lg border border-orange-500/30 bg-[#09090a] p-3 text-white"
          />

          <TextInput
            placeholder="Description (optional)"
            placeholderTextColor="#a1a1a1"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            className="mb-3 rounded-lg border border-orange-500/30 bg-[#09090a] p-3 text-white"
            style={{ textAlignVertical: "top" }}
          />

          <TextInput
            placeholder="Due date (YYYY-MM-DD)"
            placeholderTextColor="#a1a1a1"
            value={dueDate}
            onChangeText={setDueDate}
            className="mb-4 rounded-lg border border-orange-500/30 bg-[#09090a] p-3 text-white"
          />

          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={handleClose}
              className="flex-1 rounded-lg border border-orange-500/30 py-3"
            >
              <Text className="text-center font-semibold text-white">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              className="flex-1 rounded-lg bg-orange-500 py-3"
            >
              <Text className="text-center font-semibold text-white">
                {editingTask ? "Update" : "Add"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
