import React from "react";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Bienvenue dans notre univers</h1>
          <p>Notre histoire d'amour commence ici...</p>
          <div className="cta-buttons">
            <a href="/story" className="btn btn-primary">
              Découvrir notre histoire
            </a>
            <a href="/gallery" className="btn btn-secondary">
              Voir nos photos
            </a>
          </div>
        </div>
      </section>

      <section className="love-timer-section">
        <h2>Notre temps ensemble</h2>
        <div className="timer-container">
          <div className="time-unit">
            <span className="number">1</span>
            <span className="label">An</span>
          </div>
          <div className="time-unit">
            <span className="number">6</span>
            <span className="label">Mois</span>
          </div>
          <div className="time-unit">
            <span className="number">15</span>
            <span className="label">Jours</span>
          </div>
        </div>
      </section>

      <section className="quick-links">
        <div className="link-card">
          <h3>📸 Galerie</h3>
          <p>Nos plus beaux souvenirs en images</p>
          <a href="/gallery">Voir la galerie →</a>
        </div>
        <div className="link-card">
          <h3>💌 Messages</h3>
          <p>Mots doux et poèmes</p>
          <a href="/messages">Lire les messages →</a>
        </div>
        <div className="link-card">
          <h3>📖 Notre Histoire</h3>
          <p>Le récit de notre aventure</p>
          <a href="/story">Découvrir →</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
