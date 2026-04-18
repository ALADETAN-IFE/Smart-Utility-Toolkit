type ToolkitId = "length" | "temperature" | "weight";

interface UnitOption {
  key: string;
  label: string;
  symbol: string;
}

interface ToolkitConfig {
  id: ToolkitId;
  title: string;
  description: string;
  accent: string;
  accentSoft: string;
  units: UnitOption[];
  defaultFrom: string;
  defaultTo: string;
  exampleValue: string;
}

interface ToolkitState {
  value: string;
  from: string;
  to: string;
}

interface ConverterTabScreenProps {
  toolkitId: ToolkitId;
  eyebrow: string;
}
interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
  dueDate?: number;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

interface TaskItemCardProps {
  task: Task;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

interface TaskFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string, dueDate?: number) => void;
  editingTask?: Task | null;
  submitLabel?: string;
}

// interface TaskFormProps {
//   initialTask?: Task;
//   onSubmit: (title: string, description: string) => void;
//   onCancel: () => void;
// }

interface TaskFormInitialTask {
  title?: string;
  description?: string;
  dueDate?: number;
}
