import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUsername } from "../redux/slice";

export function Home() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;

    dispatch(setUsername(trimmedName));
    navigate("/flights");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1603041080359-2f930d7db86e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl px-6">
       
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-blue-950 mb-3 drop-shadow-md">
            Welcome to FlightGo
          </h1>
          <h3 className="text-black text-lg drop-shadow-sm">
            Complete the login process to proceed further
          </h3>
        </div>

       
        <form
          onSubmit={handleLogin}
          className="bg-slate-800 p-12 rounded-3xl w-full max-w-lg text-center shadow-xl border border-slate-700 backdrop-blur-sm "
        >
          <input
            type="text"
            placeholder="Enter your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 mb-6 rounded-xl bg-slate-700 text-slate-100 text-center text-lg placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />

          <button
            type="submit"
            className="w-full px-6 py-4 rounded-xl bg-blue-600 font-bold text-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
