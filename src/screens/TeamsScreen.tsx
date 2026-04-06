import { TEAMS } from '../data';
import { Team } from '../types';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface TeamsScreenProps {
  onSelectTeam: (team: Team) => void;
  selectedTeamId?: string | null;
}

export default function TeamsScreen({ onSelectTeam, selectedTeamId }: TeamsScreenProps) {
  return (
    <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="sticky top-0 z-20 bg-[#2a1f24]/80 backdrop-blur-xl border-b border-white/6 px-6 pt-12 pb-4">
        <div className="text-[11px] uppercase tracking-[0.24em] text-pink-300/80 mb-2">
          ACSC Girls Soccer
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Participating Teams</h1>
      </header>

      <div className="p-6">
        <div className={`grid grid-cols-2 gap-4 transition-all duration-300 ${selectedTeamId ? 'scale-[0.985] blur-[1px]' : 'scale-100 blur-0'}`}>
          {Object.values(TEAMS).map((team) => {
            const isSelected = selectedTeamId === team.id;

            return (
              <motion.button
                key={team.id}
                whileTap={{ scale: 0.97 }}
                whileHover={{ y: -2 }}
                onClick={() => onSelectTeam(team)}
                className={`ucl-panel rounded-[24px] p-5 flex flex-col items-center gap-4 border transition-all group text-left relative ${
                  isSelected
                    ? 'border-pink-400/30 bg-white/[0.09] shadow-[0_0_30px_rgba(244,114,182,0.15)]'
                    : 'border-white/8 hover:border-pink-400/20 hover:bg-white/[0.07]'
                }`}
              >
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/6 border border-white/8 flex items-center justify-center opacity-60 group-hover:opacity-100 group-hover:border-pink-400/20 group-hover:text-pink-300 transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>

                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center p-3 border border-white/5 shadow-inner shadow-white/5">
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="text-center w-full">
                  <h3 className="text-sm font-bold text-white truncate">{team.name}</h3>
                  <p className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">{team.country}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
