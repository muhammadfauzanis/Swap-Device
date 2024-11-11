import { useToast } from '@/hooks/use-toast';
import { AxiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const [isLoading, setIsLoading] = useState(false);
const router = useRouter();
const { toast } = useToast();

const authUser = async (userData: any, url: string) => {
  setIsLoading(true);
  setTimeout(async () => {
    try {
      const userResponse = await AxiosInstance.post(url, userData);

      if (userResponse) {
        router.push('/');
      }
    } catch (error: any) {
      console.log(error.response);
    }
  }, 3000);
};
