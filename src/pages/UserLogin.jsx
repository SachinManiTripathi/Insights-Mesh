import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default function Login() {
  const [user, setUser] = useState("");
  const nav = useNavigate();

  return (
    <div className="grid h-screen place-items-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!user.trim()) return;
          localStorage.setItem("token", uuid());
          nav("/");
        }}
        className="rounded-xl bg-white p-6 shadow dark:bg-gray-800"
      >
        <h2 className="mb-4 text-lg text-center font-semibold">Login</h2>
        <input
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="mb-6 w-full rounded border p-2 bg-white  dark:bg-gray-800
                      border border-gray-300 dark:border-gray-600
                      text-gray-900 dark:text-gray-100
                      placeholder-gray-500 dark:placeholder-gray-400
                      p-2
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      transition-colors"
          placeholder="Username"
        />
        <button
          className="w-full rounded bg-blue-600 p-2 text-white disabled:opacity-40"
          disabled={!user.trim()}
        >
          Click Here to Login
        </button>
      </form>
    </div>
  );
}
