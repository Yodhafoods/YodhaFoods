import { Order, OrderStatus } from "@/types/order";
import { useState } from "react";
import Image from "next/image";
import { Check, Truck, Package, Home, X } from "lucide-react";

export default function OrderCard({ order }: { order: Order }) {
    const [expanded, setExpanded] = useState(false);
    const isDelivered = order.status === "DELIVERED";

    // Tracking Timeline Steps
    const steps: { status: OrderStatus; label: string; icon: any }[] = [
        { status: "PLACED", label: "Placed", icon: Package },
        { status: "CONFIRMED", label: "Confirmed", icon: Check },
        { status: "SHIPPED", label: "Shipped", icon: Truck },
        { status: "OUT_FOR_DELIVERY", label: "Out for Delivery", icon: Truck },
        { status: "DELIVERED", label: "Delivered", icon: Home },
    ];

    const currentStepIndex = steps.findIndex((s) => s.status === order.status);
    // If cancelled, we might handle differently, but let's just show it as a badge for now.

    const isCancelled = order.status === "CANCELLED";

    return (
        <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100 transition-all">
            {/* Header / Summary */}
            <div className="p-1 md:p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <p className="font-bold text-gray-800 text-lg">Order #{order._id.slice(-6)}</p>
                        <span className={`px-2 py-0.5 text-xs rounded border ${order.paymentStatus === 'PAID' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                            {order.paymentStatus}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="mt-2 font-semibold text-gray-900">Total: ₹{order.totalAmount}</p>
                </div>

                <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                    <span
                        className={`px-3 py-1 text-sm rounded-full font-medium ${isDelivered
                            ? "bg-green-100 text-green-800"
                            : isCancelled
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                    >
                        {order.status.replace(/_/g, " ")}
                    </span>

                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-orange-600 hover:text-orange-700 font-medium text-sm underline-offset-4 hover:underline transition-colors cursor-pointer"
                    >
                        {expanded ? "Hide Details" : "Track Order & View Details"}
                    </button>
                </div>
            </div>

            {/* EXPANDED CONTENT */}
            {expanded && (
                <div className="border-t border-gray-100 bg-gray-50/50 p-1 md:p-6 space-y-8 animate-in slide-in-from-top-2 fade-in duration-300">

                    {/* 1. TRACKING TIMELINE */}
                    {!isCancelled && (
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-6">Order Status</h3>

                            {/* Vertical Timeline (Mobile) */}
                            <div className="flex flex-col md:hidden space-y-6 relative pl-1">
                                <div className="absolute top-2 left-[23px] bottom-2 w-0.5 bg-gray-200 z-0" />
                                <div
                                    className="absolute top-2 left-[23px] w-0.5 bg-green-500 z-0 transition-all duration-500"
                                    style={{ height: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                                />

                                {steps.map((step, idx) => {
                                    const isCompleted = idx <= currentStepIndex;
                                    const isCurrent = idx === currentStepIndex;
                                    const Icon = step.icon;
                                    return (
                                        <div key={step.status} className="relative z-10 flex items-center gap-4">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0 transition-all duration-300 bg-white ${isCompleted
                                                    ? "border-green-500 text-green-600"
                                                    : "border-gray-200 text-gray-400"
                                                    }`}
                                            >
                                                <Icon size={18} />
                                            </div>
                                            <div className="flex flex-col">
                                                <p className={`text-sm font-medium ${isCompleted ? "text-gray-900" : "text-gray-500"}`}>
                                                    {step.label}
                                                </p>
                                                {isCurrent && (
                                                    <span className="text-xs text-green-600 font-medium">Current Status</span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Horizontal Timeline (Desktop) */}
                            <div className="hidden md:flex relative justify-between items-center w-full max-w-3xl mx-auto">
                                {/* Line background */}
                                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 z-0 -translate-y-1/2 rounded-full" />
                                {/* Progress Line */}
                                <div
                                    className="absolute top-1/2 left-0 h-1 bg-green-500 z-0 -translate-y-1/2 rounded-full transition-all duration-500"
                                    style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                                />

                                {steps.map((step, idx) => {
                                    const isCompleted = idx <= currentStepIndex;
                                    const isCurrent = idx === currentStepIndex;
                                    const Icon = step.icon;

                                    return (
                                        <div key={step.status} className="relative z-10 flex flex-col items-center group">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCompleted
                                                    ? "bg-green-500 border-green-500 text-white shadow-md scale-110"
                                                    : "bg-white border-gray-300 text-gray-400"
                                                    }`}
                                            >
                                                <Icon size={18} />
                                            </div>
                                            <p
                                                className={`absolute top-12 text-xs font-medium whitespace-nowrap transition-colors ${isCurrent ? "text-green-700 font-bold" : isCompleted ? "text-gray-900" : "text-gray-400"
                                                    }`}
                                            >
                                                {step.label}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {isCancelled && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center gap-3">
                            <X size={20} />
                            <p>This order has been cancelled.</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                        {/* 2. ORDER ITEMS */}
                        <div className="md:col-span-2">
                            <h3 className="font-semibold text-gray-900 mb-4">Items in Order</h3>
                            <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="p-4 flex gap-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden shrink-0 relative">
                                            {item.image ? (
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <Package size={20} />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                            <p className="text-sm font-semibold mt-1">₹{item.price * item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. SHIPPING DETAILS */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Shipping Details</h3>
                            <div className="bg-white rounded-lg border border-gray-200 p-4 text-sm text-gray-700 space-y-1">
                                <p className="font-medium text-black">{order.shippingAddress.fullName}</p>
                                <p>{order.shippingAddress.addressLine1}</p>
                                {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                                <p>
                                    {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                                    {order.shippingAddress.pincode}
                                </p>
                                <p>{order.shippingAddress.country}</p>
                                <div className="mt-3 pt-3 border-t border-gray-100">
                                    <p className="text-gray-500">Phone</p>
                                    <p className="font-medium">{order.shippingAddress.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
