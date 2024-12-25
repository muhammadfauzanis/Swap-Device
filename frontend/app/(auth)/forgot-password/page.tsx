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
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { TbMailCheck } from 'react-icons/tb';
import {
  forgotPasswordFormSchema,
  ForgotPasswordFormSchema,
} from '@/lib/formValidator';
import { Auth } from '@/features/Auth';

const ForgotPasswordPage = () => {
  const { forgotPasswordUser, isLoading, isSubmitted } = Auth();

  const form = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = handleSubmit((value) => {
    forgotPasswordUser(value);
  });

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-1 justify-center items-center h-screen">
        <div className="max-w-lg w-full h-auto p-5 md:p-0">
          <Card className=" shadow-lg">
            {!isSubmitted ? (
              <>
                <CardHeader>
                  <CardTitle>Lupa Sandi</CardTitle>
                  <CardDescription>
                    Silahkan masukkan alamat email di bawah. Anda akan menerima
                    link untuk mengganti password anda.
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

                      <Button
                        className="w-full max-w-[70%] xl:w-[60%] m-auto mt-6 flex justify-center items-center "
                        type="submit"
                        disabled={isLoading}
                      >
                        Kirim
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </>
            ) : (
              <div className="flex flex-col justify-center items-center pt-4 pb-4">
                <TbMailCheck size={70} className="text-green-500" />
                <h1 className="font-bold">
                  Permintaan ubah kata sandi berhasil
                </h1>
                <p className="text-sm">
                  Link ubah kata sandi telah dikirim ke email anda.
                </p>
              </div>
            )}
            <CardFooter className="mt-2 flex justify-center items-center">
              <p className="text-sm text-center mb-2">
                Kembali ke{' '}
                <Link href={'/login'} className="font-bold text-black ">
                  Login
                </Link>{' '}
                atau{' '}
                <Link href={'/register'} className="font-bold text-black ">
                  Register
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
