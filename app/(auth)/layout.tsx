'use client'

import { auth } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import React, { ReactNode , useEffect} from "react";
import { useAuthState } from 'react-firebase-hooks/auth'

const AuthLayout = ({ children }: { children: ReactNode }) => {

  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();


  useEffect(() => {
    if (!loading && user) {
      router.push('/admin')
    }
  }, [user, loading, router])
  

  return <>{children}</>;
};

export default AuthLayout;
