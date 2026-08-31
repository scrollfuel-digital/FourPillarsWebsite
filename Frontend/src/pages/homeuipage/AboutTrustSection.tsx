import { useState } from "react";
import { motion } from "motion/react";
import { STATS, ABOUT_TAGS, COMPANY_HIGHLIGHTS, StatItem } from "./homeData";
import { FadeUp, useCounter } from "./homeUtils";

function StatCell({
  stat,
  active,
  index,
}: {
  stat: StatItem;
  active: boolean;
  index: number;
}) {
  const count = useCounter(stat.value, active, index * 80);
  const [hov, setHov] = useState(false);
  const IconComp = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textAlign: "center",
        padding: "20px 12px",
        borderRadius: 16,
        background: hov ? "rgba(255,255,255,.13)" : "rgba(255,255,255,.055)",
        border: `1px solid ${hov ? "rgba(255,255,255,.22)" : "rgba(255,255,255,.09)"}`,
        transition: "background .25s, transform .25s, border-color .25s",
        transform: hov ? "translateY(-4px) scale(1.03)" : "none",
        cursor: "default",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: stat.iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 12px",
        }}
      >
        <IconComp style={{ width: 20, height: 20, color: stat.iconColor }} />
      </div>
      <div
        style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontSize: 34,
          fontWeight: 800,
          color: "#fff",
          letterSpacing: "-1px",
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {count}
        {stat.suffix}
      </div>
      <div
        style={{
          fontSize: 10.5,
          color: "rgba(255,255,255,.55)",
          fontWeight: 600,
          letterSpacing: ".07em",
          textTransform: "uppercase",
        }}
      >
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function AboutTrustSection() {
  const [statsActive, setStatsActive] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "#f8fafc",
        padding: "72px 0 88px",
        borderBottom: "1px solid #e2e8f0",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 16px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 48,
            alignItems: "center",
          }}
        >
          {/* LEFT CONTENT */}
          <div style={{ paddingRight: 8 }}>
            <FadeUp delay={40}>
              <h2
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: 32,
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-1px",
                  color: "#003a78",
                  marginBottom: 8,
                }}
              >
                About 4 Pillars Reality
              </h2>
            </FadeUp>
            <FadeUp delay={80}>
              <div
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: 22,
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: "-0.5px",
                  background:
                    "linear-gradient(105deg, #003a78 10%, #2b86c5 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: 20,
                }}
              >
                Building Trust. Creating Communities.
              </div>
            </FadeUp>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                height: 4,
                borderRadius: 4,
                background: "linear-gradient(90deg, #003a78, #2b86c5)",
                marginBottom: 24,
              }}
            />

            <FadeUp delay={160}>
              <p
                style={{
                  fontSize: 15.5,
                  lineHeight: 1.8,
                  color: "#334155",
                  marginBottom: 16,
                  textAlign: "justify",
                }}
              >
                At{" "}
                <strong style={{ color: "#003a78", fontWeight: 700 }}>
                  4 Pillars Reality
                </strong>
                , we believe every property should offer more than just space—it
                should create opportunities for better living and future growth.
              </p>
            </FadeUp>

            <FadeUp delay={220}>
              <p
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.8,
                  color: "#64748b",
                  marginBottom: 14,
                  textAlign: "justify",
                }}
              >
                We specialize in premium plotted developments, residential
                townships, and luxury apartments across Nagpur. Our projects are
                carefully selected in emerging locations that offer strong
                connectivity, quality infrastructure, and excellent appreciation
                potential.
              </p>
            </FadeUp>

            <FadeUp delay={280}>
              <p
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.8,
                  color: "#64748b",
                  marginBottom: 24,
                  textAlign: "justify",
                }}
              >
                Our commitment to transparency, customer satisfaction, and
                quality development has made us a trusted name among homebuyers
                and investors.
              </p>
            </FadeUp>

            <FadeUp delay={380}>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginBottom: 20,
                }}
              >
                {ABOUT_TAGS.map((tag) => (
                  <motion.span
                    key={tag.label}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      padding: "6px 14px",
                      borderRadius: 100,
                      background: tag.bg,
                      color: tag.color,
                      border: `1px solid ${tag.border}`,
                    }}
                  >
                    {tag.label}
                  </motion.span>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* RIGHT ACHIEVEMENTS BOX */}
          <FadeUp delay={100}>
            <motion.div
              onViewportEnter={() => setStatsActive(true)}
              viewport={{ once: true }}
            >
              <div
                style={{
                  borderRadius: 24,
                  background:
                    "linear-gradient(145deg, #001f42 0%, #003a78 100%)",
                  padding: "36px 30px",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 24px 64px -10px rgba(0,58,120,0.35)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -60,
                    right: -60,
                    width: 260,
                    height: 260,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(43,134,197,0.3) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: -40,
                    left: -40,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(194,58,74,0.2) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <p
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,.5)",
                      marginBottom: 8,
                      textAlign: "center",
                    }}
                  >
                    Company Track Record
                  </p>
                  <div
                    style={{
                      height: 1,
                      background: "rgba(255,255,255,.1)",
                      marginBottom: 28,
                    }}
                  />
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 14,
                    }}
                  >
                    {STATS.map((s, i) => (
                      <StatCell
                        key={s.label}
                        stat={s}
                        active={statsActive}
                        index={i}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                      justifyContent: "center",
                      marginTop: 22,
                      paddingTop: 20,
                      borderTop: "1px solid rgba(255,255,255,.09)",
                    }}
                  >
                    {COMPANY_HIGHLIGHTS.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 10.5,
                          fontWeight: 600,
                          letterSpacing: ".06em",
                          color: "rgba(255,255,255,.7)",
                          background: "rgba(255,255,255,.08)",
                          border: "1px solid rgba(255,255,255,.14)",
                          borderRadius: 100,
                          padding: "4px 12px",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </FadeUp>
        </div>
      </div>
    </motion.section>
  );
}
