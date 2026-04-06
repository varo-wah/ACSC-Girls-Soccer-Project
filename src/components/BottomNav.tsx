import { CalendarDays, Home, Users, Trophy, Info } from 'lucide-react';
import { AppTab } from '../types';

interface BottomNavProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs: { id: AppTab; label: string; icon: typeof Home }[] = [
    { id: 'Home', label: 'Home', icon: Home },
    { id: 'Schedule', label: 'Schedule', icon: CalendarDays },
    { id: 'Standings', label: 'Standings', icon: Trophy },
    { id: 'Info', label: 'Info', icon: Info },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/8 bg-[#1c1618]/90 backdrop-blur-2xl">
      <div className="max-w-xl mx-auto h-20 px-2 pb-safe flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center w-full h-full"
            >
              <div
                className={`relative h-10 w-10 rounded-2xl flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-pink-500/14 text-pink-300'
                    : 'text-slate-500'
                }`}
              >
                <Icon size={22} strokeWidth={isActive ? 2.4 : 2} />
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl border border-pink-400/20 shadow-[0_0_24px_rgba(244,114,182,0.22)]" />
                )}
              </div>

              <span
                className={`mt-1 text-[10px] sm:text-[11px] font-medium ${
                  isActive ? 'text-white' : 'text-slate-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
