"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useI18n } from "@/components/language-provider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useI18n();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Don't check auth for login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        if (isLoginPage) {
          setIsLoading(false);
          return;
        }

        const isAuthenticated = localStorage.getItem("adminLoggedIn");
        if (isAuthenticated) {
          setIsLoggedIn(true);
        } else {
          router.push("/admin/login");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router, isLoginPage]);

  if (isLoading && !isLoginPage) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">☕</div>
          <p className="text-gray-600 dark:text-slate-300 font-semibold">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn && !isLoginPage) {
    return null;
  }

  return <>{children}</>;
}
