import { Trophy, Star, Shield, Hand } from 'lucide-react';
import { MATCHES, TEAMS, BRACKET_DATA } from '../data';
import MatchCard from '../components/MatchCard';
import { Team } from '../types';

type BracketCardData = {
  id: string;
  label: string;
  dateLabel: string;
  home?: string;
  away?: string;
  homeTeam?: Team;
  awayTeam?: Team;
  tone: 'pink' | 'gold' | 'blue';
};

const CARD_WIDTH = 238;
const CARD_HEIGHT = 152;
const LEFT = 28;
const TOP = 92;
const COL_GAP = 96;
const LINE_PINK = 'rgba(244,114,182,0.55)';
const LINE_GOLD = 'rgba(251,191,36,0.45)';
const LINE_BLUE = 'rgba(125,211,252,0.5)';
const LINE_MUTED = 'rgba(255,255,255,0.18)';

const placementMatches: BracketCardData[] = [
  { id: 'f', label: 'Championship Match', dateLabel: '11 Apr, 14:00', home: 'WG5', away: 'WG7', tone: 'gold' },
  { id: 'p3', label: '3rd Place Game', dateLabel: '11 Apr, 11:00', home: 'LG5', away: 'LG7', tone: 'blue' },
  { id: 'p5', label: '5th Place Game', dateLabel: '11 Apr, 09:30', home: 'WG6', away: 'WG8', tone: 'gold' },
  { id: 'p7', label: '7th Place Game', dateLabel: '11 Apr, 08:00', home: 'LG6', away: 'LG8', tone: 'blue' },
];

const semifinals: BracketCardData[] = [
  { id: 's1', label: 'Semi Final #1', dateLabel: '10 Apr, 14:30', home: 'WG1', away: 'WG2', tone: 'gold' },
  { id: 's2', label: 'Semi Final #2', dateLabel: '10 Apr, 16:00', home: 'WG3', away: 'WG4', tone: 'gold' },
];

const loserCrossovers: BracketCardData[] = [
  { id: 'l1', label: 'Loser Crossover', dateLabel: '10 Apr, 14:30', home: 'LG1', away: 'LG2', tone: 'gold' },
  { id: 'l2', label: 'Loser Crossover', dateLabel: '10 Apr, 16:00', home: 'LG3', away: 'LG4', tone: 'gold' },
];

const quarterfinals: BracketCardData[] =
  BRACKET_DATA.find((round) => round.id === 'qf')?.matches.map((match, index) => ({
    id: match.id,
    label: `Game ${index + 1}`,
    dateLabel: match.dateLabel || '',
    home: match.homeTeam?.shortName || match.homeTeamPlaceholder || '',
    away: match.awayTeam?.shortName || match.awayTeamPlaceholder || '',
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
    tone: 'pink' as const,
  })) || [];

function toneClasses(tone: BracketCardData['tone']) {
  switch (tone) {
    case 'gold':
      return 'from-amber-400/12 to-transparent';
    case 'blue':
      return 'from-sky-400/12 to-transparent';
    default:
      return 'from-pink-500/10 to-transparent';
  }
}

function BracketBox({ card }: { card: BracketCardData }) {
  return (
    <div
      className={`w-[238px] h-[152px] rounded-[22px] overflow-hidden border border-white/8 bg-gradient-to-br ${toneClasses(
        card.tone
      )} shadow-[0_18px_36px_rgba(0,0,0,0.28)] backdrop-blur-md`}
    >
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div className="text-[11px] text-slate-400">{card.dateLabel}</div>
        <div className="text-[9px] uppercase tracking-[0.16em] text-white/35 font-bold">
          {card.label}
        </div>
      </div>

      <div className="px-4 py-3 flex items-center justify-between bg-white/[0.03]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
            {card.homeTeam ? (
              <div className={`w-full h-full rounded-full flex items-center justify-center ${card.homeTeam.id === 'fa' ? 'bg-white p-1' : ''}`}>
                <img
                  src={card.homeTeam.logo}
                  alt={card.homeTeam.name}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <span className="text-[10px] text-white/60 font-bold">{card.home}</span>
            )}
          </div>
          <span className="text-base font-bold text-white uppercase tracking-wide truncate">
            {card.home}
          </span>
        </div>
        <span className="text-xl font-bold text-white/75">-</span>
      </div>

      <div className="px-4 py-3 border-t border-white/8 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
            {card.awayTeam ? (
              <div className={`w-full h-full rounded-full flex items-center justify-center ${card.awayTeam.id === 'fa' ? 'bg-white p-1' : ''}`}>
                <img
                  src={card.awayTeam.logo}
                  alt={card.awayTeam.name}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <span className="text-[10px] text-white/60 font-bold">{card.away}</span>
            )}
          </div>
          <span className="text-base font-bold text-white uppercase tracking-wide truncate">
            {card.away}
          </span>
        </div>
        <span className="text-xl font-bold text-white/75">-</span>
      </div>
    </div>
  );
}

