import React, { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const dueDateLabel = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : null;
  
  const isOverdue = task.dueDate ? Date.now() > task.dueDate && !task.completed : false;
  
  const confirmDelete = () => {
    Alert.alert("Delete task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => onDelete(task.id) },
    ]);
  };

  return (
    <View className="mb-3 flex-row items-start gap-3 rounded-[22px] border border-zinc-700/45 bg-zinc-950/88 p-4">
      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        className={`mt-1 h-6 w-6 items-center justify-center rounded border-2 ${
          task.completed
            ? "border-green-500 bg-green-500/30"
            : "border-zinc-500"
        }`}
      >
        {task.completed && (
          <Ionicons name="checkmark" size={16} color="#22c55e" />
        )}
      </TouchableOpacity>

      <View className="flex-1">
        <Text
          className={`text-base font-semibold ${
            task.completed ? "line-through text-slate-400" : "text-slate-50"
          }`}
        >
          {task.title}
        </Text>
        {task.description && (
          <Text className="mt-1 text-sm text-slate-300">
            {task.description}
          </Text>
        )}
        {dueDateLabel && (
          <View className="mt-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 self-start">
            <Text className="text-[11px] font-semibold tracking-[0.7px] text-orange-300">
              {isOverdue ? "Overdue" : "Due"} {dueDateLabel}
            </Text>
          </View>
        )}
      </View>

      <View className="flex-row gap-2">
        <TouchableOpacity
          onPress={() => onEdit(task)}
          className="items-center justify-center rounded-full border border-zinc-600/60 p-2"
        >
          <Ionicons name="pencil" size={18} color="#f97316" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={confirmDelete}
          className="items-center justify-center rounded-full border border-zinc-600/60 p-2"
        >
          <Ionicons name="trash" size={18} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function TaskForm({
  initialTask,
  onSubmit,
  onCancel,
  submitLabel = "Add Task",
}: TaskFormProps & {
  initialTask?: TaskFormInitialTask;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(
    initialTask?.description || "",
  );
  const [dueDate, setDueDate] = useState(
    initialTask?.dueDate
      ? new Date(initialTask.dueDate).toISOString().split("T")[0]
      : "",
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [dueDateError, setDueDateError] = useState<string | null>(null);

  const handleSubmit = () => {
    const nextTitle = title.trim();
    const nextDescription = description.trim();
    const nextDueDate = dueDate.trim();

    let hasError = false;

    if (!nextTitle) {
      setTitleError("Task title is required");
      hasError = true;
    } else {
      setTitleError(null);
    }

    if (!nextDescription) {
      setDescriptionError("Task description is required");
      hasError = true;
    } else if (nextDescription.length > 100) {
      setDescriptionError("Description cannot exceed 100 characters");
      hasError = true;
    } else {
      setDescriptionError(null);
    }

    if (nextDueDate) {
      const parsedDueDate = new Date(nextDueDate);
      if (Number.isNaN(parsedDueDate.getTime())) {
        setDueDateError("Use YYYY-MM-DD for the due date");
        hasError = true;
      } else {
        setDueDateError(null);
      }
    } else {
      setDueDateError(null);
    }

    if (hasError) {
      return;
    }

    onSubmit(
      title,
      description,
      nextDueDate ? new Date(nextDueDate).getTime() : undefined,
    );
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <View className="gap-3 rounded-[22px] border border-zinc-700/45 bg-zinc-950/88 p-4">
      <TextInput
        className={`rounded-lg border ${titleError ? "border-red-500/40" : "border-orange-500/40"} bg-slate-900 px-3 py-2 text-slate-50`}
        placeholder="Task title"
        placeholderTextColor="#a1a5b4"
        value={title}
        onChangeText={(value) => {
          setTitle(value);
          if (titleError && value.trim()) {
            setTitleError(null);
          }
        }}
      />
      {titleError && (
        <Text className="-mt-2 text-xs text-red-300">{titleError}</Text>
      )}
      <TextInput
        className={`max-h-20 rounded-lg border ${descriptionError ? "border-red-500/40" : "border-orange-500/40"} bg-slate-900 px-3 py-2 text-slate-50`}
        placeholder="Description"
        placeholderTextColor="#a1a5b4"
        value={description}
        onChangeText={(value) => {
          setDescription(value);
          const trimmed = value.trim();
          if (descriptionError && trimmed && trimmed.length <= 100) {
            setDescriptionError(null);
          }
        }}
        multiline
        numberOfLines={3}
      />
      {descriptionError && (
        <Text className="-mt-2 text-xs text-red-300">{descriptionError}</Text>
      )}

      <Pressable
        onPress={() => setShowDatePicker(true)}
        className={`rounded-lg border ${dueDateError ? "border-red-500/40" : "border-orange-500/40"} bg-slate-900 px-3 py-3`}
      >
        <Text
          className={`text-sm ${dueDate ? "text-slate-50" : "text-slate-400"}`}
        >
          {dueDate ? `Due date: ${dueDate}` : "Choose due date (optional)"}
        </Text>
      </Pressable>
      {dueDateError && (
        <Text className="-mt-2 text-xs text-red-300">{dueDateError}</Text>
      )}

      {showDatePicker && (
        <DateTimePicker
          value={dueDate ? new Date(dueDate) : new Date()}
          mode="date"
          minimumDate={new Date()}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, selectedDate) => {
            if (Platform.OS !== "ios") {
              setShowDatePicker(false);
            }

            if (!selectedDate) {
              return;
            }

            const formattedDate = selectedDate.toISOString().split("T")[0];
            setDueDate(formattedDate);
            setDueDateError(null);
          }}
        />
      )}

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
