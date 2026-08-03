import { useNavigate, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, Variants } from 'framer-motion';
import { PROJECTS } from '../data';

import HeroSection from './homeuipage/HeroSection';
import AboutTrustSection from './homeuipage/AboutTrustSection';
import WhyChooseUsSection from './homeuipage/WhyChooseUsSection';
import ProjectHighlightsSection from './homeuipage/ProjectHighlightsSection';
import ProjectsCarouselSection from './homeuipage/ProjectsCarouselSection';
import UpcomingProjectsSection from './homeuipage/UpcomingProjectsSection';
import AmenitiesSection from './homeuipage/AmenitiesSection';
import TestimonialsSection from './homeuipage/TestimonialsSection';
import FaqSection from './homeuipage/FaqSection';
import ScheduleVisitSection from './homeuipage/ScheduleVisitSection';

interface HomeViewProps {
  openLeadModal: (projectSlug: string, initialMessage?: string) => void;
  accessibilityTextSize: 'sm' | 'md' | 'lg' | 'xl';
  lightMode: boolean;
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HomeView() {
  const { openLeadModal, accessibilityTextSize } =
    useOutletContext<HomeViewProps>();
  const navigate = useNavigate();

  const onSelectProject = (slug: string) => navigate(`/${slug}`);
  const onChangeRoute = (route: string) => navigate(`/${route}`);

  const activeProjects = PROJECTS.filter((p) => p.type !== 'upcoming');

  const textHeadingSize =
    accessibilityTextSize === 'sm'
      ? 'text-lg'
      : accessibilityTextSize === 'lg'
        ? 'text-3xl'
        : accessibilityTextSize === 'xl'
          ? 'text-4xl'
          : 'text-2xl sm:text-3xl';

  return (
    <div className="flex flex-col bg-white">
      <Helmet>
        <title>4 Pillars Realty | Premier NMRDA Approved Plots & Townships in Nagpur</title>
        <meta
          name="description"
          content="Explore 4 Pillars Realty's premium NMRDA-approved plots, residential townships, and luxury developments in Nagpur. Clear title, 100% legal compliance & high return on investment."
        />
        <meta property="og:title" content="4 Pillars Realty | Premier NMRDA Approved Plots & Townships in Nagpur" />
        <meta
          property="og:description"
          content="Explore 4 Pillars Realty's premium NMRDA-approved plots, residential townships, and luxury developments in Nagpur. Clear title, 100% legal compliance & high return on investment."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* 1. Hero Section (H1) */}
      <HeroSection
        openLeadModal={openLeadModal}
        onChangeRoute={onChangeRoute}
      />

      {/* 2. About 4 Pillars Reality */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={revealVariants}>
        <AboutTrustSection />
      </motion.div>

      {/* 3. Why Choose 4 Pillars Realty? */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={revealVariants}>
        <WhyChooseUsSection />
      </motion.div>

      {/* 4. Project Highlights & Key Metrics */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={revealVariants}>
        <ProjectHighlightsSection textHeadingSize={textHeadingSize} />
      </motion.div>

      {/* 5. Our Signature Projects */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={revealVariants}>
        <ProjectsCarouselSection
          activeProjects={activeProjects}
          onSelectProject={onSelectProject}
          textHeadingSize={textHeadingSize}
        />
      </motion.div>

      {/* 6. Upcoming Developments */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={revealVariants}>
        <UpcomingProjectsSection
          projects={PROJECTS}
          onSelectProject={onSelectProject}
          openLeadModal={openLeadModal}
          textHeadingSize={textHeadingSize}
        />
      </motion.div>

      {/* 7. Premium Lifestyle Amenities */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={revealVariants}>
        <AmenitiesSection />
      </motion.div>



      {/* 9. What Our Customers Value & Testimonials */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={revealVariants}>
        <TestimonialsSection textHeadingSize={textHeadingSize} />
      </motion.div>

      {/* 10. Frequently Asked Questions */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={revealVariants}>
        <FaqSection />
      </motion.div>

      {/* 11. Book Your Site Visit Today / Schedule Visit */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={revealVariants}>
        <ScheduleVisitSection />
      </motion.div>
    </div>
  );
}
