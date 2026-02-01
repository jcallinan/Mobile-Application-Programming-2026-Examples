import { useState } from "react";
import TaskCard from "./TaskCard";

const initialTasks = [
  { id: 1, title: "Design UI", description: "Sketch layout", status: "todo", isExpanded: false },
  { id: 2, title: "Build API", description: "Create endpoints", status: "todo", isExpanded: false },
  { id: 3, title: "Write tests", description: "Add basic tests", status: "done", isExpanded: false },
];

export default function Board() {
  const [tasks, setTasks] = useState(initialTasks);

  function toggleStatus(taskId) {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? {
            ...task,
            status: task.status === "todo" ? "done" : "todo",
          }
          : task
      )
    );
  }

  function toggleDetails(taskId) {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, isExpanded: !task.isExpanded }
          : task
      )
    );
  }

  function removeTask(taskId) {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <h2>Board</h2>

      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleStatus={() => toggleStatus(task.id)}
          onToggleDetails={() => toggleDetails(task.id)}
          onRemove={() => removeTask(task.id)}
        />
      ))}
    </div>
  );
}
