import Link from "next/link";
import { IoExitOutline, IoChevronForward } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { profileSettingItems } from "./profile-sidebar-items";


interface SidebarProps {
  className?: string; 
}

const Sidebar = ({ className = "" }: SidebarProps) => { 
  const pathname = usePathname();

  return (
    <div className={`w-80 bg-gray-50 border-r py-6 px-4 space-y-1 ${className}`}>
      {profileSettingItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={`flex items-center gap-3 py-3 px-4 rounded-lg text-sm transition-colors hover:bg-[#EFF6FF] hover:text-[#2563EB] ${
            pathname === item.href ? "bg-[#EFF6FF] text-[#2563EB]" : "text-[#374151]"
          }`}
        >
          <span className="text-[#374151]">{item.icon}</span>
          <span>{item.title}</span>
          <span className="ml-auto text-[#374151]">
            <IoChevronForward className="w-4 h-4" />
          </span>
        </Link>
      ))}
      <button className="flex items-center gap-3 py-3 px-4 rounded-lg text-sm text-red-500 w-full mt-4 hover:bg-gray-100 transition-colors">
        <IoExitOutline className="w-5 h-5" />
        <span>Sign Out</span>
      </button>
    </div>
  );
};

export default Sidebar;
