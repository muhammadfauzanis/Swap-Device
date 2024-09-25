import { FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <div className="mt-10 w-[90%] m-auto ">
      <hr className="mb-10" />
      <div className="grid grid-cols-4 justify-items-center px-3 gap-x-7 ,n">
        <div>
          <div className="">
            <h3 className="font-bold">Tentang Kami</h3>
            <p className="text-justify text-sm text-gray-400 pt-3 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At atque
              voluptates obcaecati porro itaque nam dolores quis numquam
              veritatis odit.
            </p>
          </div>
          <div className="pt-3">
            <h3 className="font-bold">Our Social Media</h3>
            <div className="pt-3 text-gray-400 flex justify-start gap-x-5">
              <FaInstagram size={25} />
              <FaYoutube size={25} />
              <FaXTwitter size={25} />
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-bold">Belanja</h3>
          <ul className="flex flex-col text-sm text-gray-400 pt-3 gap-y-3">
            <a href="" className="hover:underline">
              iPhone
            </a>
            <a href="" className="hover:underline">
              iPad
            </a>
            <a href="" className="hover:underline">
              Mac
            </a>
            <a href="" className="hover:underline">
              Airpods
            </a>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Layanan</h3>
          <ul className="flex flex-col text-sm text-gray-400 pt-3 gap-y-3">
            <a href="" className="hover:underline">
              Pembelian
            </a>
            <a href="" className="hover:underline">
              Penjualan
            </a>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Kebijakan</h3>
          <ul className="flex flex-col text-sm text-gray-400 pt-3 gap-y-3">
            <a href="" className="hover:underline">
              Kebijakan pengiriman
            </a>
            <a href="" className="hover:underline">
              Kebijakan penjualan
            </a>
            <a href="" className="hover:underline">
              Akun saya
            </a>
          </ul>
        </div>
      </div>
      <hr className="mb-5 mt-12" />
      <h3 className="text-sm flex justify-end text-gray-400 pb-5">
        Copyright &copy; 2024 Swap Device. All rights reserved
      </h3>
    </div>
  );
};

export default Footer;
