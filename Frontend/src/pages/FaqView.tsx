import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FAQS, BRAND_COLORS } from '../data';
import { Sparkles, HelpCircle, ChevronDown, CheckCircle } from 'lucide-react';

interface FaqViewProps {
  lightMode: boolean;
  accessibilityTextSize: 'sm' | 'md' | 'lg' | 'xl';
}

export default function FaqView() {
  const { lightMode, accessibilityTextSize } = useOutletContext<FaqViewProps>();
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const getHeadingClass = () => {
    if (accessibilityTextSize === 'sm') return 'text-xl';
    if (accessibilityTextSize === 'lg') return 'text-4xl';
    if (accessibilityTextSize === 'xl') return 'text-5xl';
    return 'text-3xl sm:text-4xl';
  };

  const getTextClass = () => {
    if (accessibilityTextSize === 'sm') return 'text-xs';
    if (accessibilityTextSize === 'lg') return 'text-base';
    if (accessibilityTextSize === 'xl') return 'text-lg';
    return 'text-sm';
  };

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 select-none">
      <Helmet>
        <title>Frequently Asked Questions | NMRDA Plots & Compliance - 4 Pillars Realty</title>
        <meta
          name="description"
          content="Find answers to common questions about NMRDA sanctioning, RL plots, property financing, legal documentation, and site visits with 4 Pillars Realty."
        />
        <meta property="og:title" content="Frequently Asked Questions | NMRDA Plots & Compliance - 4 Pillars Realty" />
        <meta
          property="og:description"
          content="Find answers to common questions about NMRDA sanctioning, RL plots, property financing, legal documentation, and site visits with 4 Pillars Realty."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* 1. Header Block */}
      <div className="text-center mb-16">
        <span className="text-xs font-bold text-red-500 uppercase tracking-widest font-mono flex justify-center items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Customer Clarity
        </span>
        <h1 className={`font-serif tracking-tight font-black mt-2 ${
          lightMode ? 'text-slate-900' : 'text-slate-100'
        } ${getHeadingClass()}`}>
          Frequently Asked Questions
        </h1>
        <p className={`${lightMode ? 'text-slate-600' : 'text-slate-400'} italic mt-1 font-serif text-sm`}>
          Simple guidelines. Absolute compliance clarity.
        </p>
        <div className="h-1 w-24 bg-blue-600 mx-auto mt-4 rounded-full" />
      </div>

      {/* 2. Accordion Container */}
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                isOpen 
                  ? (lightMode ? 'bg-[#f4f7fa] border-blue-500' : 'bg-[#091522] border-blue-600/60') 
                  : (lightMode ? 'bg-[#f8fafc] border-slate-200' : 'bg-slate-950 border-slate-850')
              }`}
            >
              {/* Question Clicker header */}
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-5 flex justify-between items-center gap-4 transition-colors"
                aria-expanded={isOpen}
                aria-label={`Frequently asked question: ${faq.q}`}
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span className={`font-serif font-bold text-sm tracking-tight leading-snug ${
                    lightMode ? 'text-slate-900' : 'text-slate-150'
                  }`}>
                    {faq.q}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 shrink-0 ${
                  isOpen ? 'rotate-180 text-blue-500' : ''
                }`} />
              </button>

              {/* Answer sliding drawer */}
              {isOpen && (
                <div className={`p-5 pt-0 border-t border-slate-900/10 leading-relaxed text-xs ${
                  lightMode ? 'text-slate-655' : 'text-slate-400'
                } ${getTextClass()} animate-fade-in`}>
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Advisory Footer Badge */}
      <div className={`mt-12 p-6 rounded-2xl border text-center text-xs max-w-xl mx-auto ${
        lightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-850'
      }`}>
        <span className={`font-semibold block mb-1 ${lightMode ? 'text-slate-800' : 'text-slate-350'}`}>Still have unanswered legal queries?</span>
        <p className="text-slate-500 text-[11px] mb-4">Our on-site legal counselors provide complete physical brochure dossiers free of charge.</p>
        <button
          onClick={() => {
            navigate('/contact');
            window.scrollTo({ top: 0 });
          }}
          className="bg-blue-600 hover:bg-blue-500 text-white font-mono text-[10px] uppercase font-bold py-2 px-4 rounded-xl"
        >
          Enquire Legal Desk
        </button>
      </div>

    </div>
  );
}
