export const settoken = (t)=> localStorage.setItem("token",t);
export const getToken = () => localStorage.getItem("token");
export const logout = ()=> localStorage.clear();
