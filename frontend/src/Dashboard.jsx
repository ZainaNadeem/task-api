import { useEffect, useState } from "react";
import { getMe, getTasks, createTask, completeTask, deleteTask } from "./api";

export default function Dashboard({ onLogout }) {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMe(), getTasks()])
      .then(([userRes, tasksRes]) => {
        setUser(userRes.data);
        setTasks(tasksRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const res = await createTask(title, desc);
    setTasks([...tasks, res.data]);
    setTitle("");
    setDesc("");
  };

  const handleComplete = async (id) => {
    const res = await completeTask(id);
    setTasks(tasks.map(t => t.id === id ? res.data : t));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    onLogout();
  };

  if (loading) return <div style={styles.center}>Loading...</div>;

  const pending = tasks.filter(t => !t.completed);
  const completed = tasks.filter(t => t.completed);

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.logo}>Task Manager</h1>
        <div style={styles.userInfo}>
          <span style={styles.badge(user?.role)}>{user?.role}</span>
          <span style={styles.username}>{user?.username}</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div style={styles.container}>
        {/* Create Task Form */}
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>New Task</h2>
          <form onSubmit={handleCreate}>
            <input
              style={styles.input}
              placeholder="Task title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <input
              style={styles.input}
              placeholder="Description (optional)"
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
            <button style={styles.createBtn}>+ Add Task</button>
          </form>
        </div>

        {/* Stats */}
        <div style={styles.statsRow}>
          <div style={styles.stat("#4f46e5")}>
            <span style={styles.statNum}>{tasks.length}</span>
            <span>Total</span>
          </div>
          <div style={styles.stat("#f59e0b")}>
            <span style={styles.statNum}>{pending.length}</span>
            <span>Pending</span>
          </div>
          <div style={styles.stat("#10b981")}>
            <span style={styles.statNum}>{completed.length}</span>
            <span>Done</span>
          </div>
        </div>

        {/* Pending Tasks */}
        {pending.length > 0 && (
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Pending</h2>
            {pending.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={handleComplete}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Completed Tasks */}
        {completed.length > 0 && (
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Completed</h2>
            {completed.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {tasks.length === 0 && (
          <div style={styles.empty}>No tasks yet. Create one above! 🎯</div>
        )}
      </div>
    </div>
  );
}

function TaskCard({ task, onComplete, onDelete }) {
  return (
    <div style={styles.taskCard(task.completed)}>
      <div style={styles.taskInfo}>
        <p style={styles.taskTitle(task.completed)}>{task.title}</p>
        {task.description && (
          <p style={styles.taskDesc}>{task.description}</p>
        )}
      </div>
      <div style={styles.taskActions}>
        {!task.completed && (
          <button style={styles.doneBtn} onClick={() => onComplete(task.id)}>
            ✓ Done
          </button>
        )}
        <button style={styles.deleteBtn} onClick={() => onDelete(task.id)}>
          🗑
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f0f2f5" },
  center: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" },
  header: {
    background: "white", padding: "1rem 2rem", display: "flex",
    justifyContent: "space-between", alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  logo: { margin: 0, color: "#1a1a2e", fontSize: "1.4rem" },
  userInfo: { display: "flex", alignItems: "center", gap: "0.75rem" },
  badge: role => ({
    padding: "0.2rem 0.6rem", borderRadius: "999px", fontSize: "0.75rem",
    fontWeight: "600", background: role === "admin" ? "#fef3c7" : "#ede9fe",
    color: role === "admin" ? "#92400e" : "#4338ca",
  }),
  username: { fontWeight: "600", color: "#333" },
  logoutBtn: {
    padding: "0.4rem 1rem", background: "transparent", border: "1px solid #ddd",
    borderRadius: "8px", cursor: "pointer", color: "#666",
  },
  container: { maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" },
  card: {
    background: "white", borderRadius: "12px", padding: "1.5rem",
    marginBottom: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },
  sectionTitle: { margin: "0 0 1rem", color: "#1a1a2e", fontSize: "1.1rem" },
  input: {
    width: "100%", padding: "0.65rem", marginBottom: "0.75rem",
    border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "0.95rem",
    boxSizing: "border-box",
  },
  createBtn: {
    padding: "0.65rem 1.5rem", background: "#4f46e5", color: "white",
    border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600",
  },
  statsRow: { display: "flex", gap: "1rem", marginBottom: "1.5rem" },
  stat: color => ({
    flex: 1, background: "white", borderRadius: "12px", padding: "1.25rem",
    textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    borderTop: `3px solid ${color}`, display: "flex", flexDirection: "column",
    color: "#666", fontSize: "0.85rem", fontWeight: "500",
  }),
  statNum: { fontSize: "2rem", fontWeight: "700", color: "#1a1a2e" },
  taskCard: done => ({
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "0.85rem", borderRadius: "8px", marginBottom: "0.5rem",
    background: done ? "#f8fafc" : "#fafafa", border: "1px solid #e2e8f0",
    opacity: done ? 0.7 : 1,
  }),
  taskInfo: { flex: 1 },
  taskTitle: done => ({
    margin: 0, fontWeight: "600", color: "#1a1a2e",
    textDecoration: done ? "line-through" : "none",
  }),
  taskDesc: { margin: "0.25rem 0 0", fontSize: "0.85rem", color: "#888" },
  taskActions: { display: "flex", gap: "0.5rem" },
  doneBtn: {
    padding: "0.35rem 0.75rem", background: "#10b981", color: "white",
    border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem",
  },
  deleteBtn: {
    padding: "0.35rem 0.5rem", background: "transparent", border: "1px solid #e2e8f0",
    borderRadius: "6px", cursor: "pointer", fontSize: "0.9rem",
  },
  empty: { textAlign: "center", color: "#999", padding: "3rem", background: "white", borderRadius: "12px" },
};