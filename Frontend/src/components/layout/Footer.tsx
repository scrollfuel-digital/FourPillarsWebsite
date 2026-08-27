import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, ShieldCheck, Facebook, Instagram } from "lucide-react";

import logo1 from "../../assests/images/images/logo1.png";

interface FooterProps {
  lightMode: boolean;
}

export default function Footer({ lightMode }: FooterProps) {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const mainLinks = [
    { label: "Home", path: "/" },
    { label: "Map Explorer", path: "/map" },
    { label: "Signature Projects", path: "/projects" },
    { label: "Enquire Desk", path: "/contact" },
  ];

  const projects = [
    { name: "Melbourne City Sector II", path: "/melbourne-city-sector-ii" },
    { name: "Canberra City", path: "/canberra-city" },
    { name: "Shraddha Bhakti Avenue", path: "/shraddha-bhakti-avenue" },
    {name:"Perth City" , path:"/perth-city"},
    {name:"Kharsoli Township Project-Upcoming", path:"/kharsoli-township-project"},
    {name:"Mega Township Project-Upcoming", path:"/mega-township-project"}
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61590188382356",
      icon: Facebook,
      hoverBg: "hover:bg-[#1877F2]",
      hoverBorder: "hover:border-[#1877F2]",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/4pillarsrealty__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      icon: Instagram,
      hoverBg: "hover:bg-[#1877F2]",
      hoverBorder: "hover:border-[#1877F2]",
    },
  ];

  return (
    <footer className="relative z-10 bg-[#F8FAFC] border-t border-slate-200 text-slate-800 px-4 sm:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-8 sm:gap-10 mb-8">
          {/* Logo + Social — logo left, socials right, on the same row at every size */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-row items-center justify-between sm:flex-col sm:items-start sm:justify-start gap-4 sm:gap-5 sm:pl-20">
            <button
              onClick={() => handleNavigate("/")}
              className="hover:opacity-90 transition-all duration-300 "
              aria-label="4 Pillars Corporate Homepage"
            >
              <img
                src={logo1}
                alt="4 Pillars logo"
                className="w-20 h-20 sm:w-40 sm:h-40 lg:w-32 lg:h-32 object-contain "
              />
            </button>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`group w-10 h-10 rounded-full flex items-center justify-center border border-slate-300 bg-white text-[#003B72] transition-all duration-300 hover:-translate-y-0.5 hover:text-white hover:shadow-md ${social.hoverBg} ${social.hoverBorder}`}
                  >
                    <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Pages */}
          <div className="col-span-1 sm:col-span-1 lg:col-span-2">
            <span className="text-xs font-bold uppercase tracking-widest block mb-4 text-[#003B72]">
              Pages
            </span>
            <ul className="flex flex-col gap-2.5 text-sm text-[#003B72]/75">
              {mainLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavigate(link.path)}
                    className="hover:text-blue-600 transition-colors text-left font-medium"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div className="col-span-1 sm:col-span-1 lg:col-span-2">
            <span className="text-xs font-bold uppercase tracking-widest block mb-4 text-[#003B72]">
              Our Projects
            </span>
            <ul className="flex flex-col gap-2.5 text-sm text-[#003B72]/75">
              {projects.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleNavigate(link.path)}
                    className="hover:text-blue-600 transition-colors text-left font-medium"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — full width until desktop */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3">
            <span className="text-xs font-bold uppercase tracking-widest block mb-4 text-[#003B72]">
              Contact Us
            </span>
            <ul className="flex flex-col gap-4 text-sm items-start">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-slate-700 font-medium text-left">
                  Plot No. 52-71, Gouri Meadows II, Wing-B, Behind Indian Oil
                  Petrol Pump, Besa Square, New Nagpur, Maharashtra
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+919373233777"
                    className="hover:text-blue-600 transition-all font-semibold text-slate-800"
                  >
                    +91 93732 33777
                  </a>
                  <a
                    href="tel:+919371612666"
                    className="hover:text-blue-600 transition-all font-semibold text-slate-800"
                  >
                    +91 93716 12666
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <a
                  href="mailto:info@4pillarsrealty.com"
                  className="hover:text-blue-600 transition-all font-semibold text-slate-800 break-all"
                >
                  4iconrealities@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#003B72] bg-blue-50 border-t border-blue-200 px-4 py-3 text-center -mx-4 sm:-mx-8 lg:-mx-20">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span className="font-semibold">
          NMRDA approved &amp; layout standards guaranteed.
        </span>
      </div>
    </footer>
  );
}
