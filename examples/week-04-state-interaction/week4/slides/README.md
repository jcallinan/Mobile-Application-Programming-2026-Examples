# Week 4 Slides: State + Interaction

## Slide 5 — State Fundamentals

Rules to memorize:

- State belongs to the component that owns the truth.
- You never mutate state in place; you replace it with a new value.
- Setters don’t change state immediately; they schedule a re-render.
- When next state depends on previous state, pass an updater function.

```jsx
// 1) Simple state
const [isOpen, setIsOpen] = useState(false);

// 2) State update based on previous value (safe)
setIsOpen(prev => !prev);
```

Online reference: useState reference.
Optional deeper reference: batching/queued updates.

---

## Slide 6 — The React Interaction Loop

Map to code:

- User action: click “Mark Complete”
- Event: onClick
- Handler: handleToggleComplete(taskId)
- State update: setTasks(prev => prev.map(...))
- Render output: card now shows status “done” (style + text)

Right-side box: Your job when debugging

- Find the event handler.
- Find the setter call.
- Find the render expression that depends on that state.

---

## Slide 7 — MAP / Project Opening

Architecture diagram (words):

```
App → Board → many TaskCard
```

Single source of truth:

- Board owns the tasks array; TaskCard never edits the array directly.

File layout:

```
/src/App.jsx
/src/components/Board.jsx
/src/components/TaskCard.jsx
```

---

## Slide 8 — Board.jsx Responsibility and Role

Parent owns state, children render + request changes:

- Board is the state owner: it stores tasks and defines update functions.
- TaskCard is a presentational + event component: it displays a task and raises events.
- Callback props are the contract between child and parent.

```jsx
<TaskCard
  key={task.id}
  task={task}
  onToggleDone={() => toggleTaskDone(task.id)}
/>
```

---

## Slide 9 — Board.jsx State Definition

Task shape and why each field exists:

- id: stable key for React rendering
- title, description: display text
- status: drives rendering (done vs todo)
- optionally isExpanded: drives toggle details UI

```jsx
const initialTasks = [
  { id: 1, title: "Design UI", description: "Sketch layout", status: "todo", isExpanded: false },
  { id: 2, title: "Build API", description: "Create endpoints", status: "todo", isExpanded: false },
  { id: 3, title: "Write tests", description: "Add basic tests", status: "done", isExpanded: false },
];

const [tasks, setTasks] = useState(initialTasks);
```

---

## Slide 10 — Rendering from State

Two essentials:

- Rendering lists is a transformation: data array → component array.
- key must be stable and unique; using array index breaks UI when you remove/reorder.

```jsx
return (
  <div>
    {tasks.map(task => (
      <TaskCard
        key={task.id}
        task={task}
        onToggleDone={() => toggleTaskDone(task.id)}
        onRemove={() => removeTask(task.id)}
        onToggleDetails={() => toggleDetails(task.id)}
      />
    ))}
  </div>
);
```

Online references: rendering lists + keys.

---

## Slide 11 — Updating State (moveTask pattern)

Golden patterns:

- Update one item: map
- Remove one item: filter
- Add new item: setTasks(prev => [...prev, newTask])

Option A — toggle status

```jsx
function toggleTaskDone(taskId) {
  setTasks(prev =>
    prev.map(t =>
      t.id === taskId
        ? { ...t, status: t.status === "todo" ? "done" : "todo" }
        : t
    )
  );
}
```

Option B — remove

```jsx
function removeTask(taskId) {
  setTasks(prev => prev.filter(t => t.id !== taskId));
}
```

Option C — toggle visual property

```jsx
function toggleDetails(taskId) {
  setTasks(prev =>
    prev.map(t =>
      t.id === taskId ? { ...t, isExpanded: !t.isExpanded } : t
    )
  );
}
```

Online references: updating objects/arrays in state.

---

## Slide 12 — Why This Re-Renders

Exam answer template (fill in the blanks):

- “The board re-renders because ______ was called.”
- “That replaced the ______ reference with a new ______.”
- “React compares ______, sees it changed, and runs Board again.”
- “The UI changes because render uses ______ in .map() and conditional rendering.”

```jsx
// BEFORE: tasks points to array A
// AFTER:  tasks points to array B (new reference)
setTasks(prev => prev.map(...));
```

---

## Slide 13 — Explain Why This Re-Renders (Exam Prep)

Rubric (no vague language):

Full credit requires:

- Name the handler (e.g., toggleTaskDone)
- Name the setter (setTasks)
- Describe the immutable replacement (new array/object)
- Point to what in render depends on it (tasks.map, conditional style/text)

Bad vs good:

- Bad: “React updates the screen.”
- Good: “toggleTaskDone called setTasks, replacing the tasks array with a new array where one task’s status changed; Board re-ran and the TaskCard conditional render changed.”

---

## Slide 14 — Predict the UI

Mini questions:

- If status === "done", what text/style should render?
- If isExpanded === false, what should be hidden?
- If you remove task id 2, what happens to the list and why does key matter?

