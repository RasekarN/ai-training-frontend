import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-training-backend-1.onrender.com",
  timeout: 30000, 
});

// Smart retry system for Render cold starts
export const getSignal = async (payload) => {
  try {
    console.log("Sending request to backend:", payload);
    const response = await API.post("/tv-webhook", payload);
    console.log("Backend response:", response.data);
    return response.data;
  } catch (err) {
    console.warn("Backend cold start? Retrying in 2s…", err);

    await new Promise((res) => setTimeout(res, 2000));

    try {
      const retry = await API.post("/tv-webhook", payload);
      return retry.data;
    } catch (e) {
      throw new Error("Backend is down or unreachable. Try again after 10 seconds.");
    }
  }
};
