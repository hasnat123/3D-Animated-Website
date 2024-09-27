'use client'

import Image from 'next/image'
import React from 'react'
import { Logo } from '@/public/Images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useQuantity } from '../contexts/CartQuantityContext'

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { itemCount, isAnimating } = useQuantity();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBuySection = () => {
    window.scrollTo({ top: 13000, behavior: 'smooth' });
  };

  return (
    <nav className='fixed flex justify-between items-center p-3 md:p-4 xl:p-6 w-full z-10 top-0'>
      <Image 
        src={Logo} 
        alt='logo' 
        onClick={scrollToTop} 
        className='object-contain w-[80px] md:w-[96px] xl:w-[120px] cursor-pointer' 
      />
      <div className='flex items-center'>
        <div className='relative mr-5 md:mr-6 xl:mr-8'>
          <FontAwesomeIcon 
            icon={faCartShopping} 
            className={`${isAnimating ? 'animate-scale' : ''} text-[#AAE6D9] text-[28px] md:text-[32px] xl:text-[40px]`}
          />
          <span className={`${isAnimating ? 'animate-color' : ''} absolute flex justify-center ml-[4px] right-0 left-0 text-[11px] top-[1px] md:text-[13px] md:top-[2px] xl:text-[15px] xl:top-[2px] xl:left-[2px] font-extrabold text-[#101010]`}>
            {itemCount < 100 ? itemCount : '99+'}
          </span>
        </div>
        <div className="flex justify-center w-[7.5rem] h-[2.73rem] md:w-[9rem] md:h-[3.27rem] xl:w-[11rem] xl:h-[4rem]">
          <button className='btn' onClick={scrollToBuySection}>
            <div className="btn__bg">
              <span className="btn__bg__layer btn__bg__layer-first"></span>
              <span className="btn__bg__layer btn__bg__layer-second"></span>
              <span className="btn__bg__layer btn__bg__layer-third"></span>
            </div>
            <span className="btn__text-out md:text-[1.2rem] xl:text-[1.5rem]">BUY NOW</span>
            <span className="btn__text-in md:text-[1.2rem] xl:text-[1.5rem]">BUY NOW</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar