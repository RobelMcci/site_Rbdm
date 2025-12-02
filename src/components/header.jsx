import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Accueil", path: "/" },
    { name: "Notre Histoire", path: "/story" },
    { name: "Galerie", path: "/gallery" },
    { name: "Messages", path: "/messages" },
  ];

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/" className="logo-text">
            Rb & Dm
          </Link>
        </div>

        <nav className="nav-desktop">
          <ul className="nav-list">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? "open" : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-mobile ${isMobileMenuOpen ? "open" : ""}`}>
          <ul className="nav-mobile-list">
            {navItems.map((item, index) => (
              <li key={index} className="nav-mobile-item">
                <Link
                  to={item.path}
                  className={`nav-mobile-link ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
