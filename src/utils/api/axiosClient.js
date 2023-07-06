import axios from "axios";
import { baseUrl } from "../constants";

export const authFetch = axios.create({
  baseURL: `${baseUrl}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const updateTokenFetch = axios.create({
  baseURL: `${baseUrl}/auth`,
  headers: {
    "Content-Type": "application/json",
    
  },
});


