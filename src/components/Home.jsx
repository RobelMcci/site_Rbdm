import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const START_DATE = new Date(2019, 1, 14);

const LOVE_MESSAGES = [
  {
    text: "Chaque instant avec toi est un trésor",
    emoji: "💖",
    color: "#bd342e",
  },
  { text: "Ton sourire illumine mes journées", emoji: "✨", color: "#bc473e" },
  {
    text: "Je t'aime plus que les mots ne peuvent le dire",
    emoji: "📝",
    color: "#d9c1b8",
  },
  { text: "Tu es ma plus belle aventure", emoji: "🌟", color: "#bd342e" },
  { text: "Notre amour grandit chaque jour", emoji: "🌱", color: "#bc473e" },
];

const QUICK_LINKS = [
  {
    icon: "📸",
    title: "Galerie Photo",
    description: "Parcourez nos plus beaux souvenirs immortalisés en images",
    link: "/gallery",
    color: "#bd342e",
  },
  {
    icon: "💌",
    title: "Messages du Cœur",
    description: "Laissez-vous porter par nos mots doux et poèmes",
    link: "/messages",
    color: "#bc473e",
  },
  {
    icon: "📖",
    title: "Notre Histoire",
    description: "Revivez chaque chapitre de notre belle aventure",
    link: "/story",
    color: "#d9c1b8",
  },
];

const PREVIEW_GALLERY = [
  { type: "museum", year: "2023", title: "Visite Culturelle", emoji: "🏛️" },
  { type: "beach", year: "2024", title: "Journée Plage", emoji: "🏖️" },
  { type: "anniversary", year: "2022", title: "Anniversaire", emoji: "🎂" },
  { type: "mountain", year: "2023", title: "Randonnée", emoji: "⛰️" },
];

