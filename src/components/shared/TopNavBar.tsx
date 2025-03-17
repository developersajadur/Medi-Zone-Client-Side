import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";

const TopNavbar = () => {

    return (
        <div className="bg-blue-500 w-full px-2 md:px-8 lg:px-10 py-2 hidden md:block lg:block">
            <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center text-white">
            <h5 className="flex items-center justify-center"><IoLocationSharp /> Dinajpur, Bangladesh</h5>
            <h5 className="flex items-center justify-center"><FaPhoneAlt /> +8801787448412</h5>
        </div>

        <div className="flex gap-5 items-center">
        <div className="flex gap-5 text-white text-sm font-medium">
                   <Link href='/about-us'>About Us</Link>
                   <Link href='/contact-us'>Contact Us</Link>
                   <Link href='/products'>Medicines</Link>
                   <Link href='/Blogs'>Blogs</Link>
                   {/* <NavLink to='/login'>Login</NavLink> */}
                </div>
        </div>

            </div>
            
        </div>
    );
};

export default TopNavbar;