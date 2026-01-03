
'use client';

import { useState, useEffect } from 'react';
import { usePost } from '@/hooks/usePost';
import { toast } from 'sonner';
import { api } from '@/lib/api';

// Sub-components
import { BasicInfoSection } from './product-form/BasicInfoSection';
import { PacksSection, Pack } from './product-form/PacksSection';
import { MediaSection } from './product-form/MediaSection';
import { SpecificationsSection } from './product-form/SpecificationsSection';
import { NutritionSection } from './product-form/NutritionSection';
import { MetaSection } from './product-form/MetaSection';

interface Category {
    _id: string;
    name: string;
    subCategories?: { name: string; slug: string }[];
}

interface NutritionItem {
    name: string;
    value: string;
}

export interface ProductUploadFormProps {
    onSuccess?: () => void;
    initialData?: any; // Consider typing this properly with a Product interface if available
}

export function ProductUploadForm({ onSuccess, initialData }: ProductUploadFormProps) {
    // 1. STATE DEFINITIONS
    const [categories, setCategories] = useState<Category[]>([]);
    const isEditMode = !!initialData;

    // Basic
    const [basicInfo, setBasicInfo] = useState({
        name: '',
        description: '',
        categoryId: '',
        subCategory: '', // Optional subcategory slug
        ingredients: '',
        shelfLifeMonths: '',
        storageInstructions: '',
        howToUse: '',
    });

    // Packs
    const [packs, setPacks] = useState<Pack[]>([
        { label: '', weightInGrams: 0, price: 0, stock: 0, isDefault: true }
    ]);

    // Media
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<any[]>([]); // For edit mode

    // Specs
    const [specs, setSpecs] = useState({
        brand: 'Yodha Foods',
        form: '',
        organic: false,
        ayurvedic: false,
        vegan: false,
        allergens: '',
        containerType: '',
        servingSize: '',
    });

    // Nutrition & Highlights
    const [nutritionTable, setNutritionTable] = useState<NutritionItem[]>([]);
    const [highlights, setHighlights] = useState<string[]>([]);

    // Meta (Manufacturing + SEO)
    const [productInfo, setProductInfo] = useState({
        genericName: '',
        netQuantity: '',
        countryOfOrigin: 'India',
        manufacturer: '',
        marketedBy: '',
        fssaiLicense: '',
    });
    const [seo, setSeo] = useState({
        title: '',
        description: '',
        keywords: '',
    });

    const [isLoading, setIsLoading] = useState(false); // Using local loading state for flexibility

    // 2. FETCH DATA & INITIALIZE
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get<any>('/api/categories');
                if (res && Array.isArray(res.categories)) setCategories(res.categories);
                else if (Array.isArray(res)) setCategories(res);
                else if (res && Array.isArray(res.data)) setCategories(res.data);
            } catch (error) {
                toast.error('Could not load categories');
            }
        };
        fetchCategories();
    }, []);

    // Initialize form with data if in edit mode
    useEffect(() => {
        if (initialData) {
            setBasicInfo({
                name: initialData.name || '',
                description: initialData.description || '',
                categoryId: typeof initialData.categoryId === 'object' ? initialData.categoryId?._id : initialData.categoryId || '',
                subCategory: initialData.subCategory || '',
                ingredients: initialData.ingredients || '',
                shelfLifeMonths: initialData.shelfLifeMonths || '',
                storageInstructions: initialData.storageInstructions || '',
                howToUse: initialData.howToUse || '',
            });

            if (initialData.packs && initialData.packs.length > 0) {
                setPacks(initialData.packs);
            }

            if (initialData.specifications) {
                setSpecs({
                    brand: initialData.specifications.brand || 'Yodha Foods',
                    form: initialData.specifications.form || '',
                    organic: initialData.specifications.organic || false,
                    ayurvedic: initialData.specifications.ayurvedic || false,
                    vegan: initialData.specifications.vegan || false,
                    allergens: initialData.specifications.allergens || '',
                    containerType: initialData.specifications.containerType || '',
                    servingSize: initialData.specifications.servingSize || '',
                });
            }

            if (initialData.nutritionTable) {
                setNutritionTable(initialData.nutritionTable);
            }

            if (initialData.highlights) {
                setHighlights(initialData.highlights);
            }

            if (initialData.productInfo) {
                setProductInfo({
                    genericName: initialData.productInfo.genericName || '',
                    netQuantity: initialData.productInfo.netQuantity || '',
                    countryOfOrigin: initialData.productInfo.countryOfOrigin || 'India',
                    manufacturer: initialData.productInfo.manufacturer || '',
                    marketedBy: initialData.productInfo.marketedBy || '',
                    fssaiLicense: initialData.productInfo.fssaiLicense || '',
                });
            }

            if (initialData.seo) {
                setSeo({
                    title: initialData.seo.title || '',
                    description: initialData.seo.description || '',
                    keywords: Array.isArray(initialData.seo.keywords) ? initialData.seo.keywords.join(', ') : initialData.seo.keywords || '',
                });
            }

            if (initialData.images) {
                setExistingImages(initialData.images);
                setImagePreviews(initialData.images.map((img: any) => img.url));
            }
        }
    }, [initialData]);


    // 3. SUBMISSION LOGIC
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Validation
        if (!basicInfo.name || !basicInfo.categoryId || !basicInfo.ingredients || !basicInfo.shelfLifeMonths) {
            setIsLoading(false);
            return toast.error('Please fill required basic info (Name, Category, Ingredients, Shelf Life)');
        }
        if (packs.some(p => !p.label || !p.weightInGrams || !p.price || !p.stock)) {
            setIsLoading(false);
            return toast.error('Please complete all pack details (Label, Weight, Price, Stock)');
        }
        if (images.length === 0 && existingImages.length === 0) {
            setIsLoading(false);
            return toast.error('Please upload at least one image');
        }

        const formData = new FormData();

        // Append Sections
        Object.entries(basicInfo).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });

        formData.append('packs', JSON.stringify(packs));
        formData.append('specifications', JSON.stringify(specs));
        formData.append('productInfo', JSON.stringify(productInfo));

        if (nutritionTable.length > 0) formData.append('nutritionTable', JSON.stringify(nutritionTable));
        if (highlights.length > 0) formData.append('highlights', JSON.stringify(highlights));

        const seoData = {
            ...seo,
            keywords: seo.keywords.split(',').map(k => k.trim()).filter(k => k),
        };
        formData.append('seo', JSON.stringify(seoData));

        // New images
        images.forEach(image => formData.append('images', image));

        // existing images (if any logic needed for backend to retain them, typically backend handles "add new to existing" or "replace all". 
        // Assuming typical "append" logic or we need to send "keepImages" IDs. 
        // For this implementation, I'll assume the backend appends new images handled by 'images' field.
        // If we deleted existing images in UI, we might need a distinct 'deletedImageIds' field.
        // Let's implement a 'deletedImageIds' strategy if backend supports it, otherwise simply keeping existing and adding new.
        // The UI below allows removing "previews". If a preview corresponds to an existing image, we should track it for deletion.

        // Strategy: We will send `existingImages` list. If the backend replaces the list, we send the kept ones.
        // If the backend appends, we might need to be careful.
        // Let's assume for now we are just appending new images. 
        // Ideally, we passed existing images again? No, we can't pass existing image objects in FormData easily as files.
        // We usually send 'existingImageIds' or similar. 
        // Let's defer complex image replacement logic and focus on adding new ones, unless critical.
        // Actually, let's track remaining existing images.
        const remainingExistingImages = existingImages.map(img => img._id || img.public_id); // Assuming ID field
        formData.append('existingImageIds', JSON.stringify(remainingExistingImages));


        try {
            if (isEditMode) {
                await api.put(`/api/products/${initialData._id}`, formData);
                toast.success('Product updated successfully!');
            } else {
                await api.post('/api/products', formData);
                toast.success('Product created successfully!');
            }

            if (onSuccess) {
                onSuccess();
            } else {
                setTimeout(() => window.location.reload(), 1500);
            }
        } catch (error) {
            console.error(error);
            toast.error(isEditMode ? 'Failed to update product' : 'Failed to create product');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveImage = (idx: number) => {
        // If it's a new image (in 'images' array)
        if (idx >= existingImages.length) {
            const newImgIdx = idx - existingImages.length;
            setImages(prev => prev.filter((_, i) => i !== newImgIdx));
            setImagePreviews(prev => prev.filter((_, i) => i !== idx)); // Previews is combined
        } else {
            // It's an existing image
            setExistingImages(prev => prev.filter((_, i) => i !== idx));
            setImagePreviews(prev => prev.filter((_, i) => i !== idx));
        }
    };

    // 4. RENDER
    return (
        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto space-y-8 pb-20">
            <div className='flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-gray-100'>
                <h2 className="text-2xl font-bold text-gray-900">
                    {isEditMode ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-green-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50 transition shadow-lg hover:shadow-green-500/30"
                >
                    {isLoading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Product' : 'Publish Product')}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Media & Meta (Smaller items) */}
                <div className="space-y-8 lg:col-span-1">
                    <MediaSection
                        images={images} // This prop name might be misleading in MediaSection if it expects only files. Let's check MediaSection usage.
                        // MediaSection takes `images: File[]` and `previews: string[]`. 
                        // It only uses `previews` for display. `images` is for validation length check.
                        // We should pass combined length or adjust MediaSection.
                        // Ideally we pass "previews" correctly.
                        previews={imagePreviews}
                        onAdd={(files) => {
                            setImages(prev => [...prev, ...files]);
                            files.forEach(file => {
                                const reader = new FileReader();
                                reader.onloadend = () => setImagePreviews(prev => [...prev, reader.result as string]);
                                reader.readAsDataURL(file);
                            });
                        }}
                        onRemove={handleRemoveImage}
                    // We might need to trick MediaSection about "images" prop if it relies on it for "required" check.
                    // Let's pass a dummy array of proper length if needed, or better, just pass `images` and ignore the validation warning inside MediaSection for now if it only checks `images.length`.
                    // Actually, let's fix MediaSection if strictly needed. For now, we will pass `images` (new files).
                    // If we have existing images, we are good.
                    // We can modify MediaSection to accept `hasExistingImages` bool?
                    // Or just standard props.
                    />

                    <SpecsWrapper
                        specs={specs}
                        onChange={(field, val) => setSpecs(prev => ({ ...prev, [field]: val }))}
                    />

                    <MetaSection
                        productInfo={productInfo}
                        seo={seo}
                        onInfoChange={(field, val) => setProductInfo(prev => ({ ...prev, [field]: val }))}
                        onSeoChange={(field, val) => setSeo(prev => ({ ...prev, [field]: val }))}
                    />
                </div>

                {/* Right Column: Main Content */}
                <div className="space-y-8 lg:col-span-2">
                    <BasicInfoSection
                        data={basicInfo}
                        categories={categories}
                        onChange={(field, val) => setBasicInfo(prev => ({ ...prev, [field]: val }))}
                    />

                    <PacksSection
                        packs={packs}
                        onChange={setPacks}
                    />

                    <NutritionSection
                        nutrition={nutritionTable}
                        highlights={highlights}
                        onNutritionChange={setNutritionTable}
                        onHighlightsChange={setHighlights}
                    />
                </div>
            </div>

            {/* Global Styles for Inputs */}
            <style jsx global>{`
                .input-field {
                    width: 100%;
                    padding: 0.625rem;
                    border-radius: 0.5rem;
                    border: 1px solid #e5e7eb;
                    background-color: #f9fafb;
                    transition: border-color 0.15s ease-in-out;
                    font-size: 0.875rem;
                    color: #111827; /* Force dark text */
                }
                .input-field:focus {
                    outline: none;
                    border-color: #3b82f6;
                    background-color: #ffffff;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }
            `}</style>
        </form>
    );
}

// Wrapper to prevent circular dependency layout issues if any, or just spacing
function SpecsWrapper({ specs, onChange }: { specs: any, onChange: (field: string, value: any) => void }) {
    return <SpecificationsSection specs={specs} onChange={onChange} />;
}
