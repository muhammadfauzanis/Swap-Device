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
import { FcGoogle } from 'react-icons/fc';

const ForgotPasswordPage = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex flex-1 justify-center items-center h-screen">
        <div className="max-w-lg w-full h-auto p-5 md:p-0">
          <Card className=" shadow-lg">
            <CardHeader>
              <CardTitle>Lupa Sandi</CardTitle>
              <CardDescription>
                Silahkan masukkan alamat email di bawah. Anda akan menerima link
                untuk mengganti password anda.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4 px-3">
                  <div className="flex flex-col space-y-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Email" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-y-5">
              <Button className="w-full max-w-[70%] xl:w-[60%] m-auto mt-3">
                Kirim
              </Button>

              <p className="text-sm">
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
