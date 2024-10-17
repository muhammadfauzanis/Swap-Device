import { FaUser } from 'react-icons/fa';

const SideBarUser = () => {
  return (
    <div className="p-3 space-y-16">
      <div className="flex items-center gap-x-3">
        <FaUser size={35} />
        <div className="">
          <p className="font-bold">Walter White</p>
          <p className="text-sm">walterwhite@gmail.com</p>
        </div>
      </div>

      <div className="flex flex-col gap-y-3">
        <button className="hover:-translate-y-1 transition-all duration-300">
          Profil Saya
        </button>
        <hr />
        <button className="hover:-translate-y-1 transition-all duration-300">
          Dashboard Pembelian
        </button>
        <hr />
        <button className="hover:-translate-y-1 transition-all duration-300">
          Dashboard Penjualan
        </button>
        <hr />
        <button className="text-red-600  hover:-translate-y-1 transition-all duration-300">
          Keluar
        </button>
        <hr />
      </div>
    </div>
  );
};

export default SideBarUser;
