import axios from "axios";

axios.defaults.withCredentials = true;

const axiosConfig = axios.create({
  baseURL: "https://www.hitprojectscenter.com/mtk/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export default axiosConfig;
