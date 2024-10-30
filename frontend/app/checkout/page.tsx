import CheckoutInformation from '@/components/CheckoutInformation';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { IoLocationSharp } from 'react-icons/io5';

const CheckoutPage = () => {
  return (
    <div className="w-full max-h-screen">
      <div className="mt-32 grid grid-cols-1 md:grid-cols-2 items-center w-[80%] xl:w-[70%] m-auto gap-x-10 gap-y-5 md:gap-y-0">
        <Card>
          <CardContent className="flex items-center justify-center p-6 ">
            <ProductCard
              imageWidth={150}
              imageHeight={120}
              price="IDR 17.000.000"
              productName="iPhone 15 Pro Max"
            />
          </CardContent>
        </Card>

        <div className="space-y-5">
          <div className="w-full">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center">
                  <IoLocationSharp size={30} className="text-red-600" />

                  <p className="text-gray-500">Deliver to</p>
                </div>
                <p className="font-bold">Rumah - Walter White</p>
                <p>
                  Perumahan Lorem ipsum dolor sit, amet consectetur adipisicing
                  elit. Eos iure velit saepe! Dignissimos earum nihil qui vitae
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="w-full">
            <Card className="">
              <CardContent className="p-5 flex flex-col gap-y-3">
                <div>
                  <p className="text-gray-500">Detail Pembayaran</p>
                  <CheckoutInformation
                    detailInformation="Harga Produk"
                    price="IDR 17.000.000"
                  />
                  <CheckoutInformation
                    detailInformation="Ongkos Kirim"
                    price="IDR 20.000"
                  />
                  <CheckoutInformation
                    detailInformation="Biaya Admin"
                    price="IDR 50.000"
                  />
                </div>

                <Button className="w-full max-w-[80%] xl:w-[70%] m-auto">
                  Pilih Metode Pembayaran
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
