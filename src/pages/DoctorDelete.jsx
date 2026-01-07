import axios from "axios";
import { useState } from "react";
import { getToken } from "../services/token.service";

export default function DoctorDelete() {
  const [id, setId] = useState("");
  const [msg, setMsg] = useState("");

  const del = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/doctors/${id}`,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setMsg("Doctor deleted");
    } catch {
      setMsg("Doctor not found");
    }
  };

  return (
    <>
      <h3>Delete Doctor</h3>
      <input placeholder="Doctor ID"
        onChange={e=>setId(e.target.value)}/>
      <button onClick={del}>Delete</button>
      <p>{msg}</p>
    </>
  );
}
