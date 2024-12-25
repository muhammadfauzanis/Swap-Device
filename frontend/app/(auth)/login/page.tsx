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
import { FcGoogle } from 'react-icons/fc';
import { loginFormSchema, LoginFormSchema } from '@/lib/formValidator';
import { Auth } from '@/features/Auth';

const LoginPage = () => {
  const { loginUser, handleGoogleLogin, isLoading } = Auth();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, control } = form;

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
                  onClick={handleGoogleLogin}
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
