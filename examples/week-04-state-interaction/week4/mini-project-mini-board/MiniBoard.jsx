import { useState } from "react";

const initialTasks = [
  { id: 1, title: "Read Chapter 3", description: "Focus on state + events" },
  { id: 2, title: "Build TaskCard", description: "Add one interactive button" },
  { id: 3, title: "Submit to GitHub", description: "3–5 commits minimum" },
];

export default function MiniBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedId, setSelectedId] = useState(null);

  function removeTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
    setSelectedId(prev => (prev === id ? null : prev));
  }

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <h2>Mini Task Board</h2>

      {tasks.map(task => {
        const isSelected = task.id === selectedId;

        return (
          <div
            key={task.id}
            onClick={() => setSelectedId(task.id)}
            style={{
              border: "1px solid #ccc",
              padding: 12,
              marginBottom: 8,
              cursor: "pointer",
              fontWeight: isSelected ? "700" : "400",
              textDecoration: isSelected ? "underline" : "none",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{task.title}</span>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  removeTask(task.id);
                }}
              >
                Remove
              </button>
            </div>

            {isSelected && <p style={{ marginTop: 8 }}>{task.description}</p>}
          </div>
        );
      })}
    </div>
  );
}
