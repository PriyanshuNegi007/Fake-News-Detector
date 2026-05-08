import styles from "./HowItWorks.module.css";
import modelGraph from "../../assets/ModelComparision.png";
import modelPipeline from "../../assets/ModelPipeline.png";

function HowItWorks() {
  return (
    <section id="how" className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>How It Works</h2>

        <p className={styles.text}>
          This system uses machine learning to classify news articles as real or fake.
          It follows a structured pipeline from data preprocessing to model prediction.
        </p>

        <img src={modelPipeline} alt="Model Comparison Graph" className={styles.graph}></img>

        <h3>1. Dataset</h3>
        <ul>
          <li>Used Kaggle Fake.csv and True.csv datasets</li>
          <li>Combined into one dataset with labels (0 = Fake, 1 = Real)</li>
        </ul>

        <h3>2. Data Preprocessing</h3>
        <ul>
          <li>Removed punctuation, special characters, and stopwords</li>
          <li>Converted text to lowercase</li>
        </ul>

        <h3>3. Feature Extraction</h3>
        <ul>
          <li>Used TF-IDF vectorization</li>
          <li>Converted text into numerical form</li>
        </ul>

        <h3>4. How Models Understand the Data</h3>
        <ul>
          <li><strong>Naive Bayes:</strong> Uses probability of words</li>
          <li><strong>SVM:</strong> Finds boundary between fake and real news</li>
          <li><strong>Random Forest:</strong> Uses multiple decision trees</li>
          <li><strong>Linear Regression:</strong> Used as baseline</li>
          <li><strong>Long Short Term Memory:</strong> Used as advanced model</li>
        </ul>

        <h3>5. Model Selection</h3>
        <ul>
          <li>Compared models based on accuracy</li>
          <img src={modelGraph} alt="Model Comparison Graph" className={styles.graph}></img>
          <li>Selected best-performing model</li>
        </ul>

        <h3>6. Prediction</h3>
        <ul>
          <li>User enters news text</li>
          <li>Processed and converted using TF-IDF</li>
          <li>Model predicts Real or Fake</li>
        </ul>
      </div>
    </section>
  );
}

export default HowItWorks;