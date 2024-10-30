import SortingProductBox from '@/components/SortingProductBox';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import SidebarProduct from '@/components/SidebarProduct';
import PageExplorer from '@/components/PageExplorer';

const ProductPage = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="mt-32 w-[90%] m-auto px-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl md:text-2xl font-bold">Hasil Filter</h1>
          <SortingProductBox />
        </div>

        <div className="grid grid-cols-1  lg:grid-cols-3 gap-4 mt-3">
          <div className="">
            <SidebarProduct />
          </div>

          <div className="flex flex-col justify-center lg:col-span-2">
            <div className="grid grid-cols-2 w-[80%] m-auto md:w-full justify-items-center items-center gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
            <PageExplorer />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
