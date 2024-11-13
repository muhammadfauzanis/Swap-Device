'use client';

import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthSuccessPage = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      Cookies.set('auth_token', token);
      redirect('/');
    }
  }, []);
  return <div></div>;
};

export default AuthSuccessPage;
