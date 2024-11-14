'use client';

import { useEffect, useState } from 'react';
import { CiHeart, CiSearch } from 'react-icons/ci';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoMdClose } from 'react-icons/io';
import { Button } from './ui/button';
import Link from 'next/link';
import { getToken } from '@/utils/auth';

const Navbar = () => {
  const [header, setHeader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const token = getToken(); // get token from Cookie

  const scrollHeader = () => {
    if (window.scrollY >= 20) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  const categories = [
    { name: 'iPhone', link: '/' },
    { name: 'iPad', link: '/' },
    { name: 'Mac', link: '/' },
    { name: 'Watch', link: '/' },
    { name: 'Airpods', link: '/' },
  ];

  useEffect(() => {
    window.addEventListener('scroll', scrollHeader);

    return () => {
      window.removeEventListener('scroll', scrollHeader);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Clean up on unmount
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <nav
      className={`flex fixed top-0 justify-between items-center m-auto w-full px-8 md:px-10 lg:px-20 xl:px-28 py-3 transition-all ${
        isOpen ? 'duration-0' : 'duration-50'
      } ${header ? 'bg-white shadow-md z-50' : ''} ${
        isOpen ? 'left-0 z-40' : ''
      }`}
    >
      <Link href="/" className="text-xl font-bold italic cursor-pointer">
        Swap Device
      </Link>

      <div className="bg-gray-100 p-3 lg:px-5 rounded-full hidden sm:hidden md:block">
        <ul className="flex gap-x-5 lg:gap-x-9 mx-5 text-md cursor-pointer">
          {categories.map((category) => (
            <li
              className="hover:font-bold transition ease-in-out duration-500"
              key={category.name}
            >
              <Link href={category.link}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-x-2 md:gap-x-4 cursor-pointer">
        <CiSearch
          size={25}
          className="hover:text-gray-300 transition-all duration-300 mr-2 md:mr-0"
        />
        <Link href="/wishlist">
          <CiHeart
            size={25}
            className="hover:text-gray-300 transition-all duration-300"
          />
        </Link>

        {token ? (
          <Link href="/user" className="flex items-center gap-x-4">
            <Button className="hidden sm:hidden md:block">
              <p>Profil Saya</p>
            </Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button className="hidden sm:hidden md:block">Login</Button>
          </Link>
        )}

        {!isOpen ? (
          <RxHamburgerMenu
            size={25}
            className="block sm:block md:hidden hover:text-gray-300 transition-all duration-500"
            onClick={() => setIsOpen(true)}
          />
        ) : (
          <IoMdClose
            size={25}
            className="block sm:block md:hidden hover:text-gray-300 transition-all duration-500 z-50"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>

      {isOpen && (
        <div
          className={`absolute w-full h-screen inset-0 md:hidden  bg-white flex flex-col items-center justify-center transition-all duration-300 ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
        >
          <ul className="flex flex-col items-center gap-y-8 text-2xl cursor-pointer">
            {categories.map((category) => (
              <li className="hover:font-bold hover:underline transition ease-in-out duration-1000">
                <Link href={category.link} onClick={() => setIsOpen(false)}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
          {token ? (
            <Link href="/user" onClick={() => setIsOpen(false)}>
              <Button className="mt-8 text-xl p-5">Profil Saya</Button>
            </Link>
          ) : (
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <Button className="mt-8 text-xl p-5">Login</Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
