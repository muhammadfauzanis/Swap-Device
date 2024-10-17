import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import SortingProductBox from '@/components/SortingProductBox';

const WishlistPage = () => {
  return (
    <div className="w-full max-h-screen">
      <Navbar />

      <div className="mt-32 w-[80%] m-auto ">
        <h3 className="font-bold text-2xl lg:text-3xl">Semua Wishlist</h3>

        <div className="flex justify-between px-3">
          <p className="lg:text-lg">10 Item</p>
          <SortingProductBox />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-5 justify-items-center mt-10">
          <ProductCard
            imageWidth={120}
            imageHeight={90}
            productName="iPhone 15 Pro Max"
            price="IDR 14.000.000"
          />
          <ProductCard
            imageWidth={120}
            imageHeight={90}
            productName="iPhone 15 Pro Max"
            price="IDR 14.000.000"
          />
          <ProductCard
            imageWidth={120}
            imageHeight={90}
            productName="iPhone 15 Pro Max"
            price="IDR 14.000.000"
          />
          <ProductCard
            imageWidth={120}
            imageHeight={90}
            productName="iPhone 15 Pro Max"
            price="IDR 14.000.000"
          />
          <ProductCard
            imageWidth={120}
            imageHeight={90}
            productName="iPhone 15 Pro Max"
            price="IDR 14.000.000"
          />
          <ProductCard
            imageWidth={120}
            imageHeight={90}
            productName="iPhone 15 Pro Max"
            price="IDR 14.000.000"
          />
          <ProductCard
            imageWidth={120}
            imageHeight={90}
            productName="iPhone 15 Pro Max"
            price="IDR 14.000.000"
          />
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
