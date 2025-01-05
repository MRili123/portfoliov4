import styles from "./App.module.css";
import React, { useState } from 'react';
import { About } from "./components/About/About";
import { Contact } from "./components/Contact/Contact";
import { Experience } from "./components/Experience/Experience";
import { Hero } from "./components/Hero/Hero";
import { Navbar } from "./components/Navbar/Navbar";
import { Projects } from "./components/Projects/Projects";

function App() {
  const [lang, setLang] = useState("");
  return (
    <div className={styles.App}>
      <Navbar sendLang={setLang} lang={lang} />
      <Hero lang={lang} />
      <About  lang={lang} />
      <Experience lang={lang}  />
      <Projects  lang={lang} />
      <Contact lang={lang} />
    </div>
  );
}

export default App;
