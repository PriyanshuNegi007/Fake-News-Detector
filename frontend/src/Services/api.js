import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const predictNews = (text) => {
  return API.post("/predict", { text });
};

export const predictNewsWithImage = (formData) => {
  return API.post("/predict-image", formData);
};
