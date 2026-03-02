import { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("token")
  );

  return isLoggedIn
    ? <Dashboard onLogout={() => setIsLoggedIn(false)} />
    : <Login onLogin={() => setIsLoggedIn(true)} />;
}