const Home = () => {
  const [timeTogether, setTimeTogether] = useState({});
  const [currentMessage, setCurrentMessage] = useState(0);
  const [counters, setCounters] = useState({
    memories: 0,
    photos: 0,
    messages: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionRefs = useRef([]);
  const observerRef = useRef(null);

  // Generate particles once
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }).map(() => ({
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 6}s`,
        duration: `${3 + Math.random() * 4}s`,
      })),
    []
  );

  /** -----------------------------
   *   COUNTERS ANIMATION
   * ----------------------------- */
  useEffect(() => {
    const animateCounter = (start, end, duration, setter) => {
      let startTime = null;
      const animate = (time) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        setter(Math.floor(start + (end - start) * progress));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    };

    animateCounter(0, 127, 2000, (v) =>
      setCounters((prev) => ({ ...prev, memories: v }))
    );
    animateCounter(0, 356, 2500, (v) =>
      setCounters((prev) => ({ ...prev, photos: v }))
    );
    animateCounter(0, 89, 1800, (v) =>
      setCounters((prev) => ({ ...prev, messages: v }))
    );
  }, []);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      let diff = now - START_DATE;

      const years = now.getFullYear() - START_DATE.getFullYear();
      const months = now.getMonth() - START_DATE.getMonth();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      setTimeTogether({ years, months, days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  /** -----------------------------
   *   MESSAGE CAROUSEL
   * ----------------------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % LOVE_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  /** -----------------------------
   *   SCROLL & INTERSECTION OBSERVER
   * ----------------------------- */
  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrollTop / totalHeight) * 100);
    };

    window.addEventListener("scroll", handleScroll);

    observerRef.current = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("animate-in")
        ),
      { threshold: 0.1, rootMargin: "-40px" }
    );

    sectionRefs.current.forEach(
      (ref) => ref && observerRef.current.observe(ref)
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observerRef.current?.disconnect();
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  /** -----------------------------
   *   RENDER COMPONENT
   * ----------------------------- */

  return (
    <div className={`home ${isVisible ? "visible" : ""}`}>
      {/* Progress bar */}
      <div
        className="scroll-progress"
        style={{ width: scrollProgress + "%" }}
      />

      {/* HERO SECTION */}
      <section className="hero-section" ref={addToRefs}>
        <div className="hero-background">
          <div className="floating-particles">
            {particles.map((p, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: p.left,
                  animationDelay: p.delay,
                  animationDuration: p.duration,
                }}
              />
            ))}
          </div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line">Bienvenue dans</span>
            <span className="title-line highlight">Notre Monde</span>
          </h1>

          {/* Message carousel */}
          <div className="message-carousel">
            <div
              key={currentMessage}
              className="message-slide"
              style={{ color: LOVE_MESSAGES[currentMessage].color }}
            >
              <span className="message-emoji">
                {LOVE_MESSAGES[currentMessage].emoji}
              </span>
              {LOVE_MESSAGES[currentMessage].text}
            </div>
          </div>

          {/* CTA */}
          <div className="cta-buttons">
            <Link to="/story" className="btn btn-primary magnetic">
              📖 Découvrir notre histoire →
            </Link>
            <Link to="/gallery" className="btn btn-secondary magnetic">
              📸 Explorer la galerie →
            </Link>
          </div>

          <div className="scroll-indicator">
            <div className="scroll-arrow">
              <div className="arrow"></div>
            </div>
            <span>Découvrir</span>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section" ref={addToRefs}>
        <div className="container">
          <div className="stats-grid">
            {[
              { value: counters.memories, label: "Souvenirs", emoji: "🎉" },
              { value: counters.photos, label: "Photos", emoji: "📸" },
              { value: counters.messages, label: "Messages", emoji: "💌" },
            ].map((stat, i) => (
              <div key={i} className="stat-item">
                <div className="stat-number">{stat.value}+</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-emoji">{stat.emoji}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOVE TIMER */}
      <section className="love-timer-section" ref={addToRefs}>
        <div className="container">
          <h2 className="section-title">Notre Temps Ensemble</h2>
          <p className="section-subtitle">Depuis le 14 Février 2019</p>

          <div className="timer-grid">
            {[
              { value: timeTogether.years, label: "Ans", emoji: "📅" },
              { value: timeTogether.months, label: "Mois", emoji: "🌙" },
              { value: timeTogether.days, label: "Jours", emoji: "☀️" },
              { value: timeTogether.hours, label: "Heures", emoji: "⏰" },
              { value: timeTogether.minutes, label: "Minutes", emoji: "⏱️" },
              { value: timeTogether.seconds, label: "Secondes", emoji: "⚡" },
            ].map((item, i) => (
              <div key={i} className="timer-card">
                <div className="timer-emoji">{item.emoji}</div>
                <div className="timer-number">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="timer-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="quick-links-section" ref={addToRefs}>
        <div className="container">
          <h2 className="section-title">Explorez Notre Univers</h2>

          <div className="links-grid">
            {QUICK_LINKS.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="link-card magnetic"
                style={{ "--accent-color": item.color }}
              >
                <div className="card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="card-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PREVIEW GALLERY */}
      <section className="preview-gallery-section" ref={addToRefs}>
        <div className="container">
          <h2 className="section-title">Quelques Pépites</h2>

          <div className="gallery-carousel">
            {PREVIEW_GALLERY.map((item, i) => (
              <div key={i} className="gallery-item">
                <div className={`item-image ${item.type}-image`}>
                  <span className="year-badge">{item.year}</span>
                  <span className="item-emoji">{item.emoji}</span>
                </div>
                <div className="item-content">
                  <h4>{item.title}</h4>
                  <p>Un souvenir mémorable</p>
                </div>
              </div>
            ))}
          </div>

          <div className="preview-actions">
            <Link to="/gallery" className="btn btn-outline magnetic">
              🖼️ Voir toute la galerie
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta-section" ref={addToRefs}>
        <div className="cta-background">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="parallax-heart"
              style={{ left: `${i * 7}%`, animationDelay: `${i * 0.5}s` }}
            >
              ❤️
            </div>
          ))}
        </div>

        <div className="container">
          <h2 className="cta-title">Prêt à découvrir notre histoire ?</h2>

          <div className="cta-buttons-group">
            <Link to="/story" className="btn btn-primary btn-large magnetic">
              Commencer l'aventure
            </Link>
            <Link
              to="/gallery"
              className="btn btn-secondary btn-large magnetic"
            >
              Voir les photos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
