import SortingProductBox from '@/components/SortingProductBox';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import SidebarProduct from '@/components/SidebarProduct';

const ProductPage = () => {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="my-40 w-[90%] m-auto px-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl md:text-2xl font-bold">Hasil Filter</h1>
          <SortingProductBox />
        </div>

        <div className="grid grid-cols-1  lg:grid-cols-3 gap-4 mt-3">
          <div className="">
            <SidebarProduct />
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 justify-items-center items-center gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
