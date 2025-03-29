import { IoMdNotificationsOutline } from "react-icons/io";
import { LuUser } from "react-icons/lu";
import { MdOutlineSecurity } from "react-icons/md";

export const profileSettingItems = [
    { title: "Personal Information", icon: <LuUser className="w-5 h-5" />, href: "/profile/personal-info" },
    { title: "Notifications", icon: <IoMdNotificationsOutline className="w-5 h-5" />, href: "/profile/notifications" },
    { title: "Privacy & Security", icon: <MdOutlineSecurity className="w-5 h-5" />, href: "/profile/privacy_and_security" },
];