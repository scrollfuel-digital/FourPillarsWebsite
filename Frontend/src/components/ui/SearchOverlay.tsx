import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { PROJECTS } from '../../data';
import { Project, SearchHistoryItem } from '../../types';
import { Search, X, Clock, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';

interface SearchOverlayProps {
  onClose: () => void;
  onSelectProject: (slug: string) => void;
  userEmail: string;
}

export default function SearchOverlay({ onClose, onSelectProject, userEmail }: SearchOverlayProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [results, setResults] = useState<Project[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch search history on render
  useEffect(() => {
    fetchHistory();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [userEmail]);

  // Execute searches when term changes or returns results
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }
    const cleanTerm = searchTerm.toLowerCase();
    const filtered = PROJECTS.filter(p => 
      p.name.toLowerCase().includes(cleanTerm) ||
      p.location.toLowerCase().includes(cleanTerm) ||
      p.description.toLowerCase().includes(cleanTerm) ||
      p.amenities.some(a => a.toLowerCase().includes(cleanTerm)) ||
      p.highlights.some(h => h.toLowerCase().includes(cleanTerm))
    );
    setResults(filtered);
  }, [searchTerm]);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`/api/search-history?email=${encodeURIComponent(userEmail)}`);
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history || []);
      }
    } catch (err) {
      console.error('Failed to retrieve search history:', err);
    }
  };

  const persistSearch = async (term: string) => {
    if (!term || term.trim() === '') return;
    try {
      const res = await fetch('/api/search-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, term }),
      });
      if (res.ok) {
        const data = await res.json();
        setHistory(data.history || []);
      }
    } catch (err) {
      console.error('Failed to log search query:', err);
    }
  };

  const clearHistory = async () => {
    try {
      const res = await fetch('/api/search-history/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });
      if (res.ok) {
        setHistory([]);
      }
    } catch (err) {
      console.error('Failed to sweep search history records:', err);
    }
  };

  const handleSelectResult = (proj: Project) => {
    persistSearch(searchTerm);
    onSelectProject(proj.slug);
    onClose();
  };

  const handleSelectHistoryItem = (term: string) => {
    setSearchTerm(term);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      persistSearch(searchTerm);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-start justify-center pt-24 px-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Property search modal sandbox"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative animate-scale-up">
        {/* Top Input Bar */}
        <div className="p-4 border-b border-slate-800/80 flex items-center gap-3 relative z-10">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search plots, apartments, road connections, or features..."
            className="flex-1 bg-transparent text-white placeholder-slate-500 font-sans border-none outline-none focus:ring-0 text-sm py-1.5"
            aria-label="Search properties input field"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="p-1 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white"
              aria-label="Clear current query text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose} 
            className="text-xs text-slate-400 bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:text-white py-1 px-2.5 rounded-lg font-mono"
            aria-label="Exit search overview"
          >
            ESC
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 relative z-10 max-h-[480px] overflow-y-auto custom-scrollbar">
          
          {/* Default view when search is empty */}
          {searchTerm.trim() === '' ? (
            <div className="flex flex-col gap-6">
              
              {/* Active Search History tags block */}
              {history.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <Clock className="w-3.5 h-3.5 text-blue-500" /> Recent Search Queries
                    </span>
                    <button 
                      onClick={clearHistory}
                      className="text-[9px] font-mono text-red-500 hover:text-red-400 transition-colors uppercase bg-red-950/20 px-2 py-0.5 rounded border border-red-900/30"
                    >
                      Sweep Records
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {history.map((term, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectHistoryItem(term)}
                        className="bg-slate-950 border border-slate-800/80 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 hover:bg-slate-800/80 hover:text-white hover:border-blue-500/50 transition-all flex items-center gap-1 font-sans"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Instant Suggestions */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-mono mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> High-frequency Search suggestions
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { term: 'Melbourne plots', label: 'Melbourne City plots at Kaldongri' },
                    { term: '3 BHK Besa', label: 'Shraddha Bhakti Avenue luxury apartments' },
                    { term: '60 acre township', label: 'Mega Township Pre-launch Plots' },
                    { term: 'NMRDA RL Approved', label: 'Verify layout release letters and clear titles' },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectHistoryItem(item.term)}
                      className="bg-slate-950/40 hover:bg-slate-950 text-slate-300 border border-slate-800/60 p-3 rounded-xl hover:border-slate-700 hover:text-white transition-all text-left flex items-start justify-between group"
                    >
                      <div>
                        <div className="font-semibold text-slate-200 group-hover:text-blue-400 font-mono text-[11px]">{item.term}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{item.label}</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Help tip info block */}
              <div className="bg-slate-950/25 border border-slate-800/50 p-4 rounded-2xl flex gap-3 text-slate-400 text-xs">
                <HelpCircle className="w-5 h-5 text-blue-500 shrink-0" />
                <p className="leading-relaxed text-[11px]">
                  <strong>Senior Real Estate DevTip:</strong> Search for <code className="bg-slate-800 text-slate-200 px-1 rounded font-mono font-normal">plots</code> or <code className="bg-slate-800 text-slate-200 px-1 rounded font-mono">Besa</code> to locate specific layouts immediately. We assist and handle all physical documentation transfers.
                </p>
              </div>

            </div>
          ) : (
            // Search result listing
            <div>
              {results.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block mb-2">
                    Found {results.length} Matching Projects in South Nagpur
                  </span>
                  {results.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => handleSelectResult(proj)}
                      className="w-full text-left bg-slate-950/40 hover:bg-slate-950 border border-slate-800/80 rounded-2xl p-4 hover:border-blue-500/50 hover:shadow-lg transition-all flex justify-between items-center group"
                    >
                      <div className="flex-1">
                        <span className="text-[9px] uppercase tracking-wider bg-slate-800 text-blue-400 px-1.5 py-0.5 rounded font-mono font-bold">
                          {proj.type.toUpperCase()}
                        </span>
                        <h4 className="text-white font-serif font-bold text-sm tracking-tight mt-1.5 group-hover:text-sky-400">
                          {proj.name}
                        </h4>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {proj.location} | {proj.priceRange}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2 line-clamp-1">
                          {proj.description}
                        </p>
                      </div>
                      <div className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all ml-4">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <p className="text-sm">No properties or layouts match <strong className="text-slate-300 font-mono">"{searchTerm}"</strong> in South Nagpur.</p>
                  <p className="text-[11px] text-slate-600 mt-1">Try seeking: "Melbourne", "Canberra", "Apartments", or "Besa".</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
