import { CheckCircle2 } from "lucide-react";

interface HowToUseProps {
    instructions?: string;
}

export default function HowToUse({ instructions }: HowToUseProps) {
    if (!instructions) return null;

    const steps = instructions.split('\n').filter(s => s.trim());
    if (steps.length === 0) return null;

    return (
        <div className="mb-8 bg-amber-50 rounded-2xl p-6 border border-amber-100">
            <h3 className="text-lg font-bold text-amber-900 mb-4">How to Use</h3>
            <div className="space-y-3">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-amber-50">
                        <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 text-xs font-bold">
                            {idx + 1}
                        </div>
                        <p className="pt-0.5 text-gray-700 text-sm font-medium">{step}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
