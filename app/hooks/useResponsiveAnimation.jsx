import { useEffect, useRef } from 'react';

const useResponsiveAnimation = (bottle) => {
  const tl = useRef();
  const t2 = useRef();
  const t3 = useRef();
  const t4 = useRef();

  useEffect(() => {
    const updateAnimations = () => {
      const width = window.innerWidth;
      
      // Define breakpoints
      const breakpoints = [375, 480, 620, 720, 915, 980, 1080, 1200];
      
      // Define animation settings for each breakpoint
      const animationSettings = [
        { // < 375
          tl: { x: 0, scale: 0.42, rotation: [-0.5817, 0.587, 0.63527] },
          t2: { x: 0, scale: 0.595, rotation: [-0.2817, 0.087, -0.63527] },
          t3: { x: 0, rotation: [0.35, -0.69, -1.55] },
          t4: { x: 0, scale: 0.40, rotation: [0, 0.3, 0] }
        },
        { // 375 - 479
          tl: { x: 0, scale: 0.48, rotation: [-0.5817, 0.587, 0.63527] },
          t2: { x: 0, scale: 0.68, rotation: [-0.2817, 0.087, -0.63527] },
          t3: { x: 0, rotation: [0.35, -0.69, -1.55] },
          t4: { x: 0, scale: 0.40, rotation: [0, 0.3, 0] }
        },
        // ... define settings for other breakpoints
        { // > 1200
          tl: { x: -500, scale: 1.2, rotation: [-0.5817, 0.587, 0.63527] },
          t2: { x: 600, scale: 1.7, rotation: [-0.2817, 0.087, -0.63527] },
          t3: { x: -600, rotation: [0.35, -0.69, -1.55] },
          t4: { x: 0, scale: 1, rotation: [0, 0.3, 0] }
        }
      ];

      // Find the appropriate settings based on current width
      const settings = animationSettings.find((_, index) => width < breakpoints[index]) || animationSettings[animationSettings.length - 1];

      // Apply settings to timelines
      applySettings(tl.current, settings.tl, bottle);
      applySettings(t2.current, settings.t2, bottle);
      applySettings(t3.current, settings.t3, bottle);
      applySettings(t4.current, settings.t4, bottle);
    };

    const applySettings = (timeline, settings, target) => {
      timeline.to(target.current?.position, { x: settings.x }, 0);
      if (settings.scale) {
        timeline.to(target.current?.scale, { x: settings.scale, y: settings.scale, z: settings.scale }, 0);
      }
      timeline.to(target.current?.rotation, { x: settings.rotation[0], y: settings.rotation[1], z: settings.rotation[2] }, 0);
    };

    // Initial update
    updateAnimations();

    // Add event listener for window resize
    window.addEventListener('resize', updateAnimations);

    // Cleanup
    return () => window.removeEventListener('resize', updateAnimations);
  }, [bottle]);

  return { tl, t2, t3, t4 };
};

export default useResponsiveAnimation;