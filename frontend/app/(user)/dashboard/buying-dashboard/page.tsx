'use client';

import BuyingHistory from '@/components/layout/BuyingHistory';
import BuyingProgress from '@/components/layout/BuyingProgress';
import SideBarUser from '@/components/SideBarUser';
import TransactionOverview from '@/components/TransactionOverview';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

const BuyingDashboard = () => {
  const [activeTab, setActiveTab] = useState('Pembelian'); // Default ke Produk

  return (
    <div className="w-full h-screen">
      <div className="mt-16 lg:mt-32 grid grid-rows-2 grid-cols-1 items-center lg:items-start md:grid-rows-2 md:grid-cols-1 lg:grid-rows-1 lg:grid-cols-3 justify-self-center gap-x-5 xl:gap-x-10 w-[90%] xl:w-[80%]">
        <SideBarUser />

        <Card className="lg:col-span-2 p-4">
          <CardContent>
            <h3 className="text-2xl font-bold">Dashboard Pembelian</h3>
            <hr className="pb-5 mt-5" />

            <TransactionOverview
              title1="Total Pembelian"
              price="IDR 20.000.000"
              title2="Pembelian"
              amount="1"
            />

            <hr className="pb-5 mt-5" />

            <ul className="flex gap-x-4 relative">
              {['Pembelian', 'History'].map((tab) => (
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

            {activeTab === 'Pembelian' ? <BuyingProgress /> : <BuyingHistory />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuyingDashboard;
