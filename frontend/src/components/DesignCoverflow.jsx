import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Scissors, PhoneCall } from 'lucide-react';

export default function DesignCoverflow({ onSelectGarment, onOpenEnquiry }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const coverflowItems = [
    {
      id: 'katori_blouse',
      title: 'Katori Blouse Stitching (Base)',
      category: 'Blouses',
      price: 'Affordable Price',
      svgType: 'katori',
      frontNeck: 'sweetheart',
      backNeck: 'deep_u_back',
      sleeve: 'elbow',
      fabric: 'raw_silk',
      embroidery: 'neckline_aari',
      description: 'Precision fitted padded Katori cut blouse with delicate neck piping.'
    },
    {
      id: 'half_saree',
      title: 'Half Saree (Base) Stitching',
      category: 'Bridal & Traditional',
      price: 'Affordable Price',
      svgType: 'halfsaree',
      frontNeck: 'boat',
      backNeck: 'open_back',
      sleeve: 'puff',
      fabric: 'kanjivaram_silk',
      embroidery: 'heavy_bridal_aari',
      description: 'Traditional Dhavani half saree pleating & embroidered lehenga skirt set.'
    },
    {
      id: 'anarkali_dress',
      title: 'Anarkali Dress (Base) Stitching',
      category: 'Frocks & Gowns',
      price: 'Affordable Price',
      svgType: 'anarkali',
      frontNeck: 'deep_v',
      backNeck: 'window_cutout',
      sleeve: 'three_fourth',
      fabric: 'organza',
      embroidery: 'neckline_aari',
      description: 'Grand 360° umbrella circle flare Anarkali maxi dress with soft lining.'
    },
    {
      id: 'paavadai_sattai',
      title: 'Paavadai Sattai (Kids) Stitching',
      category: 'Kids Ethnic',
      price: 'Affordable Price',
      svgType: 'paavadai',
      frontNeck: 'sweetheart',
      backNeck: 'deep_u_back',
      sleeve: 'puff',
      fabric: 'brocade',
      embroidery: 'neckline_aari',
      description: 'Traditional silk Pattu Paavadai & embellished blouse set for girls.'
    },
    {
      id: 'saree_frock',
      title: 'Saree Converted Maxi Frock',
      category: 'Saree Reuse',
      price: 'Affordable Price',
      svgType: 'frock',
      frontNeck: 'high_collar',
      backNeck: 'bow_back',
      sleeve: 'elbow',
      fabric: 'kanjivaram_silk',
      embroidery: 'heavy_bridal_aari',
      description: 'Upcycle old Kanjivaram or designer silk sarees into modern flared gowns.'
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % coverflowItems.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + coverflowItems.length) % coverflowItems.length);
  };

  // Touch handlers for mobile swiping
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % coverflowItems.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [coverflowItems.length]);

  const renderSVGIcon = (type) => {
    if (type === 'katori') {
      return (
        <svg viewBox="0 0 200 140" width="100%" height="100%" style={{ maxHeight: isMobile ? '100px' : '130px' }}>
          <path d="M 40 40 L 65 30 L 100 65 L 135 30 L 160 40 L 175 75 L 155 75 L 140 105 L 60 105 L 45 75 L 25 75 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M 65 30 Q 100 75 135 30" fill="none" stroke="#1e293b" strokeWidth="2" />
          <path d="M 60 105 L 60 70 Q 80 100 100 105 Q 120 100 140 70 L 140 105" fill="none" stroke="#1e293b" strokeWidth="1.8" />
          <line x1="100" y1="65" x2="100" y2="105" stroke="#1e293b" strokeWidth="1.8" strokeDasharray="3 3" />
        </svg>
      );
    }
    if (type === 'halfsaree') {
      return (
        <svg viewBox="0 0 200 160" width="100%" height="100%" style={{ maxHeight: isMobile ? '105px' : '140px' }}>
          <path d="M 70 25 L 85 20 L 100 40 L 115 20 L 130 25 L 140 50 L 130 50 L 125 70 L 75 70 L 70 50 L 60 50 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
          <path d="M 75 70 L 40 145 L 160 145 L 125 70 Z" fill="#e2e8f0" stroke="#1e293b" strokeWidth="2" />
          <path d="M 65 35 Q 90 70 120 140" fill="none" stroke="#475569" strokeWidth="2.5" />
          <line x1="55" y1="145" x2="70" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="85" y1="145" x2="88" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="115" y1="145" x2="112" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="145" y1="145" x2="130" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>
      );
    }
    if (type === 'anarkali') {
      return (
        <svg viewBox="0 0 200 160" width="100%" height="100%" style={{ maxHeight: isMobile ? '105px' : '140px' }}>
          <path d="M 75 30 L 90 20 L 100 35 L 110 20 L 125 30 L 135 55 L 125 55 L 120 75 L 80 75 L 75 55 L 65 55 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
          <path d="M 80 75 Q 30 145 20 150 L 180 150 Q 170 145 120 75 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
          <line x1="100" y1="75" x2="100" y2="150" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="90" y1="75" x2="60" y2="150" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="110" y1="75" x2="140" y2="150" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>
      );
    }
    if (type === 'paavadai') {
      return (
        <svg viewBox="0 0 200 160" width="100%" height="100%" style={{ maxHeight: isMobile ? '105px' : '140px' }}>
          <path d="M 75 30 L 100 20 L 125 30 L 130 50 L 70 50 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
          <path d="M 70 60 L 45 140 L 155 140 L 130 60 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
          <line x1="85" y1="60" x2="70" y2="140" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="100" y1="60" x2="100" y2="140" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="115" y1="60" x2="130" y2="140" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 200 160" width="100%" height="100%" style={{ maxHeight: isMobile ? '105px' : '140px' }}>
        <path d="M 70 30 L 100 20 L 130 30 L 135 60 L 65 60 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
        <path d="M 65 60 Q 30 145 25 150 L 175 150 Q 170 145 135 60 Z" fill="#f8fafc" stroke="#1e293b" strokeWidth="2" />
      </svg>
    );
  };

  return (
    <section 
      className="coverflow-section"
      style={{
        width: '100%',
        background: 'linear-gradient(180deg, #071e22 0%, #0b2b26 100%)',
        padding: isMobile ? '2.5rem 0.5rem 3rem 0.5rem' : '3.5rem 1.5rem 4rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        color: '#ffffff',
        borderTop: '1px solid rgba(212, 175, 55, 0.2)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
      }}
    >
      {/* Background Decorative Glow */}
      <div 
        style={{
          position: 'absolute',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }} 
      />

      {/* Header Title */}
      <div style={{ textAlign: 'center', marginBottom: isMobile ? '1.5rem' : '2.5rem', position: 'relative', zIndex: 2, padding: '0 1rem' }}>
        <span className="gold-badge" style={{ marginBottom: '0.6rem' }}>
          <Sparkles size={14} /> Interactive 3D Stitching Catalog
        </span>
        <h2 style={{ color: '#ffffff', fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: isMobile ? '1.45rem' : '1.85rem' }}>
          Select & Customize Your Stitching Base
        </h2>
        <p style={{ color: '#cbd5e1', maxWidth: '700px', margin: '0.4rem auto 0 auto', fontSize: isMobile ? '0.85rem' : '0.95rem' }}>
          Swipe through our master tailoring silhouettes. Click any design card to personalize your fabric, necklines, & measurements!
        </p>
      </div>

      {/* 3D Coverflow Container */}
      <div 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          perspective: isMobile ? '800px' : '1200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: isMobile ? '340px' : '400px',
          position: 'relative',
          zIndex: 2,
          padding: '1rem 0',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          aria-label="Previous Design"
          style={{
            position: 'absolute',
            left: isMobile ? '8px' : '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: isMobile ? '36px' : '48px',
            height: isMobile ? '36px' : '48px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.4)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 30,
            boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
          }}
        >
          <ChevronLeft size={isMobile ? 20 : 26} />
        </button>

        {coverflowItems.map((item, index) => {
          let offset = index - activeIndex;
          if (offset < -2) offset += coverflowItems.length;
          if (offset > 2) offset -= coverflowItems.length;

          const isCenter = offset === 0;
          const rotateY = offset * (isMobile ? -25 : -35);
          const translateX = offset * (isMobile ? 125 : 210);
          const scale = isCenter ? (isMobile ? 1.05 : 1.1) : (isMobile ? 0.8 : 0.84);
          const zIndex = 10 - Math.abs(offset);
          const opacity = Math.abs(offset) > (isMobile ? 1 : 2) ? 0 : isCenter ? 1 : 0.6;

          return (
            <div
              key={item.id}
              onClick={() => setActiveIndex(index)}
              style={{
                position: 'absolute',
                width: isMobile ? '230px' : '290px',
                height: isMobile ? '300px' : '360px',
                borderRadius: '18px',
                background: isCenter ? '#ffffff' : 'rgba(255, 255, 255, 0.9)',
                color: '#1e293b',
                boxShadow: isCenter 
                  ? '0 0 30px rgba(255, 255, 255, 0.35), 0 15px 35px rgba(0,0,0,0.5)' 
                  : '0 8px 20px rgba(0,0,0,0.3)',
                border: isCenter ? '2.5px solid #ffffff' : '1px solid rgba(255,255,255,0.35)',
                transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                zIndex: zIndex,
                opacity: opacity,
                cursor: 'pointer',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: isMobile ? '0.9rem' : '1.2rem',
                userSelect: 'none',
                pointerEvents: opacity === 0 ? 'none' : 'auto'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {item.category}
                </span>
                <Scissors size={14} color="var(--primary-emerald)" />
              </div>

              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.4rem 0' }}>
                {renderSVGIcon(item.svgType)}
              </div>

              <div 
                style={{
                  background: isCenter ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.95) 100%)' : 'rgba(15, 23, 42, 0.85)',
                  color: '#ffffff',
                  padding: isMobile ? '0.5rem 0.6rem' : '0.75rem',
                  borderRadius: '10px',
                  textAlign: 'center'
                }}
              >
                <h3 style={{ fontSize: isMobile ? '0.82rem' : '0.92rem', fontWeight: 700, fontFamily: 'var(--font-serif)', marginBottom: '0.15rem', color: '#ffffff', lineHeight: 1.2 }}>
                  {item.title}
                </h3>
                <span style={{ fontSize: '0.68rem', color: '#cbd5e1', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {item.description}
                </span>
              </div>
            </div>
          );
        })}

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          aria-label="Next Design"
          style={{
            position: 'absolute',
            right: isMobile ? '8px' : '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: isMobile ? '36px' : '48px',
            height: isMobile ? '36px' : '48px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.4)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 30,
            boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
          }}
        >
          <ChevronRight size={isMobile ? 20 : 26} />
        </button>
      </div>

      {/* Active Item Action Controls */}
      <div style={{ textAlign: 'center', marginTop: isMobile ? '1.25rem' : '1.75rem', position: 'relative', zIndex: 3, padding: '0 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              const item = coverflowItems[activeIndex];
              const msg = `Hi Nakshatra Designer's, I want to customize and stitch:\n\n✨ *Silhouette:* ${item.title}\n📂 *Category:* ${item.category}\n\nPlease share the tailoring options & fabric details!`;
              const url = `https://wa.me/919123514214?text=${encodeURIComponent(msg)}`;
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
            className="btn-emerald"
            style={{
              padding: '0.55rem 1.15rem',
              borderRadius: '25px',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem'
            }}
          >
            <Scissors size={15} color="#d4af37" /> Customize Stitching
          </button>

          <a
            href="tel:+919123500065"
            className="btn-gold"
            style={{
              padding: '0.55rem 1.15rem',
              borderRadius: '25px',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              textDecoration: 'none'
            }}
          >
            <PhoneCall size={15} /> Call: +91 91235 00065
          </a>
        </div>
      </div>
    </section>
  );
}
