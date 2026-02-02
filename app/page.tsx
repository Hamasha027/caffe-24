'use client';
import Link from "next/link";
import { Search, Coffee, CupSoda, Layers, Moon, Sun, Facebook, X, Phone, MapPin, Clock, IceCream, Droplets, Candy, Flame, Wine } from "lucide-react";
import { useMemo, useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useI18n } from "@/components/language-provider";
import { LanguageButton } from "@/components/language-fab";
import Image from "next/image";

interface MenuItem {
  id: number;
  title: string;
  titleKurdish?: string;
  price: number;
  imageUrl: string;
  description?: string;
  descriptionKurdish?: string;
  category?: string;
}

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const { t, lang } = useI18n();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const cardsTopRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    // Set dark as default theme on first load
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, [setTheme]);

  const currencyLabel = lang === "ckb" ? "دینار" : "IQD";

  const openItem = (item: MenuItem) => {
    cardsTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setSelectedItem(item);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/menu");
        const data = await response.json();
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error("Failed to fetch menu items:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const categories = useMemo(
    () => [
      { id: "all", name: t("categories.all"), icon: Layers },
      { id: "icecoffee", name: t("categories.icecoffee"), icon: IceCream },
      { id: "mexican", name: t("categories.mexican"), icon: Wine },
      { id: "freshdrinks", name: t("categories.freshdrinks"), icon: CupSoda },
      { id: "milkshake", name: t("categories.milkshake"), icon: IceCream },
      { id: "syrup", name: t("categories.syrup"), icon: Droplets },
      { id: "sweets", name: t("categories.sweets"), icon: Candy },
      { id: "hotdrinks", name: t("categories.hotdrinks"), icon: Flame },
      { id: "coffee", name: t("categories.coffee"), icon: Coffee },
    ],
    [t]
  );

  const filteredItems = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return items.filter((item) => {
      const category = item.category || "coffee";
      const matchCategory = selectedCategory === "all" || category === selectedCategory;
      if (!matchCategory) return false;

      if (!q) return true;

      const title = (item.title ?? "").toLowerCase();
      const titleKurdish = (item.titleKurdish ?? "").toLowerCase();
      const desc = (item.description ?? "").toLowerCase();
      const descKurdish = (item.descriptionKurdish ?? "").toLowerCase();
      
      return title.includes(q) || desc.includes(q) || titleKurdish.includes(q) || descKurdish.includes(q);
    });
  }, [items, selectedCategory, searchTerm]);

  const formatCategoryName = (category: string) => {
    // Format category names with proper spacing
    const formatted = category
      .replace(/icecoffee/gi, 'Ice Coffee')
      .replace(/hotdrinks/gi, 'Hot Drinks')
      .replace(/freshdrinks/gi, 'Fresh Drinks')
      .replace(/milkshake/gi, 'Milk Shake');
    
    // Capitalize first letter if not already formatted
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const getCategoryBadgeColor = (category: string) => {
    const colors: Record<string, { light: string; dark: string }> = {
      icecoffee: { light: "bg-cyan-100 text-cyan-800", dark: "dark:bg-cyan-900/40 dark:text-cyan-100" },
      mexican: { light: "bg-yellow-100 text-yellow-800", dark: "dark:bg-yellow-900/40 dark:text-yellow-100" },
      freshdrinks: { light: "bg-blue-100 text-blue-800", dark: "dark:bg-blue-900/40 dark:text-blue-100" },
      milkshake: { light: "bg-pink-100 text-pink-800", dark: "dark:bg-pink-900/40 dark:text-pink-100" },
      syrup: { light: "bg-purple-100 text-purple-800", dark: "dark:bg-purple-900/40 dark:text-purple-100" },
      sweets: { light: "bg-rose-100 text-rose-800", dark: "dark:bg-rose-900/40 dark:text-rose-100" },
      hotdrinks: { light: "bg-orange-100 text-orange-800", dark: "dark:bg-orange-900/40 dark:text-orange-100" },
      coffee: { light: "bg-amber-100 text-amber-800", dark: "dark:bg-amber-900/40 dark:text-amber-100" },
      drinks: { light: "bg-blue-100 text-blue-800", dark: "dark:bg-blue-900/40 dark:text-blue-100" },
    };
    const categoryColors = colors[category] || { light: "bg-gray-100 text-gray-800", dark: "dark:bg-gray-900/40 dark:text-gray-100" };
    return `${categoryColors.light} ${categoryColors.dark}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100">
      <nav className="bg-white/90 dark:bg-slate-900/80 sm:backdrop-blur shadow-sm border-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src="/image/2.png" alt="Logo" width={48} height={48} />
          </div>
          <div className="flex items-center gap-2">
            <LanguageButton className="inline-flex items-center gap-2 px-2.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-[12px] font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition" />
            <button
              onClick={() => setShowAbout(true)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              aria-label="Contact us"
              title="Contact information"
            >
              <Phone size={16} />
              <span className="hidden sm:inline">Contact</span>
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              aria-label={t("theme.toggle")}
            >
              {mounted && (theme === "dark" ? <Sun size={16} /> : <Moon size={16} />)}
              <span>{mounted && (theme === "dark" ? t("theme.light") : t("theme.dark"))}</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-5">
        {!loading && items.length > 0 ? (
          <>
            {/* Header Section */}
            <div className="mb-8 text-center animate-in fade-in slide-in-from-top-6 duration-700 ease-out">
             
              <h1 className="title-underline text-3xl md:text-4xl lg:text-5xl font-bold mb-2 animate-in fade-in slide-in-from-top-8 duration-1000 ease-out" style={{ animationDelay: '100ms' }}>
                {lang === "ckb" ? t("home.titleKurdish") : t("home.title")}
              </h1>
              <p className="text-gray-600 dark:text-slate-300 text-sm animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out" style={{ animationDelay: '300ms' }}>{t("home.subtitle")}</p>
            </div>

            {/* Category Filter */}
            <div className="mb-6 -mx-4 sm:mx-0">
              <div className="overflow-x-auto scrollbar-hide px-4 sm:px-0">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-max sm:min-w-0 sm:justify-center border-b border-gray-200 dark:border-slate-800 pb-2">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const active = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 px-3 py-2 sm:pb-2 sm:pt-0 rounded-lg sm:rounded-none text-xs sm:text-base lg:text-lg font-semibold transition whitespace-nowrap border-b-2 sm:border-b-2 ${
                          active
                            ? "border-orange-500 text-orange-600 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/30 sm:bg-transparent"
                            : "border-transparent text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 sm:hover:bg-transparent hover:border-gray-300 dark:hover:border-slate-600"
                        }`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-[10px] sm:text-xs lg:text-base">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-8 flex flex-col items-center">
              <div className="relative w-full max-w-2xl">
                <Search className="absolute left-3 top-3 text-gray-400 dark:text-slate-500" size={20} />
                <Input
                  type="text"
                  placeholder={t("home.searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-sm bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-slate-100 placeholder:text-gray-500 dark:placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Menu Items Grid */}
            {filteredItems.length > 0 ? (
              <div ref={cardsTopRef} className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
                    onClick={() => openItem(item)}
                  >
                    {/* Image */}
                    <img
                      className="rounded-t-xl w-full h-36 sm:h-44 md:h-52 object-cover hover:scale-105 transition-transform duration-300 bg-gray-200 dark:bg-slate-700"
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.display = "none";
                      }}
                    />
                    
                    {/* Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge className={getCategoryBadgeColor(item.category || "drinks")}>
                        {formatCategoryName(item.category || "drinks")}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="relative pr-2 pl-2 p-4 sm:p-5">
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 rounded-b-xl  dark:from-slate-950/35 dark:via-slate-950/10" />

                      <div className="relative z-10">
                        <p className="text-gray-700 dark:text-slate-300 line-clamp-2 text-xs sm:text-sm leading-relaxed mb-3" dir={lang === "ckb" ? "rtl" : "ltr"}>
                          {lang === "ckb" ? (item.descriptionKurdish || item.description || "No description available") : (item.description || "No description available")}
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <h5 className={`flex-1 min-w-0 text-sm sm:text-base font-semibold tracking-wide text-gray-900 dark:text-slate-50 truncate`} dir={lang === "ckb" ? "rtl" : "ltr"}>
                            {lang === "ckb" ? (item.titleKurdish || item.title) : item.title}
                          </h5>
                          <span className="rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-100 text-xs sm:text-sm font-bold whitespace-nowrap px-0.5 shrink-0">
                            {item.price?.toLocaleString()} {currencyLabel}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">{t("home.noItemsFound")}</p>
              </div>
            )}
          </>
        ) : loading ? (
          <div className="py-16 space-y-10">
            <div className="max-w-3xl mx-auto space-y-3 animate-pulse">
              <div className="h-10 w-48 mx-auto rounded-full bg-gray-200 dark:bg-slate-800" />
              <div className="h-4 w-64 mx-auto rounded-full bg-gray-200 dark:bg-slate-800" />
              <div className="flex flex-wrap justify-center gap-3 pt-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-8 w-20 rounded-full bg-gray-200 dark:bg-slate-800"
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden animate-pulse"
                >
                  <div className="h-32 sm:h-40 md:h-44 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800" />
                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="h-3 w-3/4 rounded-full bg-gray-200 dark:bg-slate-800" />
                    <div className="h-3 w-1/2 rounded-full bg-gray-200 dark:bg-slate-800" />
                    <div className="flex items-center justify-between pt-2">
                      <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-slate-800" />
                      <div className="h-6 w-12 rounded-full bg-gray-200 dark:bg-slate-800" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-32">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("home.noMenuYet")}</h2>
            <p className="text-gray-600 mb-8">{t("home.startByAdding")}</p>
            <Link href="/admin/login">
              <button className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition">
                {t("home.goAdmin")}
              </button>
            </Link>
          </div>
        )}
      </main>

      {/* Item Detail Modal */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent showCloseButton={false} className="max-w-5xl p-0 overflow-hidden">
          <div className="sr-only">Item details</div>
          {selectedItem && (
            <>
              <DialogClose className="absolute top-3 right-3 z-50 rounded-full bg-black/45 hover:bg-black/60 text-white backdrop-blur-sm p-2">
                <X size={18} />
                <span className="sr-only">{t("common.close")}</span>
              </DialogClose>

              {/* Image */}
              <div className="relative w-full h-[45vh] sm:h-[55vh] overflow-hidden bg-gray-50 dark:bg-slate-800">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="w-full h-full object-contain bg-gray-200 dark:bg-slate-700"
                  decoding="async"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = "none";
                  }}
                />
              </div>

              {/* Content */}
              <div className="px-6 py-4 max-h-[40vh] overflow-y-auto">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 mb-3">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-50 leading-tight wrap-break-word" dir={lang === "ckb" ? "rtl" : "ltr"}>
                    {lang === "ckb" ? (selectedItem.titleKurdish || selectedItem.title) : selectedItem.title}
                  </h2>
                  <span className="text-base font-bold text-orange-600 whitespace-nowrap justify-self-end row-span-2 self-center">
                    {selectedItem.price?.toLocaleString()} {currencyLabel}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-slate-300 text-sm mb-4" dir={lang === "ckb" ? "rtl" : "ltr"}>
                  {lang === "ckb" ? (selectedItem.descriptionKurdish || selectedItem.description) : selectedItem.description}
                </p>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="w-full py-2.5 px-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition"
                >
                  {t("common.close")}
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact Information Modal */}
      <Dialog open={showAbout} onOpenChange={setShowAbout}>
        <DialogContent showCloseButton={false} className="max-w-xs p-0 overflow-hidden w-80">
          <DialogClose className="absolute top-3 right-3 z-50 rounded-full bg-black/45 hover:bg-black/60 text-white backdrop-blur-sm p-2">
            <X size={18} />
          </DialogClose>

<div className="bg-linear-to-br from-[#6F4E37] to-[#3C2A21] dark:from-[#3C2A21] dark:to-[#1B1212]">
            {/* Header */}
            <div className="px-5 py-6 text-center text-white">
              <div className="flex justify-center mb-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
             <Image src="/image/2.png" alt="Logo" width={58} height={58} />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-1">
                {lang === "ckb" ? t("home.titleKurdish") : t("home.title")}
              </h2>
           
            </div>

            {/* Cards Container */}
            <div className="bg-white dark:bg-slate-800 rounded-t-3xl p-5 space-y-3">
              {/* Phone Numbers Card */}
              <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-600">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-blue-500 rounded-full p-1.5">
                    <Phone size={16} className="text-white" />
                  </div>
                  
                  <p className="text-xs font-bold text-blue-900 dark:text-blue-100 uppercase tracking-wide">
                    {lang === "en" ? "Phone Numbers" : "ژمارە تەلەفۆن"}
                  </p>
                </div>
                
                {/* Phone */}
                <div>
                  <button
                    onClick={() => window.location.href = `tel:${t("contact.phone1")}`}
                    className="text-sm font-bold text-blue-900 dark:text-blue-100 hover:text-blue-600 dark:hover:text-blue-300 transition break-all text-left hover:underline"
                  >
                    {t("contact.phone1")}
                  </button>
                </div>
              </div>

              {/* Social Media Card */}
              <div className="bg-linear-to-br from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/30 rounded-lg p-2 border border-pink-200 dark:border-pink-600">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="rounded-full p-1.5">
                    <Image src="/image/halmat.jpeg" alt="Social Media" width={36} height={36} className="rounded-full" />
                  </div>
                  <p className="text-[9px] font-bold text-pink-900 dark:text-pink-100 uppercase tracking-wide">
                    {lang === "en" ? "Social Media" : "سۆشیال میدیا"}
                  </p>
                </div>
                
                {/* Social Links */}
                <div className="flex gap-1.5">
                  {/* Snapchat */}
                  <a
                    href={t("contact.snapchat")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-yellow-400 hover:bg-yellow-500 rounded-md p-1.5 flex flex-col items-center gap-0.5 transition-all hover:scale-105"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.149-.052-.238.015-.225.18-.45.42-.494 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"/>
                    </svg>
                    <span className="text-[8px] font-bold text-white">Snap</span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={t("contact.whatsapp")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-500 hover:bg-green-600 rounded-md p-1.5 flex flex-col items-center gap-0.5 transition-all hover:scale-105"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span className="text-[8px] font-bold text-white">WhatsApp</span>
                  </a>

                  {/* Viber */}
                  <a
                    href={t("contact.viber")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-purple-600 hover:bg-purple-700 rounded-md p-1.5 flex flex-col items-center gap-0.5 transition-all hover:scale-105"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white">
                      <path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.177.693 6.698.623 9.82c-.06 3.11-.13 8.95 5.5 10.541v2.42s-.038.97.602 1.17c.79.25 1.24-.499 1.99-1.299l1.4-1.58c3.85.32 6.8-.419 7.14-.529.78-.25 5.181-.811 5.901-6.652.74-6.031-.36-9.831-2.34-11.551l-.01-.002c-.6-.55-3-2.3-8.37-2.32 0 0-.396-.025-1.038-.016zm.067 1.697c.545-.003.88.02.88.02 4.54.01 6.711 1.38 7.221 1.84 1.67 1.429 2.528 4.856 1.9 9.892-.6 4.88-4.17 5.19-4.83 5.4-.28.09-2.88.73-6.152.52 0 0-2.439 2.941-3.199 3.701-.12.13-.26.17-.35.15-.13-.03-.17-.19-.16-.41l.02-4.019c-4.771-1.32-4.491-6.302-4.441-8.902.06-2.6.55-4.732 2-6.222 1.99-1.8 5.681-2.053 7.511-1.941l-.4-.029zm.358 2.021a.362.362 0 0 0-.34.363c0 .2.161.363.361.363 2.932.01 5.3 2.379 5.311 5.311 0 .2.162.362.361.362s.36-.162.36-.362c-.01-3.333-2.7-6.027-6.032-6.037h-.021zm-3.041.94a.956.956 0 0 0-.6.231c-.32.26-.63.56-.91.9-.28.35-.17.47-.05.7.45.88 1.51 2.699 2.8 4.13s3.25 2.35 4.131 2.8c.23.12.35.23.71-.05.33-.28.63-.59.89-.91.26-.32.32-.44.23-.7-.21-.53-1.201-1.59-1.721-2.05-.46-.4-.84-.14-1.091.03-.25.16-.37.24-.52.24s-.27-.06-.44-.17c-.51-.31-1.141-.8-1.64-1.32-.51-.51-.99-1.14-1.311-1.65-.09-.17-.14-.29-.14-.44s.08-.27.24-.52c.17-.25.43-.631.03-1.091-.46-.52-1.52-1.511-2.05-1.721a.597.597 0 0 0-.21-.039l-.01-.002zm3.121 1.47a.36.36 0 0 0-.34.362c0 .2.162.362.361.362 2.133 0 3.871 1.738 3.871 3.871 0 .2.161.361.361.361s.36-.161.36-.361c0-2.535-2.058-4.595-4.592-4.595h-.021zm0 1.674a.36.36 0 0 0-.34.362c0 .2.161.362.36.362 1.345 0 2.44 1.096 2.44 2.441 0 .2.162.361.362.361s.361-.161.361-.361c0-1.744-1.42-3.164-3.162-3.164l-.021-.001z"/>
                    </svg>
                    <span className="text-[8px] font-bold text-white">Viber</span>
                  </a>
                </div>
              </div>

              {/* Hours Card */}
              <div className="bg-linear-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 rounded-xl p-4 border-2 border-amber-200 dark:border-amber-600">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-amber-500 rounded-full p-1.5">
                    <Clock size={16} className="text-white" />
                  </div>
                  <p className="text-xs font-bold text-amber-900 dark:text-amber-100 uppercase tracking-wide">
                    {lang === "en" ? "Opening Hours" : " کراوەیە "}
                  </p>
                </div>
                <p className="text-sm font-bold text-amber-900 dark:text-amber-100">
                  {t("contact.hours")}
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-200 mt-0.5">
                  {t("contact.daily")}
                </p>
              </div>

              {/* Location Card */}
              <div className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl p-4 border-2 border-purple-200 dark:border-purple-600">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-purple-500 rounded-full p-1.5">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <p className="text-xs font-bold text-purple-900 dark:text-purple-100 uppercase tracking-wide">
                    {lang === "en" ? "Location" : "ناونیشان"}
                  </p>
                </div>
                <p className="text-xs text-purple-900 dark:text-purple-100 font-semibold leading-snug">
                  {t("contact.location")}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowAbout(false)}
                className="w-full py-2.5 bg-linear-to-r from-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-700 hover:from-gray-500 hover:to-gray-600 dark:hover:from-gray-700 dark:hover:to-gray-800 text-white font-bold rounded-lg transition text-xs"
              >
                {lang === "en" ? "Close" : "داخستن"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="mt-20 pb-1">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
            <p className="text-gray-500 dark:text-slate-400 text-sm font-light tracking-wide">Designed and Developed by</p>
          <a 
            href="https://www.facebook.com/mahamad.khdir.104" 
            target="_blank" 
            rel="noreferrer"
            className="font-semibold text-gray-800 dark:text-slate-100 underline flex items-center gap-2 hover:text-orange-500 dark:hover:text-orange-300 transition"
          >
               <Facebook size={16} />
               Hama Sha
            </a>
        </div>
      </footer>
    </div>
  );
}

