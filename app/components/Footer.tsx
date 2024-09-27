import React from 'react';

interface FooterLink {
  text: string;
  href: string;
}

const Footer: React.FC = () => {
  const leftLinks: FooterLink[] = [
    { text: 'FAQ', href: '#' },
    { text: 'Track Order', href: '#' },
    { text: 'Delivery & Returns', href: '#' },
  ];

  const rightLinks: FooterLink[] = [
    { text: 'About Us', href: '#' },
    { text: 'Contact Information', href: '#' },
    { text: 'Terms & Conditions', href: '#' },
  ];

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add subscription logic here
  };

  return (
    <footer id="footer" className="flex flex-col justify-center mt-[2000px] xs:mt-[2000px] sm:mt-[2000px] mid:mt-[2000px] xl:mt-[2000px]">
      <hr className="mb-14 w-[90%] mx-auto" />
      <div className="w-full max-w-[1700px] z-10 flex flex-col mid:flex-row justify-between lg:justify-around xl:items-center p-4 pb-10 xs:p-8 xs:pb-14 text-lg mx-auto">
        <ul className="z-10 flex flex-col gap-8 mb-8 xs:items-center mid:items-start">
          {leftLinks.map((link) => (
            <li key={link.text}>
              <a href={link.href}>{link.text}</a>
            </li>
          ))}
        </ul>
        <ul className="z-10 flex flex-col gap-8 xs:items-center mid:items-start">
          {rightLinks.map((link) => (
            <li key={link.text}>
              <a href={link.href}>{link.text}</a>
            </li>
          ))}
        </ul>
        <div className="w-full mid:w-1/3 mid:max-w-[400px] flex flex-col xs:items-center mid:items-start z-10 mt-16 xs:mt-20 mid:mt-0">
          <h3 className="text-[24px] sm:text-[28px] mid:text-[24px] xl:text-[28px] mb-6 xs:mb-8">
            Subscribe to our newsletter
          </h3>
          <form onSubmit={handleSubscribe} className="flex justify-between w-[90%] max-w-[350px] mid:max-w-none sm:max-w-[400px] xl:w-full xl:max-w-none border-2 border-white rounded-[3px]">
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent outline-none w-full mid:max-w-[200px] py-1 sm:py-3 pl-4 text-[18px] xs:text-[18px] appearance-none"
              required
            />
            <button type="submit" className="bg-[#AAE6D9] text-[#101010] font-semibold p-3 text-[1rem]">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;