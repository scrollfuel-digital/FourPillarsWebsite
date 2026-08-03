import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SearchOverlay from '../components/ui/SearchOverlay';
import LeadModal from '../components/ui/LeadModal';
import { User } from '../types';
import { ChevronUp } from 'lucide-react';

export default function MainLayout() {
    const location = useLocation();

    // Overlay States
    const [searchOpen, setSearchOpen] = useState(false);
    const [leadModalOpen, setLeadModalOpen] = useState(false);
    const [leadModalSlug, setLeadModalSlug] = useState < string > ('melbourne-city-sector-ii');
    const [leadModalMessage, setLeadModalMessage] = useState < string > ('');

    // Identity States
    const [user, setUser] = useState < User > ({
        name: 'Verified Guest Customer',
        email: 'guest@aistudio-client.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        isLoggedIn: false,
        savedProjects: []
    });

    // Ambient & Accessibility States
    const [accessibilityTextSize, setAccessibilityTextSize] = useState < 'sm' | 'md' | 'lg' | 'xl' > ('md');
    const [accessibilityHighContrast, setAccessibilityHighContrast] = useState(false);
    const [lightMode, setLightMode] = useState(true);
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Scroll to top on route change for clean transition
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLoginSuccess = (loggedUser: any) => {
        setUser({
            ...loggedUser,
            savedProjects: []
        });
    };

    const handleLogout = () => {
        setUser({
            name: '',
            email: '',
            isLoggedIn: false,
            savedProjects: []
        });
    };

    const handleOpenLeadModal = (projectSlug: string, message: string = '') => {
        setLeadModalSlug(projectSlug);
        setLeadModalMessage(message);
        setLeadModalOpen(true);
    };

    // Determine continuous text height sizing metrics class
    const getTextHeightClass = () => {
        if (accessibilityTextSize === 'sm') return 'text-xs leading-normal';
        if (accessibilityTextSize === 'lg') return 'text-lg leading-relaxed';
        if (accessibilityTextSize === 'xl') return 'text-xl leading-loose';
        return 'text-sm leading-relaxed';
    };

    return (
        <div
            className={`min-h-screen transition-all ${getTextHeightClass()} ${accessibilityHighContrast
                    ? 'bg-black text-white selection:bg-white selection:text-black'
                    : 'bg-[#F8FAFC] text-slate-800'
                }`}
        >
            {/* Upper Navigation Rail */}
            <Navbar
                openSearch={() => setSearchOpen(true)}
                accessibilityHighContrast={accessibilityHighContrast}
                setAccessibilityHighContrast={setAccessibilityHighContrast}
                lightMode={lightMode}
            />

            {/* Main Container Sandbox */}
            <main className="relative min-h-[90vh] pt-16">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Outlet
                            context={{
                                openLeadModal: handleOpenLeadModal,
                                accessibilityTextSize,
                                lightMode
                            }}
                        />
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Global Bottom Footer Panel */}
            <Footer lightMode={lightMode} />

            {/* Search overlay box */}
            {searchOpen && (
                <SearchOverlay
                    onClose={() => setSearchOpen(false)}
                    onSelectProject={(slug) => {
                        // Will navigate via useNavigate handled in subcomponents
                    }}
                    userEmail={user.email}
                />
            )}

            {/* Direct Scheduling micro cabinet modal */}
            <LeadModal
                isOpen={leadModalOpen}
                onClose={() => setLeadModalOpen(false)}
                projectSlug={leadModalSlug}
                initialMessage={leadModalMessage}
                accessibilityTextSize={accessibilityTextSize}
            />

            {/* Floating Scroll to Top active button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 15 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className={`fixed bottom-6 right-6 z-40 p-3.5 rounded-full shadow-2xl border flex items-center justify-center transition-all cursor-pointer ${lightMode
                                ? 'bg-white text-[#003B72] border-slate-200 shadow-slate-300'
                                : 'bg-slate-900 text-blue-400 border-slate-800 shadow-black/80 hover:text-white hover:border-slate-700'
                            }`}
                        title="Scroll to Top"
                        aria-label="Scroll page back to top"
                    >
                        <ChevronUp className="w-5 h-5 stroke-[2.5]" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
