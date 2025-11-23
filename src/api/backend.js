import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

export const getSignal = async (payload) => {
  const response = await API.post("/tv-webhook", payload);
  return response.data;
};
