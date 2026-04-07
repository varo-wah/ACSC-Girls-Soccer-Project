import { motion } from 'motion/react';
import { Clock3, MapPin, CalendarDays } from 'lucide-react';
import { ScheduleItem, Match } from '../types';

interface MatchCardProps {
  match: ScheduleItem;
  variant?: 'default' | 'compact' | 'featured';
  highlightLive?: boolean;
  key?: string | number;
}

function statusClasses(status: Match['status']) {
  switch (status) {
    case 'Live':
      return 'bg-red-500/20 text-red-200 border-red-400/40 shadow-[0_0_16px_rgba(239,68,68,0.35)]';
    case 'Finished':
      return 'bg-emerald-500/14 text-emerald-300 border-emerald-400/20';
    default:
      return 'bg-white/8 text-slate-300 border-white/10';
  }
}

export default function MatchCard({ match, variant = 'default', highlightLive = false }: MatchCardProps) {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

  if (match.type === 'event') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`ucl-panel border border-white/8 ${
          isFeatured ? 'rounded-[24px] p-5' : 'rounded-[22px] p-4'
        } bg-gradient-to-br from-white/5 to-transparent`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider bg-pink-500/10 text-pink-300 border-pink-400/20">
              Event
            </div>
          </div>
          {match.venue && (
            <div className="flex items-center gap-1 text-white/30">
              <MapPin className="w-3 h-3" />
              <span className="text-[10px] font-medium">{match.venue}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
            <CalendarDays className="w-5 h-5 text-white/50" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white tracking-wide">{match.title}</span>
            <div className="flex items-center gap-2 mt-1 text-white/40">
              <Clock3 className="w-3 h-3" />
              <span className="text-xs font-medium">{match.time}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`ucl-panel ${
        highlightLive
          ? 'border border-red-400/40 shadow-[0_0_28px_rgba(239,68,68,0.28)] animate-pulse'
          : 'border border-white/8'
      } ${isFeatured ? 'rounded-[24px] p-5' : 'rounded-[22px] p-4'}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${statusClasses(match.status)}`}>
            {match.status === 'Live' ? (
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-red-400 animate-pulse" />
                {match.minuteText || 'Live'}
              </span>
            ) : match.status}
          </div>
          {match.competitionLabel && (
            <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">
              {match.competitionLabel}
            </span>
          )}
        </div>
        {!isCompact && match.venue && (
          <div className="flex items-center gap-1 text-white/30">
            <MapPin className="w-3 h-3" />
            <span className="text-[10px] font-medium">{match.venue}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* Home Team */}
        <div className={`flex flex-col items-center flex-1 ${isCompact ? 'gap-2' : 'gap-3'}`}>
          <div className={`${isFeatured ? 'w-16 h-16' : 'w-12 h-12'} rounded-full bg-white/5 flex items-center justify-center p-2 border border-white/5 shadow-inner shadow-white/5`}>
            {match.homeTeam ? (
              <div className={`w-full h-full rounded-full flex items-center justify-center ${match.homeTeam?.id === 'fa' ? 'bg-white p-1' : ''}`}>
                <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
            ) : (
              <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center text-white/30 text-xs font-bold">?</div>
            )}
          </div>
          <span className={`${isFeatured ? 'text-sm' : 'text-xs'} font-bold text-white text-center uppercase tracking-wider`}>
            {match.homeTeam ? match.homeTeam.shortName : match.homeTeamPlaceholder}
          </span>
        </div>

        {/* Score / Time */}
        <div className="flex flex-col items-center min-w-[80px]">
          {match.status === 'Upcoming' ? (
            <div className="flex flex-col items-center gap-1">
              <span className="text-xl font-bold text-white tracking-tight">{match.time}</span>
              <div className="flex items-center gap-1 text-white/30">
                <Clock3 className="w-3 h-3" />
                <span className="text-[10px] font-bold">{match.displayDate}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-3">
                <span className={`${isFeatured ? 'text-3xl' : 'text-2xl'} font-bold text-white tracking-tighter`}>
                  {match.homeScore}
                </span>
                <span className="text-white/20 font-bold">-</span>
                <span className={`${isFeatured ? 'text-3xl' : 'text-2xl'} font-bold text-white tracking-tighter`}>
                  {match.awayScore}
                </span>
              </div>
              {match.aggregateText && (
                <span className="text-[10px] text-pink-300/60 font-bold uppercase tracking-wider">
                  {match.aggregateText}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Away Team */}
        <div className={`flex flex-col items-center flex-1 ${isCompact ? 'gap-2' : 'gap-3'}`}>
          <div className={`${isFeatured ? 'w-16 h-16' : 'w-12 h-12'} rounded-full bg-white/5 flex items-center justify-center p-2 border border-white/5 shadow-inner shadow-white/5`}>
            {match.awayTeam ? (
              <div className={`w-full h-full rounded-full flex items-center justify-center ${match.awayTeam?.id === 'fa' ? 'bg-white p-1' : ''}`}>
                <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
            ) : (
              <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center text-white/30 text-xs font-bold">?</div>
            )}
          </div>
          <span className={`${isFeatured ? 'text-sm' : 'text-xs'} font-bold text-white text-center uppercase tracking-wider`}>
            {match.awayTeam ? match.awayTeam.shortName : match.awayTeamPlaceholder}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
