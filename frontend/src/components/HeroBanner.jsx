import React from 'react';
import { Sparkles, Scissors, Truck, Star, ShieldCheck, PhoneCall } from 'lucide-react';
import EnquiryIcon from './EnquiryIcon';

export default function HeroBanner({ onStartCustomize, onOpenEnquiry }) {
  const services = [
    'Custom Saree Blouse',
    'Bridal & Festive Lehenga Choli',
    'Designer Chudithar & Salwar Kurti',
    'Designer Frock / Long Gown',
    'Saree Converted Frock (Saree Reuse)',
    'Skirt Shirt & Kids Ethnic Wear',
    'Saree Pre-Pleating & Box Folding',
    'Neckline Delicate Aari Work'
  ];

  return (
    <section 
      className="hero-section"
      style={{
        background: 'linear-gradient(135deg, #0b2b26 0%, #164e43 50%, #4a0e17 100%)',
        color: '#ffffff',
        padding: '2.5rem 1rem 3rem 1rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Background Glow Elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 2, padding: '0 0.5rem' }}>
        <div className="hero-grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          
          {/* Hero Left Content */}
          <div className="hero-left-content">
            <div className="gold-badge hero-badge" style={{ marginBottom: '0.85rem' }}>
              <Sparkles size={13} /> Nakshatra Designer's • Est. 2000 (25+ Yrs)
            </div>

            <h1 className="hero-title" style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1.22, marginBottom: '0.85rem', fontFamily: 'var(--font-serif)' }}>
              Custom <span style={{ color: 'var(--accent-gold)' }}>Blouse, Frocks</span> & Saree-to-Frock Conversions
            </h1>

            <p className="hero-description" style={{ fontSize: '0.94rem', color: '#e2e8f0', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Visit our boutique shop in Tiruchengode West (Opp. Sivakumar Metal Mart) for precision custom tailoring! We specialize in bridal saree blouses, designer frocks, saree pre-pleating, and converting your silk sarees into modern maxi gowns.
            </p>

            {/* Hero Action CTA Buttons */}
            <div className="hero-cta-buttons" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <button 
                className="btn-gold hero-cta-btn"
                onClick={onStartCustomize}
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem', boxShadow: '0 4px 15px rgba(212, 175, 55, 0.35)' }}
              >
                <Sparkles size={16} /> Explore Lookbook Designs
              </button>

              <button
                className="btn-outline hero-cta-btn"
                onClick={() => onOpenEnquiry && onOpenEnquiry('Boutique Fitting & Rate Consultation')}
                style={{ padding: '0.65rem 1.15rem', fontSize: '0.88rem', borderColor: 'rgba(255,255,255,0.4)', color: '#ffffff', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem' }}
              >
                <EnquiryIcon size={16} /> Enquire Rates
              </button>
            </div>

            {/* Key Trust Highlights */}
            <div className="hero-trust-highlights" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
                <Star size={14} fill="#d4af37" color="#d4af37" />
                <span><strong>4.9 / 5</strong> Justdial Verified (28+ Reviews)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
                <ShieldCheck size={14} color="#d4af37" />
                <span>In-Shop Fitting Trial</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
                <Truck size={14} color="#d4af37" />
                <span>Saree Pre-Pleating & Reuse</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Card */}
          <div className="hero-right-card">
            <div className="glass-card" style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.95)', color: 'var(--text-dark)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <h3 style={{ fontSize: '1.05rem', color: 'var(--primary-emerald)' }}>Boutique Tailoring Rates</h3>
                <span className="gold-badge">Custom Tailoring</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.86rem' }}>
                {services.map(srv => (
                  <div 
                    key={srv} 
                    onClick={() => onOpenEnquiry && onOpenEnquiry(srv)}
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      padding: '0.3rem 0.4rem', 
                      borderRadius: '6px',
                      cursor: 'pointer',
                      borderBottom: '1px solid rgba(0,0,0,0.05)',
                      transition: 'all 0.2s ease',
                      gap: '0.5rem'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)'}
                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                    title={`Click to enquire about ${srv}`}
                  >
                    <span style={{ fontWeight: 500, fontSize: '0.84rem' }}>{srv}</span>
                    <button
                      className="btn-outline"
                      style={{ padding: '0.15rem 0.45rem', fontSize: '0.72rem', borderColor: 'var(--accent-gold)', color: 'var(--primary-emerald)', display: 'flex', alignItems: 'center', gap: '0.25rem', pointerEvents: 'none', flexShrink: 0 }}
                    >
                      <EnquiryIcon size={13} /> Enquire
                    </button>
                  </div>
                ))}
                
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.35rem', color: 'var(--primary-emerald)', fontWeight: 600, fontSize: '0.82rem' }}>
                  <span>Shop Timings</span>
                  <span>Mon-Sat 9:30 AM - 8 PM</span>
                </div>
              </div>

              <div className="hero-rate-actions" style={{ display: 'flex', gap: '0.65rem', marginTop: '0.9rem', flexWrap: 'wrap' }}>
                <button 
                  className="btn-emerald hero-rate-btn" 
                  style={{ flex: 1, minWidth: '110px', padding: '0.55rem 0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.86rem' }}
                  onClick={() => onOpenEnquiry && onOpenEnquiry('Tailoring Rates & Fitting Consultation')}
                >
                  <EnquiryIcon size={15} /> Enquire
                </button>

                <a 
                  href="tel:+919123500065"
                  className="btn-gold hero-rate-btn" 
                  style={{ flex: 1.3, minWidth: '150px', padding: '0.55rem 0.8rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.86rem', whiteSpace: 'nowrap' }}
                >
                  <PhoneCall size={15} /> Call: +91 91235 00065
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
