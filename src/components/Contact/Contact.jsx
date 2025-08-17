import React, { useRef, useEffect, useState } from "react";
import emailjs from "emailjs-com";
import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";

export const Contact = ({ lang }) => {
  const [t, setT] = useState({});
  const formNameRef = useRef(null);
  const formEmailRef = useRef(null);
  const formMessageRef = useRef(null);
  const sendButtonRef = useRef(null);

  // 🔹 Load translations whenever lang changes
  useEffect(() => {
    fetch(`/${lang || "en"}/translation.json`)
      .then((res) => res.json())
      .then((data) => setT(data.contact || {}))
      .catch(() => console.error("Failed to load translations"));
  }, [lang]);

  useEffect(() => {
    emailjs.init("y7ErIv2KqYUZ8K17u");
    const sendButton = sendButtonRef.current;
    const formName = formNameRef.current;
    const formEmail = formEmailRef.current;
    const formMessage = formMessageRef.current;

    const handleSendClick = (event) => {
      event.preventDefault();

      const name = formName.value;
      const email = formEmail.value;
      const message = formMessage.value;

      if (!name || !email || !message) {
        alert(t.alertFillFields || "Please fill out all fields.");
        return;
      }

      const templateParams = {
        to_name: name,
        from_name: email,
        message: message,
      };

      emailjs
        .send("default_service", "template_1h84quw", templateParams)
        .then(() => {
          alert(t.alertSuccess || "Message sent successfully!");
        })
        .catch((error) => {
          alert(
            (t.alertFail || "Failed to send message") +
              ": " +
              (error.text || "Unknown error")
          );
        });
    };

    if (sendButton) {
      sendButton.addEventListener("click", handleSendClick);
    }

    return () => {
      if (sendButton) {
        sendButton.removeEventListener("click", handleSendClick);
      }
    };
  }, [t]);

  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.text}>
        <h2>{t.title || "Contact"}</h2>
        <div className={styles.contactssocialmedia}>
          <a href="https://github.com/MRili123" className={styles.iconlink}>
            <img src={getImageUrl("contact/githube2.jpg")} alt="GitHub" />
          </a>
          <a href="mailto:jebrane.ilias@gmail.com" className={styles.iconlink}>
            <img src={getImageUrl("contact/email.jpg")} alt="Email" />
          </a>
          <a
            href="https://profile.indeed.com/?hl=fr_MA&co=MA&from=gnav-jobseeker-profile--profile-one-frontend"
            className={styles.iconlink}
          >
            <img src={getImageUrl("contact/indeed.jpg")} alt="Indeed" />
          </a>
          <a
            href="https://www.linkedin.com/in/ilias-jebrane-327830294/"
            className={styles.iconlink}
          >
            <img src={getImageUrl("contact/linkedin.jpg")} alt="LinkedIn" />
          </a>
        </div>
      </div>
      <form id="contactForm" className={styles.form}>
        <h1 className="from_title">{t.formTitle || "Talk to Us"}</h1>
        <input
          type="text"
          ref={formNameRef}
          id={styles.formName}
          placeholder={t.namePlaceholder || "Name"}
        />
        <input
          type="email"
          ref={formEmailRef}
          id={styles.formEmail}
          placeholder={t.emailPlaceholder || "E-mail"}
        />
        <div className="form-group message">
          <textarea
            ref={formMessageRef}
            id={styles.formMessage}
            rows="7"
            cols="40"
            placeholder={t.messagePlaceholder || "Message"}
          />
        </div>
        <button
          type="submit"
          ref={sendButtonRef}
          id={styles.sendButton}
          className={styles.btnprimary}
        >
          {t.sendButton || "Send message"}
        </button>
      </form>
    </footer>
  );
};
