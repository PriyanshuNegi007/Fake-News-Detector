import styles from "./About.module.css";

function About() {
  return (
    <section id="about" className={styles.container}>
      <h2 className={styles.title}>About This Project</h2>

      <p className={styles.text}>
        This project is a Fake News Detection tool that uses machine learning
        to classify news articles as real or fake.
      </p>

      <p className={styles.text}>
        The model was trained on a Kaggle fake news dataset containing real and fake news articles. Using algorithms like
        Logistic Regression, Support Vector Machine (SVM), and Random Forest.
        The best-performing model was selected and deployed using a FastAPI backend.
      </p>

      <p className={styles.text}>
        Users can input news content, and the system analyzes it to provide a
        prediction along with a confidence score.
      </p>

      <div className={styles.tech}>
        <h3>Dataset:</h3>
        <ul>
            <h4>Dataset is separated in two files:</h4>
            <li>Fake.csv (23502 fake news article)</li>
            <li>True.csv (21417 true news article)</li>   
        </ul>
        <ul>
            <h4>Dataset Columns:</h4>
            <li>Title: title of news article</li>
            <li>Text: body text of news article</li>
            <li>Subject: subject of news article</li>
            <li>Date: publish date of news article</li>
        </ul>
      </div>

      <div className={styles.tech}>
        <h3>Technologies Used:</h3>
        <ul>
          <li>React (for front-end)</li>
          <li>FastAPI (for back-end)</li>
          <li>Scikit-learn (for Machine-Learning) </li>
        </ul>
      </div>
    </section>
  );
}

export default About;
