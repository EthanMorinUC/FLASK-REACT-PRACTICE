import React, { useState, useEffect } from 'react';

const ARCADE_RANKS = ["👑", "🏆", "🎮", "🕹️", "🎲", "🎯", "⭐", "💫", "✨", "🌟"];

const leaderboard = [
  { name: "Elaine (MakeUC)", score: 996 },
  { name: "Quan#2 (MakeUC)", score: 988 },
  { name: "Katy (Mentor)", score: 955 },
  { name: "Geoffrey (Judge)", score: 940 },
  { name: "Maksim Niagolov (Judge)", score: 927 },
  { name: "antoniodinkins", score: 910 },
  { name: "ExplosiveEnd", score: 901 },
  { name: "Joey", score: 899 },
  { name: "mason", score: 895 },
  { name: "Nathan", score: 883 },
  { name: "RO0BiXSPH3R3", score: 877 },
  { name: "skyler", score: 871 },
];

export default function LeaderboardCard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  // Generate a random score between 500-1000
  const generateScore = () => Math.floor(Math.random() * 501) + 500;

  // Generate initial leaderboard
  useEffect(() => {
    const initial = names
      .map(name => ({ name, score: generateScore() }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    setLeaderboard(initial);
  }, []);

  // Update random score every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const indexToUpdate = Math.floor(Math.random() * 10);
      const newScore = generateScore();
      
      setLeaderboard(prev => {
        const updated = [...prev];
        updated[indexToUpdate] = { ...updated[indexToUpdate], score: newScore };
        return updated.sort((a, b) => b.score - a.score);
      });
      
      setHighlightIndex(indexToUpdate);
      setTimeout(() => setHighlightIndex(-1), 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border-2 border-purple-500/50 shadow-[0_0_15px_rgba(147,51,234,0.3)]">
      <div className="px-6 py-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />
        <div className="bg-black/30 rounded-lg p-4 mb-4 border border-purple-500/30">
          <h2 className="text-2xl font-black bg-gradient-to-r from-yellow-300 via-purple-400 to-blue-300 text-transparent bg-clip-text">
            🕹️ HIGH SCORES 🏆
          </h2>
        </div>
        <div className="space-y-2">
          {leaderboard.map((player, index) => (
            <div
              key={player.name}
              className={`
                flex justify-between items-center p-3 rounded-lg
                ${index === highlightIndex 
                  ? 'bg-purple-600/80 transform scale-105 transition-all duration-300'
                  : 'bg-white/5 hover:bg-white/10'
                }
                ${index === 0 
                  ? 'bg-gradient-to-r from-purple-600/90 to-indigo-600/90 text-white font-black border border-purple-400/50 shadow-[0_0_10px_rgba(147,51,234,0.3)]' 
                  : 'border border-white/5'
                }
                transition-all duration-100 backdrop-blur-sm
              `}
            >
              <div className="flex items-center gap-3">
                <span className={`
                  w-8 h-8 flex items-center justify-center rounded-lg
                  ${index === 0 
                    ? 'bg-purple-400 text-white shadow-[0_0_10px_rgba(147,51,234,0.5)]' 
                    : 'bg-purple-900/50 text-white border border-purple-500/30'
                  }
                  text-sm font-bold
                `}>
                  {ARCADE_RANKS[index]}
                </span>
                <span className={`
                  font-bold
                  ${index === 0 ? 'text-white text-lg' : 'text-purple-200'}
                  text-shadow-sm
                `}>
                  {player.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`
                  font-mono font-bold text-lg
                  ${index === 0 ? 'text-white' : 'text-purple-200'}
                  text-shadow-sm
                `}>
                  {player.score.toLocaleString()}
                </span>
                <div className={`
                  w-2 h-2 rounded-full
                  ${index === highlightIndex ? 'bg-purple-400 animate-pulse' : 'bg-purple-500/50'}
                `} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}