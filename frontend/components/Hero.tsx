import ProductCarousel from './ProductCarousel';

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center w-[90%] max-w-screen-xl m-auto px-5">
      <ProductCarousel productType="iPhone" imageSource="/iphone_hero.png" />
      <ProductCarousel productType="iPad" imageSource="/ipad.jpg" />
      <ProductCarousel productType="Macbook" imageSource="/macbook.jpg" />
      <ProductCarousel productType="Airpods" imageSource="/airpods.png" />
      <ProductCarousel productType="Watch" imageSource="/watch.png" />
    </div>
  );
};

export default Hero;
