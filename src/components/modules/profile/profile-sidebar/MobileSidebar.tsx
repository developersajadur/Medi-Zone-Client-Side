import Sidebar from "./Sidebar";

const MobileSidebar = () => {
  return (
    <div className=" w-full bg-gray-50 z-50 overflow-y-auto">
      <Sidebar className="w-full md:hidden" />
    </div>
  );
};

export default MobileSidebar;
