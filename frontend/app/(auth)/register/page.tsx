import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

const RegisterPage = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 justify-center items-center h-screen">
        <div className="max-w-lg w-full h-auto p-5 md:p-0">
          <Card className=" shadow-lg">
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>
                <p>
                  Sudah memiliki akun?{' '}
                  <Link href={'/login'} className="font-bold text-black">
                    Login di sini
                  </Link>
                </p>{' '}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4 px-3">
                  <div className="flex flex-col space-y-3">
                    <Label htmlFor="name">Nama</Label>
                    <Input id="name" placeholder="Nama Anda" />

                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Email" />

                    <Label htmlFor="nomor">Nomor Telepon</Label>
                    <Input id="nomor" placeholder="Nomor Telepon" />

                    <Label htmlFor="password">Kata Sandi</Label>
                    <Input id="password" placeholder="Kata Sandi" />

                    <Label htmlFor="repassword">Ulang Kata Sandi</Label>
                    <Input id="repassword" placeholder="Ulangi Kata Sandi" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full max-w-[70%] xl:w-[60%] m-auto my-3">
                Register
              </Button>
              <p className="text-xs text-gray-500">
                Your data will be protected and will not be shared
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
