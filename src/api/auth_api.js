import axios from "axios";
const api = import.meta.env.VITE_API_BASE_URL;

export const adminLogin = (data)=>
    axios.post(`${api}/auth/login`, data);

// Create new doctor
export const createDoctor = (data, token) =>
  axios.post(`${api}/admin/doctor`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

  // Get all doctors
export const getDoctors = (token) =>
  axios.get(`${api}/admin/doctors`, {
    headers: { Authorization: `Bearer ${token}` },
  });
