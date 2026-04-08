import { useState, useMemo } from 'react';
import { AnimatePresence } from 'motion/react';
import { AppTab, MatchStage, ScheduleItem, Team } from './types';
import { MATCHES } from './data';
import Header from './components/Header';
import MatchCard from './components/MatchCard';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import TeamsScreen from './screens/TeamsScreen';
import TeamDetailScreen from './screens/TeamDetailScreen';
import StandingsScreen from './screens/StandingsScreen';
import InfoScreen from './screens/InfoScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('Home');
  const getDefaultStage = (): MatchStage => {
    const now = new Date();
    const jakartaNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
    const month = jakartaNow.getMonth() + 1;
    const day = jakartaNow.getDate();

    if (month < 4 || (month === 4 && day <= 7)) return 'APR-7';
    if (month === 4 && day === 8) return 'APR-8';
    if (month === 4 && day === 9) return 'APR-9';
    if (month === 4 && day === 10) return 'APR-10';
    return 'APR-11';
  };

  const [activeStage, setActiveStage] = useState<MatchStage>(getDefaultStage());
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const matches = useMemo(() => {
    return MATCHES.filter(m => m.stage === activeStage);
  }, [activeStage]);

  const groupedMatches = useMemo(() => {
    const groups: { [key: string]: ScheduleItem[] } = {};
    matches.forEach((match) => {
      if (!groups[match.groupDate]) {
        groups[match.groupDate] = [];
      }
      groups[match.groupDate].push(match);
    });
    return groups;
  }, [matches]);

  const handleTabChange = (tab: AppTab) => {
    setActiveTab(tab);
    setSelectedTeam(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTeam = (team: Team) => {
    setSelectedTeam(team);
  };

  const handleCloseTeam = () => {
    setSelectedTeam(null);
  };

  return (
    <div className="min-h-screen bg-ucl-gradient pb-24">
      <main className="max-w-xl mx-auto relative">
        {activeTab === 'Home' && (
          <div className="relative">
            <HomeScreen onSelectTeam={handleSelectTeam} />

            <AnimatePresence>
              {selectedTeam && (
                <TeamDetailScreen team={selectedTeam} onClose={handleCloseTeam} />
              )}
            </AnimatePresence>
          </div>
        )}

        {activeTab === 'Schedule' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Header
              title="Tournament Schedule"
              activeStage={activeStage}
              onStageChange={setActiveStage}
            />

            <div className="px-4 space-y-8 mt-6">
              {Object.keys(groupedMatches).length > 0 ? (
                (Object.entries(groupedMatches) as [string, ScheduleItem[]][]).map(([date, matches]) => (
                  <div key={date} className="space-y-4">
                    <h2 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] px-2">
                      {date}
                    </h2>
                    <div className="space-y-3">
                      {matches.map((match) => (
                        <MatchCard
                          key={match.id}
                          match={match}
                          variant="default"
                        />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-[50vh] px-12 text-center">
                  <div className="w-16 h-16 mb-6 rounded-full bg-pink-500/10 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-pink-500/30 border-t-pink-500 animate-spin" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">No Matches Scheduled</h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    The draw for this stage hasn't taken place yet. Check back soon for updates.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'Standings' && <StandingsScreen />}
        {activeTab === 'Info' && <InfoScreen />}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
