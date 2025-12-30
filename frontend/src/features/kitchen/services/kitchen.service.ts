
import { api } from "@/lib/api";
import { VideoResponse } from "@/types/video.types";
import { AxiosRequestConfig } from "axios";

export const getKitchenVideos = async (config?: AxiosRequestConfig): Promise<VideoResponse> => {
    try {
        const data = await api.get<VideoResponse>("/api/videos/kitchen", config);
        return data;
    } catch (error) {
        console.error("Error in getKitchenVideos service:", error);
        throw error;
    }
};

export const createKitchenVideo = async (formData: FormData) => {
    try {
        const data = await api.post<any, FormData>("/api/videos", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    } catch (error) {
        console.error("Error in createKitchenVideo service:", error);
        throw error;
    }
};
