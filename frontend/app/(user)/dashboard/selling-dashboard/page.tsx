import Footer from '@/components/Footer';
import SideBarUser from '@/components/SideBarUser';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { AiOutlineStock } from 'react-icons/ai';
import { CiShop } from 'react-icons/ci';
import { IoAdd } from 'react-icons/io5';
import { FiEdit, FiEye } from 'react-icons/fi';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const products = [
  {
    code: 'SD001',
    category: 'iPhone',
    model: 'iPhone 15 Pro',
    price: 'IDR 15.000.000',
    status: 'available',
  },
  {
    code: 'SD002',
    category: 'iPad',
    model: 'iPad Pro 11 Inch',
    price: 'IDR 25.000.000',
    status: 'available',
  },
  {
    code: 'SD003',
    category: 'Airpods',
    model: 'Airpods 4 ANC',
    price: 'IDR 3.000.000',
    status: 'available',
  },
  {
    code: 'SD003',
    category: 'Mac',
    model: 'Macbook Pro M3 Max 14 Inch',
    price: 'IDR 33.000.000',
    status: 'available',
  },
];

const SellingDashboard = () => {
  return (
    <div className="w-full h-screen">
      <div className="mt-16 lg:mt-32 grid grid-rows-2 grid-cols-1 items-center lg:items-start md:grid-rows-2 md:grid-cols-1 lg:grid-rows-1 lg:grid-cols-3 justify-self-center gap-x-5 xl:gap-x-10 w-[90%] xl:w-[80%]">
        <SideBarUser />

        <Card className="lg:col-span-2 p-4">
          <CardContent>
            <h3 className="text-2xl font-bold">Dashboard Penjualan</h3>
            <hr className="pb-5 mt-5" />

            <div className="grid grid-cols-2 gap-x-8">
              <Card>
                <CardContent>
                  <div className="flex items-center gap-x-4 p-2">
                    <AiOutlineStock size={50} />
                    <div className="">
                      <p>Pendapatan</p>
                      <p>Rp. 50.000.000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex items-center gap-x-4 p-2">
                    <CiShop size={50} />
                    <div className="">
                      <p>Penjualan</p>
                      <p>2</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <hr className="pb-5 mt-5" />

            <div className="flex items-center justify-between">
              <ul className="flex gap-x-4 transition-all duration-300">
                <div className="">
                  <li>Produk</li>
                  <div className="border-2 border-black w-1/3"></div>
                </div>
                <div className="">
                  <li>History</li>
                  <div className="border-2 border-black w-1/3"></div>
                </div>
              </ul>

              <div className="space-x-4">
                <Button variant="secondary">
                  <span>
                    <FiEdit size={20} className="mr-2" />
                  </span>
                  Edit Produk
                </Button>
                <Button>
                  <span>
                    <IoAdd size={20} className="mr-2" />
                  </span>
                  Tambah Produk
                </Button>
              </div>
            </div>

            <Card className="mt-4">
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>Harga</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.code}>
                        <TableCell className="font-medium">
                          {product.code}
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.model}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.status}</TableCell>
                        <TableCell className="space-x-2 w-fit">
                          <button className="cursor-pointer">
                            <FiEdit size={17} />
                          </button>
                          <button className="cursor-pointer">
                            <FiEye size={17} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default SellingDashboard;
