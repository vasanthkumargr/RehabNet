import { useState } from "react";
import { adminLogin } from "../api/auth_api";
import { setToken } from "../services/token.service";
import "../styles/login.css"; // Import the CSS file

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
  e.preventDefault();
  try {
    const res = await adminLogin(form);

    console.log("LOGIN RESPONSE:", res);
    console.log("TOKEN RECEIVED:", res.data.token);

    setToken(res.data.token);

    alert("Login success, token saved");
    window.location.replace("/dashboard");
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    alert("Login failed");
  }
};


  return (
    <form onSubmit={submit}>
      <h2>Admin Login</h2>

      <input
        placeholder="Username"
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}
