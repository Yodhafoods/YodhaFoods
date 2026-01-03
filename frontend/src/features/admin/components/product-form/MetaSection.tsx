
interface ProductInfo {
    genericName: string;
    netQuantity: string;
    countryOfOrigin: string;
    manufacturer: string;
    marketedBy: string;
    fssaiLicense: string;
}

interface Seo {
    title: string;
    description: string;
    keywords: string;
}

interface MetaSectionProps {
    productInfo: ProductInfo;
    seo: Seo;
    onInfoChange: (field: keyof ProductInfo, value: string) => void;
    onSeoChange: (field: keyof Seo, value: string) => void;
}

export function MetaSection({ productInfo, seo, onInfoChange, onSeoChange }: MetaSectionProps) {
    return (
        <section className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <details className="group">
                <summary className="flex justify-between items-center cursor-pointer font-semibold list-none">
                    <span>Manufacturing & SEO Details</span>
                    <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                </summary>

                <div className="mt-6 space-y-6 animate-in slide-in-from-top-2">
                    {/* Manufacturing */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b pb-1">Manufacturing Info</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="genericName" placeholder="Generic Name" value={productInfo.genericName} onChange={e => onInfoChange('genericName', e.target.value)} className="input-field" />
                            <input name="countryOfOrigin" placeholder="Country of Origin" value={productInfo.countryOfOrigin} onChange={e => onInfoChange('countryOfOrigin', e.target.value)} className="input-field" />
                            <input name="manufacturer" placeholder="Manufacturer" value={productInfo.manufacturer} onChange={e => onInfoChange('manufacturer', e.target.value)} className="input-field" />
                            <input name="marketedBy" placeholder="Marketed By" value={productInfo.marketedBy} onChange={e => onInfoChange('marketedBy', e.target.value)} className="input-field" />
                            <input name="fssaiLicense" placeholder="FSSAI License No." value={productInfo.fssaiLicense} onChange={e => onInfoChange('fssaiLicense', e.target.value)} className="input-field" />
                            <input name="netQuantity" placeholder="Net Quantity" value={productInfo.netQuantity} onChange={e => onInfoChange('netQuantity', e.target.value)} className="input-field" />
                        </div>
                    </div>

                    {/* SEO */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b pb-1">Search Engine Optimization (SEO)</h4>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Meta Title</label>
                                <input name="title" placeholder="Meta Title" value={seo.title} onChange={e => onSeoChange('title', e.target.value)} className="input-field" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Meta Description</label>
                                <textarea name="description" placeholder="Meta Description" value={seo.description} onChange={e => onSeoChange('description', e.target.value)} className="input-field" rows={2} />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Keywords</label>
                                <input name="keywords" placeholder="Keywords (comma separated)" value={seo.keywords} onChange={e => onSeoChange('keywords', e.target.value)} className="input-field" />
                            </div>
                        </div>
                    </div>
                </div>
            </details>
        </section>
    );
}
