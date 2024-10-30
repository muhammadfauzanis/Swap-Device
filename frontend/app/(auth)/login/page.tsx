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

const LoginPage = () => {
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
              <form>
                <div className="grid w-full items-center gap-4 px-3">
                  <div className="flex flex-col space-y-3">
                    <Button
                      variant={'outline'}
                      className="w-full max-w-[70%] xl:w-[60%] m-auto flex justify-center items-center gap-x-5 shadow-md"
                    >
                      <FcGoogle size={20} />
                      <p>Login With Google</p>
                    </Button>

                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Email" />

                    <Label htmlFor="password">Kata Sandi</Label>
                    <Input id="password" placeholder="Kata Sandi" />

                    <Link
                      href={'/forgot-password'}
                      className="font-bold text-black text-sm px-3"
                    >
                      Lupa sandi?
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full max-w-[70%] xl:w-[60%] m-auto mt-3">
                Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
