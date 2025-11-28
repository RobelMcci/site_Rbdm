import React from "react";
import "../styles/Timeline.css";

const Story = () => {
  const timelineEvents = [
    {
      id: 1,
      date: "15 Juin 2023",
      title: "Notre Première Rencontre",
      description:
        "Le jour où nos chemins se sont croisés pour la première fois. Un moment magique qui a changé nos vies à jamais.",
      image: "/timeline/first-meet.jpg",
      type: "meeting",
      emoji: "🌟",
    },
    {
      id: 2,
      date: "30 Juin 2023",
      title: "Notre Premier Rendez-vous",
      description:
        "Un café qui s'est transformé en une conversation de plusieurs heures. On ne pouvait plus s'arrêter de parler.",
      image: "/timeline/first-date.jpg",
      type: "date",
      emoji: "☕",
    },
    {
      id: 3,
      date: "20 Juillet 2023",
      title: "Premier Voyage Ensemble",
      description:
        "Un week-end à la campagne qui a scellé notre complicité. Les rires, les confidences, les paysages...",
      image: "/timeline/first-trip.jpg",
      type: "travel",
      emoji: "🚗",
    },
    {
      id: 4,
      date: "15 Août 2023",
      title: "La Première Déclaration",
      description:
        "Ce soir sous les étoiles où on s'est dit 'Je t'aime' pour la première fois. Un moment gravé dans nos mémoires.",
      image: "/timeline/first-love.jpg",
      type: "love",
      emoji: "💖",
    },
    {
      id: 5,
      date: "15 Janvier 2024",
      title: "Notre Premier Anniversaire",
      description:
        "6 mois déjà ! Une célébration pleine d'amour et de promesses pour l'avenir.",
      image: "/timeline/anniversary.jpg",
      type: "anniversary",
      emoji: "🎉",
    },
  ];

  return (
    <div className="story">
      <div className="story-header">
        <h1>Notre Histoire</h1>
        <p>Le récit chronologique de notre merveilleuse aventure</p>
      </div>

      <div className="timeline">
        {timelineEvents.map((event, index) => (
          <div
            key={event.id}
            className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
          >
            <div className="timeline-content">
              <div className="timeline-date">{event.date}</div>
              <div className="timeline-emoji">{event.emoji}</div>
              <h3 className="timeline-title">{event.title}</h3>
              <p className="timeline-description">{event.description}</p>
              {event.image && (
                <div className="timeline-image">
                  <img src={event.image} alt={event.title} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="story-continues">
        <h2>Notre histoire continue...</h2>
        <p>De nouveaux chapitres s'écrivent chaque jour</p>
      </div>
    </div>
  );
};

export default Story;
