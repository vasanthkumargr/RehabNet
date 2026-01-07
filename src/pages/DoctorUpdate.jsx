import axios from "axios";
import { useState } from "react";
import { getToken } from "../services/token.service";

export default function DoctorUpdate() {
  const [id, setId] = useState("");
  const [doctor, setDoctor] = useState(null);
  const [msg, setMsg] = useState("");

  const fetchDoctor = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/doctors/${id}`,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setDoctor(res.data);
    } catch {
      setMsg("Doctor not found");
    }
  };

  const update = async () => {
    await axios.put(
      `http://localhost:5000/api/doctors/${id}`,
      doctor,
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    setMsg("Doctor updated");
  };

  return (
    <>
      <h3>Update Doctor</h3>
      <input placeholder="Doctor ID" onChange={e=>setId(e.target.value)}/>
      <button onClick={fetchDoctor}>Fetch</button>

      {doctor && (
        <>
          <input value={doctor.name}
            onChange={e=>setDoctor({...doctor,name:e.target.value})}/>
          <button onClick={update}>Save</button>
        </>
      )}

      <p>{msg}</p>
    </>
  );
}
