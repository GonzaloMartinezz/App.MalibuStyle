export const productsData = Array.from({ length: 26 }, (_, i) => {
  const num = i + 1;
  const isJpg = [1,2,3,4,9,10,11,12,13,16,17,18,19,20,23,24,26].includes(num);
  const isJpeg = [6,7,8,14,15,21,22,25].includes(num);
  const isPng = [5].includes(num);

  const ext = isJpg ? 'jpg' : isJpeg ? 'jpeg' : isPng ? 'png' : 'jpg';

  return {
    id: num.toString(),
    name: `Exclusiva Remera Oversize / Buzo Malibu Style Vol. ${num}`,
    description: 'Confección premium 100% algodón rústico y peinado. Diseños exclusivos de la mejor cultura de Basketball urbana.',
    price: 35000 + (num * 100),
    img: `/IMG${num}.${ext}`,
    category: 'Remeras Basquet'
  };
});
