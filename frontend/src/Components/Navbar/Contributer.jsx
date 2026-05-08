import img1 from "../../assets/img1.jpeg";
import img2img3 from "../../assets/img2.jpeg";
import Ayush from "../../assets/img3.jpeg";

import styles from "./Contributer.module.css";

function Contributors() {
  const members = [
    {
      name: "Name",
      role: "Frontend",
      github: "github link",
      img: img1
    },
    {
      name: "Name",
      role: "Backend",
      github: "github link",
      img: img2
    },
    {
      name: "Name",
      role: "Machine Learning",
      github: "github link",
      img: img3
    }
  ];

  return (
    <section id="contributors">
        <div className={styles["contributors-card"]}>
            <h1>Contributors</h1>

            <div className={styles.members}>
                {members.map((m, i) => (
                    <div className={styles["member-card"]} key={i}>
                    <img src={m.img} alt={m.name} />
                    <h3> Name: {m.name}</h3>
                    <p>Role: {m.role}</p>
                    <a href={m.github} target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    </div>
                ))}
            </div>

        </div>
    </section>
  );
}

export default Contributors;
