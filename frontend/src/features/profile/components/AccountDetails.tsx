import { useAuth } from "@/features/auth/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { User, Mail, LogOut, Edit2 } from "lucide-react";

export default function AccountDetails() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            router.replace("/auth/signin");
        }
    }, [loading, user, router]);

    if (loading || !user) {
        return (
            <div className="flex items-center justify-center p-10">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-20 w-20 bg-gray-200 rounded-full mb-4"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 w-48 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    const initials = user.name
        ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : "U";

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            {/* Header / Banner Card */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 md:p-10 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 p-24 bg-black/5 rounded-full -ml-10 -mb-10 blur-xl"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                    <div className="w-24 h-24 bg-white text-orange-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-md border-4 border-white/30 shrink-0">
                        {initials}
                    </div>
                    <div className="text-center md:text-left space-y-2">
                        <h2 className="text-2xl md:text-3xl font-bold">{user.name}</h2>
                        <p className="text-orange-100 font-medium opacity-90">{user.email}</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm mt-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                            <span>Active Member</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">Personal Information</h3>
                    <button className="text-sm font-medium text-orange-600 flex items-center gap-1 hover:text-orange-700 transition cursor-pointer">
                        <Edit2 size={14} />
                        Edit
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                            <User size={16} /> Full Name
                        </label>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-gray-800 font-medium">
                            {user.name}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                            <Mail size={16} /> Email Address
                        </label>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-gray-800 font-medium">
                            {user.email}
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-center md:justify-end">
                <button
                    onClick={logout}
                    className="flex items-center gap-2 px-6 py-3 text-red-600 hover:text-white hover:bg-red-600 border border-red-200 hover:border-red-600 rounded-lg cursor-pointer transition-all duration-200 font-medium w-full md:w-auto justify-center group"
                >
                    <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}