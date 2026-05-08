import styles from "./Result.module.css";

function Result({ result }) {
  const isReal = result.prediction === "REAL";

  const getColor = (val) => {
    const intensity = Math.min(Math.abs(val) * 5, 1);

    return val > 0
      ? `rgba(0, 200, 0, ${intensity})` 
      : `rgba(255, 0, 0, ${intensity})`;
  };

  return (
    <div className={styles.result}>
      <h2 className={isReal ? styles.real : styles.fake}>
        {result.prediction}
      </h2>

      <p>Confidence: {result.confidence}%</p>

      <div className={styles.textBox}>
        {result.explanation?.map((item, index) => (
          <span
            key={index}
            style={{
              backgroundColor: getColor(item.importance),
              padding: "3px 6px",
              margin: "2px",
              borderRadius: "4px",
              display: "inline-block"
            }}
            title={`Impact: ${item.importance.toFixed(4)}`}
          >
            {item.word}
          </span>
        ))}
      </div>

      <div className={styles.legend}>
        <span className={styles.fakeBox}>Fake signal</span>
        <span className={styles.realBox}>Real signal</span>
      </div>
    </div>
  );
}

export default Result;
