import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BLOGS, BRAND_COLORS } from '../data';
import { Blog } from '../types';
import { BookOpen, Calendar, Clock, X, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

interface BlogsViewProps {
  lightMode: boolean;
  accessibilityTextSize: 'sm' | 'md' | 'lg' | 'xl';
}

export default function BlogsView() {
  const { lightMode, accessibilityTextSize } = useOutletContext<BlogsViewProps>();
  const navigate = useNavigate();
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 select-none">
      <Helmet>
        <title>
          {selectedBlog
            ? `${selectedBlog.title} | 4 Pillars Realty Knowledge Hub`
            : "Real Estate Insights & Market Handbooks | 4 Pillars Realty Nagpur"}
        </title>
        <meta
          name="description"
          content={
            selectedBlog
              ? selectedBlog.summary
              : "Stay informed with real estate market trends, investment guides, and property buying handbooks in Nagpur from 4 Pillars Realty."
          }
        />
        <meta
          property="og:title"
          content={
            selectedBlog
              ? `${selectedBlog.title} | 4 Pillars Realty Knowledge Hub`
              : "Real Estate Insights & Market Handbooks | 4 Pillars Realty Nagpur"
          }
        />
        <meta
          property="og:description"
          content={
            selectedBlog
              ? selectedBlog.summary
              : "Stay informed with real estate market trends, investment guides, and property buying handbooks in Nagpur from 4 Pillars Realty."
          }
        />
        <meta property="og:type" content="article" />
      </Helmet>
      
      {selectedBlog ? (
        // Detailed Blog Reader layout
        <div className="max-w-3xl mx-auto animate-fade-in">
          
          <button
            onClick={() => setSelectedBlog(null)}
            className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 hover:text-blue-500 transition-all mb-8 uppercase tracking-widest bg-slate-900/10 border border-slate-800/10 hover:border-blue-500/30 px-3.5 py-2 rounded-xl"
            aria-label="Exit blog text and return to catalog"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back to Catalog
          </button>

          <div className="aspect-video w-full rounded-2xl overflow-hidden relative shadow-lg mb-6">
            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent p-6 flex items-end">
              <span className="text-xs uppercase bg-[#003B72] text-white px-2.5 py-1 rounded-lg">
                {selectedBlog.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 font-mono">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {selectedBlog.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {selectedBlog.readTime}</span>
          </div>

          <h2 className={`font-serif tracking-tight font-extrabold text-slate-900 ${getHeadingClass()}`}>
            {selectedBlog.title}
          </h2>

          <div className="h-0.5 w-full bg-slate-900/10 my-6 rounded" />

          {/* Render blog body content */}
          <div className={`leading-relaxed whitespace-pre-wrap space-y-4 text-slate-700 font-medium ${getTextClass()}`}>
            {selectedBlog.content}
          </div>

          <div className={`mt-12 p-6 rounded-2xl border text-xs flex flex-col sm:flex-row items-center justify-between gap-4 bg-blue-50 border-blue-200`}>
            <div>
              <h4 className={`font-semibold mb-0.5 text-blue-900`}>Ready to consult with a Portfolio Advisor?</h4>
              <p className={`text-slate-650`}>We provide free private transport options around Nagpur corridors.</p>
            </div>
            <button
              onClick={() => {
                navigate('/contact');
                window.scrollTo({ top: 0 });
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl text-xs shrink-0"
            >
              Contact Advisory Desk
            </button>
          </div>

        </div>
      ) : (
        // Blog Catalog layout
        <div>
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest font-mono flex justify-center items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Market Handbooks
            </span>
            <h1 className={`font-serif tracking-tight font-black mt-2 text-slate-900 ${getHeadingClass()}`}>
              Knowledge Hub & Market Insights
            </h1>
            <p className={`text-slate-600 mt-1 text-sm`}>
              Informed choices. Guaranteed real estate growth.
            </p>
            <div className="h-1 w-24 bg-blue-600 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {BLOGS.map((blog) => (
              <div 
                key={blog.id}
                className={`border rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 bg-[#f8fafc] border-slate-200`}
              >
                <div>
                  {/* Photo */}
                  <div className="aspect-video w-full overflow-hidden relative">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <span className="absolute top-4 left-4 text-[9px] font-mono bg-[#003B72] text-white px-2 py-0.5 rounded uppercase">
                      {blog.category}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="p-5">
                    <div className="flex items-center gap-4 text-[10px] text-slate-500 mb-2 font-mono">
                      <span>{blog.date}</span>
                      <span>{blog.readTime}</span>
                    </div>
                    
                    <h3 className={`font-serif font-bold text-base tracking-tight leading-snug line-clamp-2 text-slate-900`}>
                      {blog.title}
                    </h3>

                    <p className="text-slate-500 text-xs mt-2.5 line-clamp-2 leading-relaxed">
                      {blog.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 mt-2">
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="text-xs text-blue-500 hover:text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1 font-mono"
                  >
                    Read Full Handbook <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
