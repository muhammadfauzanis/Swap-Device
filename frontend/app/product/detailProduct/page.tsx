import { Card, CardContent } from '@/components/ui/card';
import DetailProductCarousel from '@/components/DetailProductCarousel';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import ProductCarousel from '@/components/ProductCarousel';
import Faq from '@/components/Faq';

const DetailProductPage = () => {
  return (
    <div className="w-full min-h-screen">
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-2 w-[90%] gap-x-16 xl:gap-x-0 m-auto mt-40 px-8 md:px-3 lg:px-0">
        <DetailProductCarousel>
          <Card>
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <ProductCard imageWidth={1920} imageHeight={720} />
            </CardContent>
          </Card>
        </DetailProductCarousel>
        <div className="pt-5 ">
          <h3 className="font-bold text-2xl lg:text-3xl xl:text-4xl">
            iPhone 15 Pro Max
          </h3>
          <p className="text-sm text-gray-400">Code</p>
          <p className="font-bold text-lg lg:text-xl">IDR 17.000.000</p>

          <Faq />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DetailProductPage;
