
import React, { useState } from 'react';
import { User as UserIcon, Settings, CheckCircle2, Bell, Music2, LogOut } from 'lucide-react';

interface HomeHeaderProps {
    greeting: string;
    formattedDate: string;
    onLogout: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ greeting, formattedDate, onLogout }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <header className="sticky top-0 z-40 px-6 md:px-8 lg:px-10 pt-6 md:pt-8 lg:pt-10 pb-4 md:pb-6 flex items-start justify-between transition-all duration-500 bg-gradient-to-b from-black via-black/60 to-transparent backdrop-blur-xl border-b border-white/5">
            <div className="flex flex-col gap-1 md:gap-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] font-['Inter'] uppercase leading-none">
                    {greeting}
                </h1>
                <p className="text-xs md:text-sm lg:text-base font-bold text-zinc-500 tracking-tight font-['Roboto_Flex']">
                    {formattedDate}
                </p>
            </div>

            <div className="relative">
                <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="relative w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl cursor-pointer hover:scale-110 active:scale-95 transition-all z-50 ring-2 ring-red-500/20"
                >
                    <img src="https://i.pravatar.cc/150?u=ye_user" alt="Profile" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-black rounded-full" />
                </button>

                {showProfileMenu && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
                        <div className="absolute right-0 mt-4 w-80 bg-gradient-to-b from-zinc-900/98 to-black/98 backdrop-blur-3xl border border-white/20 rounded-[32px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.1)] z-50 animate-in fade-in slide-in-from-top-4 duration-300 overflow-hidden">
                            {/* User Info Header */}
                            <div className="p-6 bg-gradient-to-br from-red-600/20 via-purple-600/10 to-transparent border-b border-white/10">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 shadow-xl">
                                        <img src="https://i.pravatar.cc/150?u=ye_user" alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="text-lg font-black text-white font-['Inter'] tracking-tight">Liam Beats</p>
                                            <div className="px-2 py-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                                                <span className="text-[8px] font-black text-black uppercase tracking-wider">PRO</span>
                                            </div>
                                        </div>
                                        <p className="text-[10px] font-bold text-zinc-400 tracking-wide font-['Roboto_Flex']">liam@yebeats.io</p>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-2 mt-4">
                                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
                                        <p className="text-2xl font-black text-white font-['Inter']">2.4K</p>
                                        <p className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.3em] font-['Roboto_Flex']">Songs</p>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
                                        <p className="text-2xl font-black text-white font-['Inter']">142h</p>
                                        <p className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.3em] font-['Roboto_Flex']">Listened</p>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="p-3">
                                {/* Account Section */}
                                <div className="mb-2">
                                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.4em] px-3 py-2 font-['Roboto_Flex']">Account</p>
                                    <button className="w-full flex items-center gap-3 px-3 py-3 text-zinc-300 hover:text-white hover:bg-white/10 rounded-[18px] transition-all group">
                                        <div className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-all">
                                            <UserIcon size={16} className="text-zinc-400 group-hover:text-white" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <p className="text-sm font-black font-['Roboto_Flex'] tracking-tight">Profile Settings</p>
                                            <p className="text-[9px] text-zinc-600 font-['Roboto_Flex']">Manage your account</p>
                                        </div>
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-3 py-3 text-zinc-300 hover:text-white hover:bg-white/10 rounded-[18px] transition-all group">
                                        <div className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-all">
                                            <Settings size={16} className="text-zinc-400 group-hover:text-white" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <p className="text-sm font-black font-['Roboto_Flex'] tracking-tight">Preferences</p>
                                            <p className="text-[9px] text-zinc-600 font-['Roboto_Flex']">Customize your experience</p>
                                        </div>
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-3 py-3 text-zinc-300 hover:text-white hover:bg-white/10 rounded-[18px] transition-all group">
                                        <div className="w-9 h-9 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center group-hover:from-yellow-500/30 group-hover:to-orange-500/30 transition-all border border-yellow-500/30">
                                            <CheckCircle2 size={16} className="text-yellow-500" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <p className="text-sm font-black font-['Roboto_Flex'] tracking-tight">Subscription</p>
                                            <p className="text-[9px] text-zinc-600 font-['Roboto_Flex']">Manage your plan</p>
                                        </div>
                                    </button>
                                </div>

                                <div className="h-px bg-white/10 my-2" />

                                {/* Settings Section */}
                                <div className="mb-2">
                                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.4em] px-3 py-2 font-['Roboto_Flex']">Settings</p>
                                    <button className="w-full flex items-center gap-3 px-3 py-3 text-zinc-300 hover:text-white hover:bg-white/10 rounded-[18px] transition-all group">
                                        <div className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-all">
                                            <Bell size={16} className="text-zinc-400 group-hover:text-white" />
                                        </div>
                                        <span className="text-sm font-black font-['Roboto_Flex'] tracking-tight">Notifications</span>
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-3 py-3 text-zinc-300 hover:text-white hover:bg-white/10 rounded-[18px] transition-all group">
                                        <div className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-all">
                                            <Music2 size={16} className="text-zinc-400 group-hover:text-white" />
                                        </div>
                                        <span className="text-sm font-black font-['Roboto_Flex'] tracking-tight">Audio Quality</span>
                                    </button>
                                </div>

                                <div className="h-px bg-white/10 my-2" />

                                {/* Logout */}
                                <button
                                    onClick={() => { onLogout(); setShowProfileMenu(false); }}
                                    className="w-full flex items-center gap-3 px-3 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-[18px] transition-all group"
                                >
                                    <div className="w-9 h-9 bg-red-500/10 rounded-full flex items-center justify-center group-hover:bg-red-500/20 transition-all">
                                        <LogOut size={16} className="text-red-400" />
                                    </div>
                                    <span className="text-sm font-black font-['Roboto_Flex'] tracking-tight">Log Out</span>
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
};

export default HomeHeader;
