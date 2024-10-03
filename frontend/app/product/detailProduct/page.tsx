import { Card, CardContent } from '@/components/ui/card';
import DetailProductCarousel from '@/components/DetailProductCarousel';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import ProductCarousel from '@/components/ProductCarousel';
import Faq from '@/components/Faq';
import { Button } from '@/components/ui/button';

const DetailProductPage = () => {
  return (
    <div className="w-full min-h-screen">
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-2 items-start w-[90%] gap-x-16 xl:gap-x-0 m-auto mt-40 px-8 md:px-3 lg:px-0">
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

          <p className="font-bold">
            Lokasi: <span className="font-normal">Bandung</span>
          </p>

          <p className="font-bold">
            Penyimpanan: <span className="font-normal">256 GB</span>
          </p>

          <p className="font-bold">
            Warna: <span className="font-normal">Natural Titanium</span>
          </p>

          <div className="">
            <h4 className="font-bold">Kondisi:</h4>
            <ul className="list-disc list-inside grid grid-cols-2 px-2 gap-x-3 justify-between">
              <li>Face Id Lancar</li>
              <li>Face Id Lancar</li>
              <li>Face Id Lancar</li>
              <li>Face Id Lancar</li>
              <li>Face Id Lancar</li>
              <li>Face Id Lancar</li>
              <li>Face Id Lancar</li>
              <li>Face Id Lancar</li>
              <li>Face Id Lancar</li>
              <li>Face Id Lancar</li>
            </ul>
            <p className="font-bold">
              Kondisi Fisik? <span className="font-normal">95%</span>
            </p>
          </div>

          <div className="">
            <h4 className="font-bold">Kelengkapan:</h4>
            <ul className="list-disc list-inside grid grid-cols-2 px-2 gap-x-3 justify-between">
              <li>Unit</li>
              <li>Unit</li>
              <li>Unit</li>
              <li>Unit</li>
              <li>Unit</li>
              <li>Unit</li>
            </ul>
          </div>

          <div className="space-x-5 flex justify-center items-center py-3">
            <Button variant={'outline'}>Chat Seller</Button>
            <Button>Beli Sekarang</Button>
          </div>

          <Faq />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DetailProductPage;
