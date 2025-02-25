export const getMediaPrice = (price: any) => {
  if (isNaN(price)) return { fiatPrice: 0, creditPrice: 0 };

  let formattedPrice = parseFloat(price);

  return {
    fiatPrice: formattedPrice,
    creditPrice: formattedPrice * 2,
  };
};

export const getPriceWithCredits = (credits: any) => {
  if (isNaN(credits)) return { fiatPrice: 0, creditPrice: 0 };

  let formattedCredits = parseFloat(credits);

  return {
    fiatPrice: formattedCredits / 2,
    creditPrice: formattedCredits,
  };
};
