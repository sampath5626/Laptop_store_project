import axios from "axios";

const api = axios.create({
  baseURL: "https://laptop-store-backend-7n5x.onrender.com"
});

export default api;