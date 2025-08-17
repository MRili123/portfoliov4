import React, { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const Hero = ({ lang }) => {
  const containerRef = useRef(null);
  const [t, setT] = useState({});

  // 🔹 Load translations whenever lang changes
  useEffect(() => {
    fetch(`/${lang || "en"}/translation.json`)
      .then((res) => res.json())
      .then((data) => setT(data.hero || {}))
      .catch(() => console.error("Failed to load translations"));
  }, [lang]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040, 60);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
    directionalLight.position.set(2, 5, 5).normalize();
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    let mixer, avatar;

    const adjustModelForScreen = () => {
      if (window.innerWidth <= 768) {
        avatar.scale.set(4, 4, 4);
        avatar.position.set(0, -4, 0);
        camera.position.set(0, 1, 6);
        camera.lookAt(0, -0.5, 0);
      } else {
        avatar.scale.set(3.5, 3.5, 3.5);
        avatar.position.set(0, -1.5, 0);
        camera.position.set(0, 2, 8);
        camera.lookAt(0, 0, 0);
      }
    };

    loader.load(
      "./ilias3D_hello.glb",
      (gltf) => {
        avatar = gltf.scene;
        adjustModelForScreen();
        scene.add(avatar);

        mixer = new THREE.AnimationMixer(avatar);
        const animations = gltf.animations;
        const helloAction = mixer.clipAction(
          animations.find((clip) => clip.name.toLowerCase() === "hello")
        );
        const idleAction = mixer.clipAction(
          animations.find((clip) => clip.name.toLowerCase() === "idle")
        );

        if (helloAction && idleAction) {
          helloAction.loop = THREE.LoopOnce;
          helloAction.clampWhenFinished = true;
          idleAction.loop = THREE.LoopRepeat;

          helloAction.play();

          mixer.addEventListener("finished", (e) => {
            if (e.action === helloAction) {
              idleAction.reset();
              idleAction.crossFadeFrom(helloAction, 0.5, true);
              idleAction.play();

              setTimeout(() => {
                helloAction.reset();
                helloAction.crossFadeFrom(idleAction, 0.5, true);
                helloAction.play();
              }, 1500);
            }
          });
        }

        window.addEventListener("resize", () => {
          renderer.setSize(container.clientWidth, container.clientHeight);
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          adjustModelForScreen();
        });
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("An error occurred while loading the model:", error);
      }
    );

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  const handleCV = () => {
    let fileUrl;
    let fileName;
    if (lang === "en") {
      fileUrl = "./cv_en.pdf";
      fileName = "IliasJebraneCV_EN.pdf";
    } else if (lang === "fr") {
      fileUrl = "./cv_fr.pdf";
      fileName = "IliasJebraneCV_FR.pdf";
    }

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t.title || "Hi, I'm Ilias"}</h1>
        <p className={styles.description}>
          {t.description ||
            "I'm a full-stack developer with 5 years of experience using React and NodeJS. Reach out if you'd like to learn more!"}
        </p>
        <div className={styles.downloadcontainer}>
          <a href="#contact" className={styles.contactBtn}>
            {t.contactBtn || "Contact Me"}
          </a>
          <button className={styles.contactBtn} onClick={handleCV}>
            {t.downloadBtn || "Download CV"}
          </button>
        </div>
      </div>
      <div id="model-container" className={styles.heroImg} ref={containerRef} />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
