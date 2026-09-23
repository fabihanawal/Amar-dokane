import React from 'react';
import { ShoppingCart, Store, User, Search, Phone, Flame, FileCode, CheckCircle2 } from 'lucide-react';
import { BADALGACHHI_UNIONS } from '../types';

interface HeaderProps {
  activeView: 'store' | 'vendor' | 'track' | 'schema';
  setActiveView: (view: 'store' | 'vendor' | 'track' | 'schema') => void;
  cartCount: number;
  openCart: () => void;
  selectedUnion: string;
  setSelectedUnion: (union: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenVendorLogin?: () => void;
  onOpenAdmin?: () => void;
  isAdminLoggedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  cartCount,
  openCart,
  selectedUnion,
  setSelectedUnion,
  searchQuery,
  setSearchQuery,
  onOpenVendorLogin,
  onOpenAdmin,
  isAdminLoggedIn,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-stone-200 shadow-xs">
      {/* Top micro announcement bar */}
      <div className="bg-emerald-700 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-800 text-[11px] font-medium">
              বদলগাছী, নওগাঁ
            </span>
            <span className="hidden sm:inline text-emerald-100">
              উপজেলার ৮টি ইউনিয়নের স্থানীয় দোকান ও তাজা পণ্যের অনলাইন হাট
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href="https://wa.me/8801755383039"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-emerald-200 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>সহায়তা ও হোয়াটসঅ্যাপ: ০১755383039</span>
            </a>
            <span className="hidden md:inline text-emerald-300">|</span>
            <span className="hidden md:inline text-emerald-100 text-[11px]">
              Developed by <strong className="text-white">RSTS-BD</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Logo & Platform Name */}
          <button
            onClick={() => setActiveView('store')}
            className="flex items-center gap-3 text-left focus:outline-hidden group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-emerald-700 transition-colors">
                  আমার দোকান
                </span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  বদলগাছী
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-500 font-medium -mt-0.5">
                হাইপার-লোকাল ই-কমার্স | নওগাঁ
              </p>
            </div>
          </button>

          {/* Search bar (Storefront mode) */}
          {activeView === 'store' && (
            <div className="hidden lg:flex flex-1 max-w-md items-center relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="পণ্য বা দোকানের নাম দিয়ে খুঁজুন (যেমন: ক্ষীরমোহন, চাল, শোপিস)..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-stone-100 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3" />
            </div>
          )}

          {/* Action buttons & View switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Switch Buttons */}
            <div className="bg-stone-100 p-1 rounded-lg flex items-center gap-1 border border-stone-200 text-xs font-medium">
              <button
                onClick={() => setActiveView('store')}
                className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                  activeView === 'store'
                    ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>বাজার</span>
              </button>
              <button
                onClick={() => setActiveView('vendor')}
                className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                  activeView === 'vendor'
                    ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">দোকানদার ড্যাশবোর্ড</span>
                <span className="sm:hidden">দোকানদার</span>
              </button>
            </div>

            {/* Track Order link */}
            <button
              onClick={() => setActiveView('track')}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                activeView === 'track'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
              title="অর্ডার ট্র্যাক করুন"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="hidden md:inline">ট্র্যাক অর্ডার</span>
            </button>

            {/* Firebase & Flutter architecture viewer */}
            <button
              onClick={() => setActiveView('schema')}
              className={`p-2 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                activeView === 'schema'
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
              title="Firebase & Flutter Schema"
            >
              <FileCode className="w-4 h-4 text-amber-600" />
              <span className="hidden xl:inline">ফায়ারবেস স্কিমা ও রুলস</span>
            </button>

            {/* Vendor Email Login Button */}
            {onOpenVendorLogin && (
              <button
                onClick={onOpenVendorLogin}
                className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-stone-200 hover:border-emerald-500 hover:text-emerald-700 transition-colors"
                title="দোকানদার ইমেইল লগইন"
              >
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span>মার্চেন্ট লগইন</span>
              </button>
            )}

            {/* Admin Badge if logged in */}
            {isAdminLoggedIn && onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="px-2.5 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold flex items-center gap-1 shadow-xs hover:bg-rose-700 transition-colors"
                title="অ্যাডমিন প্যানেল"
              >
                <span>এডমিন প্যানেল</span>
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1.5 shadow-sm"
              aria-label="শপিং কার্ট"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-bold">কার্ট</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-stone-900 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search & Union Selector Row */}
        {activeView === 'store' && (
          <div className="mt-3 lg:hidden flex flex-col gap-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="পণ্য বা দোকান খুঁজুন..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-stone-100 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
