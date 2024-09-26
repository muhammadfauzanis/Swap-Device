import Image from 'next/image';
import { Button } from './ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

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
        <Button variant={'outline'}>See More</Button>
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
          {/* <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-3xl font-semibold">
                          iPhone {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent> */}
          <CarouselContent>
            {Array.from({ length: 5 }).map(() => (
              <CarouselItem className="md:basis-1/3 lg:basis-1/4 flex flex-col items-center justify-center cursor-pointer">
                <div className="p-1">
                  <Image
                    src={'/iphone.png'}
                    alt="Iphone"
                    width={120}
                    height={150}
                  />
                  <p className="py-2">iPhone 15 Pro Max</p>
                  <p className="font-bold">IDR 14,000,000</p>
                </div>
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
