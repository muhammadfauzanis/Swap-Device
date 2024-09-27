import Image from 'next/image';

const ProductCard = () => {
  return (
    <div className="p-1 cursor-pointer">
      <Image src={'/iphone.png'} alt="Iphone" width={120} height={150} />
      <p className="py-2">iPhone 15 Pro Max</p>
      <p className="font-bold">IDR 14,000,000</p>
    </div>
  );
};

export default ProductCard;
