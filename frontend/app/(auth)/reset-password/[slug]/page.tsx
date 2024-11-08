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

const resetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Kata sandi minimal 8 karakter')
      .max(20, 'Kata sandi maksimal 20 karakter'),
    repassword: z.string(),
  })
  .refine((data) => data.password === data.repassword, {
    message: 'Kata sandi konfirmasi tidak cocok dengan kata sandi anda',
    path: ['repassword'],
  });

type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;

interface ResetPasswordPageProps {
  params: { slug: string };
}

const ResetPasswordPage = (props: ResetPasswordPageProps) => {
  const { params } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: '',
      repassword: '',
    },
  });

  const { handleSubmit, control, reset } = form;

  const resetPasswordUser = (userData: ResetPasswordFormSchema) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const userResponse = await AxiosInstance.post(
          `/auth/reset-password/${params.slug}`,
          userData
        );

        if (userResponse.status === 200) {
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

  const onSubmit = handleSubmit((values) => {
    resetPasswordUser(values);
  });

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-1 justify-center items-center h-screen">
        <div className="max-w-lg w-full h-auto p-5 md:p-0">
          <Card className=" shadow-lg">
            <CardHeader>
              <CardTitle>Atur Ulang Kata Sandi</CardTitle>
              <CardDescription>
                Silahkan masukkan kata sandi baru anda.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={onSubmit} className="px-3 space-y-3">
                  <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="px-1">Kata Sandi</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Kata Sandi"
                            type="password"
                          />
                        </FormControl>
                        <FormMessage className="px-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="repassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="px-1">Ulang Kata Sandi</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Ulang Kata Sandi"
                            type="password"
                          />
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

export default ResetPasswordPage;
