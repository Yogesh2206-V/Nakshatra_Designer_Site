import React, { useState, useEffect } from 'react';
import { Scissors, Sparkles, Compass, Star, Settings, PhoneCall, UserPlus, User, Moon, Sun, Menu, ShieldCheck } from 'lucide-react';
import { isExactAdmin } from '../utils/adminAuth';

export default function Navbar({ activeTab, setActiveTab, currentUser, onOpenAuth, onOpenSideNav, darkMode, onToggleDarkMode }) {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 40;
      setIsVisible(visible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <header 
      style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 100, 
        background: 'rgba(255, 255, 255, 0.96)', 
        backdropFilter: 'blur(10px)', 
        borderBottom: '1px solid var(--border-light)',
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Top Announcement Bar (Desktop Only) */}
      <div className="announcement-bar desktop-only">
        <span className="announcement-item">
          <Sparkles size={15} /> <strong>Nakshatra Boutique:</strong> Custom Blouse, Frock Dress & Saree-to-Frock Conversion Studio!
        </span>
        <a 
          href="https://whatsapp.com/channel/0029VbAFcOK59PwTbzi8m610" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="announcement-item" 
          style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', textDecoration: 'none', color: '#fef08a', fontWeight: 600 }}
        >
          💥 Join WhatsApp Channel
        </a>
        <a href="tel:+919123500065" className="announcement-item" style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <PhoneCall size={15} /> In-Shop Visit / Call: <strong>+91 91235 00065</strong>
        </a>
      </div>

      {/* Main Navbar */}
      <div className="navbar-inner-container section-container">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('gallery')}
          className="navbar-brand"
        >
          <div className="brand-icon-circle">
            <Scissors size={18} />
          </div>
          <div>
            <h1 className="brand-title">
              Nakshatra <span style={{ color: 'var(--accent-gold)' }}>Designer's</span>
            </h1>
            <p className="brand-subtitle desktop-only">
              Blouse, Frock & Saree Conversion Studio
            </p>
          </div>
        </div>

        {/* Nav Links (Desktop) + Right Actions */}
        <nav className="navbar-nav-links">
          <button 
            className={`tab-button desktop-only ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            <Compass size={17} /> Boutique Lookbook
          </button>

          <button 
            className={`tab-button desktop-only ${activeTab === 'reviews' ? 'active' : ''}`}
            style={{ borderColor: activeTab === 'reviews' ? 'var(--accent-gold)' : 'var(--border-light)' }}
            onClick={() => setActiveTab('reviews')}
          >
            <Star size={17} fill={activeTab === 'reviews' ? "#d4af37" : "none"} color={activeTab === 'reviews' ? "#d4af37" : "currentColor"} /> Reviews & Feedback
          </button>

          <button 
            className={`tab-button desktop-only ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={17} /> Settings
          </button>

          {/* Admin Studio Button (Strictly visible ONLY after Login as Exact Admin) */}
          {isExactAdmin(currentUser) && (
            <button 
              className={`tab-button desktop-only ${activeTab === 'admin' ? 'active' : ''}`}
              style={{
                borderColor: '#d97706',
                background: activeTab === 'admin' ? 'linear-gradient(135deg, #d97706, #b45309)' : 'rgba(217, 119, 6, 0.12)',
                color: activeTab === 'admin' ? '#ffffff' : '#b45309',
                fontWeight: 700
              }}
              onClick={() => setActiveTab('admin')}
              title="Nakshatra Admin Studio Portal"
            >
              <ShieldCheck size={17} /> 👑 Admin Studio
            </button>
          )}

          {/* Dark / Light Mode Toggle Button */}
          <button
            onClick={onToggleDarkMode}
            title={darkMode ? "Switch to Normal Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
            className="theme-toggle-btn"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: darkMode ? '#0f2724' : '#faf6f0',
              border: '1px solid var(--border-light)',
              color: darkMode ? '#fbbf24' : '#b8860b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              padding: 0,
              flexShrink: 0
            }}
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Top Right User Profile Image Action (Circular Profile Only) */}
          {currentUser ? (
            <button
              onClick={onOpenSideNav}
              className="user-profile-avatar-btn"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0b2b26 0%, #164e43 100%)',
                border: '1.5px solid var(--accent-gold)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
              title={`Profile: ${currentUser.name} (Click to open menu)`}
              aria-label="Open Profile & Menu"
            >
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.88rem' }}>
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : <User size={17} />}
                </span>
              )}
            </button>
          ) : (
            <button 
              className="btn-gold mobile-compact-signup"
              onClick={onOpenAuth}
            >
              <UserPlus size={15} /> <span>Sign Up</span>
            </button>
          )}

          {/* Side Navbar Hamburger Button */}
          <button
            onClick={onOpenSideNav}
            aria-label="Open Side Navbar"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'var(--primary-emerald)',
              color: '#ffffff',
              border: '1px solid var(--emerald-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s ease',
              padding: 0,
              flexShrink: 0
            }}
            title="Open Side Menu"
          >
            <Menu size={18} />
          </button>

        </nav>
      </div>
    </header>
  );
}
