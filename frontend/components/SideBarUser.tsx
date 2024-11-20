'use client';

import { AxiosInstance } from '@/lib/axios';
import { removeToken } from '@/utils/auth';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Card, CardContent } from './ui/card';

interface SideBarDataProps {
  name: string;
  email: string;
}

const SideBarUser = ({ name, email }: SideBarDataProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const logOutUser = () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const userResponse = await AxiosInstance.post('/auth/logout');

        if (userResponse.status === 200) {
          removeToken();
          window.location.href = '/';
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }, 3000);
  };

  return (
    <Card className="max-h-fit p-4">
      <CardContent>
        <div className="p-2 space-y-16">
          <div className="flex items-center gap-x-2 xl:gap-x-4 w-fit">
            <FaUser size={35} />
            <div className="">
              <p className="font-bold">{name}</p>
              <p className="text-sm">{email}</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-3">
            <button className="hover:-translate-y-0.5 transition-all duration-300">
              Akun Saya
            </button>
            <hr />
            <button className="hover:-translate-y-0.5 transition-all duration-300">
              Dashboard Pembelian
            </button>
            <hr />
            <button className="hover:-translate-y-0.5 transition-all duration-300">
              Dashboard Penjualan
            </button>
            <hr />
            <button
              className="text-red-600  hover:-translate-y-0.5 transition-all duration-300"
              disabled={isLoading}
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
