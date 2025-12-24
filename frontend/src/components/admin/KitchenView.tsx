"use client";

import { useState, useEffect } from "react";
import { Plus, Play, Trash2 } from "lucide-react";
import Modal from "./Modal";
import AddVideoModal from "./AddVideoModal";
import { getKitchenVideos } from "@/services/kitchen.services";

export default function KitchenView() {
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchVideos = async () => {
        try {
            const data = await getKitchenVideos();
            setVideos(data.videos || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold dark:text-white">Kitchen Videos</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-700 transition-colors"
                >
                    <Plus size={20} />
                    Add Video
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 text-sm font-medium">
                            <tr>
                                <th className="px-6 py-4">Thumbnail</th>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Linked Product</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-6 py-8 text-center text-gray-500"
                                    >
                                        Loading videos...
                                    </td>
                                </tr>
                            ) : videos.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-6 py-8 text-center text-gray-500"
                                    >
                                        No videos found. Upload one to get started!
                                    </td>
                                </tr>
                            ) : (
                                videos.map((video) => (
                                    <tr
                                        key={video._id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="relative w-16 h-24 rounded-lg overflow-hidden bg-gray-100 border dark:border-gray-600">
                                                {video.thumbnail?.url ? (
                                                    <img
                                                        src={video.thumbnail.url}
                                                        alt={video.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full">
                                                        <Play size={20} className="text-gray-400" />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium dark:text-gray-200">
                                                {video.title}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate max-w-xs">
                                                {video.description}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                            {video.productId?.name || "—"}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Upload Kitchen Video"
            >
                <AddVideoModal
                    onSuccess={fetchVideos}
                    onClose={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}
