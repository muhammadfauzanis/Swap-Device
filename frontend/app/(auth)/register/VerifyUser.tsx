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
import { Auth } from '@/features/Auth';
import { verifyFormSchema, VerifyFormSchema } from '@/lib/formValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useForm } from 'react-hook-form';

interface VerifyUserPageProps {
  userEmail: string;
}

const VerifyUserPage = ({ userEmail }: VerifyUserPageProps) => {
  const { verifyUser, isLoading } = Auth();

  const form = useForm<VerifyFormSchema>({
    resolver: zodResolver(verifyFormSchema),
    defaultValues: { verificationToken: '' },
  });

  const { handleSubmit, control } = form;

  const onSubmit = handleSubmit((values) => {
    verifyUser(values, userEmail);
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
