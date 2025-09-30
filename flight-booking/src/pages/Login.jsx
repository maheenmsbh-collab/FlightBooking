import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // prevent refresh
    const trimmedName = name.trim();

    if (!trimmedName) {
      alert("Please enter your name!");
      return;
    }

    // Save username in localStorage
    localStorage.setItem("username", trimmedName);

    // Navigate to home (flight search page)
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900">
      <form
        onSubmit={handleLogin}
        className="bg-slate-800 p-8 rounded-lg shadow-md text-center w-80"
      >
        <h1 className="text-2xl font-bold mb-4 text-blue-400">
          Welcome to SkyBook ✈️
        </h1>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded w-full mb-4 bg-slate-700 text-center text-slate-100"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-full font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}
