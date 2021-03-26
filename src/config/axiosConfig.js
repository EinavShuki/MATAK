import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://www.hitprojectscenter.com/matakapinew/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosConfig;