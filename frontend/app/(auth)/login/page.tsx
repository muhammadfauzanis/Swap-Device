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

const loginFormSchema = z.object({
  email: z.string().email('Masukkan email yang valid'),
  password: z
    .string()
    .min(8, 'Kata sandi minimal 8 karakter')
    .max(20, 'Kata sandi maksimal 20 karakter'),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

const LoginPage = () => {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, control, reset } = form;

  const onSubmit = handleSubmit((values) => {
    console.log(values);

    reset();
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
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={onSubmit}>
                  <div className="grid w-full items-center gap-4 px-3">
                    <div className="flex flex-col space-y-3">
                      <Button
                        variant={'outline'}
                        className="w-full max-w-[70%] xl:w-[60%] m-auto flex justify-center items-center gap-x-5 shadow-md"
                      >
                        <FcGoogle size={20} />
                        <p>Login With Google</p>
                      </Button>

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
                              <Input {...field} placeholder="Password" />
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
