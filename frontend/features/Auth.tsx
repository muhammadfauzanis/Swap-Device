import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { AxiosInstance } from '@/lib/axios';
import { LoginFormSchema, RegisterFormSchema } from '@/lib/formValidator';
import { setToken } from '@/utils/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const { toast } = useToast();
  const { reset } = useForm();

  // function to handle post request for signup user
  const registerUser = async (userData: RegisterFormSchema) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const userResponse = await AxiosInstance.post('/auth/signup', userData);

        if (userResponse.status === 201 || userResponse.status === 200) {
          setIsRegistered(true);
          reset();
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

  //   handle user login
  const loginUser = async (userData: LoginFormSchema) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const userResponse = await AxiosInstance.post('/auth/login', userData);

        if (userResponse.status === 200) {
          window.location.href = '/';
          setToken(userResponse.data.data.token);
          reset();
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

  //   handle login with google
  const handleGoogleLogin = async () => {
    try {
      window.location.href = process.env.NEXT_PUBLIC_API_URL + 'auth/google';
    } catch (error) {
      console.log(error);
    }
  };

  return {
    registerUser,
    loginUser,
    handleGoogleLogin,
    isLoading,
    isRegistered,
  };
};
