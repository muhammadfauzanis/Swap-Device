import { z } from 'zod';

// login form validator
export const loginFormSchema = z.object({
  email: z.string().email('Masukkan email yang valid'),
  password: z
    .string()
    .min(8, 'Kata sandi minimal 8 karakter')
    .max(20, 'Kata sandi maksimal 20 karakter'),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

// register form validator
export const registerFormSchema = z
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

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
