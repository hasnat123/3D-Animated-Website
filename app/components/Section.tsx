import React from 'react'

import { Bebas_Neue } from 'next/font/google';

const bebas_neue = Bebas_Neue({
    subsets: ["latin"],
    weight: "400"
});

const Section = ({ id, marginTop, className, header, text }) => {
  return (
    <div>
        <section id={id} style={{ marginTop: `${marginTop}px` }} className={className}>
          <div className='flex flex-col justify-center w-full bg-gray-400 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 p-4 mid2:bg-transparent'>
            <h2 className={`drop-shadow-glow text-[65px] md:text-[80px] xl:text-[100px] text-[#AAE6D9] ${bebas_neue.className} leading-[65px] md:leading-[90px] xl:leading-[110px] mb-2 xl:mb-2`}>{header}</h2>
            <p className='text-[22px] md:text-[27px] xl:text-[35px]'>{text}</p>
          </div>
        </section>
    </div>
  )
}

export default Section