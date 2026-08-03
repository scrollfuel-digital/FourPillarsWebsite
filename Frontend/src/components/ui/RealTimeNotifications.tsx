import { useState, useEffect } from 'react';
import { MOCK_NOTIFICATIONS, PROJECTS } from '../../data';
import { Notification } from '../../types';
import { Sparkles, Bell, X, Compass, CheckCircle } from 'lucide-react';

interface RealTimeNotificationsProps {
  onSelectProject: (slug: string) => void;
  accessibilityHighContrast: boolean;
}

export default function RealTimeNotifications({ onSelectProject, accessibilityHighContrast }: RealTimeNotificationsProps) {
  const [activeNotification, setActiveNotification] = useState<Notification | null>(null);
  const [queue, setQueue] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  useEffect(() => {
    // Show first notification after a brief delay
    const initialTimer = setTimeout(() => {
      triggerNext();
    }, 4000);

    // Set up recurring simulation of real-time sales transactions
    const intervalTimer = setInterval(() => {
      generateSimulatedBookingNotification();
    }, 18000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [queue]);

  const generateSimulatedBookingNotification = () => {
    const randomProject = PROJECTS[Math.floor(Math.random() * PROJECTS.length)];
    const randomPlot = Math.floor(Math.random() * 90) + 1;
    const cities = ['Besa', 'Somalwada', 'Manish Nagar', 'Wardha Road', 'Pune', 'Mumbai', 'Narendra Nagar'];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];

    const userNames = ['Mr. Deshpande', 'Dr. Patil', 'Mrs. Kulkarni', 'Eng. Joshi', 'Mr. Shah', 'Adv. Sharma'];
    const name = userNames[Math.floor(Math.random() * userNames.length)];

    const newNotification: Notification = {
      id: `sim_${Date.now()}`,
      type: 'success',
      message: `${name} from ${randomCity} just registered interest in Plot No. ${randomPlot} inside ${randomProject.name}!`,
      timestamp: 'Just now',
      projectSlug: randomProject.slug
    };

    setQueue((prev) => [...prev, newNotification]);
  };

  const triggerNext = () => {
    if (queue.length === 0) return;
    const next = queue[0];
    setActiveNotification(next);
    setQueue((prev) => prev.slice(1));

    // Auto dismiss after 6 seconds
    const dismissTimer = setTimeout(() => {
      setActiveNotification(null);
    }, 6000);

    return () => {
      clearTimeout(dismissTimer);
    };
  };

  useEffect(() => {
    if (!activeNotification && queue.length > 0) {
      const timer = setTimeout(() => {
        triggerNext();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [activeNotification, queue]);

  if (!activeNotification) return null;

  const bgBorderClass = accessibilityHighContrast 
    ? 'bg-slate-950 border-4 border-white text-white' 
    : 'bg-slate-900/95 border border-blue-500/30 text-white shadow-[0_10px_30px_rgba(0,59,114,0.3)]';

  const iconColor = activeNotification.type === 'success' 
    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
    : 'bg-blue-500/10 border-blue-500/20 text-blue-400';

  return (
    <div 
      className={`fixed bottom-6 right-6 z-55 max-w-sm rounded-2xl p-4 flex gap-4 transition-all duration-500 transform translate-y-0 scale-100 backdrop-blur-md ${bgBorderClass}`}
      role="status"
      aria-live="polite"
    >
      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${iconColor}`}>
        {activeNotification.type === 'success' ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <Compass className="w-5 h-5 animate-spin" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <span className="text-[9px] font-bold font-mono tracking-widest text-[#1883D5] uppercase">
            LIVE TRANSACTION MONITOR
          </span>
          <span className="text-[8px] font-mono text-slate-500 whitespace-nowrap">
            {activeNotification.timestamp}
          </span>
        </div>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          {activeNotification.message}
        </p>

        {activeNotification.projectSlug && (
          <button
            onClick={() => {
              onSelectProject(activeNotification.projectSlug!);
              setActiveNotification(null);
            }}
            className="text-[10px] text-blue-400 hover:text-blue-300 font-bold mt-2 hover:underline transition-all block text-left"
          >
            Locate Plot Layout & Map Coordinate →
          </button>
        )}
      </div>

      <button 
        onClick={() => setActiveNotification(null)}
        className="p-0.5 rounded text-slate-500 hover:bg-slate-800 hover:text-slate-300 self-start"
        aria-label="Dismiss real-time sales alert"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
