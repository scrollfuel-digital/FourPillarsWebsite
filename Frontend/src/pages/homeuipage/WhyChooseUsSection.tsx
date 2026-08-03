import { useState } from 'react';
import { motion } from 'motion/react';
import { FEATURES, FeatureCard } from './homeData';
import { FadeUp } from './homeUtils';

function FeatureItem({ card, index }: { card: FeatureCard; index: number }) {
  const [hov, setHov] = useState(false);
  const IconComp = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 20,
        padding: '28px 24px',
        borderTop: `3px solid ${card.accent}`,
        borderRight: `1.5px solid ${hov ? card.accent + '55' : '#e2e8f0'}`,
        borderBottom: `1.5px solid ${hov ? card.accent + '55' : '#e2e8f0'}`,
        borderLeft: `1.5px solid ${hov ? card.accent + '55' : '#e2e8f0'}`,
        background: '#ffffff',
        cursor: 'default',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: hov ? `0 20px 50px -10px ${card.accent}22` : '0 4px 12px rgba(0,0,0,0.03)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 16,
          background: card.iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
          transition: 'transform .3s cubic-bezier(.16,1,.3,1)',
          transform: hov ? 'scale(1.12) rotate(-4deg)' : 'none',
        }}
      >
        <IconComp style={{ width: 24, height: 24, color: card.iconColor }} />
      </div>
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          background: card.tagBg,
          color: card.tagColor,
          borderRadius: 100,
          padding: '4px 12px',
          display: 'inline-block',
          marginBottom: 14,
        }}
      >
        {card.tagLabel}
      </span>
      <div
        style={{
          fontSize: 17,
          fontWeight: 800,
          color: '#003a78',
          marginBottom: 8,
          letterSpacing: '-.3px',
        }}
      >
        {card.title}
      </div>
      <div style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.7 }}>
        {card.desc}
      </div>
      <div
        style={{
          height: 2.5,
          background: card.accent,
          borderRadius: 2,
          marginTop: 20,
          transform: hov ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform .4s cubic-bezier(.16,1,.3,1)',
        }}
      />
    </motion.div>
  );
}

export default function WhyChooseUsSection() {
  return (
    <section className="bg-slate-50/70 py-20 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <h2
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: 36,
                fontWeight: 800,
                letterSpacing: '-1.2px',
                color: '#003a78',
                marginBottom: 12,
              }}
            >
              Why Choose 4 Pillars Realty?
            </h2>
            <p
              style={{
                fontSize: 15.5,
                color: '#64748b',
                maxWidth: 540,
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              Trusted Real Estate Partner in Nagpur
            </p>
          </div>
        </FadeUp>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 22,
          }}
        >
          {FEATURES.map((card, i) => (
            <FeatureItem key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
