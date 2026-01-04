import { useEffect, useCallback } from 'react';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export const useKonamiCode = (onKonamiCode: () => void) => {
  const sequenceRef = useCallback(() => {
    const sequence: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      sequence.push(e.key);

      // Keep only the last 10 keys
      if (sequence.length > 10) {
        sequence.shift();
      }

      // Check if the current sequence matches the Konami code
      if (sequence.join(',') === KONAMI_CODE.join(',')) {
        onKonamiCode();
        sequence.length = 0; // Reset the sequence
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKonamiCode]);

  useEffect(() => {
    return sequenceRef();
  }, [sequenceRef]);
};
