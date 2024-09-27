'use client'

import Spline from '@splinetool/react-spline';
import { Application, SPEObject } from '@splinetool/runtime';
import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useQuantity } from './contexts/CartQuantityContext';
import Footer from './components/Footer';
import CartSection from './components/CartSection';
import Section from './components/Section';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [splineInstance, setSplineInstance] = useState<Application | null>(null);
  const [color, setColor] = useState<string | number | boolean>(5);
  const [quantity, setQuantity] = useState<number>(1);
  const [marginTop, setMarginTop] = useState<number>(4400);
  
  // Function to toggle animation class
  const toggleAnimation = () => {
    setIsAnimating(true);

    setTimeout(() =>
    {
      setIsAnimating(false);
    }, 500)
  };
  const { setItemCount, setIsAnimating } = useQuantity();

  const scene = useRef<any>(null);
  const bottle = useRef<SPEObject | null>(null);
  const bottle2 = useRef<SPEObject | null>(null);
  const bottle3 = useRef<SPEObject | null>(null);
  const bottle4 = useRef<SPEObject | null>(null);
  const bottle5 = useRef<SPEObject | null>(null);
  const ocean = useRef<SPEObject | null>(null);
  const royal = useRef<SPEObject | null>(null);
  const forest = useRef<SPEObject | null>(null);
  const ruby = useRef<SPEObject | null>(null);
  const sunset = useRef<SPEObject | null>(null);

  const calculateFormula = useCallback((x: number): number => {
    const m = (4400 - 4100) / (947 - 410);
    const b = 4400 - m * 947;
    return m * x + b;
  }, []);

  const handleResize = useCallback(() => {
    setMarginTop(calculateFormula(window.innerHeight));
    window.scrollTo(0, 0);
  }, [calculateFormula]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const AddToCart = useCallback(() => {
    setItemCount(prevItemCount => prevItemCount + quantity);
    setQuantity(1);
    setColor(5);
    if (splineInstance) splineInstance.setVariable('color', 5);
    splineInstance?.setVariable('clicked', false);
    toggleAnimation()
  }, [quantity, setItemCount, splineInstance]);

  const updateColor = useCallback(async (newColor: string | number | boolean) => {
    if (splineInstance) {
      splineInstance.setVariable('color', newColor);
      setColor(newColor);
    }
  }, [splineInstance]);

  useEffect(() => {
    if (!splineInstance) return;

    const fetchColor = async () => {
      const cart = document.getElementById('section-5');
      if (splineInstance.getVariable('clicked') === true && cart?.style.bottom !== '-200px') {
        const colorValue = splineInstance.getVariable('color');
        setColor(colorValue);
      }
    };

    const interval = setInterval(fetchColor, 100);
    return () => clearInterval(interval);
  }, [splineInstance]);

  const onLoad = useCallback((spline: Application) => {
    setSplineInstance(spline);
    scene.current = spline;

    const objects = [
      { ref: bottle, name: 'Bottle' },
      { ref: bottle2, name: 'Bottle 2' },
      { ref: bottle3, name: 'Bottle 3' },
      { ref: bottle4, name: 'Bottle 4' },
      { ref: bottle5, name: 'Bottle 5' },
      { ref: ocean, name: 'Text 8' },
      { ref: royal, name: 'Text 13' },
      { ref: ruby, name: 'ruby' },
      { ref: forest, name: 'Text 14' },
      { ref: sunset, name: 'ruby 2' },
    ];

    objects.forEach(({ ref, name }) => {
      const foundObject = spline.findObjectByName(name);
      if (foundObject) {
        ref.current = foundObject as SPEObject;
      } else {
        console.warn(`Object named "${name}" not found`);
      }
    });

    // Main scrolling animation
    gsap.timeline({
      scrollTrigger: {
        trigger: "#section-1",
        start: "top bottom",
        endTrigger: '#section-4',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self: ScrollTrigger) => {
          const scrollY = self.progress * 5410;
          if (bottle.current) {
            bottle.current.position.y = -scrollY - 1614.66;
          }
        }
      }
    });

    // Create and configure timelines
    const createTimeline = (trigger: string, start = "top bottom", end = 'bottom bottom') => 
      gsap.timeline({
        scrollTrigger: { trigger, start, end, scrub: true }
      });

    const tl = createTimeline("#section-1");
    const t2 = createTimeline("#section-2");
    const t3 = createTimeline("#section-3");
    const t4 = createTimeline("#section-4");
    const t5 = createTimeline("#section-4", "bottom center", 'bottom top');
    const t6 = createTimeline("#section-4", "bottom top");
    const t7 = createTimeline("footer");

    const getConfig = (width: number) => {
      let config = {
        tl: { x: 0, scale: 0.42, rotation: { x: -0.5817, y: 0.587, z: 0.63527 } },
        t2: { x: 0, scale: 0.595, rotation: { x: -0.2817, y: 0.087, z: -0.63527 } },
        t3: { x: 0, scale: 0.595, rotation: { x: 0.35, y: -0.69, z: -1.55 } },
        t4: { x: 0, scale: 0.40, rotation: { x: 0, y: 0.3, z: 0 } },
        t6: { bottom: '100px', opacity: 1 }
      };
    
      if (width >= 1280) {
        config.tl = { x: -600, scale: 1.2, rotation: { x: -0.5817, y: 0.587, z: 0.63527 } };
        config.t2 = { x: 600, scale: 1.7, rotation: { x: -0.2817, y: 0.087, z: -0.63527 } };
        config.t3 = { x: -600, scale: 1.7, rotation: { x: 0.35, y: -0.69, z: -1.55 } };
        config.t4 = { x: 0, scale: 1, rotation: { x: 0, y: 0.3, z: 0 } };
        config.t6 = { bottom: '10px', opacity: 1 };
      } else if (width >= 1200) {
        config.tl = { x: -600, scale: 1.2, rotation: { x: -0.5817, y: 0.587, z: 0.63527 } };
        config.t2 = { x: 600, scale: 1.7, rotation: { x: -0.2817, y: 0.087, z: -0.63527 } };
        config.t3 = { x: -600, scale: 1.7, rotation: { x: 0.35, y: -0.69, z: -1.55 } };
        config.t4 = { x: 0, scale: 1, rotation: { x: 0, y: 0.3, z: 0 } };
        config.t6 = { bottom: '130px', opacity: 1 };
      } else if (width >= 1080) {
        config.tl = { x: 0, scale: 1.11, rotation: { x: -0.5817, y: 0.587, z: 0.63527 } };
        config.t2 = { x: 0, scale: 1.53, rotation: { x: -0.2817, y: 0.087, z: -0.63527 } };
        config.t4.scale = 0.9;
        config.t6 = { bottom: '130px', opacity: 1 };
      } else if (width >= 980) {
        config.tl = { x: -600, scale: 1.2, rotation: { x: -0.5817, y: 0.587, z: 0.63527 } };
        config.t2 = { x: 600, scale: 1.7, rotation: { x: -0.2817, y: 0.087, z: -0.63527 } };
        config.t3 = { x: -600, scale: 1.7, rotation: { x: 0.35, y: -0.69, z: -1.55 } };
        config.t4.scale = 0.75;
        config.t6 = { bottom: '130px', opacity: 1 };
      } else if (width >= 915) {
        config.tl = { x: 0, scale: 1.11, rotation: { x: -0.5817, y: 0.587, z: 0.63527 } };
        config.t2 = { x: 0, scale: 1.53, rotation: { x: -0.2817, y: 0.087, z: -0.63527 } };
        config.t4.scale = 0.75;
        config.t6 = { bottom: '25px', opacity: 1 };
      } else if (width >= 900) {
        config.tl = { x: 0, scale: 1.11, rotation: { x: -0.5817, y: 0.587, z: 0.63527 } };
        config.t2 = { x: 0, scale: 1.53, rotation: { x: -0.2817, y: 0.087, z: -0.63527 } };
        config.t4.scale = 0.75;
        config.t6 = { bottom: '25px', opacity: 1 };
      } else if (width >= 768) {
        config.tl = { x: 0, scale: 0.9, rotation: { x: -0.5817, y: 0.587, z: 0.63527 } };
        config.t2 = { x: 0, scale: 1.275, rotation: { x: -0.2817, y: 0.087, z: -0.63527 } };
        config.t4.scale = 0.65;
        config.t6 = { bottom: '25px', opacity: 1 };
      } else if (width >= 760) {
        config.tl = { x: 0, scale: 0.9, rotation: { x: -0.5817, y: 0.587, z: 0.63527 } };
        config.t2 = { x: 0, scale: 1.275, rotation: { x: -0.2817, y: 0.087, z: -0.63527 } };
        config.t4.scale = 0.65;
        config.t6 = { bottom: '60px', opacity: 1 };
      } else if (width >= 620) {
        config.tl = { x: 0, scale: 0.9, rotation: { x: -0.5817, y: 0.587, z: 0.63527 } };
        config.t2 = { x: 0, scale: 1.275, rotation: { x: -0.2817, y: 0.087, z: -0.63527 } };
        config.t4.scale = 0.55;
        config.t6 = { bottom: '60px', opacity: 1 };
      } else if (width >= 550) {
        config.tl = { x: 0, scale: 0.78, rotation: { x: -0.5817, y: 0.587, z: 0.63527 } };
        config.t2 = { x: 0, scale: 1.105, rotation: { x: -0.2817, y: 0.087, z: -0.63527 } };
        config.t4.scale = 0.55;
        config.t6 = { bottom: '60px', opacity: 1 };
      } else if (width >= 500) {
        config.tl = { x: 0, scale: 0.78, rotation: { x: -0.5817, y: 0.587, z: 0.63527 } };
        config.t2 = { x: 0, scale: 1.105, rotation: { x: -0.2817, y: 0.087, z: -0.63527 } };
        config.t4.scale = 0.40;
        config.t6 = { bottom: '60px', opacity: 1 };
      } else if (width >= 480) {
        config.tl = { x: 0, scale: 0.78, rotation: { x: -0.5817, y: 0.587, z: 0.63527 } };
        config.t2 = { x: 0, scale: 1.105, rotation: { x: -0.2817, y: 0.087, z: -0.63527 } };
        config.t4.scale = 0.40;
        config.t6 = { bottom: '100px', opacity: 1 };
      } else if (width >= 400) {
        config.tl = { x: 0, scale: 0.48, rotation: { x: -0.5817, y: 0.587, z: 0.63527 } };
        config.t2 = { x: 0, scale: 0.68, rotation: { x: -0.2817, y: 0.087, z: -0.63527 } };
        config.t4.scale = 0.40;
        config.t6 = { bottom: '100px', opacity: 1 };
      } else if (width >= 390) {
        config.tl = { x: 0, scale: 0.48, rotation: { x: -0.5817, y: 0.587, z: 0.63527 } };
        config.t2 = { x: 0, scale: 0.68, rotation: { x: -0.2817, y: 0.087, z: -0.63527 } };
        config.t4.scale = 0.40;
        config.t6 = { bottom: '60px', opacity: 1 };
      } else if (width >= 360) {
        config.tl = { x: 0, scale: 0.48, rotation: { x: -0.5817, y: 0.587, z: 0.63527 } };
        config.t2 = { x: 0, scale: 0.68, rotation: { x: -0.2817, y: 0.087, z: -0.63527 } };
        config.t4.scale = 0.40;
        config.t6 = { bottom: '20px', opacity: 1 };
      }
    
      return config;
    };

    const updateAnimation = () => {
      const width = window.innerWidth;
      const config = getConfig(width);

      const animateBottle = (timeline: gsap.core.Timeline, position: { x: number }, scale: number, rotation: { x: number; y: number; z: number }) => {
        if (bottle.current) {
          timeline
            .to(bottle.current.position, { x: position.x }, 0)
            .to(bottle.current.scale, { x: scale, y: scale, z: scale }, 0)
            .to(bottle.current.rotation, rotation, 0);
        }
      };

      animateBottle(tl, config.tl, config.tl.scale, config.tl.rotation);
      animateBottle(t2, config.t2, config.t2.scale, config.t2.rotation);
      animateBottle(t3, config.t3, config.t3.scale, config.t3.rotation);
      animateBottle(t4, config.t4, config.t4.scale, config.t4.rotation);

      // Additional animations
      if (bottle.current && bottle2.current && bottle3.current && bottle4.current && bottle5.current &&
        ocean.current && royal.current && forest.current && ruby.current && sunset.current) {
        if(window.innerWidth >= 1080) {
          t5.to(bottle.current?.position, { y: bottle3.current?.position.y - 50 }, 0)
            .to(bottle2.current?.position, { y: bottle3.current?.position.y - 50, z: 500 }, 0)
            .to(bottle3.current?.position, { y: bottle3.current?.position.y - 50, z: 500 }, 0)
            .to(bottle4.current?.position, { y: bottle3.current?.position.y - 50, z: 500 }, 0)
            .to(bottle5.current?.position, { y: bottle3.current?.position.y - 50, z: 500 }, 0)
            .to(ocean.current?.position, { x: ocean.current?.position.x + 1000, y: ocean.current?.position.y + 1000 }, 0)
            .to(royal.current?.position, { x: royal.current?.position.x + 1000, y: royal.current?.position.y - 1000 }, 0)
            .to(forest.current?.position, { y: forest.current?.position.y - 1000 }, 0)
            .to(ruby.current?.position, { x: ruby.current?.position.x - 1000, y: ruby.current?.position.y + 1000 }, 0)
            .to(sunset.current?.position, { x: sunset.current?.position.x - 1000, y: sunset.current?.position.y - 1000 }, 0);
        } else if (window.innerWidth > 375) {
          t5.to(bottle.current?.position, { y: bottle3.current?.position.y + 100 }, 0)
            .to(bottle2.current?.position, { y: bottle3.current?.position.y + 100, z: 500 }, 0)
            .to(bottle3.current?.position, { y: bottle3.current?.position.y + 100, z: 500 }, 0)
            .to(bottle4.current?.position, { y: bottle3.current?.position.y + 100, z: 500 }, 0)
            .to(bottle5.current?.position, { y: bottle3.current?.position.y + 100, z: 500 }, 0)
            .to(ocean.current?.position, { x: ocean.current?.position.x + 1000, y: ocean.current?.position.y + 1000 }, 0)
            .to(royal.current?.position, { x: royal.current?.position.x + 1000, y: royal.current?.position.y - 1000 }, 0)
            .to(forest.current?.position, { y: forest.current?.position.y - 1000 }, 0)
            .to(ruby.current?.position, { x: ruby.current?.position.x - 1000, y: ruby.current?.position.y + 1000 }, 0)
            .to(sunset.current?.position, { x: sunset.current?.position.x - 1000, y: sunset.current?.position.y - 1000 }, 0);
        } else {
          t5.to(bottle.current?.position, { y: bottle3.current?.position.y + 150 }, 0)
            .to(bottle2.current?.position, { y: bottle3.current?.position.y + 150, z: 500 }, 0)
            .to(bottle3.current?.position, { y: bottle3.current?.position.y + 150, z: 500 }, 0)
            .to(bottle4.current?.position, { y: bottle3.current?.position.y + 150, z: 500 }, 0)
            .to(bottle5.current?.position, { y: bottle3.current?.position.y + 150, z: 500 }, 0)
            .to(ocean.current?.position, { x: ocean.current?.position.x + 1000, y: ocean.current?.position.y + 1000 }, 0)
            .to(royal.current?.position, { x: royal.current?.position.x + 1000, y: royal.current?.position.y - 1000 }, 0)
            .to(forest.current?.position, { y: forest.current?.position.y - 1000 }, 0)
            .to(ruby.current?.position, { x: ruby.current?.position.x - 1000, y: ruby.current?.position.y + 1000 }, 0)
            .to(sunset.current?.position, { x: sunset.current?.position.x - 1000, y: sunset.current?.position.y - 1000 }, 0);
        }

        const cart = document.getElementById('section-5');
        if (cart) {
          t6.to(cart.style, { bottom: config.t6.bottom, opacity: config.t6.opacity });

          t7.to(cart.style, {bottom: '5000px', opacity: 0})
          .to(bottle.current?.position, { y: bottle3.current?.position.y + 10000 }, 0)
          .to(bottle2.current?.position, { y: bottle3.current?.position.y + 10000 }, 0)
          .to(bottle3.current?.position, { y: bottle3.current?.position.y + 10000 }, 0)
          .to(bottle4.current?.position, { y: bottle3.current?.position.y + 10000 }, 0)
          .to(bottle5.current?.position, { y: bottle3.current?.position.y + 10000 }, 0);
        }
      }
    };
    updateAnimation();
  }, []);

  return (
    <main>
      <Spline
        scene="https://prod.spline.design/K6xe25tQ2Z16nOm3/scene.splinecode"
        onLoad={onLoad}
        className='fixed top-0 bottom-0 left-0 right-0'
      />

      <Section id={'section-1'} marginTop={marginTop} className={`relative z-1 flex items-center w-full max-w-[750px] mid2:max-w-[500px] lg:max-w-[525px] xl:max-w-[580px] 2xl:max-w-[clamp(500px,37vw,800px)] h-[947px] mx-auto mid2:ml-auto mid2:mr-[30px] lg:mr-[3vw] xl:mr-[5vw] 2xl:mr-[clamp(100px,10vw,200px)] p-4 2xl:p-0`} header={'Sleek & Modern'} text={'A minimalist, stylish design that fits seamlessly with your active lifestyle. Available in multiple colors, it holds 750ml and is perfect for daily hydration.'}/>
      <Section id={'section-2'} marginTop={1300} className='relative z-1 flex items-center my-[1300px] w-full max-w-[750px] mid2:max-w-[500px] lg:max-w-[525px] xl:max-w-[580px] 2xl:max-w-[clamp(500px,37vw,800px)] h-[947px] mx-auto mid2:mr-auto mid2:ml-[30px] lg:ml-[3vw] xl:ml-[5vw] 2xl:ml-[clamp(100px,10vw,200px)] p-4 2xl:p-0' header={'Stable Temperature'} text={'Double-walled thermal insulation keeps drinks cold for up to 24 hours or hot for 12 hours, making it ideal for any adventure.'}/>
      <Section id={'section-3'} marginTop={0} className='relative z-1 flex items-center mb-[2300px] w-full max-w-[750px] mid2:max-w-[500px] lg:max-w-[525px] xl:max-w-[580px] 2xl:max-w-[clamp(500px,37vw,800px)] h-[947px] mx-auto mid2:ml-auto mid2:mr-[30px] lg:mr-[3vw] xl:mr-[5vw] 2xl:mr-[clamp(100px,10vw,200px)] p-4 2xl:p-0' header={'Built for Simplicity'} text={'Lightweight, durable, and leak-proof, this BPA-free bottle is easy to carry, refill, and clean, offering both function and style in one sleek package.'}/>

      <section id="section-4" className='relative z-[-1] flex items-center bg-black w-[1px] h-[2100px] 1080:h-[1988px] mt-[-1400px] mb-[800px] xs:mb-[820px] sm:mb-[860px] mid:mb-[750px] xl:mb-[900px]'></section>
      
      <CartSection color={color} updateColor={updateColor} quantity={quantity} setQuantity={setQuantity} AddToCart={AddToCart} />
      
      <Footer />
    </main>
  );
}