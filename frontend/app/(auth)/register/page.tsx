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
import axios from 'axios';

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
  const createUsers = async (data: RegisterFormSchema) => {
    try {
      const userData = {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        repassword: data.repassword,
      };
      const userResponse = await axios.post(
        'http://localhost:5000/api/auth/signup',
        userData
      );

      return userResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error details:', error.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const onSubmit = handleSubmit((values) => {
    // call createUsers function and throw values
    createUsers(values);

    reset();
  });

  return (
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
  );
};

export default RegisterPage;
