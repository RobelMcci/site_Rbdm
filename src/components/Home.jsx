import React, { useEffect, useState, useRef } from "react";
import "../styles/home.css";

const Home = () => {
  const [timeTogether, setTimeTogether] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    memories: 0,
    photos: 0,
    messages: 0,
  });
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionRefs = useRef([]);
  const observerRef = useRef(null);

  const loveMessages = [
    {
      text: "Chaque instant avec toi est un trésor",
      emoji: "💖",
      color: "#bd342e",
    },
    {
      text: "Ton sourire illumine mes journées",
      emoji: "✨",
      color: "#bc473e",
    },
    {
      text: "Je t'aime plus que les mots ne peuvent le dire",
      emoji: "📝",
      color: "#d9c1b8",
    },
    { text: "Tu es ma plus belle aventure", emoji: "🌟", color: "#bd342e" },
    { text: "Notre amour grandit chaque jour", emoji: "🌱", color: "#bc473e" },
  ];

  // Animation des compteurs
  useEffect(() => {
    const animateCounter = (start, end, duration, callback) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        callback(value);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    animateCounter(0, 127, 2000, (val) =>
      setCounters((prev) => ({ ...prev, memories: val }))
    );
    animateCounter(0, 356, 2500, (val) =>
      setCounters((prev) => ({ ...prev, photos: val }))
    );
    animateCounter(0, 89, 1800, (val) =>
      setCounters((prev) => ({ ...prev, messages: val }))
    );
  }, []);

  // Timer en temps réel
  useEffect(() => {
    const startDate = new Date(2019, 1, 14);

    const updateTimer = () => {
      const now = new Date();
      const diff = now - startDate;

      const years = now.getFullYear() - startDate.getFullYear();
      const months = now.getMonth() - startDate.getMonth();
      const days = now.getDate() - startDate.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      setTimeTogether({ years, months, days, hours, minutes, seconds });
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  // Carousel de messages
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loveMessages.length);
    }, 3500);
    return () => clearInterval(messageInterval);
  }, []);

  // Scroll animations
  useEffect(() => {
    setIsVisible(true);

    // Scroll progress
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    // Intersection Observer pour les animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    window.addEventListener("scroll", handleScroll);

    // Observe all sections
    sectionRefs.current.forEach((ref) => {
      if (ref) observerRef.current.observe(ref);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map(() => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 6}s`,
      duration: `${3 + Math.random() * 4}s`,
    }));
  }, []);

  return (
    <div className={`home ${isVisible ? "visible" : ""}`}>
      {/* Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Hero Section avec animations */}
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
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-line">Bienvenue dans</span>
              <span className="title-line highlight">Notre Monde</span>
            </h1>

            <div className="message-carousel">
              <div
                key={currentMessage}
                className="message-slide"
                style={{ color: loveMessages[currentMessage].color }}
              >
                <span className="message-emoji">
                  {loveMessages[currentMessage].emoji}
                </span>
                {loveMessages[currentMessage].text}
              </div>
            </div>
          </div>

          <div className="cta-buttons">
            <a href="/story" className="btn btn-primary magnetic" data-magnetic>
              <span className="btn-icon">📖</span>
              Découvrir notre histoire
              <span className="btn-arrow">→</span>
            </a>
            <a
              href="/gallery"
              className="btn btn-secondary magnetic"
              data-magnetic
            >
              <span className="btn-icon">📸</span>
              Explorer la galerie
              <span className="btn-arrow">→</span>
            </a>
          </div>

          <div className="scroll-indicator">
            <div className="scroll-arrow">
              <div className="arrow"></div>
            </div>
            <span>Découvrir</span>
          </div>
        </div>
      </section>

      {/* Love Stats avec compteurs animés */}
      <section className="stats-section" ref={addToRefs}>
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number counter" data-count="127">
                {counters.memories}+
              </div>
              <div className="stat-label">Souvenirs</div>
              <div className="stat-emoji">🎉</div>
            </div>
            <div className="stat-item">
              <div className="stat-number counter" data-count="356">
                {counters.photos}+
              </div>
              <div className="stat-label">Photos</div>
              <div className="stat-emoji">📸</div>
            </div>
            <div className="stat-item">
              <div className="stat-number counter" data-count="89">
                {counters.messages}+
              </div>
              <div className="stat-label">Messages</div>
              <div className="stat-emoji">💌</div>
            </div>
          </div>
        </div>
      </section>

      {/* Love Timer avec animation numérique */}
      <section className="love-timer-section" ref={addToRefs}>
        <div className="container">
          <h2 className="section-title">Notre Temps Ensemble</h2>
          <p className="section-subtitle">
            Depuis le 14 Février 2019, chaque seconde compte
          </p>

          <div className="timer-grid">
            {[
              { value: timeTogether.years, label: "Ans", emoji: "📅" },
              { value: timeTogether.months, label: "Mois", emoji: "🌙" },
              { value: timeTogether.days, label: "Jours", emoji: "☀️" },
              { value: timeTogether.hours, label: "Heures", emoji: "⏰" },
              { value: timeTogether.minutes, label: "Minutes", emoji: "⏱️" },
              { value: timeTogether.seconds, label: "Secondes", emoji: "⚡" },
            ].map((item, index) => (
              <div key={index} className="timer-card">
                <div className="timer-emoji">{item.emoji}</div>
                <div className="timer-number flip-counter">
                  {item.value.toString().padStart(2, "0")}
                </div>
                <div className="timer-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links avec animations au hover */}
      <section className="quick-links-section" ref={addToRefs}>
        <div className="container">
          <h2 className="section-title">Explorez Notre Univers</h2>
          <p className="section-subtitle">
            Découvrez les différentes facettes de notre histoire d'amour
          </p>

          <div className="links-grid">
            {[
              {
                icon: "📸",
                title: "Galerie Photo",
                description:
                  "Parcourez nos plus beaux souvenirs immortalisés en images",
                link: "/gallery",
                color: "#bd342e",
              },
              {
                icon: "💌",
                title: "Messages du Cœur",
                description: "Laissez-vous émettre par nos mots doux et poèmes",
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
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="link-card magnetic"
                data-magnetic
                style={{ "--accent-color": item.color }}
              >
                <div className="card-glow"></div>
                <div className="card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="card-arrow">
                  <span>→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Preview Gallery */}
      <section className="preview-gallery-section" ref={addToRefs}>
        <div className="container">
          <div className="preview-header">
            <h2 className="section-title">Quelques Pépites</h2>
            <p className="section-subtitle">
              Un aperçu de nos moments préférés
            </p>
          </div>

          <div className="gallery-carousel">
            {[
              {
                type: "museum",
                year: "2023",
                title: "Visite Culturelle",
                emoji: "🏛️",
              },
              {
                type: "beach",
                year: "2024",
                title: "Journée Plage",
                emoji: "🏖️",
              },
              {
                type: "anniversary",
                year: "2022",
                title: "Anniversaire",
                emoji: "🎂",
              },
              {
                type: "mountain",
                year: "2023",
                title: "Randonnée",
                emoji: "⛰️",
              },
            ].map((item, index) => (
              <div key={index} className="gallery-item">
                <div className={`item-image ${item.type}-image`}>
                  <div className="image-overlay">
                    <span className="year-badge">{item.year}</span>
                    <span className="item-emoji">{item.emoji}</span>
                  </div>
                </div>
                <div className="item-content">
                  <h4>{item.title}</h4>
                  <p>Un souvenir mémorable</p>
                </div>
              </div>
            ))}
          </div>

          <div className="preview-actions">
            <a
              href="/gallery"
              className="btn btn-outline magnetic"
              data-magnetic
            >
              <span className="btn-icon">🖼️</span>
              Voir toute la galerie
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA avec animation parallax */}
      <section className="final-cta-section" ref={addToRefs}>
        <div className="cta-background">
          <div className="parallax-hearts">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="parallax-heart"
                style={{
                  left: `${i * 7}%`,
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                ❤️
              </div>
            ))}
          </div>
        </div>

        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Prêt à découvrir notre histoire ?</h2>
            <p className="cta-subtitle">
              Chaque clic vous rapproche un peu plus de notre univers rempli
              d'amour et de souvenirs précieux
            </p>
            <div className="cta-buttons-group">
              <a
                href="/story"
                className="btn btn-primary btn-large magnetic"
                data-magnetic
              >
                Commencer l'aventure
              </a>
              <a
                href="/gallery"
                className="btn btn-secondary btn-large magnetic"
                data-magnetic
              >
                Voir les photos
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
