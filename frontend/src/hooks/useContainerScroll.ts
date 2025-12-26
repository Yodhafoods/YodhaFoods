import { useRef, useState, useEffect, RefObject } from "react";

interface UseContainerScrollResult {
    scrollContainerRef: RefObject<HTMLDivElement | null>;
    showLeftArrow: boolean;
    showRightArrow: boolean;
    scrollLeft: () => void;
    scrollRight: () => void;
    checkScroll: () => void;
}

export const useContainerScroll = (dependency: any[] = []): UseContainerScrollResult => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 10);
            // Allow some tolerance (e.g., 2px) for verifying end of scroll
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 2);
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, [dependency]);

    return {
        scrollContainerRef,
        showLeftArrow,
        showRightArrow,
        scrollLeft,
        scrollRight,
        checkScroll
    };
};
