import React, { useState } from 'react';
import { Shop, Product, Order } from '../types';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Store,
  Phone,
  Mail,
  MapPin,
  Lock,
  LogOut,
  X,
  AlertTriangle,
  TrendingUp,
  Package,
  ShoppingBag,
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdminLoggedIn: boolean;
  onLoginAdmin: (email: string, pass: string) => { success: boolean; message?: string };
  onLogoutAdmin: () => void;
  shops: Shop[];
  products: Product[];
  orders: Order[];
  onApproveShop: (shopId: string) => void;
  onRejectShop: (shopId: string) => void;
  onDeleteShop: (shopId: string) => void;
  onSelectShopForDashboard?: (shopId: string) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  isAdminLoggedIn,
  onLoginAdmin,
  onLogoutAdmin,
  shops,
  products,
  orders,
  onApproveShop,
  onRejectShop,
  onDeleteShop,
  onSelectShopForDashboard,
}) => {
  // Login form state
  const [adminEmail, setAdminEmail] = useState('rstsbd@gmail.com');
  const [adminPassword, setAdminPassword] = useState('rstsbd1234');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'pending' | 'active' | 'overview'>('pending');
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = onLoginAdmin(adminEmail, adminPassword);
    if (!res.success) {
      setLoginError(res.message || 'ভুল ইমেইল বা পাসওয়ার্ড!');
    }
  };

  const handleApprove = (shop: Shop) => {
    onApproveShop(shop.shopId);
    setActionSuccessMsg(`"${shop.shopName}" সফলভাবে অনুমোদিত হয়েছে! এখন দোকানদার ${shop.email} দিয়ে লগইন করতে পারবে।`);
    setTimeout(() => setActionSuccessMsg(''), 4000);
  };

  const handleReject = (shop: Shop) => {
    if (confirm(`আপনি কি নিশ্চিতভাবে "${shop.shopName}" এর আবেদনটি বাতিল করতে চান?`)) {
      onRejectShop(shop.shopId);
      setActionSuccessMsg(`"${shop.shopName}" এর আবেদন বাতিল করা হয়েছে।`);
      setTimeout(() => setActionSuccessMsg(''), 3000);
    }
  };

  const pendingShops = shops.filter((s) => s.status === 'Pending');
  const activeShops = shops.filter((s) => s.status === 'Active');

  const totalPlatformEarnings = orders
    .filter((o) => o.orderStatus !== 'Cancelled')
    .reduce((sum, o) => sum + (o.platformCommission || 0), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 relative my-6 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-600 text-white shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  অ্যাডমিন কন্ট্রোল প্যানেল
                </h3>
                <span className="bg-rose-950 border border-rose-700 text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  RSTS-BD
                </span>
              </div>
              <p className="text-xs text-stone-400">
                বদলগাছী, নওগাঁ • আমার দোকান প্ল্যাটফর্ম পরিচালনা
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={onLogoutAdmin}
                className="px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                title="লগআউট"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">লগআউট</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {!isAdminLoggedIn ? (
            /* Admin Login Screen */
            <div className="max-w-md mx-auto py-4 space-y-5">
              <div className="text-center space-y-1.5">
                <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto border border-rose-100 shadow-xs">
                  <Lock className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-stone-900">
                  অ্যাডমিন লগইন করুন
                </h4>
                <p className="text-xs text-stone-500">
                  নিরাপদ এডমিন প্যানেলে প্রবেশ করতে নির্ধারিত ইমেইল ও পাসওয়ার্ড প্রদান করুন
                </p>
              </div>

              {loginError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    অ্যাডমিন ইমেইল এড্রেস
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="rstsbd@gmail.com"
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-rose-500 font-mono text-stone-900"
                    />
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    পাসওয়ার্ড
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="rstsbd1234"
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-rose-500 font-mono text-stone-900"
                    />
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] space-y-1">
                  <p className="font-bold">🔐 এডমিন এক্সেস ক্রেডেনশিয়াল:</p>
                  <p>ইমেইল: <code className="bg-white px-1.5 py-0.5 rounded font-bold text-rose-700">rstsbd@gmail.com</code></p>
                  <p>পাসওয়ার্ড: <code className="bg-white px-1.5 py-0.5 rounded font-bold text-rose-700">rstsbd1234</code></p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>অ্যাডমিন প্যানেলে প্রবেশ করুন</span>
                </button>
              </form>
            </div>
          ) : (
            /* Admin Panel Dashboard */
            <div className="space-y-5">
              {actionSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded-xl flex items-center gap-2 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">{actionSuccessMsg}</span>
                </div>
              )}

              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-2">
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'pending'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>নতুন দোকান আবেদন</span>
                  {pendingShops.length > 0 && (
                    <span className="bg-amber-400 text-stone-900 text-[10px] px-1.5 py-0.2 rounded-full font-black animate-pulse">
                      {pendingShops.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('active')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'active'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>অনুমোদিত দোকানসমূহ ({activeShops.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'overview'
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>প্ল্যাটফর্ম ওভারভিউ ও কমিশন</span>
                </button>
              </div>

              {/* TAB 1: PENDING SHOP APPLICATIONS */}
              {activeTab === 'pending' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">
                        দোকানদারদের নতুন নিবন্ধনের আবেদন
                      </h4>
                      <p className="text-xs text-stone-500">
                        আবেদন অনুমোদন (Confirm) করলে দোকানদার তার ইমেইল দিয়ে লগইন করতে পারবে
                      </p>
                    </div>
                    <span className="text-xs bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full font-bold">
                      পেন্ডিং: {pendingShops.length} টি
                    </span>
                  </div>

                  {pendingShops.length === 0 ? (
                    <div className="p-8 bg-stone-50 rounded-2xl border border-stone-200 text-center space-y-2 text-stone-500">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                      <p className="text-xs font-bold text-stone-700">
                        কোনো নতুন আবেদন অপেক্ষমাণ নেই
                      </p>
                      <p className="text-[11px] text-stone-400">
                        নতুন দোকানদার ফরম পূরণ করে আবেদন করলে এখানে দেখতে পাবেন।
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pendingShops.map((shop) => (
                        <div
                          key={shop.shopId}
                          className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-amber-200 shadow-xs space-y-3 hover:border-amber-300 transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-stone-100 pb-3">
                            <div className="flex items-start gap-3">
                              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0">
                                <Store className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h5 className="text-sm font-bold text-stone-900">
                                    {shop.shopName}
                                  </h5>
                                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                    {shop.category}
                                  </span>
                                </div>
                                <p className="text-xs text-stone-600 mt-0.5">
                                  মালিক: <strong className="text-stone-900">{shop.ownerName}</strong>
                                </p>
                              </div>
                            </div>

                            <span className="text-[11px] text-stone-400 self-start sm:self-auto">
                              আবেদনের সময়: {new Date(shop.createdAt).toLocaleDateString('bn-BD')}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-stone-50 p-3 rounded-xl">
                            <p className="flex items-center gap-1.5 text-stone-700">
                              <Phone className="w-3.5 h-3.5 text-emerald-600" />
                              <span>মোবাইল: </span>
                              <a href={`tel:${shop.phone}`} className="font-bold text-emerald-700 hover:underline">
                                {shop.phone}
                              </a>
                            </p>
                            <p className="flex items-center gap-1.5 text-stone-700">
                              <Mail className="w-3.5 h-3.5 text-blue-600" />
                              <span>লগইন ইমেইল: </span>
                              <strong className="font-mono text-stone-900">{shop.email}</strong>
                            </p>
                            <p className="flex items-center gap-1.5 text-stone-700 sm:col-span-2">
                              <MapPin className="w-3.5 h-3.5 text-rose-600" />
                              <span>ঠিকানা: </span>
                              <span className="text-stone-800">
                                {shop.address ? `${shop.address}, ` : ''}{shop.union}, বদলগাছী, নওগাঁ
                              </span>
                            </p>
                            {shop.description && (
                              <p className="text-[11px] text-stone-500 italic sm:col-span-2 pt-1 border-t border-stone-200">
                                "{shop.description}"
                              </p>
                            )}
                          </div>

                          {/* Approval Actions */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                            <a
                              href={`https://wa.me/88${shop.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
                            >
                              <span>হোয়াটসঅ্যাপে যোগাযোগ</span>
                            </a>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleReject(shop)}
                                className="px-3 py-1.5 bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-700 border border-stone-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                              >
                                <XCircle className="w-3.5 h-3.5 text-rose-500" />
                                <span>বাতিল</span>
                              </button>
                              <button
                                onClick={() => handleApprove(shop)}
                                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center gap-1"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>আবেদন অনুমোদন করুন (Approve)</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: ACTIVE SHOPS */}
              {activeTab === 'active' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">
                        অনুমোদিত ও সক্রিয় দোকানসমূহ
                      </h4>
                      <p className="text-xs text-stone-500">
                        বদলগাছীর বর্তমান সক্রিয় মার্চেন্ট তালিকা
                      </p>
                    </div>
                    <span className="text-xs bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-full font-bold">
                      মোট: {activeShops.length} টি
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {activeShops.map((shop) => {
                      const shopProductCount = products.filter((p) => p.shopId === shop.shopId).length;
                      return (
                        <div
                          key={shop.shopId}
                          className="bg-white p-3.5 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
                              <Store className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h5 className="text-xs font-bold text-stone-900">
                                  {shop.shopName}
                                </h5>
                                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
                                  {shop.union}
                                </span>
                              </div>
                              <p className="text-[11px] text-stone-500">
                                মালিক: {shop.ownerName} • 📞 {shop.phone} • ✉️ <span className="font-mono text-stone-700">{shop.email}</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-2 border-t sm:border-t-0 pt-2 sm:pt-0">
                            <span className="text-[11px] text-stone-500 bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-200">
                              পণ্য: <strong>{shopProductCount}</strong> টি
                            </span>
                            {onSelectShopForDashboard && (
                              <button
                                onClick={() => {
                                  onSelectShopForDashboard(shop.shopId);
                                  onClose();
                                }}
                                className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 transition-colors"
                              >
                                ড্যাশবোর্ড দেখুন ➔
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: OVERVIEW & REVENUE */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1">
                      <span className="text-stone-500 text-xs">মোট দোকান</span>
                      <p className="text-xl font-black text-stone-900">{shops.length}</p>
                      <p className="text-[10px] text-emerald-700 font-semibold">{activeShops.length} টি সক্রিয়</p>
                    </div>

                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1">
                      <span className="text-stone-500 text-xs">অপেক্ষমাণ আবেদন</span>
                      <p className="text-xl font-black text-amber-600">{pendingShops.length}</p>
                      <p className="text-[10px] text-stone-500">যাচাইয়ের অপেক্ষায়</p>
                    </div>

                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1">
                      <span className="text-stone-500 text-xs">মোট পণ্য</span>
                      <p className="text-xl font-black text-stone-900">{products.length}</p>
                      <p className="text-[10px] text-stone-500">৮টি ইউনিয়নে বিক্রয়যোগ্য</p>
                    </div>

                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1">
                      <span className="text-stone-500 text-xs">প্ল্যাটফর্ম কমিশন (৫%)</span>
                      <p className="text-xl font-black text-emerald-700">৳{totalPlatformEarnings}</p>
                      <p className="text-[10px] text-stone-500">RSTS-BD মোট রাজস্ব</p>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-950 text-emerald-200 rounded-2xl border border-emerald-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">
                        RSTS-BD টেকনিক্যাল হেল্পলাইন ও সাপোর্ট
                      </span>
                      <span className="bg-emerald-800 text-white px-2 py-0.5 rounded text-[10px]">
                        Admin: rstsbd@gmail.com
                      </span>
                    </div>
                    <p className="text-emerald-300">
                      বদলগাছী উপজেলার ক্ষুদ্র ও মাঝারি ব্যবসায়ীদের ডিজিটালাইজেশন প্ল্যাটফর্ম "আমার দোকান"। নতুন মার্চেন্ট ভেরিফিকেশন ও যেকোনো কারিগরি প্রয়োজনে যোগাযোগ করুন:
                    </p>
                    <p className="font-bold text-white text-sm">
                      📞 01755383039 (কল ও WhatsApp)
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
