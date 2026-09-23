import React from 'react';
import { Store, Phone, MapPin, MessageCircle, Heart, ShieldCheck, Truck } from 'lucide-react';
import { BADALGACHHI_UNIONS } from '../types';

interface FooterProps {
  onSelectUnion: (union: string) => void;
  onOpenVendor: () => void;
  onOpenSchema: () => void;
  onOpenAdmin: () => void;
  onOpenVendorLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectUnion,
  onOpenVendor,
  onOpenSchema,
  onOpenAdmin,
  onOpenVendorLogin,
}) => {
  const [heartClicks, setHeartClicks] = React.useState(0);
  const clickTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleHeartClick = () => {
    setHeartClicks((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        onOpenAdmin();
        return 0;
      }
      return next;
    });

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    clickTimeoutRef.current = setTimeout(() => {
      setHeartClicks(0);
    }, 2000);
  };
  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-stone-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Platform & Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight">
                  আমার দোকান
                </span>
                <span className="block text-[11px] text-emerald-400 font-medium">
                  বদলগাছী, নওগাঁর স্থানীয় অনলাইন হাট
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              বদলগাছী উপজেলার ৮টি ইউনিয়নের প্রান্তিক উদ্যোক্তা ও দোকানদারদের ডিজিটাল বাজার। স্থানীয় খাঁটি মিষ্টি, হস্তশিল্প, কৃষিপণ্য ও গ্রোসারি সরাসরি ক্রেতার ঘরে পৌঁছে দেওয়ার বিশ্বস্ত মাধ্যম।
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-800/60 text-emerald-300 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>RSTS-BD পরিচালিত নিরাপদ স্থানীয় প্ল্যাটফর্ম</span>
              </div>
            </div>
          </div>

          {/* Col 2: Badalgachhi Unions */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span>বদলগাছীর আওতাধীন ইউনিয়নসমূহ</span>
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-stone-400">
              {BADALGACHHI_UNIONS.map((union) => (
                <button
                  key={union}
                  onClick={() => {
                    onSelectUnion(union);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="text-left hover:text-emerald-400 transition-colors py-1 truncate"
                >
                  📍 {union}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Quick Links & Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              দ্রুত লিংক ও সেবা
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={onOpenVendor}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <span>🏪 দোকানদার ড্যাশবোর্ড ও পণ্য আপলোড</span>
                </button>
              </li>
              {onOpenVendorLogin && (
                <li>
                  <button
                    onClick={onOpenVendorLogin}
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-emerald-400 font-semibold"
                  >
                    <span>🔑 দোকানদার লগইন (ইমেইল দিয়ে)</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={onOpenSchema}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <span>⚡ ফায়ারবেস স্কিমা ও ফ্লাটার কোড</span>
                </button>
              </li>
              <li className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                <span>বদলগাছী ও নওগাঁ জেলায় কুরিয়ার/হোম ডেলিভারি</span>
              </li>
              <li>
                <span>প্ল্যাটফর্ম কমিশন: প্রতি অর্ডারে মাত্র ৫%</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Developed By */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              যোগাযোগ ও হেল্পলাইন
            </h4>

            <div className="space-y-2.5 text-xs text-stone-300">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:01755383039" className="hover:text-white font-bold">
                  01755383039
                </a>
              </p>

              <p className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/8801755383039"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white font-bold text-emerald-400"
                >
                  WhatsApp: 01755383039
                </a>
              </p>

              <p className="text-stone-400 leading-snug">
                বদলগাছী সদর, নওগাঁ - ৬৫৭০, রাজশাহী বিভাগ, বাংলাদেশ।
              </p>
            </div>

            {/* Developed By Badge */}
            <div className="p-3 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-1">
              <span className="text-[11px] text-stone-400 block font-medium">
                কারিগরি তত্ত্বাবধানে ও নির্মাণে:
              </span>
              <p className="text-xs font-bold text-white tracking-wide">
                Developed by <span className="text-emerald-400">RSTS-BD</span> (আরএসটিএস-বিডি)
              </p>
              <p className="text-[10px] text-stone-400">
                Contact: <strong className="text-emerald-300">01755383039</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} আমার দোকান (Amar Dokan) • বদলগাছী, নওগাঁ। সর্বস্বত্ব সংরক্ষিত।
          </p>

          <p className="flex items-center gap-1.5 font-medium text-stone-400 select-none">
            <span>গর্বের সাথে তৈরি</span>
            <button
              type="button"
              onClick={handleHeartClick}
              title="RSTS-BD Admin Access"
              className="p-1 rounded-full hover:bg-stone-800 transition-transform active:scale-90 group relative cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 text-rose-500 fill-rose-500 transition-all ${
                  heartClicks > 0 ? 'scale-125 animate-ping' : 'hover:scale-125'
                }`}
              />
              {heartClicks > 0 && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-lg">
                  {heartClicks}/3
                </span>
              )}
            </button>
            <span>
              Developed by <strong className="text-emerald-400">RSTS-BD</strong> | 01755383039
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};
