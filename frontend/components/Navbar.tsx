'use client';

import { useState } from 'react';
import { CiHeart, CiSearch } from 'react-icons/ci';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Button } from './ui/button';

const Navbar = () => {
  const [show, setShow] = useState(false);
  return (
    <nav className="flex justify-between items-center w-[90%] m-auto my-3 px-5">
      <h1 className="text-xl font-bold italic cursor-pointer">Swap Device</h1>

      <div className="bg-gray-100 p-3 lg:px-5 rounded-full hidden sm:hidden md:block">
        <ul className="flex gap-x-5 lg:gap-x-9 mx-5 text-md cursor-pointer">
          <li className="hover:font-bold transition ease-in-out duration-500">
            iPhone
          </li>
          <li className="hover:font-bold transition ease-in-out duration-500">
            iPad
          </li>
          <li className="hover:font-bold transition ease-in-out duration-500">
            Mac
          </li>
          <li className="hover:font-bold transition ease-in-out duration-500">
            AirPods
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-x-4 cursor-pointer">
        <CiSearch
          size={25}
          className="hover:text-gray-300 transition-all duration-300"
        />
        <CiHeart
          size={25}
          className="hover:text-gray-300 transition-all duration-300"
        />
        {/* <div className="bg-black  rounded-full hover:bg-gray-100 transition-all duration-300 hidden sm:hidden md:block">
          <h3 className="text-white py-2 px-5 text-md hover:text-black transition-all duration-300">
            Login
          </h3>
        </div> */}
        <Button>Login</Button>

        <RxHamburgerMenu
          size={20}
          className="block sm:block md:hidden hover:text-gray-300 transition-all duration-300"
          onClick={() => setShow(true)}
        />
      </div>

      {/* {show && <div className="bg-red-500">halo</div>} */}
    </nav>
  );
};

export default Navbar;