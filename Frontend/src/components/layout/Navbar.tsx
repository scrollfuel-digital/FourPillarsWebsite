import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { User as UserType } from "../../types";
import {
  Search,
  Menu,
  X,
  ChevronRight,
  Sun,
  Moon,
  MapPin,
  Building2,
  Home,
  Phone,
  User as UserIcon,
  LogOut,
  ShieldCheck,
  LayoutDashboard,
} from "lucide-react";
import logo1 from "../../assests/images/images/logo1.png";
import { useAuth } from "../../context/AuthContext";

interface NavbarProps {
  openSearch: () => void;
  user?: UserType;
  onLoginSuccess?: (user: any) => void;
  onLogout?: () => void;
  lightMode: boolean;
  toggleLightMode?: () => void;
  accessibilityHighContrast?: boolean;
  setAccessibilityHighContrast?: (contrast: boolean) => void;
}

export default function Navbar({
  openSearch,
  lightMode,
  toggleLightMode,
}: NavbarProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects = [
    {
      name: "Melbourne City Sector II",
      route: "melbourne-city-sector-ii",
      status: "Active",
    },
    { name: "Canberra City", route: "canberra-city", status: "Active" },
    {
      name: "Shraddha Bhakti Avenue",
      route: "shraddha-bhakti-avenue",
      status: "Active",
    },
    { name: "Future Phase Projects", route: "upcoming", status: "Coming Soon" },
  ];

  useEffect(() => {
    const handleOAuthMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith(".run.app") && !origin.includes("localhost")) return;
      if (event.data?.type === "OAUTH_AUTH_SUCCESS" && event.data.user) {
        setShowUserDropdown(true);
      }
    };
    window.addEventListener("message", handleOAuthMessage);
    return () => window.removeEventListener("message", handleOAuthMessage);
  }, []);

  const navLinks = [
    { label: "Home", route: "home", path: "/", icon: Home },
    { label: "About Us", route: "about", path: "/about", icon: Building2 },
    { label: "Projects", route: "projects", path: "/projects", icon: MapPin },
    { label: "Contact Us", route: "contact", path: "/contact", icon: Phone },
  ];

  const handleLinkClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.header
      id="main-app-nav-header"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "backdrop-blur-xl bg-white/80 shadow-xl border-b border-slate-200/50"
          : "bg-white"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className=" px-4 sm:px-8 lg:px-12 flex items-center justify-between relative">
        {/* Enhanced Logo with Scroll Animation */}
        <motion.div
          className="flex items-center z-50"
          animate={{ scale: scrolled ? 1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={() => handleLinkClick("/")}
            className="p-2"
            aria-label="4 Pillars Corporate Homepage"
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src={logo1}
              alt="4 Pillars logo"
              className={`transition-all duration-500 object-contain lg:pl-40 ${
                scrolled ? "h-25 w-auto" : "h-25 w-auto"
              }`}
            />
          </motion.button>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1 ">
          {navLinks.map((link, index) => {
            const isActive = location.pathname === link.path;
            return (
              <div key={link.route} className="relative group">
                <motion.button
                  onClick={() => handleLinkClick(link.path)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all relative overflow-hidden group ${
                    isActive
                      ? "text-blue-600 bg-amber-50/80 backdrop-blur-sm"
                      : scrolled
                        ? "text-slate-700 hover:text-blue-600 hover:bg-amber-50/50"
                        : "text-blue-900 hover:text-blue-500 hover:bg-white/10"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <link.icon className="w-4.5 h-4.5" />
                  <span>{link.label}</span>

                  <motion.div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </div>
            );
          })}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2.5 z-50">
          {/* Search Button */}
          <motion.button
            onClick={() => setShowSearch(true)}
            className={`p-2.5 rounded-2xl transition-all ${
              scrolled
                ? "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                : "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search className="w-4.5 h-4.5" />
          </motion.button>

          {/* Dark/Light Mode Toggle */}
          {toggleLightMode && (
            <motion.button
              onClick={toggleLightMode}
              className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: lightMode ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {lightMode ? (
                  <Moon className="w-4.5 h-4.5" />
                ) : (
                  <Sun className="w-4.5 h-4.5" />
                )}
              </motion.div>
            </motion.button>
          )}


          {/* Mobile Menu Toggle */}
          <motion.button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-2xl bg-slate-100 text-slate-700 transition-all"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-60 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSearch(false)}
          >
            <motion.div
              className="w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(clickEvent) => clickEvent.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-6">
                <Search className="w-6 h-6 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search projects, locations, amenities..."
                  className="flex-1 text-xl font-medium bg-transparent border-none outline-none text-slate-900 placeholder-slate-400"
                  value={searchQuery}
                  onChange={(changeEvent) => setSearchQuery(changeEvent.target.value)}
                  autoFocus
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    Quick Results
                  </h3>
                  {projects
                    .filter((projectItem) =>
                      projectItem.name.toLowerCase().includes(searchQuery.toLowerCase()),
                    )
                    .map((project, index) => (
                      <motion.button
                        key={project.route}
                        onClick={() => {
                          handleLinkClick(`/${project.route}`);
                          setShowSearch(false);
                          setSearchQuery("");
                        }}
                        className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-blue-50 transition-all group text-left"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {project.name}
                          </div>
                          <div className="text-sm text-slate-500">
                            {project.status}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                      </motion.button>
                    ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Enhanced Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed top-0 right-0 h-screen w-80 max-w-[90vw] bg-white/95 backdrop-blur-2xl border-l border-white/20 shadow-2xl z-50 lg:hidden"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(clickEvent) => clickEvent.stopPropagation()}
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200/50">
              <div className="flex items-center gap-3">
                <img src={logo1} alt="4 Pillars" className="h-25 w-auto" />
                
              </div>
              <motion.button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-slate-600" />
              </motion.button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex-1 p-6 space-y-4">
              {navLinks.map((link, linkIndex) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.route}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: linkIndex * 0.1 }}
                  >
                    <motion.button
                      onClick={() => handleLinkClick(link.path)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                        isActive
                          ? "bg-blue-50 text-blue-600 border-2 border-blue-200"
                          : "text-slate-700 hover:bg-slate-50 border-2 border-transparent"
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={`p-2 rounded-xl ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                        }`}
                      >
                        <link.icon className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-lg">
                        {link.label}
                      </span>
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
