import React from 'react';
import { motion } from 'framer-motion';
import { useEasterEgg } from '@/context/EasterEggContext';
import { Terminal, Lightbulb, Zap } from 'lucide-react';

const EasterEggPanel: React.FC = () => {
  const { konamiActivated, terminalOpen, setTerminalOpen, deactivateKonami } = useEasterEgg();

  if (!konamiActivated) return null;

  const easterEggOptions = [
    {
      icon: Terminal,
      label: 'Open Terminal',
      description: 'Enter the cyber realm',
      action: () => setTerminalOpen(!terminalOpen),
    },
    {
      icon: Lightbulb,
      label: 'Secret Message',
      description: 'A message just for you',
      action: () => {
        const messages = [
          '✨ You found the secret level! You\'re officially awesome.',
          '🎮 Remember, with great power comes great... debugging.',
          '🚀 You\'re like a digital detective! Keep exploring.',
          '💻 The real hack is the friends we made along the way.',
          '🔐 Congratulations! You\'ve unlocked the developer\'s easter egg.',
        ];
        const message = messages[Math.floor(Math.random() * messages.length)];
        alert(message);
      },
    },
    {
      icon: Zap,
      label: 'Exit Secret Mode',
      description: 'Return to normal',
      action: deactivateKonami,
    },
  ];

  return (
    <motion.div
      className="fixed top-24 right-4 z-40 max-w-sm"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
    >
      <div className="bg-gradient-to-br from-purple-900/90 to-black/90 border-2 border-purple-500 rounded-lg p-6 shadow-2xl backdrop-blur-md">
        <h3 className="text-xl font-bold text-purple-300 mb-1 flex items-center gap-2">
          <span className="animate-pulse">🔓</span>
          Secret Mode Unlocked
        </h3>
        <p className="text-sm text-purple-200 mb-4">
          You've discovered the hidden easter egg! Here are your secret options:
        </p>

        <div className="space-y-2">
          {easterEggOptions.map((option, idx) => {
            const Icon = option.icon;
            return (
              <motion.button
                key={idx}
                onClick={option.action}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-purple-900/50 hover:bg-purple-800/70 border border-purple-500/50 hover:border-purple-400 transition-all text-left group"
                whileHover={{ x: 4 }}
              >
                <Icon className="w-5 h-5 text-purple-300 group-hover:text-purple-200" />
                <div>
                  <p className="font-semibold text-purple-200 text-sm">{option.label}</p>
                  <p className="text-xs text-purple-300">{option.description}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <p className="text-xs text-purple-400 mt-4 pt-4 border-t border-purple-500/30">
          🎮 Pro tip: Use arrow keys in the terminal to navigate through command history!
        </p>
      </div>
    </motion.div>
  );
};

export default EasterEggPanel;
