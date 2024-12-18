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
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { AxiosInstance } from '@/lib/axios';
import VerifyUserPage from './VerifyUser';

const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Nama tidak boleh kosong')
      .max(50, 'Nama maksimal 50 karakter'),
    email: z.string().email('Masukkan email yang valid'),
    phoneNumber: z
      .string()
      .min(6, 'Masukkan nomor telepon yang valid')
      .max(15, 'Masukkan nomor telepon yang valid')
      .regex(
        /^(?:\+?[1-9][0-9]{0,2})?[08|09][0-9]{7,11}$/,
        'Masukkan nomor telepon yang valid'
      ),
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

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

const RegisterPage = () => {
  const { toast } = useToast();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, SetIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      repassword: '',
    },
  });

  const { handleSubmit, control, reset } = form;

  // function to handle post request for signup user
  const createUser = async (userData: RegisterFormSchema) => {
    SetIsLoading(true);
    setTimeout(async () => {
      try {
        const userResponse = await AxiosInstance.post('/auth/signup', userData);

        if (userResponse.status === 201 || userResponse.status === 200) {
          setIsRegistered(true);
          reset();
        }
      } catch (error: any) {
        SetIsLoading(false);
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

  const onSubmit = handleSubmit((values) => {
    // call createUser function and throw values
    createUser(values);
    setEmail(values.email);
  });

  return !isRegistered ? (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-1 justify-center items-center h-screen">
        <div className="max-w-lg w-full h-auto p-5 md:p-0">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>
                <span className="pr-1">Sudah memiliki akun?</span>

                <Link href={'/login'} className="font-bold text-black">
                  Login di sini
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={onSubmit} className="px-3 space-y-2">
                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="px-1">Nama</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Nama Anda" />
                        </FormControl>
                        <FormMessage className="px-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="px-1">Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="Email" />
                        </FormControl>
                        <FormMessage className="px-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="px-1">Nomor Telepon</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Nomor Telepon" />
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
                        <FormLabel className="px-1">Kata Sandi</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Kata Sandi"
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
                        <FormLabel className="px-1">
                          Ulangi Kata Sandi
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Ulangi Kata Sandi"
                          />
                        </FormControl>
                        <FormMessage className="px-1" />
                      </FormItem>
                    )}
                  />
                  <CardFooter className="flex flex-col">
                    <Button
                      className="w-full max-w-[70%] xl:w-[60%] m-auto my-3"
                      type="submit"
                      disabled={isLoading}
                    >
                      Register
                    </Button>
                    <p className="text-xs text-gray-500">
                      Your data will be protected and will not be shared
                    </p>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  ) : (
    <VerifyUserPage userEmail={email} />
  );
};

export default RegisterPage;
