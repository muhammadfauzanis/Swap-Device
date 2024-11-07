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
import { Input } from '@/components/ui/input';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { AxiosInstance } from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const forgotPasswordFormSchema = z.object({
  email: z.string().email('Masukkan email yang valid'),
});

type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>;

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const { handleSubmit, control, reset } = form;

  const forgotPasswordUser = (userData: ForgotPasswordFormSchema) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const userResponse = await AxiosInstance.post(
          '/auth/forgot-password',
          userData
        );

        if (userResponse.status === 200) {
          toast({
            description: userResponse.data.message,
            className: 'text-green-700 font-bold',
          });

          reset();
          setIsLoading(false);
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

  const onSubmit = handleSubmit((value) => {
    forgotPasswordUser(value);
  });

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-1 justify-center items-center h-screen">
        <div className="max-w-lg w-full h-auto p-5 md:p-0">
          <Card className=" shadow-lg">
            <CardHeader>
              <CardTitle>Lupa Sandi</CardTitle>
              <CardDescription>
                Silahkan masukkan alamat email di bawah. Anda akan menerima link
                untuk mengganti password anda.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={onSubmit} className="px-3">
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

                  <CardFooter className="flex flex-col gap-y-5 mt-3">
                    <Button
                      className="w-full max-w-[70%] xl:w-[60%] m-auto mt-3"
                      type="submit"
                      disabled={isLoading}
                    >
                      Kirim
                    </Button>

                    <p className="text-sm">
                      Kembali ke{' '}
                      <Link href={'/login'} className="font-bold text-black ">
                        Login
                      </Link>{' '}
                      atau{' '}
                      <Link
                        href={'/register'}
                        className="font-bold text-black "
                      >
                        Register
                      </Link>
                    </p>
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

export default ForgotPasswordPage;
