import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-training-backend-c67c.onrender.com",
});

export const getSignal = async (payload) => {
  const response = await API.post("/tv-webhook", payload);
  return response.data;
};
