import axios from "axios";
import { useState } from "react";
import { getToken } from "../services/token.service";

export default function DoctorAdd() {
  const [form, setForm] = useState({ doctorId: "", name: "" });
  const [msg, setMsg] = useState("");

  const submit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/doctors",
        form,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setMsg(`Doctor Added | Password: ${res.data.password}`);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <>
      <h3>Add Doctor</h3>
      <input placeholder="Doctor ID"
        onChange={e=>setForm({...form,doctorId:e.target.value})}/>
      <input placeholder="Doctor Name"
        onChange={e=>setForm({...form,name:e.target.value})}/>
      <button onClick={submit}>Add</button>
      <p>{msg}</p>
    </>
  );
}
