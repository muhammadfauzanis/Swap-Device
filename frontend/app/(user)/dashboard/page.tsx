'use client';

import Footer from '@/components/Footer';
import SideBarUser from '@/components/SideBarUser';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AxiosInstance } from '@/lib/axios';
import { getDecodeJwt, getToken } from '@/utils/auth';
import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';

interface UserDataProps {
  name: string;
  email: string;
  userId: number;
  phone_number: string;
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
    <div className="w-full h-screen">
      <div className="mt-16 lg:mt-32 grid grid-rows-2 grid-cols-1 items-center lg:items-start md:grid-rows-2 md:grid-cols-1 lg:grid-rows-1 lg:grid-cols-3 justify-self-center gap-x-5 xl:gap-x-10 w-[90%] xl:w-[80%]">
        {userData && (
          <SideBarUser name={userData.name} email={userData.email} />
        )}

        <Card className="lg:col-span-2 p-4">
          <CardContent>
            <h3 className="text-2xl font-bold">Informasi Akun</h3>
            <hr className="pb-10 mt-4" />

            <div className="flex flex-col md:flex-row items-center justify-center gap-x-10 p-2">
              <div className="bg-gray-200 p-8 rounded-full w-fit m-auto">
                <FaUser className="text-[80px] md:text-[120px] xl:text-[160px]" />
              </div>

              <div className="w-[80%] md:w-[70%] m-auto">
                <div className="space-y-2 pb-2">
                  <Label className="px-1">Email</Label>
                  <Input
                    defaultValue={userData?.email}
                    readOnly
                    className="bg-gray-200"
                  />
                </div>

                <div className="space-y-2 pb-2">
                  <Label className="px-1">Nama</Label>
                  <Input defaultValue={userData?.name} />
                </div>

                <div className="space-y-2 pb-2">
                  <Label className="px-1">Nomor Telepon</Label>
                  <Input defaultValue={userData?.phone_number} />
                </div>

                <Button className="w-full mt-8">Update Profile</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default UserPage;
