export const getMediaPrice = (price: any) => {
  if (isNaN(price)) return { fiatPrice: 0, creditPrice: 0 };

  let formattedPrice = parseFloat(price);

  return {
    fiatPrice: formattedPrice,
    creditPrice: formattedPrice * 2,
  };
};
