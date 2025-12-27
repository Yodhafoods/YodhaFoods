// components/JourneySection.tsx

import React from 'react';
import { ChevronRight } from 'lucide-react';

interface JourneyStep {
    icon: string;
    label: string;
}

const journeySteps: JourneyStep[] = [
    { icon: '🌱', label: 'Sourcing' },
    { icon: '☀', label: 'Solar Drying' },
    { icon: '📦', label: 'Packing' },
];

const JourneySection: React.FC = () => {
    return (
        // Responsive Padding and Margin adjustments: 
        // Small screens: px-6, mb-20. Larger screens: px-[50px], mb-32
        <section id="journey" className="mx-auto max-w-[1440px] px-6 sm:px-[50px] mb-20 sm:mb-32">
            <div className="bg-white p-8 md:p-20 rounded-[40px] text-center shadow-xl">

                {/* Our Journey Header */}
                {/* Responsive Font Size: text-4xl on mobile, text-5xl on desktop */}
                <h2 className="font-['Fraunces'] text-4xl md:text-5xl font-extrabold mb-8 md:mb-10">
                    Our Journey
                </h2>

                {/* Timeline (Journey Steps) */}
                {/* Responsive Layout: On mobile, use justify-between for better spacing. */}
                <div className="timeline flex justify-between sm:justify-around items-center my-10 md:my-16">
                    {journeySteps.map((step, index) => (
                        <React.Fragment key={step.label}>
                            {/* Individual Step */}
                            <div className="flex flex-col items-center">
                                {/* Responsive Icon Size: text-4xl on mobile, text-5xl on desktop */}
                                <div className="text-4xl md:text-5xl mb-1 md:mb-2">{step.icon}</div>
                                <h3 className="text-base sm:text-xl font-medium">{step.label}</h3>
                            </div>

                            {/* Separator Arrow */}
                            {/* Hide the separator entirely on very small screens for better flow, show on sm and up */}
                            {index < journeySteps.length - 1 && (
                                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300 hidden xs:block" />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Get in Touch Section */}
                <div className="mt-10 pt-6 md:mt-16 md:pt-10 border-t border-gray-100">
                    {/* Responsive Font Size: text-2xl on mobile, text-3xl on desktop */}
                    <h3 className="text-2xl md:text-3xl font-semibold mb-5">Get in Touch</h3>

                    {/* Responsive Button Group: Stack buttons vertically on mobile (flex-col), then use flex-row on desktop (sm:flex-row) */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5">

                        {/* Contact Support Button (Fire Style) */}
                        <button
                            // Responsive Padding/Text: px-6 py-3 on mobile, px-10 py-4 on desktop
                            className="px-6 py-3 sm:px-10 sm:py-4 bg-[#ff4500] text-white rounded-full font-extrabold text-sm sm:text-lg 
                         hover:bg-[#ff8a00] transition duration-300 ease-in-out transform hover:-translate-y-1"
                        >
                            Contact Support
                        </button>

                        {/* Follow Button (Void Style) */}
                        <button
                            className="px-6 py-3 sm:px-10 sm:py-4 bg-black text-white rounded-full font-extrabold text-sm sm:text-lg
                         hover:bg-gray-800 transition duration-300 ease-in-out transform hover:-translate-y-1"
                        >
                            Follow @yodhafoods
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JourneySection;