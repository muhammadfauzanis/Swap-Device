import Image from 'next/image';

interface ProductCardProps {
  imageSource?: string;
  productName?: string;
  price?: string;
  imageWidth: number;
  imageHeight: number;
}

const ProductCard = ({
  imageSource,
  productName,
  price,
  imageWidth,
  imageHeight,
}: ProductCardProps) => {
  return (
    <div className="p-1 cursor-pointer">
      <Image
        src={'/iphone.png'}
        alt="Iphone"
        width={imageWidth}
        height={imageHeight}
        className="w-full"
      />
      <p className="py-2">{productName}</p>
      <p className="font-bold">{price}</p>
    </div>
  );
};

export default ProductCard;
