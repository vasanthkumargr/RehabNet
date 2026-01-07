import axios from "axios";
const api = meta.env.VITE_API_BASE_URL+"api/";

export const adminLogin = (data)=>
    axios.post(`${api}/auth/login`, data);