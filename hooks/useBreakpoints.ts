import { useState, useEffect } from 'react';

type BreakPointsType = {
  isMobile: boolean;
  isDesktop: boolean;
  isWideScreen: boolean;
};

const useBreakpoints = () => {
  const [breakpoints, setBreakpoints] = useState<BreakPointsType>({
    isMobile: false,
    isDesktop: false,
    isWideScreen: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;

      setBreakpoints({
        isMobile: innerWidth < 768,
        isDesktop: 768 <= innerWidth && innerWidth < 1280,
        isWideScreen: innerWidth >= 1280,
      });
    };

    const debouncedHandleResize = () => {
      let timeoutId: NodeJS.Timeout;

      const resizeHandler = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(handleResize, 200);
      };

      resizeHandler(); // Initial call

      window.addEventListener('resize', resizeHandler);

      return () => {
        window.removeEventListener('resize', resizeHandler);
      };
    };

    debouncedHandleResize();
  }, []);

  return breakpoints;
};

export default useBreakpoints;
