import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <p>Oops! Page Not Found</p>
        <h1 className="text-7xl font-extrabold">404</h1>
        <p>Mohon maaf halaman yang anda cari tidak ditemukan</p>
        <Link href="/" className="pt-5">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
