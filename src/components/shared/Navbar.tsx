"use client";

import { Input } from "@/components/ui/input";
import { MdShoppingCart } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { FaUser, FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { getToken } from "@/services/AuthService";
import { Button } from "../ui/button";

const Navbar = () => {
  const user = useUser();
  const [searchData, setSearchData] = useState("");
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getToken();
      setToken(storedToken || null);
    };
    fetchToken();
  }, []);

  const handleClose = () => setOpen(false);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/bicycles/?search=${searchData}`);
  };

  return (
    <nav className="bg-[#2B97A4] w-full px-2 md:px-8 lg:px-10 py-4 md:py-5 lg:py-6">
      {/* Large Device Navbar */}
      <div className="hidden md:hidden lg:block">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-white text-4xl font-semibold">
            RideVibes
          </Link>

          <form className="w-7/12 relative" onSubmit={handleSearchSubmit}>
            <FaSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B97A4]"
              size={18}
            />
            <Input
              type="text"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              placeholder="Search Here"
              className="pl-10 bg-white border-secondary focus:ring-0 focus:outline-none text-[#2B97A4] placeholder-[#2B97A4]"
            />
          </form>

          <div className="flex items-center gap-8 text-white text-2xl font-medium">
            {token && user?.user?.role !== "admin" && (
              <>
                <Link href="/profile">
                  <FaUser />
                </Link>
                <Link href="/shopping-cart">
                  <MdShoppingCart />
                </Link>
              </>
            )}

            {!token ? (
              <Link href="/login">
                <Button className="bg-white text-[#2B97A4] hover:bg-white hover:text-[#2B97A4]">
                  Login
                </Button>
              </Link>
            ) : null}

            {token && user?.user?.role === "admin" && (
              <Link href="/admin">
                <Button className="bg-white text-[#2B97A4] hover:bg-white hover:text-[#2B97A4]">
                  Admin Panel
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Small and Medium Device Navbar */}
      <div className="block md:block lg:hidden">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-white text-xl md:text-2xl font-semibold">
            RideVibes
          </Link>

          <form className="w-6/12 relative" onSubmit={handleSearchSubmit}>
            <FaSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B97A4]"
              size={18}
            />
            <Input
              type="text"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              placeholder="Search Here"
              className="pl-10 bg-white border-secondary focus:ring-0 focus:outline-none text-[#2B97A4] placeholder-[#2B97A4]"
            />
          </form>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button onClick={() => setOpen(true)}>
                <IoMenu className="text-white font-medium" size={28} />
              </button>
            </SheetTrigger>
            <SheetContent className="h-full w-[80%] md:w-[60%] p-5">
              <ScrollArea className="h-full">
                <SheetHeader>
                  <Link href="/" onClick={handleClose} className="mb-5 text-3xl font-semibold text-white">
                    RideVibes
                  </Link>
                </SheetHeader>
                <div className="flex flex-col gap-5 text-white text-lg font-medium">
                  {token && user?.user?.role !== "admin" && (
                    <>
                      <Link href="/profile" onClick={handleClose}>
                        Profile
                      </Link>
                      <Link href="/shopping-cart" onClick={handleClose}>
                        Cart
                      </Link>
                    </>
                  )}

                  <Link href="/bicycles" onClick={handleClose}>
                    Bicycles
                  </Link>
                  <Link href="/about-us" onClick={handleClose}>
                    About Us
                  </Link>
                  <Link href="/contact-us" onClick={handleClose}>
                    Contact Us
                  </Link>
                  <Link href="/blogs" onClick={handleClose}>
                    Blogs
                  </Link>

                  {!token && (
                    <Link href="/login" onClick={handleClose} className="w-full">
                      <Button className="bg-white text-[#2B97A4] w-full">
                        Login
                      </Button>
                    </Link>
                  )}

                  {token && user?.user?.role === "admin" && (
                    <Link href="/admin" onClick={handleClose}>
                      <Button className="bg-white text-[#2B97A4] w-full">
                        Admin Panel
                      </Button>
                    </Link>
                  )}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
