export default function Task({ task, from, onRemove }) {
  const handleDragStart = (e) => {
    // Includes id, text, due_date, importance (since task now has all of them)
    e.dataTransfer.setData("task", JSON.stringify({ from, task }));
  };

  // Format the due date (if present)
  const formattedDueDate = task.due_date
    ? new Date(task.due_date).toLocaleString()
    : null;

  // Handle importance (default to not_important if missing)
  const importance = task.importance || "not_important";

  const importanceEmoji =
    importance === "critical"
      ? "🚨"
      : importance === "important"
      ? "⚠️"
      : "⚪"; // not_important

  const importanceLabel =
    importance === "critical"
      ? "Critical"
      : importance === "important"
      ? "Important"
      : "Not important";

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white p-3 rounded-md shadow cursor-grab hover:bg-gray-50 transition"
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1">
          <p className="text-gray-700 font-medium">{task.text}</p>

          {formattedDueDate && (
            <p className="text-xs text-gray-500 mt-1">
              Due: {formattedDueDate}
            </p>
          )}

          <p className="text-xs text-gray-600 mt-1">
            {importanceEmoji} {importanceLabel}
          </p>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => onRemove(from, task.id)}
          className="text-red-500 hover:text-red-700 text-sm ml-2"
        >
          ✖
        </button>
      </div>
    </div>
  );
}
