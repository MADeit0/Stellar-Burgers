import axios from "axios";
import { baseUrl } from "../constants";

export const authInstance = axios.create({
  baseURL: `${baseUrl}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});
