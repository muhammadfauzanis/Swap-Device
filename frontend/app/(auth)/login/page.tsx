'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { AxiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

const loginFormSchema = z.object({
  email: z.string().email('Masukkan email yang valid'),
  password: z
    .string()
    .min(8, 'Kata sandi minimal 8 karakter')
    .max(20, 'Kata sandi maksimal 20 karakter'),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, control, reset } = form;

  const loginUser = async (userData: LoginFormSchema) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const userResponse = await AxiosInstance.post('/auth/login', userData);

        if (userResponse.status === 200) {
          router.push('/');
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

  const handleLoginWithGoogle = async () => {
    try {
      window.location.href = process.env.NEXT_PUBLIC_API_URL + 'auth/google';

      const userResponse = await AxiosInstance('/auth/google/callback');
      console.log(userResponse);
    } catch (error: any) {
      console.log(error.response);
    }
  };

  const onSubmit = handleSubmit((values) => {
    loginUser(values);
  });

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-1 justify-center items-center h-screen">
        <div className="max-w-lg w-full h-auto p-5 md:p-0">
          <Card className=" shadow-lg">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                <span className="pr-1">Belum memiliki akun?</span>
                <Link href={'/register'} className="font-bold text-black">
                  Register di sini
                </Link>
              </CardDescription>
              <div className="pt-4">
                <Button
                  variant={'outline'}
                  className="w-full max-w-[70%] xl:w-[60%] m-auto flex justify-center items-center gap-x-5 shadow-md"
                  onClick={handleLoginWithGoogle}
                >
                  <FcGoogle size={20} />
                  <p>Login With Google</p>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={onSubmit}>
                  <div className="grid w-full items-center gap-4 px-3">
                    <div className="flex flex-col space-y-3">
                      <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="px-1">Email</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Email" />
                            </FormControl>
                            <FormMessage className="px-1" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="px-1">Password</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Password"
                                type="password"
                              />
                            </FormControl>
                            <FormMessage className="px-1" />
                          </FormItem>
                        )}
                      />

                      <Link
                        href={'/forgot-password'}
                        className="font-bold text-black text-sm px-3"
                      >
                        Lupa sandi?
                      </Link>
                    </div>
                  </div>

                  <CardFooter>
                    <Button
                      className="w-full max-w-[70%] xl:w-[60%] m-auto mt-4"
                      type="submit"
                      disabled={isLoading}
                    >
                      Login
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
