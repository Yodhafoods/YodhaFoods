"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { addItemToCart, updateCartItemQty } from "@/features/cart/store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Minus, Plus, ShoppingCart, Star, Heart, Share2, ChevronDown, Check, ChevronLeft, ChevronRight, Crown } from "lucide-react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper";
import RelatedProducts from "./RelatedProducts";
import { Product, Pack } from "@/types";

// Details Components
import TrustBadges from "@/features/products/components/details/TrustBadges";
import ProductMetaDetails from "@/features/products/components/details/ProductMetaDetails";
import NutritionalInfo from "@/features/products/components/details/NutritionalInfo";
import HowToUse from "@/features/products/components/details/HowToUse";
import ProductSpecsTable from "@/features/products/components/details/ProductSpecsTable";
import GeneralSpecs from "@/features/products/components/details/GeneralSpecs";
import CouponSection from "@/features/products/components/details/CouponSection";

function CustomPrevButton() {
    const swiper = useSwiper();
    return (
        <button onClick={() => swiper.slidePrev()} className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md text-gray-700 hover:bg-white hover:text-orange-600 transition-colors">
            <ChevronLeft size={20} />
        </button>
    );
}

function CustomNextButton() {
    const swiper = useSwiper();
    return (
        <button onClick={() => swiper.slideNext()} className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md text-gray-700 hover:bg-white hover:text-orange-600 transition-colors">
            <ChevronRight size={20} />
        </button>
    );
}

interface ProductClientProps {
    product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
    const dispatch = useAppDispatch();
    const [activeImage, setActiveImage] = useState(0);
    const [selectedPack, setSelectedPack] = useState<Pack | null>(null);
    const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

    // Initialize selected pack
    useEffect(() => {
        if (product.packs && product.packs.length > 0) {
            const defaultPack = product.packs.find(p => p.isDefault) || product.packs[0];
            setSelectedPack(defaultPack);
        }
    }, [product]);

    // Reset image index if product changes
    useEffect(() => {
        if (swiperRef && !swiperRef.destroyed) {
            swiperRef.slideTo(activeImage);
        }
    }, [activeImage, swiperRef]);

    // Reset image index if product changes
    useEffect(() => {
        setActiveImage(0);
        if (swiperRef && !swiperRef.destroyed) {
            swiperRef.slideTo(0);
        }
    }, [product, swiperRef]);


    const cartItemId = selectedPack ? `${product._id}-${selectedPack.label}` : product._id;

    const cartItem = useAppSelector((state) =>
        state.cart.items.find((item) => item.id === cartItemId)
    );

    const qty = cartItem ? cartItem.qty : 0;
    const currentPrice = selectedPack?.price || 0;
    const currentDiscountPrice = selectedPack?.discountPrice;
    const currentStock = selectedPack?.stock || 0;

    const handleAddToCart = async () => {
        if (!selectedPack) return;
        try {
            await dispatch(
                addItemToCart({
                    product: {
                        id: cartItemId,
                        productId: product._id,
                        name: `${product.name} (${selectedPack.label})`,
                        price: currentPrice,
                        qty: 1,
                        image: product.images?.[0]?.url || "",
                        pack: selectedPack.label,
                        stock: currentStock
                    },
                    quantity: 1
                })
            ).unwrap();
            toast.success("Added to cart!", { position: "bottom-right", autoClose: 2000 });
        } catch (error) {
            toast.error("Failed to add to cart");
        }
    };

    const incrementQty = async () => {
        if (!cartItem) return;
        if (cartItem.qty < currentStock) {
            try {
                await dispatch(updateCartItemQty({ productId: product._id, quantity: cartItem.qty + 1, pack: selectedPack?.label })).unwrap();
            } catch (error) {
                toast.error("Failed to update quantity");
            }
        }
    };

    const decrementQty = async () => {
        if (!cartItem) return;
        if (cartItem.qty > 1) {
            try {
                await dispatch(updateCartItemQty({ productId: product._id, quantity: cartItem.qty - 1, pack: selectedPack?.label })).unwrap();
            } catch (error) {
                toast.error("Failed to update quantity");
            }
        }
    };

    if (!selectedPack && product.packs?.length > 0) return null;

