"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Lock, User } from "lucide-react";
import { useI18n } from "@/components/language-provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminLoginPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const ADMIN_USERNAME = "caffe24";
  const ADMIN_PASSWORD = "Caffe!@#24";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate login delay
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Save to localStorage and redirect
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("adminUsername", username);
        router.push("/admin");
      } else {
        setError(t("admin.invalidCreds"));
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 text-slate-900 flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-16 w-64 h-64 bg-amber-200/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-100 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3">
            <Image src="/image/2.png" alt="Logo" width={48} height={48} />
            <div>
              <p className="text-xl font-bold text-amber-700">{t("admin.area")}</p>
             
            </div>
          </div>
        </div>

        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-50">{t("admin.welcomeBack")}</CardTitle>
            <p className="text-sm text-slate-600 dark:text-slate-300">{t("admin.signInSubtitle")}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t("admin.username")}</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-amber-600" size={18} />
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t("admin.enterUsername")}
                    className="pl-10 h-11 dark:bg-slate-950 dark:border-slate-800"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t("admin.password")}</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-amber-600" size={18} />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("admin.enterPassword")}
                    className="pl-10 h-11 dark:bg-slate-950 dark:border-slate-800"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm font-semibold px-4 py-3 dark:border-red-900/50 dark:bg-red-900/30 dark:text-red-100">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-600 hover:bg-amber-600 text-white font-semibold h-11"
              >
                {loading ? t("admin.signingIn") : t("admin.signIn")}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link href="/" className="text-slate-700 dark:text-slate-200 hover:text-amber-600 font-semibold transition inline-flex items-center gap-2">
            <span className="text-lg">←</span>
            {t("common.backHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}

