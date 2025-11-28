import React, { useState } from "react";
import "../styles/Texts.css";

const Messages = () => {
  const [activeCategory, setActiveCategory] = useState("poems");

  const categories = [
    { id: "poems", name: "Poèmes" },
    { id: "sweetWords", name: "Mots Doux" },
    { id: "comfort", name: "Réconfort" },
    { id: "memories", name: "Souvenirs" },
  ];

  const messages = {
    poems: [
      {
        id: 1,
        title: "Ton regard",
        content: `Dans tes yeux je vois l'infini,
Un univers où tout est joli,
Chaque instant près de toi me comble,
Dans tes bras, le monde semble...`,
        date: "15 Janvier 2024",
        mood: "❤️",
      },
      {
        id: 2,
        title: "Notre chemin",
        content: `Main dans la main nous avançons,
Sur ce chemin où nous dansons,
Chaque pas est une promesse,
Chaque regard une caresse.`,
        date: "3 Mars 2024",
        mood: "✨",
      },
    ],
    sweetWords: [
      {
        id: 1,
        content: "Tu es la raison de mon sourire chaque matin",
        date: "Hier",
        author: "Moi",
      },
      {
        id: 2,
        content: "Ton rire est la plus belle musique que j'ai jamais entendue",
        date: "La semaine dernière",
        author: "Toi",
      },
    ],
    comfort: [
      {
        id: 1,
        content: "Ne t'inquiète pas, je suis là pour toi, toujours",
        date: "Un jour difficile",
        context: "Quand tu avais besoin de soutien",
      },
    ],
    memories: [
      {
        id: 1,
        title: "Notre première rencontre",
        content: "Je me souviens de ce jour comme si c'était hier...",
        date: "15 Juin 2023",
        emotion: "🥰",
      },
    ],
  };

  return (
    <div className="messages">
      <div className="messages-header">
        <h1>Messages du Cœur</h1>
        <p>Des mots qui viennent de l'âme</p>
      </div>

      <div className="categories">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${
              activeCategory === category.id ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="messages-list">
        {messages[activeCategory].map((message) => (
          <div key={message.id} className="message-card">
            {message.title && (
              <h3 className="message-title">{message.title}</h3>
            )}
            <p className="message-content">{message.content}</p>
            <div className="message-meta">
              <span className="date">{message.date}</span>
              {message.author && (
                <span className="author">- {message.author}</span>
              )}
              {message.mood && <span className="mood">{message.mood}</span>}
            </div>
          </div>
        ))}
      </div>

      {messages[activeCategory].length === 0 && (
        <div className="empty-messages">
          <p>Aucun message dans cette catégorie pour le moment</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
