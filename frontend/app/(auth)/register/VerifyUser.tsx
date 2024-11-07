'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { AxiosInstance } from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const verifyFormSchema = z.object({
  verificationToken: z.string().min(6, 'Masukkan 6 digit token verifikasi'),
});

type VerifyFormSchema = z.infer<typeof verifyFormSchema>;

interface VerifyUserPageProps {
  userEmail: string;
}

const VerifyUserPage = ({ userEmail }: VerifyUserPageProps) => {
  const [isLoading, setSetIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<VerifyFormSchema>({
    resolver: zodResolver(verifyFormSchema),
    defaultValues: { verificationToken: '' },
  });

  const { handleSubmit, control, reset } = form;

  const verifiedUser = async (token: VerifyFormSchema) => {
    setSetIsLoading(true);
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
        setSetIsLoading(false);
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
    verifiedUser(values);
  });

  return (
    <div className="w-full h-screen ">
      <div className="flex flex-1 justify-center items-center h-screen">
        <Card className=" shadow-lg flex flex-col justify-center items-center p-10">
          <CardHeader>
            <CardTitle className="text-center">
              Masukkan kode verifikasi
            </CardTitle>
            <CardDescription className="text-center">
              Kode verifikasi telah dikirim ke email {userEmail}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center items-center">
            <Form {...form}>
              <form
                className="w-2/3 space-y-6 flex flex-col justify-center items-center"
                onSubmit={onSubmit}
              >
                <FormField
                  control={control}
                  name="verificationToken"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          {...field}
                          pattern={REGEXP_ONLY_DIGITS}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full max-w-[70%] xl:w-[60%] m-auto mt-3"
                  type="submit"
                  disabled={isLoading}
                >
                  Kirim
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyUserPage;
