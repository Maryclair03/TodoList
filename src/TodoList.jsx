import { useState } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  // Add Task
  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  // Remove Task
  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Toggle Complete
  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Start Editing
  const startEditing = (index, text) => {
    setEditingIndex(index);
    setEditText(text);
  };

  // Save Edited Task
  const saveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editText;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditText("");
  };

  // Filtered Tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      <h2>To-Do List</h2>
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <input
        type="text"
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <ul>
        {filteredTasks.map((t, index) => (
          <li key={index} className={t.completed ? "completed" : ""}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(index)}>Save</button>
              </>
            ) : (
              <>
                <span onClick={() => toggleComplete(index)}>{t.text}</span>
                <button onClick={() => startEditing(index, t.text)}>✏️</button>
                <button onClick={() => removeTask(index)}>❌</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
