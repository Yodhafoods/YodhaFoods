
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
}

interface NutritionItem {
    name: string;
    value: string;
}

export function ProductUploadForm() {
    // 1. STATE DEFINITIONS
    const [categories, setCategories] = useState<Category[]>([]);

    // Basic
    const [basicInfo, setBasicInfo] = useState({
        name: '',
        description: '',
        categoryId: '',
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

    // 2. FETCH DATA
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

    // 3. SUBMISSION LOGIC
    const { postData, isLoading } = usePost('/api/products', {
        onSuccess: () => {
            toast.success('Product created successfully!');
            setTimeout(() => window.location.reload(), 1500);
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!basicInfo.name || !basicInfo.categoryId || !basicInfo.ingredients || !basicInfo.shelfLifeMonths) {
            return toast.error('Please fill required basic info (Name, Category, Ingredients, Shelf Life)');
        }
        if (packs.some(p => !p.label || !p.weightInGrams || !p.price || !p.stock)) {
            return toast.error('Please complete all pack details (Label, Weight, Price, Stock)');
        }
        if (images.length === 0) {
            return toast.error('Please upload at least one image');
        }

        const formData = new FormData();

        // Append Sections
        Object.entries(basicInfo).forEach(([key, value]) => formData.append(key, value));

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

        images.forEach(image => formData.append('images', image));

        await postData(formData);
    };

    // 4. RENDER
    return (
        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto space-y-8 pb-20">
            <div className='flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700'>
                <h2 className="text-2xl font-bold dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">
                    Add New Product
                </h2>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-green-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50 transition shadow-lg hover:shadow-green-500/30"
                >
                    {isLoading ? 'Creating...' : 'Publish Product'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Media & Meta (Smaller items) */}
                <div className="space-y-8 lg:col-span-1">
                    <MediaSection
                        images={images}
                        previews={imagePreviews}
                        onAdd={(files) => {
                            setImages(prev => [...prev, ...files]);
                            files.forEach(file => {
                                const reader = new FileReader(); // Simple preview gen
                                reader.onloadend = () => setImagePreviews(prev => [...prev, reader.result as string]);
                                reader.readAsDataURL(file);
                            });
                        }}
                        onRemove={(idx) => {
                            setImages(prev => prev.filter((_, i) => i !== idx));
                            setImagePreviews(prev => prev.filter((_, i) => i !== idx));
                        }}
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
                }
                .input-field:focus {
                    outline: none;
                    border-color: #3b82f6;
                    background-color: #ffffff;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }
                .dark .input-field {
                    background-color: #374151;
                    border-color: #4b5563;
                    color: white;
                }
                .dark .input-field:focus {
                    background-color: #1f2937;
                    border-color: #60a5fa;
                }
            `}</style>
        </form>
    );
}

// Wrapper to prevent circular dependency layout issues if any, or just spacing
function SpecsWrapper({ specs, onChange }: { specs: any, onChange: (field: string, value: any) => void }) {
    return <SpecificationsSection specs={specs} onChange={onChange} />;
}
