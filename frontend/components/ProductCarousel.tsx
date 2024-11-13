import Image from 'next/image';
import { Button } from './ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import ProductCard from './ProductCard';

interface ProductCarouselProps {
  productType: string;
  imageSource: string;
}

const ProductCarousel = ({
  productType,
  imageSource,
}: ProductCarouselProps) => {
  return (
    <div className="flex flex-col items-center w-full mt-20">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-4xl md:text-6xl font-bold">{productType}</h1>
        <Button variant="outline">See More</Button>
      </div>

      <div className="py-5">
        <Image
          src={imageSource}
          alt="iPhone"
          className="w-full h-auto max-h-[400px] md:max-h-screen rounded-lg"
          width={1920}
          height={720}
        />
      </div>

      <div className="w-[90%] ">
        <Carousel>
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 flex flex-col items-center justify-center cursor-pointer"
                key={index}
              >
                <ProductCard
                  productName="iPhone 15 Pro Max"
                  price="IDR 14.000.000"
                  imageWidth={120}
                  imageHeight={90}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default ProductCarousel;
