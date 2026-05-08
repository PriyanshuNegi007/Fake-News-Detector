import Analyzer from "./Components/Analyzer/Analyzer.jsx";
import styles from "./App.module.css";
import Navbar from "./Components/NavBar/Navbar.jsx";
import About from "./Components/NavBar/About.jsx";
import HowItWorks from "./Components/NavBar/HowItWorks.jsx";
import Contributer from "./Components/NavBar/Contributer.jsx";

function App() {
  return (
    <div className={styles.page}>
      <Navbar/>
      <Analyzer/> 
      <About/>
      <HowItWorks/>
      <Contributer/>
    </div>
  );
}

export default App;
