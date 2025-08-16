"use client";

import LoadingPage from "@/components/feedback/LoadingPage";
import { auth } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/admin");
      } else {
        setCanRender(true);
      }
    }
  }, [user, loading, router]);

  if (loading || !canRender) return <LoadingPage />;

  return <>{children}</>;
};

export default AuthLayout;