```jsx
<p>Status: {task.status}</p>
{task.isExpanded && <p>{task.description}</p>}
<button onClick={onToggleDetails}>
  {task.isExpanded ? "Hide Details" : "Show Details"}
</button>
```

---

## Slide 15 — Key Takeaways

You should now be able to:

- Create state with useState
- Render a list with .map() and stable key
- Update array state immutably with map/filter
- Pass callbacks down as props and call them from child events
- Explain re-rendering precisely (no hand-waving)

Common failure modes:

- Mutating state directly (no UI update / confusing bugs)
- Missing key
- Putting state in the wrong component (hard to coordinate updates)

---

## Slide 16 — For Next Week (Homework)

Repo name: `react-state-interaction`

Commit plan:

- Initial CRA + runs
- Add TaskCard static UI
- Add Board with tasks in state
- Add interaction (toggle/remove/details)
- Styling / cleanup / README

Online references:

- Pushing commits to remote repo.
- What git add does.

### Quick In-Class Exercises (10–18 min each)

#### Exercise 1 (10–12 min): Traffic Light Controller

Goal: A small UI where buttons change a “mode” state and the UI responds.

What they practice: useState, event handlers, conditional rendering, derived UI.

Steps:

1. Create component `TrafficLight.jsx`.
2. Add state:

```jsx
const [light, setLight] = useState("red");
```

3. Render three buttons: Red / Yellow / Green.
4. Render a “light display” that changes based on light:
   - Text changes: “STOP”, “WAIT”, “GO”
   - Optional: add CSS class based on light

Minimal code:

```jsx
import { useState } from "react";

export default function TrafficLight() {
  const [light, setLight] = useState("red");

  const message =
    light === "red" ? "STOP" :
    light === "yellow" ? "WAIT" :
    "GO";

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <h2>Traffic Light Controller</h2>

      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setLight("red")}>Red</button>{" "}
        <button onClick={() => setLight("yellow")}>Yellow</button>{" "}
        <button onClick={() => setLight("green")}>Green</button>
      </div>

      <p>Current light: <b>{light}</b></p>
      <p>Driver instruction: <b>{message}</b></p>
    </div>
  );
}
```

Debrief question (exam-style):

- “Explain why clicking Yellow re-renders. Name the handler, state update, and what changes in render output.”

#### Exercise 2 (15–18 min): Mini Task Board — Highlight + Remove

Goal: A tiny board with tasks in an array; click a task to highlight it; remove tasks.

What they practice: tasks in state, .map(), key, filter, visual property.

Steps:

1. Create `MiniBoard.jsx`.
2. Add initial array in state with `{ id, title, description }`.
3. Add `selectedId` state (null initially).
4. Render tasks using `.map()` with `key={task.id}`.
5. Clicking a task sets `selectedId` to that task’s id.
6. “Remove” button deletes it using filter.
7. Conditional style if `task.id === selectedId`.

Code:

```jsx
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
                onClick={(e) => {
                  e.stopPropagation(); // don't also select when removing
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
```

Debrief questions:

- “Why do we need key={task.id}?”
- “Explain why filter causes a re-render.”
- “What state changed when the description appeared/disappeared?”

---

## Homework-Aligned Code Starter

TaskCard.jsx (students fill in button behavior if you prefer):

```jsx
export default function TaskCard({ task, onToggleStatus, onToggleDetails }) {
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
      </button>
    </div>
  );
}
```

Board.jsx (students implement the three update functions):

```jsx
import { useState } from "react";
import TaskCard from "./TaskCard";

const initialTasks = [
  { id: 1, title: "Task 1", description: "Add a description", status: "todo", isExpanded: false },
  { id: 2, title: "Task 2", description: "Add a description", status: "todo", isExpanded: false },
];

export default function Board() {
  const [tasks, setTasks] = useState(initialTasks);

  function toggleStatus(taskId) {
    // TODO: implement with setTasks(prev => prev.map(...))
  }

  function toggleDetails(taskId) {
    // TODO: implement with setTasks(prev => prev.map(...))
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
        />
      ))}
    </div>
  );
}
```

---

## Homework

Follow these steps to practice state and user interaction, using the ideas from Chapter 3.

1. Create a new React project
   - Use Create React App (same setup as in class).
   - Confirm the app runs in the browser.

2. Create a TaskCard component
   - Create a component called TaskCard that displays:
     - A task title
     - A task description
   - Add one interactive button inside TaskCard (example: “Mark Complete” or “Toggle Details”).
   - Clicking the button must:
     - Update state
     - Change what is shown on screen

3. Create a Board component with state
   - Store a list of tasks in state (useState)
   - Render multiple TaskCard components using .map()
   - Each task should include: id, title, description, status (“todo” or “done”)

4. Add interaction: move or update a task
   - Click a button to change the task’s status, or remove a task, or toggle a visual property.
   - The UI must update automatically based on state.

5. GitHub submission
   - Create a repo named: `react-state-interaction`
   - Commit at least 3–5 times
   - Submit the repo link in Canvas
