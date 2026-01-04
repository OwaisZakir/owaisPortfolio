import { useEffect, useState } from 'react';

/**
 * Hook to detect if the device supports touch
 * Useful for disabling 3D effects and hover-based interactions on mobile
 */
export const useIsTouchDevice = (): boolean => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device supports touch
    const hasTouch = () => {
      return (
        window.matchMedia('(hover: none)').matches ||
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      );
    };

    setIsTouchDevice(hasTouch());
  }, []);

  return isTouchDevice;
};
