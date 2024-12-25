import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { AxiosInstance } from '@/lib/axios';
import {
  ForgotPasswordFormSchema,
  LoginFormSchema,
  RegisterFormSchema,
  ResetPasswordFormSchema,
  VerifyFormSchema,
} from '@/lib/formValidator';
import { setToken } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { reset } = useForm();
  const router = useRouter();

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

  //   handle user verification
  const verifyUser = async (token: VerifyFormSchema, userEmail: string) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const verificationToken = parseInt(token.verificationToken);

        const userResponse = await AxiosInstance.post('/auth/verify', {
          email: userEmail,
          verificationToken,
        });

        if (userResponse.status === 201) {
          router.push('/login');
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

  //   handle forgot password user
  const forgotPasswordUser = (userData: ForgotPasswordFormSchema) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const userResponse = await AxiosInstance.post(
          '/auth/forgot-password',
          userData
        );

        if (userResponse.status === 200) {
          setIsSubmitted(true);

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

  //   handle reset password user
  const resetPasswordUser = (
    userData: ResetPasswordFormSchema,
    params: { slug: string }
  ) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const userResponse = await AxiosInstance.post(
          `/auth/reset-password/${params.slug}`,
          userData
        );

        if (userResponse.status === 200) {
          toast({
            description:
              'Atur ulang kata sandi berhasil, anda akan kembali ke halaman login...',
            className: 'font-bold text-green-600',
          });

          setTimeout(() => {
            router.push('/login');
          }, 3000);
        }
      } catch (error: any) {
        setIsLoading(false);
        toast({
          variant: 'default',
          title: error.response.data.message,
          className: 'text-red-500',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        console.log(error?.response);
      }
    }, 3000);
  };

  return {
    registerUser,
    loginUser,
    handleGoogleLogin,
    verifyUser,
    forgotPasswordUser,
    resetPasswordUser,
    isLoading,
    isRegistered,
    isSubmitted,
  };
};
