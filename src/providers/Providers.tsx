"use client";

import UserProvider from "@/contexts/UserContext";
import ReduxStoreProvider from "./ReduxStoreProvider";


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <ReduxStoreProvider>{children}</ReduxStoreProvider>
    </UserProvider>
  );
};

export default Providers;
