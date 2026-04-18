# Smart Utility Toolkit Mobile App

`Smart Utility Toolkit` is a React Native + Expo app featuring practical utilities including unit converters and a task management system.

The app demonstrates clean mobile architecture with tab-based navigation, local persistence, and offline-first design.

## Development Stages

### Stage 0: Converter Suite
- **Length Converter** — Convert between mm, cm, m, km, in, ft, yd, mi
- **Temperature Converter** — Convert between Celsius, Fahrenheit, Kelvin
- **Weight Converter** — Convert between mg, g, kg, oz, lb, t

### Stage 1: Task Management (NEW)
- **Task Manager** — Create, edit, complete, and delete tasks
- **Local Persistence** — All tasks saved with AsyncStorage
- **Task Progress** — Visual progress tracking (completed/total)
- **Offline Support** — Full functionality without network

## Why I Built This

This project demonstrates end-to-end mobile development:

- Building multiple feature modules with clean architecture
- Tab-based navigation with Expo Router
- Creating reusable components with consistent styling
- Implementing full CRUD workflows
- Persisting data locally with AsyncStorage
- Handling app state across multiple screens
- Responsive UI with NativeWind (Tailwind CSS)

## Features

### Converter Suite (Stage 0)
- Real-time unit conversion across 8 length units
- Temperature conversion with precise decimal handling
- Weight conversion with metric and imperial units
- Instant results as you type
- Persistent converter state

### Task Manager (Stage 1)
- **Create Tasks** — Add task title and optional description
- **View Tasks** — Organized list separated by active/completed status
- **Edit Tasks** — Update task title and description in-place
- **Complete Tasks** — Toggle task completion with checkbox
- **Delete Tasks** — Remove tasks with confirmation
- **Progress Tracking** — Visual progress bar showing completion percentage
- **Offline Support** — All changes stored locally, no internet required
- **Timestamps** — Track when tasks were created and last updated

## Tech Stack

- **Framework:** Expo (React Native)
- **Language:** TypeScript
- **Routing:** Expo Router (file-based, tab-based navigation)
- **Storage:** `@react-native-async-storage/async-storage` (local persistence)
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **Icons:** `@expo/vector-icons` (Ionicons)
- **Build:** EAS Build

## Project Structure

```text
app/
  _layout.tsx              # Root layout with splash screen
  (tabs)/
    _layout.tsx            # Tab navigation configuration
    index.tsx              # Redirect to length converter (hidden)
    length.tsx             # Length converter screen
    temperature.tsx        # Temperature converter screen
    weight.tsx             # Weight converter screen
    tasks.tsx              # Task manager screen (Stage 1)

components/
  ConverterTabScreen.tsx   # Reusable converter tab component
  TaskComponents.tsx       # Task list item and form components

utils/
  toolkits.ts              # Converter logic and unit definitions
  taskStorage.ts           # AsyncStorage CRUD operations for tasks

styles/
  global.css               # Global Tailwind CSS
```

## Getting Started (Local Development)

### Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- Expo CLI
- Android Studio emulator OR Xcode simulator (Mac for iOS)

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Run the App

Start the development server:

```bash
npx expo start
```

Then choose:
- `a` — Android emulator
- `i` — iOS simulator
- `w` — Web preview
- Scan QR code with Expo Go app

### Run on Physical Device

Install **Expo Go** from Play Store or App Store, then scan the QR code from the terminal.

## Available Scripts

- `npm run start` — Start Expo development server
- `npm run dev` — Start with Expo dev client (if configured)
- `npm run android` — Build and run on Android emulator
- `npm run ios` — Build and run on iOS simulator
- `npm run web` — Open in web browser
- `npm run lint` — Run ESLint checks
- `npm run build` — Build with EAS Build

## Data Models

### Task (Stage 1)

```typescript
interface Task {
  id: string;              // Unique identifier (timestamp-based)
  title: string;           // Task name
  description: string;     // Optional description
  completed: boolean;      // Completion status
  createdAt: number;       // Creation timestamp (ms)
  updatedAt: number;       // Last update timestamp (ms)
}
```

Tasks are stored locally under AsyncStorage key: `@smart_utility_toolkit_tasks`

## Storage & Persistence

### AsyncStorage Schema

**Tasks Key:** `@smart_utility_toolkit_tasks`
```json
[
  {
    "id": "1704067200000",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "createdAt": 1704067200000,
    "updatedAt": 1704067200000
  }
]
```

All data persists across app sessions. Clearing app data removes all tasks.

## UI/UX Features

- **Glass-morphism Tab Bar** — Semi-transparent, rounded design with gradient
- **Dark Theme** — Optimized for eye comfort
- **Responsive Layout** — Adapts to different screen sizes
- **Touch Feedback** — Visual feedback on all interactive elements
- **Accessibility** — Proper focus states and semantic interactions

## Offline Support

The app is **fully functional offline**:
- All converters work without internet
- Tasks can be created, edited, and deleted without a server
- Changes sync instantly to local device storage
- No data loss when offline

## Known Limitations / Roadmap

- [ ] Cloud sync with Firebase (future stage)
- [ ] Task deletion confirmation (UX improvement)
- [ ] Task due dates (future enhancement)
- [ ] Task categories/tags (future enhancement)
- [ ] Export tasks (CSV/PDF)
- [ ] Multi-device sync
- [ ] Dark/light theme toggle
- [ ] Unit tests and E2E tests

## Styling Conventions

- **Colors:**
  - Primary: `#f97316` (orange-500)
  - Background: `#09090a` (black)
  - Surface: `#1c1917` (stone-900)
  - Text: `#f5f5f4` (stone-50)

- **Spacing:** Tailwind scale (2, 3, 4, 6, 8...)
- **Typography:** 
  - Headers: Bold, tracking-wider
  - Body: Medium, balanced line-height
  - Small: Reduced size, slate-400 color

- **Components:**
  - Buttons: 44px+ height for touch targets
  - Input fields: 40px+ height, clear focus states
  - Spacing: 16px gutters, 8px component gaps

## Author

Developed as part of the HNG Internship Stage 1 (Mobile Track).

## License

This project is part of the HNG Internship curriculum.