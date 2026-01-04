export const initializeConsoleEasterEggs = () => {
  // ASCII Art Banner
  const asciiArt = `
╔═══════════════════════════════════════════════════════════════╗
║                   🔐 CYBER DEVELOPER ZONE 🔐                 ║
║                                                               ║
║  Welcome, curious explorer! You've found the easter egg!     ║
║  Type commands in the terminal to learn more about me.       ║
║                                                               ║
║  Easter Egg Unlocked: Konami Code Detected! ↑↑↓↓←→←→BA     ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
  `;

  console.log(
    '%c' + asciiArt,
    'color: #00ff00; font-family: monospace; font-weight: bold; font-size: 12px;'
  );

  // Fun messages
  const messages = [
    {
      text: '💡 Tip: Press ↑↑↓↓←→←→BA to unlock secret mode!',
      style: 'color: #00ff00; font-size: 14px; font-weight: bold;',
    },
    {
      text: '🎮 Want to explore the terminal? Activate secret mode with the Konami code!',
      style: 'color: #00ffff; font-size: 12px;',
    },
    {
      text: '🔥 Did you know? This portfolio was built with React, TypeScript, and Framer Motion!',
      style: 'color: #ffaa00; font-size: 12px;',
    },
  ];

  messages.forEach((msg, idx) => {
    setTimeout(() => {
      console.log('%c' + msg.text, msg.style);
    }, idx * 500);
  });

  // Easter egg message
  setTimeout(() => {
    console.log(
      '%c🎉 Thanks for checking out my portfolio! Feel free to explore everything. 🚀',
      'color: #ff00ff; font-size: 14px; font-weight: bold;'
    );
  }, 2000);
};
