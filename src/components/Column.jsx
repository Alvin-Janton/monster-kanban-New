import { useState } from "react";
import Monster from "./Monster";
import Task from "./Task";

export default function Column({
  title,
  color,
  tasks,
  onMove,
  onAdd,
  onRemove,
  name,
  monster,
}) {
  const [newTask, setNewTask] = useState("");
  const [newDueDate, setNewDueDate] = useState("");        // due date state
  const [newImportance, setNewImportance] = useState("not_important"); // importance state

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("task"));
    onMove(data.from, name, data.task);
  };

  const handleAdd = () => {
    if (newTask.trim() === "") return;
    // pass due date + importance up to parent
    onAdd(name, newTask, newDueDate, newImportance);
    setNewTask("");
    setNewDueDate("");
    setNewImportance("not_important");
  };

  return (
    <div
      className="flex flex-col items-center"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* Monster */}
      <Monster color={monster.color} height={monster.height} />

      {/* Board Column */}
      <div className={`${color} p-3 rounded-lg shadow w-full -mt-4`}>
        <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">
          {title}
        </h2>

        {/* Tasks */}
        <div className="flex-1 space-y-2 mb-3">
          {tasks.length === 0 ? (
            <p className="text-sm text-gray-500 text-center italic">
              No tasks yet
            </p>
          ) : (
            tasks.map((t) => (
              <Task key={t.id} task={t} from={name} onRemove={onRemove} />
            ))
          )}
        </div>

        {/* Add Task Box */}
        <div className="flex flex-col gap-2">
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full px-2 py-1 text-sm border rounded-md"
            placeholder="New Task..."
          />

          <input
            type="datetime-local"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
            className="w-full px-2 py-1 text-sm border rounded-md"
          />

          <select
            value={newImportance}
            onChange={(e) => setNewImportance(e.target.value)}
            className="w-full px-2 py-1 text-sm border rounded-md"
          >
            <option value="not_important">⚪ Not important</option>
            <option value="important">⚠️ Important</option>
            <option value="critical">🚨 Critical</option>
          </select>

          <button
            onClick={handleAdd}
            className="bg-white border text-sm px-3 py-1 rounded-md hover:bg-white/70 transition self-end"
          >
            ➕
          </button>
        </div>
      </div>
    </div>
  );
}
