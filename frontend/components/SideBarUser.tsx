'use client';

import { FaUser } from 'react-icons/fa';
import { Card, CardContent } from './ui/card';
import Link from 'next/link';
import { UserData } from '@/features/UserData';
import { Auth } from '@/features/Auth';

const SideBarUser = () => {
  const { data: userData, isDisabled, isLoading } = UserData(); // get data from class has created
  const { logOutUser } = Auth();

  return (
    <Card className="max-h-fit p-4">
      <CardContent>
        <div className="p-2 space-y-16">
          <div className="flex items-center gap-x-2 xl:gap-x-4 w-fit">
            <FaUser size={35} />
            <div className="">
              <p className="font-bold">{userData?.name}</p>
              <p className="text-sm">{userData?.email}</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-3">
            <button className="hover:-translate-y-0.5 transition-all duration-300">
              Akun Saya
            </button>
            <hr />
            <button className="hover:-translate-y-0.5 transition-all duration-300">
              <Link href="/dashboard/buying-dashboard">
                Dashboard Pembelian
              </Link>
            </button>
            <hr />
            <button className="hover:-translate-y-0.5 transition-all duration-300">
              <Link href="/dashboard/selling-dashboard">
                Dashboard Penjualan
              </Link>
            </button>
            <hr />
            <button
              className={`${
                isLoading ? 'text-gray-300' : 'text-red-600'
              }  hover:-translate-y-0.5 transition-all duration-300`}
              disabled={isLoading || isDisabled}
              onClick={logOutUser}
            >
              Keluar
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SideBarUser;
