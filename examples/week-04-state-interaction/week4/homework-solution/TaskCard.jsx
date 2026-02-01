export default function TaskCard({
  task,
  onToggleStatus,
  onToggleDetails,
  onRemove,
}) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 12, marginBottom: 10 }}>
      <h3 style={{ margin: 0 }}>{task.title}</h3>

      <p style={{ marginTop: 6 }}>
        Status: <b>{task.status}</b>
      </p>

      {task.isExpanded && (
        <p style={{ marginTop: 6 }}>{task.description}</p>
      )}

      <button onClick={onToggleStatus}>
        {task.status === "todo" ? "Mark Done" : "Mark Todo"}
      </button>{" "}
      <button onClick={onToggleDetails}>
        {task.isExpanded ? "Hide Details" : "Show Details"}
      </button>{" "}
      <button onClick={onRemove}>Remove</button>
    </div>
  );
}
