"use client";

import UserProvider from "@/contexts/UserContext";


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
        {children}
      {/* <StoreProvider>{children}</StoreProvider> */}
    </UserProvider>
  );
};

export default Providers;
