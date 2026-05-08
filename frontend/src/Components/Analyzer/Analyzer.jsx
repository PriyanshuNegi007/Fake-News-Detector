import { useState } from "react";
import useAnalyzer from "../../Hooks/useAnalyzer";
import Result from "../Result/Result";
import Button from "../UI/Button";
import styles from "./Analyzer.module.css";

function Analyzer() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const { result, loading, error, analyze } = useAnalyzer();

  const handleSubmit = () => {
    analyze(text, image);
    
    setImage(null);
  };

  return (<>
    <div id="home"></div>
    <div className={styles.container}>
      <h1 className={styles.title}>Fake News Detector</h1>

        <label htmlFor="imageUpload" style={{ cursor: "pointer", display: "block", padding: "10px", marginTop: "10px" }}>
          🗁
        </label>

        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => setImage(e.target.files[0])}
        />

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            style={{ width: "120px", marginTop: "10px" }}
          />
        )}

      <textarea
        className={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste article here..."
      />

      <Button onClick={handleSubmit}>
        {loading ? "Analyzing..." : "Analyze"}
      </Button>

      {error && <p className={styles.error}>{error}</p>}
      {result && <Result result={result} />}
    </div>
  </>
  );
}

export default Analyzer;
