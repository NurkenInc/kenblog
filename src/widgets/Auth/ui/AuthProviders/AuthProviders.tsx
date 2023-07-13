'use client';

import {
  ReactNode, useState, useEffect, useCallback,
} from 'react';
import { getProviders, signIn } from 'next-auth/react';
import { Button } from '@/shared/ui/Button/button';
import { Providers, Provider } from '../../model/types/providers.type';
import { LogIn } from 'lucide-react';
import { RotateCcw } from 'lucide-react';
import { toast } from 'react-toastify';
import { Icons } from '@/shared/ui/Icons/icons';

const baseUrl = process.env.NEXTAUTH_URL;

export const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    };

    fetchProviders();
    setIsLoading(false);
  }, []);

  const handleLogin = useCallback((providerId: string) => async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      signIn(providerId);
    } catch (error) {
      toast.error('Something went wrong! Please try again.')
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loading = !providers && isLoading;

  if (isLoading || !providers) {
    return (
      <Button className="w-full gap-2" variant="outline">
        <RotateCcw width={15} height={15} className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </Button>
    )
  }

  return (
    <div>
      {
        providers && Object.values(providers).map((provider: Provider) => (
          <Button className="w-full gap-2" variant="outline" key={provider.id} onClick={handleLogin(provider.id)}>
            <Icons.google className='h-4 w-4 mr-2' />
            {provider.id}
          </Button>
        ))
      }
    </div>
  );
};
