import { useEffect, useState } from 'react';
import { Team } from '../types';
import { APP_COPY, HOME_FEATURED_MATCH, HOME_UPCOMING_MATCHES, HOME_FINISHED_MATCHES, TEAMS } from '../data';
import MatchCard from '../components/MatchCard';
import { PlayCircle, Bell } from 'lucide-react';

interface HomeScreenProps {
  onSelectTeam: (team: Team) => void;
}

export default function HomeScreen({ onSelectTeam }: HomeScreenProps) {
  const [jakartaTime, setJakartaTime] = useState('');
  const [showRefreshPopup, setShowRefreshPopup] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setShowRefreshPopup(false);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setJakartaTime(formatted);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="pt-6 pb-6 px-6">
        <div className="w-full h-32 rounded-2xl overflow-hidden mb-6 border border-white/10 shadow-lg">
          <img src="https://res.cloudinary.com/dpgt445lg/image/upload/v1775484081/ACSC_Girls_football_26_qt5nuv.png" alt="ACSC Banner" className="w-full h-full object-cover" />
        </div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 overflow-hidden">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-pink-400 p-2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 7.5l-3 2.5v4l3 2.5 3-2.5v-4z"/>
                <path d="M12 7.5V2.5"/>
                <path d="M15 10l4.5-2.5"/>
                <path d="M9 10L4.5 7.5"/>
                <path d="M15 14l4.5 2.5"/>
                <path d="M9 14l-4.5 2.5"/>
                <path d="M12 16.5v5"/>
              </svg>
            </div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-pink-300/80 leading-tight max-w-[140px] sm:max-w-none break-words">
              Asian Christian Schools Conference
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/35">
              Jakarta Time
            </div>
            <div className="text-base font-bold text-white">
              {jakartaTime}
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
          ACSC Girls Soccer
        </h1>
      </header>

      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          showRefreshPopup
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3 rounded-full border border-pink-500/25 bg-[#4a2c39]/95 px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.28)] backdrop-blur-md">
          <div className="w-9 h-9 rounded-full bg-pink-500/20 flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4 text-pink-400" />
          </div>
          <p className="text-sm text-white/90 font-medium leading-snug whitespace-nowrap">
            Refresh to view updated results
          </p>
        </div>
      </div>

      <section className="px-4 mb-10">
        <h2 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4 px-2">
          {APP_COPY.heroLabel}
        </h2>
        <div className="relative">
          <MatchCard match={HOME_FEATURED_MATCH} variant="featured" />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
            <a 
              href="https://youtube.com/playlist?list=PLnDGQGJCZlGEzYGwG54Vu9jO4YT2G1uhS&si=kSQSHBFPkB1KHESL"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(244,114,182,0.4)] transition-all"
            >
              <PlayCircle className="w-4 h-4" />
              Watch Live
            </a>
          </div>
        </div>
      </section>

      <section className="mb-10 mt-12">
        <h2 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4 px-6">
          {APP_COPY.sectionUpcoming}
        </h2>
        <div className="flex overflow-x-auto no-scrollbar px-4 gap-4 pb-4">
          {HOME_UPCOMING_MATCHES.map(match => (
            <div key={match.id} className="min-w-[300px]">
              <MatchCard match={match} variant="compact" />
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4 px-6">
          Finished Matches
        </h2>
        <div className="flex overflow-x-auto no-scrollbar px-4 gap-4 pb-4">
          {HOME_FINISHED_MATCHES.map(match => (
            <div key={match.id} className="min-w-[300px]">
              <MatchCard match={match} variant="compact" />
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 mb-10">
        <h2 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">
          Participating Teams
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.values(TEAMS).map((team) => (
            <button
              key={team.id}
              onClick={() => onSelectTeam(team)}
              className="ucl-panel rounded-[24px] p-5 flex flex-col items-center gap-4 border border-white/8 transition-all group text-left hover:scale-[1.03] active:scale-[0.97]"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center p-3 border border-white/5 shadow-inner shadow-white/5">
                <div className={`w-full h-full rounded-full flex items-center justify-center ${team.id === 'fa' ? 'bg-white p-1' : ''}`}>
                  <img src={team.logo} alt={team.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="text-center w-full">
                <h3 className="text-sm font-bold text-white truncate">{team.name}</h3>
                <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">{team.country}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
}
