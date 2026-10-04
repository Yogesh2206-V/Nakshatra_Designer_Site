import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Compass, Sparkles, Scissors, Eye, X, PhoneCall, CheckCircle2, Upload, ShieldCheck, PlusCircle } from 'lucide-react';
import EnquiryIcon from './EnquiryIcon';
import { isExactAdmin } from '../utils/adminAuth';

export default function DesignGallery({ onSelectPreset, currentUser, onRequireAuth, onOpenEnquiry, onNavigate }) {
  const [designs, setDesigns] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedDesignModal, setSelectedDesignModal] = useState(null);

  useEffect(() => {
    fetch('/api/designs')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDesigns(data.designs);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching designs:', err);
        setLoading(false);
      });
  }, []);

  const categories = ['All', 'Blouses', 'Bridal Aari', 'Frocks', 'Saree Pre-Pleating', 'Skirt Shirt', 'Chudithar', 'Lehenga'];

  const filteredDesigns = activeCategory === 'All' 
    ? designs 
    : designs.filter(d => {
        if (activeCategory === 'Blouses') {
          return d.category === 'Blouses' || d.category === 'Bridal Aari';
        }
        if (activeCategory === 'Bridal Aari') {
          return d.category === 'Bridal Aari';
        }
        if (activeCategory === 'Frocks') {
          return d.category === 'Frocks';
        }
        if (activeCategory === 'Saree Pre-Pleating') {
          return d.category === 'Saree Pre-Pleating' || d.garmentType === 'saree_pleating';
        }
        if (activeCategory === 'Skirt Shirt') {
          return d.category === 'Skirt Shirt' || d.garmentType === 'skirt_shirt';
        }
        if (activeCategory === 'Chudithar') {
          return d.category === 'Chudithar' || d.garmentType === 'chudithar' || d.garmentType === 'salwar_kurti';
        }
        if (activeCategory === 'Lehenga') {
          return d.category === 'Lehenga' || d.garmentType === 'lehenga_set' || d.garmentType === 'lehenga';
        }
        return d.category.toLowerCase() === activeCategory.toLowerCase();
      });

  const handleCustomizeOnWhatsApp = (item) => {
    const msg = `Hi Nakshatra Designer's, I want to customize and stitch this design:\n\n✨ *Design:* ${item.title}\n📂 *Collection:* ${item.category}\n🧵 *Fabric:* ${item.fabric || 'Custom Silk / Fabric'}\n🪡 *Embroidery:* ${item.embroidery || 'Aari / Delicate Work'}\n\nPlease let me know the customization options, fitting schedule, and stitching rates!`;
    const url = `https://wa.me/919123514214?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="section-container" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
      {/* Title Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span className="gold-badge" style={{ marginBottom: '0.5rem' }}>
          <Compass size={13} /> Nakshatra Designer Lookbook
        </span>
        <h2 style={{ fontSize: '1.85rem', color: 'var(--primary-emerald)', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
          Designer Blouses, Frocks & Saree Conversions
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto', fontSize: '0.92rem', lineHeight: 1.6 }}>
          Explore our handcrafted bridal Aari work blouses, designer frocks, and repurposed silk saree converted maxi gowns. Click any design to customize it with your own fabric & measurements!
        </p>

        {/* Admin Quick Upload Action */}
        {isExactAdmin(currentUser) && (
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => onNavigate && onNavigate('admin')}
              className="btn-gold"
              style={{
                padding: '0.55rem 1.25rem',
                fontSize: '0.88rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                color: '#ffffff',
                border: '1px solid #fef08a',
                boxShadow: '0 4px 15px rgba(217, 119, 6, 0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                borderRadius: '30px',
                cursor: 'pointer'
              }}
            >
              <Upload size={15} /> 👑 Admin: Upload & Add New Design Photo
            </button>
          </div>
        )}

        {/* Category Filters (Touch-friendly scrollable on mobile) */}
        <div 
          className="category-filter-bar"
          style={{ 
            display: 'flex', 
            justifyContent: 'flex-start', 
            gap: '0.45rem', 
            marginTop: '1.25rem', 
            overflowX: 'auto', 
            paddingBottom: '0.4rem',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none'
          }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`tab-button ${activeCategory === cat ? 'active' : ''}`}
              style={{ fontSize: '0.84rem', padding: '0.42rem 0.9rem', whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Designs */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading catalog...</div>
      ) : (
        <div className="design-gallery-grid">
          {filteredDesigns.map(item => (
            <div key={item.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              
              {/* Image Container */}
              <div 
                style={{ position: 'relative', height: '280px', overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => setSelectedDesignModal(item)}
                title="Click to view full image"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
                />

                {/* Full View Button */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setSelectedDesignModal(item); }}
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    background: 'rgba(11, 43, 38, 0.9)',
                    color: '#ffffff',
                    border: '1px solid var(--accent-gold)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    backdropFilter: 'blur(6px)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    zIndex: 2
                  }}
                  title="Click to open Full View"
                >
                  <Eye size={13} /> Full View
                </button>

                {item.badge && (
                  <span className="gold-badge" style={{ position: 'absolute', top: 10, right: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                    <Sparkles size={11} /> {item.badge}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 700, letterSpacing: '0.05em' }}>
                    {item.category} Collection
                  </span>
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--primary-emerald)', marginTop: '0.2rem', marginBottom: '0.35rem', fontFamily: 'var(--font-serif)', lineHeight: 1.3 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.9rem' }}>
                    {item.description || `Handcrafted ${item.category} customized for precision fit & elegance.`}
                  </p>
                </div>

                <div>
                  <div className="stitching-rate-box" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', padding: '0.45rem 0.65rem', background: 'var(--bg-champagne)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Stitching Rate</span>
                    <button
                      className="btn-outline"
                      style={{ padding: '0.15rem 0.45rem', fontSize: '0.72rem', borderColor: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                      onClick={(e) => { e.stopPropagation(); onOpenEnquiry && onOpenEnquiry(item.title); }}
                    >
                      <EnquiryIcon size={14} /> Enquire
                    </button>
                  </div>

                  <button
                    className="btn-gold"
                    style={{ width: '100%', padding: '0.6rem', fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem' }}
                    onClick={() => setSelectedDesignModal(item)}
                    title="View Design Details & Photos"
                  >
                    <Eye size={15} /> Full View & Details
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Quick View Design Details Modal rendered via Portal */}
      {selectedDesignModal && typeof document !== 'undefined' && createPortal(
        <div 
          onClick={() => setSelectedDesignModal(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.75rem'
          }}
        >
          <div 
            onClick={e => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: '18px',
              border: '1.5px solid var(--accent-gold)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
              width: '100%',
              maxWidth: '720px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '1.25rem',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedDesignModal(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: '#f1f5f9',
                color: '#334155',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
              title="Close Full View"
            >
              <X size={18} />
            </button>

            {/* High Resolution Modal Image */}
            <div style={{ 
              background: '#0b2b26', 
              borderRadius: '12px', 
              overflow: 'hidden', 
              marginBottom: '1rem', 
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxHeight: '45vh',
              minHeight: '220px'
            }}>
              <img
                src={selectedDesignModal.image}
                alt={selectedDesignModal.title}
                style={{ maxWidth: '100%', maxHeight: '45vh', objectFit: 'contain', display: 'block' }}
              />
            </div>

            {/* Modal Content */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span className="gold-badge">
                <Sparkles size={12} /> {selectedDesignModal.category} Collection
              </span>
              {selectedDesignModal.badge && (
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
                  ★ {selectedDesignModal.badge}
                </span>
              )}
            </div>

            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-emerald)', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
              {selectedDesignModal.title}
            </h3>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-dark)', lineHeight: 1.5, marginBottom: '1rem' }}>
              {selectedDesignModal.description || 'Custom tailored with premium lining, precision fit trial, and master craftsmanship at our Tiruchengode studio.'}
            </p>

            {/* Fabric & Specs */}
            {(selectedDesignModal.fabric || selectedDesignModal.embroidery) && (
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '1rem', padding: '0.6rem 0.8rem', background: 'var(--bg-champagne)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                {selectedDesignModal.fabric && (
                  <span style={{ fontSize: '0.8rem', color: '#475569' }}>
                    🧵 Fabric: <strong style={{ color: 'var(--primary-emerald)' }}>{selectedDesignModal.fabric}</strong>
                  </span>
                )}
                {selectedDesignModal.embroidery && (
                  <span style={{ fontSize: '0.8rem', color: '#475569' }}>
                    ✨ Embroidery: <strong style={{ color: 'var(--primary-emerald)' }}>{selectedDesignModal.embroidery}</strong>
                  </span>
                )}
              </div>
            )}

            {/* Modal Action Buttons */}
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <button
                className="btn-gold"
                style={{ flex: 1, minWidth: '140px', padding: '0.65rem 0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.86rem' }}
                onClick={() => {
                  handleCustomizeOnWhatsApp(selectedDesignModal);
                  setSelectedDesignModal(null);
                }}
              >
                <Scissors size={16} /> WhatsApp Design
              </button>

              <a
                href="tel:+919123500065"
                className="btn-emerald"
                style={{ flex: 1, minWidth: '140px', padding: '0.65rem 0.8rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.86rem' }}
              >
                <PhoneCall size={16} /> Call Studio
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
