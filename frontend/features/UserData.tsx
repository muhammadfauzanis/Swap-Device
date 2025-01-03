import { getDecodeJwt, getToken, removeToken } from '@/utils/auth';
import { AxiosInstance } from '../lib/axios';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useForm } from 'react-hook-form';

interface UserDataProps {
  userId: number;
  name: string;
  email: string;
  // password: string;
  phone_number: string;
  balance: number;
  isVerified: boolean;
}

export const UserData = () => {
  const [userData, setUserData] = useState<UserDataProps | null>(null);
  const token = getToken();
  const decodeData = getDecodeJwt();
  const userId = decodeData?.userId;
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { toast } = useToast();

  // function to get user data from db
  const fetchUserData = async () => {
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

  // function to call API update data user
  const updateUserData = (userData: {
    name?: string;
    phoneNumber?: string;
  }) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const userResponse = await AxiosInstance.put(
          `/user/update-user/${userId}`,
          userData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (userResponse.status === 200) {
          toast({
            description: 'Update data berhasil',
            className: 'font-bold text-green-600',
          });

          // update data in sidebar with newest data
          setUserData((prevData) => {
            if (!prevData) return prevData;

            return {
              ...prevData,
              name: userData.name ?? prevData.name,
              phone_number: userData.phoneNumber ?? prevData.phone_number,
            };
          });

          // update button condition
          setIsLoading(false);
          setIsDisabled(true);
        }
      } catch (error: any) {
        setIsLoading(false);
        toast({
          variant: 'default',
          title: error.response.data.message,
          className: 'text-red-500',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        console.log(error.response);
      }
    }, 3000);
  };

  // handle logout user
  const logOutUser = () => {
    setIsLoading(true);
    setIsDisabled(true);
    setTimeout(async () => {
      try {
        const userResponse = await AxiosInstance.post('/auth/logout');

        if (userResponse.status === 200) {
          removeToken();
          window.location.href = '/';
        }
      } catch (error) {
        console.log(error);
      }
    }, 3000);
  };

  const { watch } = useForm();

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const formValues = watch();

    // Cek apakah ada perubahan pada form dibandingkan dengan nilai asli userData
    if (
      formValues.name !== userData?.name ||
      formValues.phoneNumber !== userData?.phone_number
    ) {
      setIsDisabled(false);
    }
  }, [watch, userData]);

  return {
    data: userData,
    updateUserData,
    logOutUser,
    isLoading,
    isDisabled,
  };
};
