import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EasterEggContextType {
  konamiActivated: boolean;
  activateKonami: () => void;
  deactivateKonami: () => void;
  terminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
}

const EasterEggContext = createContext<EasterEggContextType | undefined>(undefined);

export const EasterEggProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const activateKonami = () => setKonamiActivated(true);
  const deactivateKonami = () => {
    setKonamiActivated(false);
    setTerminalOpen(false);
  };

  return (
    <EasterEggContext.Provider
      value={{
        konamiActivated,
        activateKonami,
        deactivateKonami,
        terminalOpen,
        setTerminalOpen,
      }}
    >
      {children}
    </EasterEggContext.Provider>
  );
};

export const useEasterEgg = () => {
  const context = useContext(EasterEggContext);
  if (!context) {
    throw new Error('useEasterEgg must be used within EasterEggProvider');
  }
  return context;
};
