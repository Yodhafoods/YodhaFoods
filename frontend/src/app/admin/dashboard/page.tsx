
'use client';

import { CategoryUploadForm } from '@/components/admin/CategoryUploadForm';
import { ProductUploadForm } from '@/components/admin/ProductUploadForm';

export default function AdminDashboard() {
    return (
        <div className="container mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold mb-6 dark:text-white">Admin Dashboard</h1>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <CategoryUploadForm />
                </div>
                <div>
                    <ProductUploadForm />
                </div>
            </div>
        </div>
    );
}
