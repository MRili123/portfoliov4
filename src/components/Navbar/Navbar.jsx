import React, { useState, useEffect } from "react";

import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";

export const Navbar = ({sendLang ,lang}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    value: "en",
    label: "English",
    imageUrl: getImageUrl("nav/uk.jpg"),
  });

  useEffect(() => {
    const dropdownButton = document.querySelector(`.${styles.dropdownbutton}`);
    const dropdownOptions = document.querySelector(`.${styles.dropdownoptions}`);

    const handleDropdownClick = () => {
      dropdownOptions.style.display =
        dropdownOptions.style.display === "block" ? "none" : "block";
    };

    const handleOptionClick = (event) => {
      const selectedOption = event.target.closest('li');
      const selectedImage = selectedOption.querySelector('img').src;
      const selectedText = selectedOption.textContent.trim();
      const selectedValue = selectedOption.getAttribute('data-value');

      setSelectedLanguage({
        value: selectedValue,
        label: selectedText,
        imageUrl: selectedImage,
      });
      sendLang(selectedValue);
      dropdownOptions.style.display = "none";
    };

    dropdownButton.addEventListener("click", handleDropdownClick);
    document.querySelectorAll(`.${styles.dropdownoptions} li`).forEach((option) => {
      option.addEventListener("click", handleOptionClick);
    });

    return () => {
      dropdownButton.removeEventListener("click", handleDropdownClick);
      document.querySelectorAll(`.${styles.dropdownoptions} li`).forEach((option) => {
        option.removeEventListener("click", handleOptionClick);
      });
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.customdropdown}>
        <button className={styles.dropdownbutton}>
          <img src={selectedLanguage.imageUrl} alt="" /> {selectedLanguage.label}
        </button>
        <ul className={styles.dropdownoptions}>
          <li data-value="en">
            <img src={getImageUrl("nav/uk.jpg")} alt="" /> English
          </li>
          <li data-value="fr">
            <img src={getImageUrl("nav/france.jpg")} alt="" /> France
          </li>
        </ul>
      </div>

      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={
            menuOpen
              ? getImageUrl("nav/closeIcon.png")
              : getImageUrl("nav/menuIcon.png")
          }
          alt="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <ul
          className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
          onClick={() => setMenuOpen(false)}
        >
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
