import { useState, useEffect } from "react";
import { createDoctor, getDoctors } from "../api/auth_api";
import { getToken } from "../services/token-service";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = getToken();

  // Fetch doctors when dashboard loads
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await getDoctors(token);
      setDoctors(res.data.doctors);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await createDoctor(form, token);
      setMessage(`Doctor created: ${res.data.doctor.username}`);
      setForm({ username: "", password: "" });
      fetchDoctors(); // Refresh doctor list
    } catch (err) {
      setMessage(err.response?.data?.message || "Error creating doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      <div className="create-doctor-card">
        <h2>Create New Doctor</h2>
        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Doctor Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Doctor Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Doctor"}
          </button>
        </form>
      </div>

      {/* Doctor List Table */}
      <div className="doctor-list-card">
        <h2>Existing Doctors</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc._id}>
                <td>{doc._id}</td>
                <td>{doc.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
