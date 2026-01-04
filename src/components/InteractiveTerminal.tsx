import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEasterEgg } from '@/context/EasterEggContext';

interface CommandOutput {
  type: 'input' | 'output' | 'error';
  text: string;
}

const COMMANDS: Record<string, (args: string[]) => string> = {
  help: () => {
    return `
Available commands:
  help          - Show this help message
  about         - About the developer
  skills        - List technical skills
  projects      - List recent projects
  contact       - Contact information
  matrix        - Activate matrix mode (Easter egg!)
  clear         - Clear the terminal
  pwd           - Print working directory
  date          - Show current date/time
  whoami        - Who are you?
  secret        - Find hidden secrets... (use carefully)
`.trim();
  },
  about: () => {
    return `I'm a full-stack developer passionate about creating beautiful and performant web applications.
Specialized in React, TypeScript, and modern web technologies.
Location: Digital Space
Status: Always Learning`;
  },
  skills: () => {
    return `Frontend: React, TypeScript, Tailwind CSS, Framer Motion
Backend: Node.js, Express, PostgreSQL
Tools: Vite, Git, Docker, AWS
Design: UI/UX, Accessibility, Performance Optimization`;
  },
  projects: () => {
    return `Recent Projects:
1. E-commerce Platform - React + Node.js + PostgreSQL
2. Analytics Dashboard - Next.js + Recharts
3. Design System - Storybook + Tailwind
4. Portfolio Website - React + Vite + Framer Motion`;
  },
  contact: () => {
    return `Email: contact@example.com
GitHub: github.com/yourname
LinkedIn: linkedin.com/in/yourname
Discord: YourName#1234`;
  },
  pwd: () => {
    return '/home/cyber-developer/portfolio';
  },
  date: () => {
    return new Date().toLocaleString();
  },
  whoami: () => {
    return 'You are a curious visitor exploring the digital realm...';
  },
  matrix: () => {
    return '🟩 MATRIX MODE ACTIVATED 🟩\nM9X7$2K#L8@P3Q5W1$Z4B6Y7C9D0E1F2G3H4I5J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1Z2\nNow you\'re thinking in matrices...';
  },
  secret: () => {
    return 'You found a secret! 🔐\nThe real secret is that you\'re awesome for exploring every corner of this site!';
  },
  clear: () => {
    return ''; // Special case handled in the component
  },
  '': () => {
    return '';
  },
};

const InteractiveTerminal: React.FC = () => {
  const { terminalOpen, setTerminalOpen } = useEasterEgg();
  const [output, setOutput] = useState<CommandOutput[]>([
    {
      type: 'output',
      text: 'Welcome to Cyber Developer Terminal v1.0.0\nType "help" for available commands.',
    },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [terminalOpen]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const parts = trimmedCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newOutput: CommandOutput[] = [
      ...output,
      {
        type: 'input',
        text: `$ ${cmd}`,
      },
    ];

    if (command === 'clear') {
      setOutput([]);
      setInput('');
      return;
    }

    const commandFunc = COMMANDS[command];
    if (commandFunc) {
      const result = commandFunc(args);
      newOutput.push({
        type: 'output',
        text: result,
      });
    } else if (command !== '') {
      newOutput.push({
        type: 'error',
        text: `Command not found: ${command}. Type "help" for available commands.`,
      });
    }

    setOutput(newOutput);
    setHistory([...history, cmd]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setTerminalOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setTerminalOpen(false)}
        >
          <motion.div
            className="w-full max-w-2xl mx-4 h-96 bg-black border-2 border-green-500 rounded-lg shadow-2xl overflow-hidden font-mono text-sm flex flex-col"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div className="bg-green-500 text-black px-4 py-2 flex items-center justify-between border-b-2 border-green-500">
              <span className="font-bold">cyber-terminal.exe</span>
              <button
                onClick={() => setTerminalOpen(false)}
                className="hover:bg-green-600 p-1 rounded transition-colors"
                aria-label="Close terminal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Terminal Output */}
            <div
              ref={outputRef}
              className="flex-1 overflow-y-auto p-4 bg-black text-green-400"
            >
              {output.map((line, idx) => (
                <div key={idx} className="mb-1">
                  {line.type === 'input' ? (
                    <span className="text-white">{line.text}</span>
                  ) : line.type === 'error' ? (
                    <span className="text-red-400">{line.text}</span>
                  ) : (
                    <span className="whitespace-pre-wrap">{line.text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Terminal Input */}
            <div className="bg-black border-t-2 border-green-500 px-4 py-2 flex items-center">
              <span className="text-green-400">$ </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 ml-2 bg-transparent text-green-400 outline-none caret-green-400"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InteractiveTerminal;
