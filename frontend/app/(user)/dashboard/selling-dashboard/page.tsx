'use client';

import Footer from '@/components/Footer';
import SideBarUser from '@/components/SideBarUser';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { AiOutlineStock } from 'react-icons/ai';
import { CiShop } from 'react-icons/ci';
import { IoAdd } from 'react-icons/io5';
import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import SellingProduct from '@/components/layout/SellingProduct';
import SellingHistory from '@/components/layout/SellingHistory';
import TransactionOverview from '@/components/layout/TransactionOverview';

const SellingDashboard = () => {
  const [activeTab, setActiveTab] = useState('Produk'); // Default ke Produk

  return (
    <div className="w-full h-screen">
      <div className="mt-16 lg:mt-32 grid grid-rows-2 grid-cols-1 items-center lg:items-start md:grid-rows-2 md:grid-cols-1 lg:grid-rows-1 lg:grid-cols-3 justify-self-center gap-x-5 xl:gap-x-10 w-[90%] xl:w-[80%]">
        <SideBarUser />

        <Card className="lg:col-span-2 p-4">
          <CardContent>
            <h3 className="text-2xl font-bold">Dashboard Penjualan</h3>
            <hr className="pb-5 mt-5" />

            <TransactionOverview
              title1="Pendapatan"
              price="IDR 50.000.000"
              title2="Penjualan"
              amount="2"
            />

            <hr className="pb-5 mt-5" />

            <div className="flex items-center justify-between">
              <ul className="flex gap-x-4 relative">
                {['Produk', 'History'].map((tab) => (
                  <div
                    key={tab}
                    className="cursor-pointer"
                    onClick={() => setActiveTab(tab)}
                  >
                    <li
                      className={`pb-1 transition-all duration-300 hover:text-black ${
                        activeTab === tab ? 'text-black' : 'text-gray-500'
                      }`}
                    >
                      {tab}
                    </li>
                    {activeTab === tab && (
                      <div className="border-2 border-black w-1/2 transition-all duration-300"></div>
                    )}
                  </div>
                ))}
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

            {activeTab === 'Produk' ? <SellingProduct /> : <SellingHistory />}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default SellingDashboard;
