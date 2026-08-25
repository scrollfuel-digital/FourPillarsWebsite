import { useState } from "react";
import { motion } from "motion/react";
import { FEATURES, FeatureCard } from "./homeData";
import { FadeUp } from "./homeUtils";

function FeatureItem({ card, index }: { card: FeatureCard; index: number }) {
  const [hov, setHov] = useState(false);
  const IconComp = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        margin: "-50px",
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -6,
        transition: {
          duration: 0.3,
        },
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="
        relative
        overflow-hidden
        rounded-[20px]
        bg-white
        p-6
        md:p-7
        cursor-default
        transition-all
        duration-300
      "
      style={{
        borderTop: `3px solid ${card.accent}`,
        borderRight: `1.5px solid ${hov ? `${card.accent}55` : "#e2e8f0"}`,
        borderBottom: `1.5px solid ${hov ? `${card.accent}55` : "#e2e8f0"}`,
        borderLeft: `1.5px solid ${hov ? `${card.accent}55` : "#e2e8f0"}`,
        boxShadow: hov
          ? `0 20px 50px -10px ${card.accent}22`
          : "0 4px 12px rgba(0,0,0,0.03)",
      }}
    >
      {/* Icon */}
      <div
        className="
          flex
          h-[52px]
          w-[52px]
          items-center
          justify-center
          rounded-2xl
          mb-4
          transition-transform
          duration-300
        "
        style={{
          background: card.iconBg,
          transform: hov
            ? "scale(1.12) rotate(-4deg)"
            : "scale(1) rotate(0deg)",
        }}
      >
        <IconComp
          className="h-6 w-6"
          style={{
            color: card.iconColor,
          }}
        />
      </div>

      {/* Tag */}
      <span
        className="
          inline-block
          mb-3.5
          rounded-full
          px-3
          py-1
          text-[10px]
          font-bold
          uppercase
          tracking-[0.1em]
        "
        style={{
          background: card.tagBg,
          color: card.tagColor,
        }}
      >
        {card.tagLabel}
      </span>

      {/* Title */}
      <div
        className="
          mb-2
          text-[17px]
          font-extrabold
          tracking-[-0.3px]
          text-[#003a78]
        "
      >
        {card.title}
      </div>

      {/* Description */}
      <div
        className="
          text-[13.5px]
          leading-[1.7]
          text-slate-500
        "
      >
        {card.desc}
      </div>

      {/* Hover Bottom Line */}
      <div
        className="
          mt-5
          h-[2.5px]
          origin-left
          rounded-sm
          transition-transform
          duration-500
        "
        style={{
          background: card.accent,
          transform: hov ? "scaleX(1)" : "scaleX(0)",
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
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h2
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: 36,
                fontWeight: 800,
                letterSpacing: "-1.2px",
                color: "#003a78",
                marginBottom: 12,
              }}
            >
              Why Choose 4 Pillars Realty?
            </h2>
            <p
              style={{
                fontSize: 15.5,
                color: "#64748b",
                maxWidth: 540,
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Trusted Real Estate Partner in Nagpur
            </p>
          </div>
        </FadeUp>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((card, i) => (
            <FeatureItem key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
