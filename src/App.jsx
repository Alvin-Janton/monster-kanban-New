import "./App.css";
import KanbanBoard from "./components/KanbanBoard";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-600 flex flex-col items-center py-6">
      <h1 className="text-4xl font-bold text-red-700 mb-6">Monster Kanban</h1>
      <KanbanBoard />
    </div>
  );
}
