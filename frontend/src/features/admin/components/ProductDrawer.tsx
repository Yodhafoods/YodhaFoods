import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ProductDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function ProductDrawer({ isOpen, onClose, title, children }: ProductDrawerProps) {
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300); // Wait for animation
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!mounted) return null;

    if (!isOpen && !isVisible) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex flex-col pt-16 sm:pt-0">
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Drawer Content */}
            <div
                className={`
                    relative w-full h-[calc(100vh-64px)] mt-auto bg-white shadow-2xl 
                    transform transition-transform duration-300 ease-out flex flex-col
                    ${isOpen ? 'translate-y-0' : 'translate-y-full'}
                `}
                style={{ marginTop: '4rem' }} // Allow header to be visible (approx 64px)
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white shrink-0">
                    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    <div className="max-w-full mx-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
