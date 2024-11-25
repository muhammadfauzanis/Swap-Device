import Image from 'next/image';
import ProductCarousel from './ProductCarousel';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center w-[90%] max-w-screen-xl m-auto px-5 mt-10 md:mt-16 lg:mt-20">
      <div className="w-full flex justify-center items-center gap-x-20 mt-20">
        <div className="">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
            Consignment Hub for your Apple Devices
          </h1>
          <Button variant="default" className="mt-8">
            Shop Now
          </Button>
        </div>
        <Image
          src="/hero.png"
          alt="Hero"
          className="w-[50%] md:w-[70%]"
          width={1920}
          height={720}
        />{' '}
      </div>
      <hr className="mb-5 mt-12" />
      <ProductCarousel productType="iPhone" imageSource="/iphone_hero.png" />
      <ProductCarousel productType="iPad" imageSource="/ipad.jpg" />
      <ProductCarousel productType="MacBook" imageSource="/macbook.jpg" />
      <ProductCarousel productType="Watch" imageSource="/watch.png" />
      <ProductCarousel productType="AirPods" imageSource="/airpods.png" />
    </div>
  );
};

export default Hero;
