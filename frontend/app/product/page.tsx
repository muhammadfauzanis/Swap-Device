import SortingProductBox from '@/components/SortingProductBox';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import SidebarProduct from '@/components/SidebarProduct';

const ProductPage = () => {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="my-40 w-[90%] m-auto px-3">
        <SortingProductBox />
        <div className="grid grid-cols-3 items-start mt-3">
          <SidebarProduct />

          <div className="col-span-2 grid grid-cols-2 md::grid-cols-3 lg:grid-cols-5">
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
