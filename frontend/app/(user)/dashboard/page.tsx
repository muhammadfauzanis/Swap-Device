'use client';

import Footer from '@/components/Footer';
import SideBarUser from '@/components/SideBarUser';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserData } from '@/features/UserData';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser } from 'react-icons/fa';
import { z } from 'zod';

const updateDataFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Nama tidak boleh kosong')
    .max(50, 'Nama maksimal 50 karakter'),
  phoneNumber: z
    .string()
    .min(6, 'Masukkan nomor telepon yang valid')
    .max(15, 'Masukkan nomor telepon yang valid')
    .regex(
      /^(?:\+?[1-9][0-9]{0,2})?[08|09][0-9]{7,11}$/,
      'Masukkan nomor telepon yang valid'
    ),
  //   password: z
  //     .string()
  //     .min(8, 'Kata sandi minimal 8 karakter')
  //     .max(20, 'Kata sandi maksimal 20 karakter'),
  //   repassword: z.string(),
  // })
  // .refine((data) => data.password === data.repassword, {
  //   message: 'Kata sandi konfirmasi tidak cocok dengan kata sandi anda',
  //   path: ['repassword'],
});

type UpdateDataFormSchema = z.infer<typeof updateDataFormSchema>;

const UserPage = () => {
  const { data: userData, updateUserData, isLoading, isDisabled } = UserData();

  // function to validate form update data
  const form = useForm<UpdateDataFormSchema>({
    resolver: zodResolver(updateDataFormSchema),
    defaultValues: {
      name: userData?.name,
      phoneNumber: userData?.phone_number,
      // password: userData?.password,
      // repassword: '',
    },
  });

  const { handleSubmit, control, reset } = form;

  const onSubmit = handleSubmit((values) => {
    const updatedData: { name?: string; phoneNumber?: string } = {};

    if (values.name !== userData?.name) {
      updatedData.name = values.name;
    }

    if (values.phoneNumber !== userData?.phone_number) {
      updatedData.phoneNumber = values.phoneNumber;
    }

    if (Object.keys(updatedData).length > 0) {
      updateUserData(updatedData);
    }
  });

  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name,
        phoneNumber: userData.phone_number,
      });
    }
  }, [userData, form]);

  return (
    <div className="w-full h-screen">
      <div className="mt-16 lg:mt-32 grid grid-rows-2 grid-cols-1 items-center lg:items-start md:grid-rows-2 md:grid-cols-1 lg:grid-rows-1 lg:grid-cols-3 justify-self-center gap-x-5 xl:gap-x-10 w-[90%] xl:w-[80%]">
        <SideBarUser />

        <Card className="lg:col-span-2 p-4">
          <CardContent>
            <h3 className="text-2xl font-bold">Informasi Akun</h3>
            <hr className="pb-10 mt-4" />

            <div className="flex flex-col md:flex-row items-center justify-center gap-x-10 p-2">
              <div className="bg-gray-200 p-8 rounded-full w-fit m-auto">
                <FaUser className="text-[80px] md:text-[120px] xl:text-[160px]" />
              </div>

              <div className="w-[80%] md:w-[70%] m-auto">
                <div className="space-y-2 pb-2">
                  <Label className="px-1">Email</Label>
                  <Input
                    defaultValue={userData?.email}
                    readOnly
                    className="bg-gray-200"
                  />
                </div>

                <Form {...form}>
                  <form onSubmit={onSubmit} className="space-y-2">
                    <FormField
                      control={control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="px-1">Nama</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value ?? userData?.name ?? ''}
                            />
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
                            <Input
                              {...field}
                              value={
                                field.value ?? userData?.phone_number ?? ''
                              }
                            />
                          </FormControl>
                          <FormMessage className="px-1" />
                        </FormItem>
                      )}
                    />
                    <div className="pt-4">
                      <Button
                        className="w-full"
                        type="submit"
                        disabled={isDisabled || isLoading}
                      >
                        Update Profile
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default UserPage;
