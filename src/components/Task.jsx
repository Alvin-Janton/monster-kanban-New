export default function Task({ task, from, onRemove }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("task", JSON.stringify({ from, task }));
  };

  // Format the due date (if present)
  const formattedDueDate = task.due_date
    ? new Date(task.due_date).toLocaleString()
    : null;

  // Importance logic
  const importance = task.importance || "not_important";

  const importanceEmoji =
    importance === "critical"
      ? "🚨"
      : importance === "important"
      ? "⚠️"
      : "⚪";

  const importanceLabel =
    importance === "critical"
      ? "Critical"
      : importance === "important"
      ? "Important"
      : "Not important";

  // Full border color based on importance
  const borderColor =
    importance === "critical"
      ? "border-red-500"
      : importance === "important"
      ? "border-yellow-500"
      : "border-green-500";

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={`bg-white p-3 rounded-md shadow cursor-grab hover:bg-gray-50 transition border-2 ${borderColor}`}
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
