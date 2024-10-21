import Navbar from '@/components/Navbar';
import SideBarUser from '@/components/SideBarUser';

const UserPage = () => {
  return (
    <div className="w-full min-h-screen">
      <Navbar />

      <div className="mt-32 flex w-[70%] m-auto">
        <SideBarUser />

        <div className="mx-auto">
          <h3 className="text-3xl font-bold pb-10">Informasi Akun</h3>

          <div className="flex gap-x-10">
            <p className="font-bold">Nama Depan</p>
            <p className="">Walter White</p>
          </div>
          <div className="flex gap-x-10">
            <p className="font-bold">Nama Depan</p>
            <p className="">Walter White</p>
          </div>
          <div className="flex gap-x-10">
            <p className="font-bold">Nama Depan</p>
            <p className="">Walter White</p>
          </div>
          <div className="flex gap-x-10">
            <p className="font-bold">Nama Depan</p>
            <p className="">Walter White</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
