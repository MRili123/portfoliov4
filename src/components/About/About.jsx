import React, { useEffect, useState } from "react";
import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = ({ lang }) => {
  const [t, setT] = useState({});

  // 🔹 Load translations whenever lang changes
  useEffect(() => {
    fetch(`/${lang || "en"}/translation.json`)
      .then((res) => res.json())
      .then((data) => setT(data.about || {}))
      .catch(() => console.error("Failed to load translations"));
  }, [lang]);

  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>{t.title || "About"}</h2>
      <div className={styles.content}>
        <img
          src={getImageUrl("about/pfp2.jpg")}
          alt="Me sitting with a laptop"
          className={styles.aboutImage}
        />
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="Cursor icon" />
            <div className={styles.aboutItemText}>
              <h3>{t.frontendTitle || "Frontend Developer"}</h3>
              <p>
                {t.frontendDesc ||
                  "I'm a frontend developer with experience in building responsive and optimized sites"}
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/serverIcon.png")} alt="Server icon" />
            <div className={styles.aboutItemText}>
              <h3>{t.backendTitle || "Backend Developer"}</h3>
              <p>
                {t.backendDesc ||
                  "I have experience developing fast and optimised back-end systems and APIs"}
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="UI icon" />
            <div className={styles.aboutItemText}>
              <h3>{t.uiTitle || "UI Designer"}</h3>
              <p>
                {t.uiDesc ||
                  "I have designed multiple landing pages and have created design systems as well"}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
