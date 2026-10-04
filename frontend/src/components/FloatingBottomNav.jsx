import React, { useState, useEffect } from 'react';
import { Star, Home, Settings, ShieldCheck } from 'lucide-react';
import { isExactAdmin } from '../utils/adminAuth';

export default function FloatingBottomNav({ activeTab, setActiveTab, onNavigate, currentUser }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  // Track window resize to ensure it ONLY ever renders on mobile devices (<= 768px)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track scroll direction on mobile to auto-hide while scrolling down and reveal when stationary/scrolling up
  useEffect(() => {
    if (!isMobile) return;

    let lastScrollY = window.pageYOffset;
    let scrollTimer = null;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      
      // Hide while actively scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 40) {
        setIsVisible(false);
      } else {
        // Show while scrolling up
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;

      // When static (scrolling stops), automatically show back up
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsVisible(true);
      }, 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, [isMobile]);

  // Strictly do not render on desktop / website mode
  if (!isMobile) {
    return null;
  }

  const navItems = [
    {
      id: 'gallery',
      label: 'Home',
      icon: Home
    },
    {
      id: 'reviews',
      label: 'Reviews',
      icon: Star
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings
    },
    ...(isExactAdmin(currentUser) ? [{
      id: 'admin',
      label: 'Admin',
      icon: ShieldCheck
    }] : [])
  ];

  const handleTabClick = (tabId, itemAction) => {
    if (itemAction) {
      itemAction();
      return;
    }
    if (onNavigate) {
      onNavigate(tabId);
    } else {
      setActiveTab(tabId);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className="floating-bottom-nav"
      aria-label="Mobile Navigation"
      style={{
        position: 'fixed',
        bottom: '12px',
        left: '50%',
        transform: isVisible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(160%)',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease',
        zIndex: 2500,
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '24px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(212, 175, 55, 0.15)',
        padding: '0.25rem 0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        border: '1px solid var(--accent-gold)',
        backdropFilter: 'blur(16px)',
        width: 'calc(100% - 24px)',
        maxWidth: '380px'
      }}
    >
      {navItems.map((item, index) => {
        const IconComponent = item.icon;
        const isActive = activeTab === item.id;

        return (
          <React.Fragment key={item.id}>
            {index > 0 && (
              <div 
                style={{
                  height: '16px',
                  width: '1px',
                  background: 'var(--border-light)',
                  margin: '0 0.05rem',
                  opacity: 0.6
                }} 
              />
            )}

            <button
              onClick={() => handleTabClick(item.id, item.action)}
              aria-label={item.label}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.2rem 0.25rem',
                gap: '0.15rem',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
            >
              {/* Icon Circle */}
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isActive ? 'rgba(212, 175, 55, 0.18)' : 'transparent',
                  color: isActive ? 'var(--primary-emerald)' : 'var(--text-muted)',
                  border: isActive ? '1px solid var(--accent-gold)' : '1px solid transparent',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 2px 6px rgba(212, 175, 55, 0.25)' : 'none'
                }}
              >
                <IconComponent 
                  size={17} 
                  fill={isActive && item.id === 'reviews' ? 'var(--accent-gold)' : 'none'} 
                />
              </div>

              {/* Label */}
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--primary-emerald)' : 'var(--text-muted)',
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap',
                  lineHeight: 1.1
                }}
              >
                {item.label}
              </span>
            </button>
          </React.Fragment>
        );
      })}
    </nav>
  );
}
