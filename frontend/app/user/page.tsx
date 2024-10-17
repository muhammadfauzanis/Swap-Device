import Navbar from '@/components/Navbar';
import SideBarUser from '@/components/SideBarUser';

const UserPage = () => {
  return (
    <div className="w-full min-h-screen">
      <Navbar />

      <div className="mt-32 flex gap-x-5 w-[90%] m-auto">
        <SideBarUser />

        <div className="p-3">
          <p>asdasdsa</p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
