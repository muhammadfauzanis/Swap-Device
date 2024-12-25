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
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import VerifyUserPage from './VerifyUser';
import { registerFormSchema, RegisterFormSchema } from '@/lib/formValidator';
import { Auth } from '@/features/Auth';

const RegisterPage = () => {
  const { registerUser, isRegistered, isLoading } = Auth();
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

  const { handleSubmit, control } = form;

  const onSubmit = handleSubmit((values) => {
    // call createUser function and throw values
    registerUser(values);
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
