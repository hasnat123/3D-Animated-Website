'use client';

import { ReactNode, useEffect, useRef } from 'react';

interface SparkButtonProps {
  onClick?: () => void;
  children: ReactNode;
  disabled: boolean;
  className?: string;
}

export default function SparkButton({ children, onClick, className, disabled }: SparkButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let styleSheet: HTMLStyleElement | null = null;
    const SPARK_ELEMENT_WIDTH = 30;
    const DISTANCE = 40;
    const RANDOMNESS_ON = true;

    const createTransformSteps = (...steps: string[]) => {
      const outputSteps = [steps.shift()];
      steps.forEach((step, i) => {
        outputSteps.push(`${outputSteps[i]} ${step}`);
      });
      return outputSteps;
    };

    const dynamicAnimation = (name: string, rotation: number) => {
      if (!styleSheet) {
        styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        document.head.appendChild(styleSheet);
      }

      const randomDist = RANDOMNESS_ON
        ? Math.floor((Math.random() - 0.5) * DISTANCE * 0.7)
        : 0;

      const [s1, s2, s3] = createTransformSteps(
        `translate(-50%, -50%) rotate(${rotation}deg) translate(10px, 0px)`,
        `translate(${DISTANCE + randomDist}px, 0px) scale(0.5, 0.5)`,
        `translate(${SPARK_ELEMENT_WIDTH / 2}px, 0) scale(0, 0)`
      );

      styleSheet?.sheet?.insertRule(
        `@keyframes ${name} {
          0% { transform: ${s1}; }
          70% { transform: ${s2}; }
          100% { transform: ${s3}; }
        }`,
        styleSheet?.sheet?.cssRules.length
      );
    };

    const makeSpark = (center: { x: number; y: number }, rotation: number) => {
      const div = document.createElement('div');
      const aniName = `disappear_${rotation}`;
      dynamicAnimation(aniName, rotation);

      div.classList.add('spark');
      div.style.left = `${center.x}px`;
      div.style.top = `${center.y}px`;
      div.style.animation = `${aniName} 500ms ease-out both`;
      document.body.appendChild(div);

      setTimeout(() => {
        document.body.removeChild(div);
      }, 1000);
    };

    const makeBurst = (center: { x: number; y: number }) => {
      for (let i = 0; i < 8; i++) {
        const randomSpace = RANDOMNESS_ON
          ? Math.floor(-17 + Math.random() * 34)
          : 0;
        makeSpark(center, 45 * i + randomSpace);
      }
    };

    const handleButtonClick = (e: MouseEvent) => {
      const center = { x: e.pageX, y: e.pageY };
      makeBurst(center);
    };

    if (buttonRef.current) {
      buttonRef.current.addEventListener('click', handleButtonClick);
    }

    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener('click', handleButtonClick);
      }

      if (styleSheet) {
        document.head.removeChild(styleSheet);
      }
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}