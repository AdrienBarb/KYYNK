import React from 'react';
import PageCenterMessage from '@/components/PageCenterMessage';
import { genPageMetadata } from '@/app/seo';

export const metadata = genPageMetadata({
  title: '404',
  description:
    "La page que vous cherchez n'a pas été trouvée. Veuillez vérifier l'URL ou retourner à la page d'accueil.",
});

const ErrorNotFoundPage = () => {
  const errorMessage =
    "Sorry, but the page you requested could not be found. You may have followed an outdated link or typed the page address incorrectly. Please check the address and try again or use the search bar to find what you're looking for.";

  return <PageCenterMessage text={errorMessage} />;
};

export default ErrorNotFoundPage;
