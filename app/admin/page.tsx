"use client";

import Link from "next/link";
import Image from "next/image";
import { LogOut, ArrowRight } from "lucide-react";
import { useI18n } from "@/components/language-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const router = useRouter();
  const { t } = useI18n();

  // Redirect to dashboard automatically
  useEffect(() => {
    const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("adminLoggedIn");
    if (isLoggedIn) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminLoggedIn");
      localStorage.removeItem("adminUsername");
      window.location.href = "/admin/login";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-700/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-linear-to-r from-slate-900 to-slate-800 shadow-lg sticky top-0 z-40 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-linear-to-br from-amber-600 to-amber-700 p-2 rounded-xl">
              <Image src="/image/2.png" alt="Logo" width={24} height={24} />
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">{t("admin.brand")}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-500/50 rounded-lg transition font-semibold"
          >
            <LogOut size={20} />
            {t("admin.logout")}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">{t("admin.panelTitle")}</h1>
          <p className="text-slate-300 text-xl">{t("admin.panelSubtitle")}</p>
        </div>

        {/* Menu Manager Card */}
        <div className="max-w-2xl mx-auto">
          <Link href="/admin/dashboard" className="block group">
            <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-12 border-2 border-amber-600/50 hover:border-amber-600 hover:shadow-2xl hover:shadow-amber-600/20 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-linear-to-br from-amber-600 to-amber-700 p-4 rounded-xl group-hover:scale-125 transition-transform">
                  <Image src="/image/2.png" alt="Logo" width={48} height={48} />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white text-center mb-4">{t("admin.menuManagerTitle")}</h2>
              <p className="text-slate-300 text-center mb-6">{t("admin.menuManagerDesc")}</p>
              <div className="flex items-center justify-center gap-2 text-amber-400 font-semibold group-hover:gap-4 transition-all">
                {t("admin.goToDashboard")}
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-amber-600/30 bg-slate-900/80 backdrop-blur relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-slate-300 text-sm">
          <span className="font-semibold text-white">Hama Shad</span>
          <span className="flex items-center gap-2 text-slate-400">
            {t("admin.designedDeveloped")}
            <div className="h-1 w-1 rounded-full bg-amber-600" aria-hidden />
            2026
          </span>
        </div>
      </footer>
    </div>
  );
}
