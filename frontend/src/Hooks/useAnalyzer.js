import { useState } from "react";
import { predictNews, predictNewsWithImage  } from "../services/api";

export default function useAnalyzer() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = async (text, image) => {

    if (!text.trim() && !image) {
      setError("Provide text or image");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let response;

      if (image) {
        const formData = new FormData();
        formData.append("text", text || "");
        formData.append("image", image);

        response = await predictNewsWithImage(formData);
        setResult(response.data);
    } else {
        response = await predictNews(text);
        setResult(response.data);
    }

      setResult(response.data);

    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, analyze };
}
