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

export const buzosData = [
  {
    id: 'buzo-1',
    name: 'Buzo Malibu Style Edición Limitada Vol. 1',
    description: 'Buzo oversize premium, estampado exclusivo basketball culture. Algodón rústico 100% de alta densidad con interior frizado.',
    price: 55000,
    img: '/BUZO1.jpg',
    category: 'Buzos'
  },
  {
    id: 'buzo-2',
    name: 'Buzo Malibu Style Edición Limitada Vol. 2',
    description: 'Buzo oversize con diseño urbano inspirado en la cultura streetwear de la NBA. Costuras reforzadas y corte relaxed fit.',
    price: 55500,
    img: '/BUZO2.jpg',
    imgAlt: '/BUZO2.1.jpg',
    category: 'Buzos'
  },
  {
    id: 'buzo-3',
    name: 'Buzo Malibu Style Edición Limitada Vol. 3',
    description: 'Buzo de algodón peinado con estampa transfer de alta resolución. Puños y cintura con elástico premium.',
    price: 56000,
    img: '/BUZO3.1.jpg',
    category: 'Buzos'
  },
  {
    id: 'buzo-4',
    name: 'Buzo Malibu Style Edición Limitada Vol. 4',
    description: 'Buzo streetwear oversize con capucha reforzada. Diseño exclusivo inspirado en leyendas del basketball.',
    price: 57000,
    img: '/BUZO4.jpg',
    imgAlt: '/BUZO4.1.jpg',
    category: 'Buzos'
  },
  {
    id: 'buzo-5',
    name: 'Buzo Malibu Style Edición Limitada Vol. 5',
    description: 'Buzo premium con estampa full-color y acabado brushed interior. Ideal para las sesiones de invierno.',
    price: 58000,
    img: '/BUZO5.jpg',
    category: 'Buzos'
  },
  {
    id: 'buzo-6',
    name: 'Buzo Malibu Style Edición Limitada Vol. 6',
    description: 'Buzo de edición limitada con arte exclusivo. Tejido de gramaje pesado para máxima durabilidad.',
    price: 59000,
    img: '/BUZO6.1.jpg',
    category: 'Buzos'
  },
];
