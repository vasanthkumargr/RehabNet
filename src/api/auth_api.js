import axios from "axios";
const api = import.meta.env.VITE_API_BASE_URL;

export const adminLogin = (data)=>
    axios.post(`${api}/auth/login`, data);