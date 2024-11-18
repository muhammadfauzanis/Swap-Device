'use client';

import SideBarUser from '@/components/SideBarUser';
import { AxiosInstance } from '@/lib/axios';
import { getDecodeJwt, getToken } from '@/utils/auth';
import { useEffect, useState } from 'react';

interface UserDataProps {
  name: string;
  email: string;
  userId: number;
  balance: number;
  isVerified: boolean;
}

const UserPage = () => {
  const [userData, setUserData] = useState<UserDataProps | null>(null);
  const token = getToken();
  const decodeData = getDecodeJwt();
  const userId = decodeData?.userId;
  const getUserData = async () => {
    try {
      const userResponse = await AxiosInstance(`/user/user-detail/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (userResponse.data.status === 200) {
        setUserData(userResponse.data.data);
      }
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getUserData();
  }, [userId]);

  return (
    <div className="w-full min-h-screen">
      <div className="mt-32 flex w-[70%] m-auto">
        {userData && (
          <SideBarUser name={userData.name} email={userData.email} />
        )}

        <div className="mx-auto">
          <h3 className="text-3xl font-bold pb-10">Informasi Akun</h3>

          <div className="flex gap-x-10">
            <p className="font-bold">Nama Depan</p>
            <p className="">Walter Wte</p>
          </div>
          <div className="flex gap-x-10">
            <p className="font-bold">Nama Depan</p>
            <p className="">Walter White</p>
          </div>
          <div className="flex gap-x-10">
            <p className="font-bold">Nama Depan</p>
            <p className="">Walter White</p>
          </div>
          <div className="flex gap-x-10">
            <p className="font-bold">Nama Depan</p>
            <p className="">Walter White</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
