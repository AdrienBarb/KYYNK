import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer
      className="bg-black text-secondary px-4 py-8"
      data-id="homepage-footer"
    >
      <div className="w-full max-w-7xl flex flex-col gap-8 mx-auto">
        <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
          <p className="font-extralight">© Copyright 2025 - KYYNK</p>
          <div className="flex flex-col md:flex-row gap-4 text-center">
            <Link href="/terms-of-service">Terms of Service</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/dmca-policy">DMCA Policy</Link>
            <Link href="/contact-us">Contact Us</Link>
          </div>
        </div>
        <p className="text-sm text-center font-light max-w-2xl mx-auto">
          KYYNK is operated by ALLY CORPORATION, with registered address 60 rue
          francois 1er, paris, 75008, France, under the laws of France, with
          registered number 814 428785.{' '}
          <Link
            href="https://www.commercegate.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-sm font-light"
          >
            CommerceGate
          </Link>{' '}
          is our Payment Facilitator.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
