
import { VideoResponse } from "@/types/video.types";

export const getKitchenVideos = async (): Promise<VideoResponse> => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/videos/kitchen`,
            {
                next: { revalidate: 3600 },
            }
        );

        if (!response.ok) {
            throw new Error(`Error fetching videos: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in getKitchenVideos service:", error);
        throw error;
    }
};

export const createKitchenVideo = async (formData: FormData) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/videos`, {
            method: "POST",
            body: formData,
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to upload video");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in createKitchenVideo service:", error);
        throw error;
    }
};