function drawConnector(fromX: number, fromY: number, toX: number, toY: number, color = LINE_PINK) {
  const midX = fromX + (toX - fromX) / 2;

  return (
    <>
      <div
        className="absolute"
        style={{
          left: `${fromX}px`,
          top: `${fromY}px`,
          width: `${midX - fromX}px`,
          height: '2px',
          backgroundColor: color,
        }}
      />
      <div
        className="absolute"
        style={{
          left: `${midX}px`,
          top: `${Math.min(fromY, toY)}px`,
          width: '2px',
          height: `${Math.abs(toY - fromY)}px`,
          backgroundColor: color,
        }}
      />
      <div
        className="absolute"
        style={{
          left: `${midX}px`,
          top: `${toY}px`,
          width: `${toX - midX}px`,
          height: '2px',
          backgroundColor: color,
        }}
      />
    </>
  );
}

function ACSCBracket() {
  const colX = (index: number) => LEFT + index * (CARD_WIDTH + COL_GAP);

  const qfY = [TOP, TOP + 156, TOP + 352, TOP + 508];
  const sfY = [TOP + 88, TOP + 430];
  const loserY = [TOP + 692, TOP + 872];

  const rightY = {
    final: TOP + 238,
    third: TOP + 492,
    fifth: TOP + 780,
    seventh: TOP + 960,
  };

  const canvasHeight = 1180;

  const qfCenters = qfY.map((y) => y + CARD_HEIGHT / 2);
  const sfCenters = sfY.map((y) => y + CARD_HEIGHT / 2);
  const loserCenters = loserY.map((y) => y + CARD_HEIGHT / 2);
  const rightCenters = {
    final: rightY.final + CARD_HEIGHT / 2,
    third: rightY.third + CARD_HEIGHT / 2,
    fifth: rightY.fifth + CARD_HEIGHT / 2,
    seventh: rightY.seventh + CARD_HEIGHT / 2,
  };

  return (
    <div className="overflow-x-auto no-scrollbar -mx-6 px-6">
      <div className="relative min-w-[1130px]" style={{ height: `${canvasHeight}px` }}>
        {/* Titles */}
        <div className="absolute text-center" style={{ left: `${colX(0)}px`, top: '20px', width: `${CARD_WIDTH}px` }}>
          <h2 className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Quarterfinals</h2>
        </div>

        <div className="absolute text-center" style={{ left: `${colX(1)}px`, top: '20px', width: `${CARD_WIDTH}px` }}>
          <h2 className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Semifinals</h2>
        </div>

        <div className="absolute text-center" style={{ left: `${colX(1)}px`, top: `${TOP + 640}px`, width: `${CARD_WIDTH}px` }}>
          <h2 className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Loser Crossovers</h2>
        </div>

        <div className="absolute text-center" style={{ left: `${colX(2)}px`, top: '20px', width: `${CARD_WIDTH}px` }}>
          <h2 className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Placement Matches</h2>
        </div>

        {/* Quarterfinals */}
        {quarterfinals.map((card, i) => (
          <div key={card.id} className="absolute" style={{ left: `${colX(0)}px`, top: `${qfY[i]}px` }}>
            <BracketBox card={card} />
          </div>
        ))}

        {/* Semifinals */}
        {semifinals.map((card, i) => (
          <div key={card.id} className="absolute" style={{ left: `${colX(1)}px`, top: `${sfY[i]}px` }}>
            <BracketBox card={card} />
          </div>
        ))}

        {/* Loser crossovers */}
        {loserCrossovers.map((card, i) => (
          <div key={card.id} className="absolute" style={{ left: `${colX(1)}px`, top: `${loserY[i]}px` }}>
            <BracketBox card={card} />
          </div>
        ))}

        {/* Placement matches */}
        <div className="absolute" style={{ left: `${colX(2)}px`, top: `${rightY.final}px` }}>
          <BracketBox card={placementMatches[0]} />
        </div>

        <div className="absolute" style={{ left: `${colX(2)}px`, top: `${rightY.third}px` }}>
          <BracketBox card={placementMatches[1]} />
        </div>

        <div className="absolute" style={{ left: `${colX(2)}px`, top: `${rightY.fifth}px` }}>
          <BracketBox card={placementMatches[2]} />
        </div>

        <div className="absolute" style={{ left: `${colX(2)}px`, top: `${rightY.seventh}px` }}>
          <BracketBox card={placementMatches[3]} />
        </div>

        {/* Winner path */}
        {drawConnector(colX(0) + CARD_WIDTH, qfCenters[0], colX(1), sfCenters[0], LINE_MUTED)}
        {drawConnector(colX(0) + CARD_WIDTH, qfCenters[1], colX(1), sfCenters[0], LINE_MUTED)}
        {drawConnector(colX(0) + CARD_WIDTH, qfCenters[2], colX(1), sfCenters[1], LINE_MUTED)}
        {drawConnector(colX(0) + CARD_WIDTH, qfCenters[3], colX(1), sfCenters[1], LINE_MUTED)}

        {drawConnector(colX(1) + CARD_WIDTH, sfCenters[0], colX(2), rightCenters.final, LINE_GOLD)}
        {drawConnector(colX(1) + CARD_WIDTH, sfCenters[1], colX(2), rightCenters.final, LINE_GOLD)}

        {/* 3rd place from semifinal losers */}
        {drawConnector(colX(1) + CARD_WIDTH, sfCenters[0], colX(2), rightCenters.third, LINE_BLUE)}
        {drawConnector(colX(1) + CARD_WIDTH, sfCenters[1], colX(2), rightCenters.third, LINE_BLUE)}

        {/* Loser path from quarterfinal losers */}
        {drawConnector(colX(0) + CARD_WIDTH, qfCenters[0], colX(1), loserCenters[0], LINE_PINK)}
        {drawConnector(colX(0) + CARD_WIDTH, qfCenters[1], colX(1), loserCenters[0], LINE_PINK)}
        {drawConnector(colX(0) + CARD_WIDTH, qfCenters[2], colX(1), loserCenters[1], LINE_PINK)}
        {drawConnector(colX(0) + CARD_WIDTH, qfCenters[3], colX(1), loserCenters[1], LINE_PINK)}

        {/* 5th and 7th place */}
        {drawConnector(colX(1) + CARD_WIDTH, loserCenters[0], colX(2), rightCenters.fifth, LINE_GOLD)}
        {drawConnector(colX(1) + CARD_WIDTH, loserCenters[1], colX(2), rightCenters.fifth, LINE_GOLD)}

        {drawConnector(colX(1) + CARD_WIDTH, loserCenters[0], colX(2), rightCenters.seventh, LINE_BLUE)}
        {drawConnector(colX(1) + CARD_WIDTH, loserCenters[1], colX(2), rightCenters.seventh, LINE_BLUE)}

        {/* Trophy */}
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: `${colX(3) - 8}px`,
            top: `${rightY.final + 6}px`,
            width: '120px',
          }}
        >
          <div className="h-20 w-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(244,114,182,0.14)]">
            <Trophy size={34} className="text-slate-100" />
          </div>
          <div className="mt-3 text-center">
            <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Champion</div>
            <div className="text-sm font-semibold text-white mt-1">ACSC Finals</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StandingsScreen() {
  const finishedMatches = MATCHES
    .filter((m) => m.type === 'match' && m.status === 'Finished')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="sticky top-0 z-30 bg-[#2a1f24]/80 backdrop-blur-xl border-b border-white/6 px-6 pt-12 pb-4">
        <div className="text-[11px] uppercase tracking-[0.24em] text-pink-300/80 mb-2">
          ACSC Girls Soccer
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Standings</h1>
      </header>

      <div className="p-6 space-y-8">
        <section>
          <h2 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">
            Pool A
          </h2>
          <div className="ucl-panel rounded-2xl overflow-hidden border border-white/8 mb-8">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-white/40 text-[10px] uppercase tracking-wider border-b border-white/5">
                <tr>
                  <th className="px-4 py-3 font-medium">Rank</th>
                  <th className="px-4 py-3 font-medium">Team</th>
                  <th className="px-4 py-3 font-medium text-center">W</th>
                  <th className="px-4 py-3 font-medium text-center">L</th>
                  <th className="px-4 py-3 font-medium text-center">D</th>
                  <th className="px-4 py-3 font-medium text-center">Pts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-white/40">1</td>
                  <td className="px-4 py-3 font-medium text-white flex items-center gap-2">
                    <img src={TEAMS.icshk.logo} className="w-5 h-5 object-contain" />
                    ICS HK
                  </td>
                  <td className="px-4 py-3 text-white/80 text-center">2</td>
                  <td className="px-4 py-3 text-white/80 text-center">0</td>
                  <td className="px-4 py-3 text-white/80 text-center">1</td>
                  <td className="px-4 py-3 text-white/80 text-center">7</td>
                </tr>

                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-white/40">2</td>
                  <td className="px-4 py-3 font-medium text-white flex items-center gap-2">
                    <img src={TEAMS.icsbk.logo} className="w-5 h-5 object-contain" />
                    ICS BKK
                  </td>
                  <td className="px-4 py-3 text-white/80 text-center">1</td>
                  <td className="px-4 py-3 text-white/80 text-center">0</td>
                  <td className="px-4 py-3 text-white/80 text-center">1</td>
                  <td className="px-4 py-3 text-white/80 text-center">4</td>
                </tr>

                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-white/40">3</td>
                  <td className="px-4 py-3 font-medium text-white flex items-center gap-2">
                    <img src={TEAMS.dalat.logo} className="w-5 h-5 object-contain" />
                    DALAT
                  </td>
                  <td className="px-4 py-3 text-white/80 text-center">1</td>
                  <td className="px-4 py-3 text-white/80 text-center">1</td>
                  <td className="px-4 py-3 text-white/80 text-center">0</td>
                  <td className="px-4 py-3 text-white/80 text-center">3</td>
                </tr>

                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-white/40">4</td>
                  <td className="px-4 py-3 font-medium text-white flex items-center gap-2">
                    <img src={TEAMS.sph.logo} className="w-5 h-5 object-contain" />
                    SPH
                  </td>
                  <td className="px-4 py-3 text-white/80 text-center">0</td>
                  <td className="px-4 py-3 text-white/80 text-center">2</td>
                  <td className="px-4 py-3 text-white/80 text-center">0</td>
                  <td className="px-4 py-3 text-white/80 text-center">0</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">
            Pool B
          </h2>
          <div className="ucl-panel rounded-2xl overflow-hidden border border-white/8">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-white/40 text-[10px] uppercase tracking-wider border-b border-white/5">
                <tr>
                  <th className="px-4 py-3 font-medium">Rank</th>
                  <th className="px-4 py-3 font-medium">Team</th>
                  <th className="px-4 py-3 font-medium text-center">W</th>
                  <th className="px-4 py-3 font-medium text-center">L</th>
                  <th className="px-4 py-3 font-medium text-center">D</th>
                  <th className="px-4 py-3 font-medium text-center">Pts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-white/40">1</td>
                  <td className="px-4 py-3 font-medium text-white flex items-center gap-2">
                    <img src={TEAMS.gis.logo} className="w-5 h-5 object-contain" />
                    GRACE
                  </td>
                  <td className="px-4 py-3 text-white/80 text-center">2</td>
                  <td className="px-4 py-3 text-white/80 text-center">0</td>
                  <td className="px-4 py-3 text-white/80 text-center">1</td>
                  <td className="px-4 py-3 text-white/80 text-center">7</td>
                </tr>

                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-white/40">2</td>
                  <td className="px-4 py-3 font-medium text-white flex items-center gap-2">
                    {TEAMS.fa.id === 'fa' ? (
                      <div className="w-5 h-5 rounded-full bg-white p-[2px] flex items-center justify-center">
                        <img src={TEAMS.fa.logo} className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <img src={TEAMS.fa.logo} className="w-5 h-5 object-contain" />
                    )}
                    FAITH
                  </td>
                  <td className="px-4 py-3 text-white/80 text-center">2</td>
                  <td className="px-4 py-3 text-white/80 text-center">1</td>
                  <td className="px-4 py-3 text-white/80 text-center">0</td>
                  <td className="px-4 py-3 text-white/80 text-center">6</td>
                </tr>

                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-white/40">3</td>
                  <td className="px-4 py-3 font-medium text-white flex items-center gap-2">
                    <img src={TEAMS.mac.logo} className="w-5 h-5 object-contain" />
                    MAC
                  </td>
                  <td className="px-4 py-3 text-white/80 text-center">1</td>
                  <td className="px-4 py-3 text-white/80 text-center">1</td>
                  <td className="px-4 py-3 text-white/80 text-center">1</td>
                  <td className="px-4 py-3 text-white/80 text-center">4</td>
                </tr>

                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-mono text-white/40">4</td>
                  <td className="px-4 py-3 font-medium text-white flex items-center gap-2">
                    <img src={TEAMS.yiss.logo} className="w-5 h-5 object-contain" />
                    YISS
                  </td>
                  <td className="px-4 py-3 text-white/80 text-center">0</td>
                  <td className="px-4 py-3 text-white/80 text-center">3</td>
                  <td className="px-4 py-3 text-white/80 text-center">0</td>
                  <td className="px-4 py-3 text-white/80 text-center">0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">
            Bracket
          </h2>
          <ACSCBracket />
        </section>

        <section>
          <h2 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            Tournament Awards
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="ucl-panel rounded-[20px] p-5 border border-yellow-500/20 flex items-center gap-4 bg-gradient-to-br from-yellow-500/10 to-transparent">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-yellow-500/80 font-bold mb-1">Golden Boot</div>
                <div className="text-lg font-bold text-white/40">TBD</div>
              </div>
            </div>
            <div className="ucl-panel rounded-[20px] p-5 border border-slate-400/20 flex items-center gap-4 bg-gradient-to-br from-slate-400/10 to-transparent">
              <div className="w-12 h-12 rounded-full bg-slate-400/20 flex items-center justify-center">
                <Hand className="w-6 h-6 text-slate-300" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400/80 font-bold mb-1">Golden Glove</div>
                <div className="text-lg font-bold text-white/40">TBD</div>
              </div>
            </div>
            <div className="ucl-panel rounded-[20px] p-5 border border-blue-500/20 flex items-center gap-4 bg-gradient-to-br from-blue-500/10 to-transparent">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-blue-400/80 font-bold mb-1">Top Defender</div>
                <div className="text-lg font-bold text-white/40">TBD</div>
              </div>
            </div>
            <div className="ucl-panel rounded-[20px] p-5 border border-pink-500/20 flex items-center gap-4 bg-gradient-to-br from-pink-500/10 to-transparent">
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-pink-400/80 font-bold mb-1">MVP</div>
                <div className="text-lg font-bold text-white/40">TBD</div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">
            Recent Results
          </h2>
          <div className="space-y-3">
            {finishedMatches.map((match) => (
              <MatchCard key={match.id} match={match} variant="compact" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
