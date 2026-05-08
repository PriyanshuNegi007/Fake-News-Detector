import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Fake News Detector</div>

      <ul className={styles.links}>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#how">How it Works</a></li>
        <li><a href="#contributors">Contributors</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;