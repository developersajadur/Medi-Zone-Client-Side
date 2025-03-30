"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { LuX } from "react-icons/lu";
import { IoChevronForward } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Sidebar from "./profile-sidebar/Sidebar";
import MobileSidebar from "./profile-sidebar/MobileSidebar";
import { profileSettingItems } from "./profile-sidebar/profile-sidebar-items";

const ProfileMainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const activeTitle = useMemo(() => {
    const currentItem = profileSettingItems.find((item) => item.href === pathname);
    return currentItem ? currentItem.title : "Setting";
  }, [pathname]);

  // Optimize window resize event listener
  const checkIfMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, [checkIfMobile]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      {isMobile && (
        <header className="w-full flex items-center justify-between p-4 border-b bg-white">
          <span className="font-medium">{activeTitle}</span>

          <div className="p-2 rounded-md hover:bg-gray-100 cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <LuX className="w-6 h-6" /> : <IoChevronForward className="w-6 h-6" />}
          </div>
        </header>
      )}

      {/* Mobile Sidebar */}
      {isMobile && isMobileMenuOpen && (
        <MobileSidebar />
      )}

      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar />}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">{children}</div>
    </div>
  );
};

export default ProfileMainLayout;