    return (
        <div className="min-h-screen bg-white font-sans pb-16">
            <ToastContainer />
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 lg:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 lg:gap-10">
                    {/* Left Column: Image Gallery */}
                    <div className="lg:col-span-7 h-fit lg:sticky lg:top-24">
                        {/* Mobile: Swipeable Carousel */}
                        <div className="block lg:hidden relative aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-6 border border-gray-100 group">
                            <Swiper
                                modules={[Navigation]}
                                spaceBetween={0}
                                slidesPerView={1}
                                className="w-full h-full"
                                onSwiper={(swiper) => {
                                    // Make sure we can access this instance if needed, or just use internal nav
                                    // For mobile independent swiper, we might want local ref if we use custom buttons outside
                                }}
                            >
                                {product.images?.map((img, idx) => (
                                    <SwiperSlide key={idx} className="w-full h-full">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={img.url} alt={product.name} className="w-full h-full object-cover" />
                                    </SwiperSlide>
                                ))}
                                {/* Mobile Custom Navigation (Always Visible) */}
                                <div className="absolute top-1/2 left-2 -translate-y-1/2 z-10">
                                    <CustomPrevButton />
                                </div>
                                <div className="absolute top-1/2 right-2 -translate-y-1/2 z-10">
                                    <CustomNextButton />
                                </div>
                            </Swiper>

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                {product.images?.map((_, idx) => (
                                    <div key={idx} className={`w-2 h-2 rounded-full backdrop-blur-sm transition-colors ${idx === activeImage ? 'bg-orange-500' : 'bg-white/50'}`} />
                                ))}
                            </div>
                        </div>

                        {/* Desktop: Main Image + Thumbnails Below */}
                        <div className="hidden lg:flex flex-col gap-2 lg:gap-4">
                            {/* Main Display - Constrained height */}
                            <div className="relative bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 group cursor-zoom-in max-h-[600px] w-full flex items-center justify-center">
                                <Swiper
                                    modules={[Navigation]}
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    onSwiper={setSwiperRef}
                                    onSlideChange={(swiper) => setActiveImage(swiper.activeIndex)}
                                    className="w-full h-full"
                                >
                                    {product.images?.map((img, idx) => (
                                        <SwiperSlide key={idx} className="w-full h-full flex items-center justify-center bg-gray-50">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={img.url}
                                                alt={product.name}
                                                className="w-full h-full object-contain max-h-[600px] transition-transform duration-700 ease-out group-hover:scale-110"
                                            />
                                        </SwiperSlide>
                                    ))}

                                    {/* Desktop Custom Navigation (Visible on Hover) */}
                                    <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button onClick={() => swiperRef?.slidePrev()} className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md text-gray-700 hover:bg-white hover:text-orange-600 transition-colors">
                                            <ChevronLeft size={24} />
                                        </button>
                                    </div>
                                    <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button onClick={() => swiperRef?.slideNext()} className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md text-gray-700 hover:bg-white hover:text-orange-600 transition-colors">
                                            <ChevronRight size={24} />
                                        </button>
                                    </div>
                                </Swiper>
                            </div>
                        </div>

                        {/* Thumbnails Row */}
                        <div className="hidden md:flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                            {product.images?.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-orange-500 ring-2 ring-orange-200' : 'border-transparent hover:border-gray-200'}`}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={img.url} alt="Thumbnail" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Information Flow */}
                    <div className="lg:col-span-5 flex flex-col h-full">
                        <div className="space-y-2">
                            {/* 2. Badge & Rating */}
                            <div className="flex items-center gap-4">
                                {product.categoryId && (
                                    <div className="px-3 py-1 bg-orange-200 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-md border border-orange-400">
                                        {product.categoryId.name}
                                    </div>
                                )}
                                <div className="flex items-center gap-1 text-amber-500">
                                    <Star size={18} fill="currentColor" />
                                    <span className="text-base font-bold text-gray-900">4.7</span>
                                </div>
                            </div>
                            {/* 1. Title */}
                            <h1 className="text-xl md:text-3xl font-bold text-gray-900 leading-tight tracking-tight">{product.name}</h1>

                            <div className="h-px bg-gray-100 w-full" />

                            {/* 3. Pack Selection */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Select Pack</label>
                                <div className="flex flex-wrap gap-2">
                                    {product.packs?.map((pack) => (
                                        <button
                                            key={pack.label}
                                            onClick={() => setSelectedPack(pack)}
                                            className={`px-4 py-2.5 rounded-lg border text-sm font-bold transition-all ${selectedPack?.label === pack.label
                                                ? "border-orange-500 bg-orange-50 text-orange-700 shadow-sm ring-1 ring-orange-200"
                                                : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                                                }`}
                                        >
                                            {pack.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 4. Price & Add to Cart (Same Row) */}
                            <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <div className="flex flex-col gap-1">
                                    {currentDiscountPrice && (
                                        <div className="flex items-center gap-1.5 text-green-700 bg-green-100 px-2 py-1 rounded-lg w-fit border border-green-200">
                                            <Crown size={14} fill="currentColor" className="text-green-600" />
                                            <span className="text-xs font-bold">₹{currentDiscountPrice} for YodhaFam</span>
                                        </div>
                                    )}
                                    <div className="flex flex-col">
                                        <span className="text-3xl font-bold text-gray-900">₹{currentPrice}</span>
                                        <span className="text-xs text-gray-400">Inclusive of all taxes</span>
                                    </div>
                                </div>

                                <div className="flex-1 max-w-[200px]">
                                    {cartItem ? (
                                        <div className="flex items-center justify-between border border-orange-400 bg-orange-100 rounded-xl h-12 shadow-sm">
                                            <button onClick={decrementQty} className="w-12 h-full flex items-center justify-center hover:bg-orange-500 hover:text-white text-orange-600 rounded-l-xl transition-colors cursor-pointer">
                                                <Minus size={18} />
                                            </button>
                                            <span className="font-bold text-orange-600">{cartItem.qty}</span>
                                            <button onClick={incrementQty} className="w-12 h-full flex items-center justify-center hover:bg-orange-500 hover:text-white text-orange-600 rounded-r-xl transition-colors cursor-pointer">
                                                <Plus size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={handleAddToCart}
                                            className="w-full bg-orange-600 text-white h-12 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-2 active:scale-95"
                                        >
                                            <ShoppingCart size={18} />
                                            Add to Cart
                                        </button>
                                    )}
                                </div>
                            </div>
                            {/* 5. Product Highlights */}
                            {product.highlights && product.highlights.length > 0 && (
                                <div className="space-y-3 border-t border-gray-100 pt-6">
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Highlights</h3>
                                    <div className="grid gap-2">
                                        {product.highlights.map((highlight, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <div className="mt-0.5 min-w-[18px] text-green-500">
                                                    <Check size={18} strokeWidth={3} />
                                                </div>
                                                <span className="text-gray-700 font-medium leading-tight">{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 6. Description */}
                            {product.description && (
                                <div className="prose prose-sm prose-gray max-w-none text-gray-600 border-t border-gray-100 pt-6">
                                    <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">About this item</h3>
                                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                                </div>
                            )}

                            {/* 6. Trust Badges */}
                            <TrustBadges />

                        </div>
                    </div>
                </div>

                {/* 3. BOTTOM FULL WIDTH SECTION (Accordion) */}
                <div className="mt-20 max-w-4xl mx-auto space-y-8">
                    {/* Nutrition Table (Always visible if exists) */}
                    {product.nutritionTable && product.nutritionTable.length > 0 && (
                        <div className="border border-gray-200 rounded-2xl p-8 bg-white shadow-sm">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-4">Nutritional Information</h2>
                            <NutritionalInfo product={product} />
                        </div>
                    )}

                    {/* Specifications Accordion */}
                    <div className="border border-gray-200 rounded-2xl bg-white shadow-sm divide-y divide-gray-100 overflow-hidden">

                        {/* General Specs */}
                        <details className="group">
                            <summary className="flex items-center justify-between p-6 cursor-pointer list-none bg-white hover:bg-gray-50 transition-colors">
                                <span className="text-lg font-bold text-gray-900">Product Specifications</span>
                                <span className="transition-transform group-open:rotate-180">
                                    <ChevronDown size={20} className="text-gray-500" />
                                </span>
                            </summary>
                            <div className="p-6 pt-0 text-gray-600 space-y-6">
                                <GeneralSpecs product={product} />
                                <ProductSpecsTable product={product} />
                            </div>
                        </details>

                        {/* Storage & Shelf Life */}
                        {(product.ingredients || product.shelfLifeMonths || product.storageInstructions) && (
                            <details className="group">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none bg-white hover:bg-gray-50 transition-colors">
                                    <span className="text-lg font-bold text-gray-900">Ingredients & Storage</span>
                                    <span className="transition-transform group-open:rotate-180">
                                        <ChevronDown size={20} className="text-gray-500" />
                                    </span>
                                </summary>
                                <div className="p-6 pt-0 text-gray-600">
                                    <ProductMetaDetails product={product} />
                                </div>
                            </details>
                        )}

                        {/* How To Use */}
                        {product.howToUse && (
                            <details className="group">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none bg-white hover:bg-gray-50 transition-colors">
                                    <span className="text-lg font-bold text-gray-900">How to Use</span>
                                    <span className="transition-transform group-open:rotate-180">
                                        <ChevronDown size={20} className="text-gray-500" />
                                    </span>
                                </summary>
                                <div className="p-6 pt-0 text-gray-600">
                                    <HowToUse instructions={product.howToUse} />
                                </div>
                            </details>
                        )}
                    </div>
                </div>

                {/* Related */}
                {product.categoryId?._id && (
                    <div className="mt-20 pt-10 border-t border-gray-100">
                        <h2 className="text-2xl font-bold mb-8">People Also Bought</h2>
                        <RelatedProducts categoryId={product.categoryId._id} currentProductId={product._id} />
                    </div>
                )}
            </div>
        </div>
    );
}
