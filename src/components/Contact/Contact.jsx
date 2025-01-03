import React, { useRef, useEffect } from "react";
import emailjs from 'emailjs-com';
import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";

export const Contact = () => {
  const formNameRef = useRef(null);
  const formEmailRef = useRef(null);
  const formMessageRef = useRef(null);
  const sendButtonRef = useRef(null);

  useEffect(() => {
    emailjs.init('y7ErIv2KqYUZ8K17u'); // Add your EmailJS user ID here
    const sendButton = sendButtonRef.current;
    const formName = formNameRef.current;
    const formEmail = formEmailRef.current;
    const formMessage = formMessageRef.current;

    const handleSendClick = (event) => {
      event.preventDefault(); // Prevent the form from submitting
      
      // Get the values from the form fields
      const name = formName.value;
      const email = formEmail.value;
      const message = formMessage.value;

      if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
      }

      // Prepare the email parameters
      const templateParams = {
        to_name: name,
        from_name: email,
        message: message
      };

      emailjs.send('default_service', 'template_1h84quw', templateParams)
        .then(function() {
          alert('Message sent successfully!');
        })
        .catch(function(error) {
          alert('Failed to send message: ' + (error.text || 'An unknown error occurred.'));
        });
    };

    sendButton.addEventListener('click', handleSendClick);

    return () => {
      sendButton.removeEventListener('click', handleSendClick);
    };
  }, []);

  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.text}>
        <h2>Contact</h2>
        <div className={styles.contactssocialmedia}>
          <a href="https://github.com/MRili123" className={styles.iconlink}><img src={getImageUrl("contact/githube2.jpg")} /></a>
          <a href="mailto:jebrane.ilias@gmail.com" className={styles.iconlink}><img src={getImageUrl("contact/email.jpg")} /></a>
          <a href="https://profile.indeed.com/?hl=fr_MA&co=MA&from=gnav-jobseeker-profile--profile-one-frontend" className={styles.iconlink}><img src={getImageUrl("contact/indeed.jpg")} /></a>
          <a href="https://www.linkedin.com/in/ilias-jebrane-327830294/" className={styles.iconlink}><img src={getImageUrl("contact/linkedin.jpg")} /></a>
        </div>
      </div>
      <form id="contactForm" className={styles.form}>
        <h1 className="from_title">Talk to Us</h1>
        <input type="text" ref={formNameRef} id={styles.formName} className="form-control form-control-lg thick" placeholder="Name" />
        <input type="email" ref={formEmailRef} id={styles.formEmail} className="form-control form-control-lg thick" placeholder="E-mail" />
        <div className="form-group message">
          <textarea ref={formMessageRef} id={styles.formMessage} className="form-control form-control-lg" rows="7" cols="40" placeholder="Message"></textarea>
        </div>
        <button type="submit" ref={sendButtonRef} id={styles.sendButton} className={styles.btnprimary}>Send message</button>
      </form>
    </footer>
  );
};
