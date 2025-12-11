import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTodo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setText("");
  };

  const handleToggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth:"100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "40px",
        background: "#0f172a",
        color: "#e5e7eb",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#020617",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          border: "1px solid #1f2937",
        }}
      >
        <h1 style={{ fontSize: "24px", marginBottom: "4px" }}>Todo App</h1>
        <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "16px" }}>
          Simple one-component React todo list.
        </p>

        <form
          onSubmit={handleAddTodo}
          style={{ display: "flex", gap: "8px", marginBottom: "16px" }}
        >
          <input
            type="text"
            placeholder="Add a new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #374151",
              background: "#020617",
              color: "#e5e7eb",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "none",
              background: "#3b82f6",
              color: "#f9fafb",
              fontSize: "14px",
              cursor: "pointer",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            Add
          </button>
        </form>

        {todos.length === 0 ? (
          <p style={{ fontSize: "13px", color: "#6b7280" }}>
            No tasks yet. Add your first one ✏️
          </p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {todos.map((todo) => (
              <li
                key={todo.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 10px",
                  borderRadius: "8px",
                  background: "#020617",
                  border: "1px solid #1f2937",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      textDecoration: todo.completed ? "line-through" : "none",
                      color: todo.completed ? "#6b7280" : "#e5e7eb",
                    }}
                  >
                    {todo.text}
                  </span>
                </label>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#f97373",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
