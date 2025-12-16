"use client";

interface SidebarProps {
    active: "orders" | "addresses" | "account";
    setActive: (v: "orders" | "addresses" | "account") => void;
}

export default function Sidebar({ active, setActive }: SidebarProps) {
    return (
        <aside className="w-full md:w-64  text-black shadow-md p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-8 hidden md:block bg-orange-600 text-center text-white p-2 rounded">Yodha Foods</h2>

            <nav className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 overflow-x-auto">
                <button
                    onClick={() => setActive("orders")}
                    className={`flex-1 md:flex-none text-center md:text-left px-4 py-2 rounded whitespace-nowrap cursor-pointer ${active === "orders" ? "text-white bg-orange-600" : "hover:bg-orange-600 hover:text-white"
                        }`}
                >
                    My Orders
                </button>

                <button
                    onClick={() => setActive("addresses")}
                    className={`flex-1 md:flex-none text-center md:text-left px-4 py-2 rounded whitespace-nowrap cursor-pointer ${active === "addresses"
                        ? "text-white bg-orange-600"
                        : "hover:bg-orange-600 hover:text-white"
                        }`}
                >
                    Addresses
                </button>
                <button
                    onClick={() => setActive("account")}
                    className={`flex-1 md:flex-none text-center md:text-left px-4 py-2 rounded whitespace-nowrap cursor-pointer ${active === "account"
                        ? "text-white bg-orange-600"
                        : "hover:bg-orange-600 hover:text-white"
                        }`}
                >
                    Account details
                </button>
            </nav>
        </aside>
    );
}
