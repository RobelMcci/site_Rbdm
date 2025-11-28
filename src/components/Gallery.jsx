import React, { useState } from "react";
import "../styles/Gallery.css";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", name: "Toutes" },
    { id: "anniversary", name: "Anniversaires" },
    { id: "museum", name: "Musées" },
    { id: "cinema", name: "Cinéma" },
    { id: "vacation", name: "Vacances" },
    { id: "daily", name: "Quotidien" },
  ];

  // Données exemple - à remplacer par vos vraies photos
  const photos = [
    {
      id: 1,
      src: "/photos/1.jpg",
      category: "anniversary",
      title: "Notre premier anniversaire",
    },
    {
      id: 2,
      src: "/photos/2.jpg",
      category: "museum",
      title: "Visite au Louvre",
    },
    { id: 3, src: "/photos/3.jpg", category: "cinema", title: "Soirée cinéma" },
    {
      id: 4,
      src: "/photos/4.jpg",
      category: "vacation",
      title: "Vacances à la mer",
    },
    {
      id: 5,
      src: "/photos/5.jpg",
      category: "daily",
      title: "Un dimanche tranquille",
    },
    {
      id: 6,
      src: "/photos/6.jpg",
      category: "anniversary",
      title: "Cadeaux surprises",
    },
  ];

  const filteredPhotos =
    activeFilter === "all"
      ? photos
      : photos.filter((photo) => photo.category === activeFilter);

  return (
    <div className="gallery">
      <div className="gallery-header">
        <h1>Notre Galerie</h1>
        <p>Les plus beaux moments de notre histoire</p>
      </div>

      <div className="filters">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`filter-btn ${
              activeFilter === filter.id ? "active" : ""
            }`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.name}
          </button>
        ))}
      </div>

      <div className="photos-grid">
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img src={photo.src} alt={photo.title} />
            <div className="photo-overlay">
              <h3>{photo.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {filteredPhotos.length === 0 && (
        <div className="empty-state">
          <p>Aucune photo dans cette catégorie pour le moment</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
