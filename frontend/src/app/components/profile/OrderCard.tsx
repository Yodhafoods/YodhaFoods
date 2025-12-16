import { Order } from "@/types/order";

export default function OrderCard({ order }: { order: Order }) {
    const isDelivered = order.status === "DELIVERED";

    return (
        <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
            <div>
                <p className="font-semibold">Order #{order._id.slice(-6)}</p>
                <p className="text-sm text-gray-500">
                    Placed: {new Date(order.createdAt).toDateString()}
                </p>
                <p className="mt-1 font-medium">₹{order.totalAmount}</p>
            </div>

            <div className="flex flex-col items-end gap-2">
                <span
                    className={`px-3 py-1 text-sm rounded-full ${isDelivered
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {order.status}
                </span>

                <button className="bg-orange-600 text-white px-4 py-2 rounded text-sm">
                    Track Order & View Details
                </button>
            </div>
        </div>
    );
}
