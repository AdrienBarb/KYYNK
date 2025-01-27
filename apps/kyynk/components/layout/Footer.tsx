import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const Footer = () => {
  //others
  const t = useTranslations();

  return (
    <footer
      className="bg-black text-secondary px-4 py-8"
      data-id="homepage-footer"
    >
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 justify-between items-center mx-auto">
        <p className="font-extralight">© Copyright 2023 - KYYNK</p>
        <div className="flex flex-col md:flex-row gap-4 text-center">
          <Link href="/legal/terms-of-use">{t('footer.termsOfUse')}</Link>
          <Link href="/legal/legal-notice">{t('footer.legalNotice')}</Link>
          <Link href="/legal/privacy">{t('footer.confidentiality')}</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
