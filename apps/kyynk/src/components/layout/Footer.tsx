import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer
      className="bg-black text-secondary px-4 py-8"
      data-id="homepage-footer"
    >
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 justify-between items-center mx-auto">
        <p className="font-extralight">© Copyright 2025 - KYYNK</p>
        <div className="flex flex-col md:flex-row gap-4 text-center">
          <Link href="/terms-of-service">Terms of Service</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/dmca-policy">DMCA Policy</Link>
          <Link href="/contact-us">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
