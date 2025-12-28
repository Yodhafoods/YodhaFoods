"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, Clock, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        mobile: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulating email sending
        // In a real application, you would call your backend API here
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log("Form Data to be sent to namaste@yodhafoods.com:", form);

        setLoading(false);
        setSubmitted(true);
        setForm({ name: "", email: "", mobile: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 space-y-16">

            {/* Header & Info Section */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">Get in Touch</h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                    Have questions about our products or need assistance? We're here to help!
                    Reach out to us through any of the channels below.
                </p>
            </div>

            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-orange-50 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                        <Mail size={24} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Email Us</h3>
                        <a href="mailto:namaste@yodhafoods.com" className="text-orange-600 hover:orange-700">namaste@yodhafoods.com</a>
                    </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                        <Phone size={24} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Call Us</h3>
                        <p className="text-gray-600">+91 9705883899</p>
                    </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                        <Clock size={24} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Working Hours</h3>
                        <p className="text-gray-600">Mon - Sat, 9:00 AM - 6:00 PM</p>
                    </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Office</h3>
                        <p className="text-gray-600 text-sm">Panchamukhi Presence Pvt Ltd.<br />Guntur, Andhra Pradesh</p>
                    </div>
                </div>
            </div>

            {/* Form Section - Signin Style Layout */}
            <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-0 bg-gray-50 rounded-[3rem] overflow-hidden shadow-sm border border-gray-100">

                {/* Left Side - Mascot */}
                <div className="flex w-full lg:w-1/2 bg-gradient-to-b from-orange-600 to-orange-400 items-center justify-center relative p-8 lg:p-12 min-h-[400px] lg:min-h-[600px]">
                    <div className="relative z-10 text-center max-w-lg">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                            We'd Love to Hear From You!
                        </h2>
                        <p className="text-white/90 text-lg mb-8">
                            Whether it's feedback, a query, or just a hello, drop us a message and we'll get back to you.
                        </p>
                        <div className="relative mx-auto w-64 h-64 lg:w-80 lg:h-80 transform hover:scale-105 transition-transform duration-300">
                            <Image
                                src="/assets/images/mascot/1.png"
                                alt="Yodha Foods Mascot"
                                fill
                                className="object-contain drop-shadow-2xl"
                                priority
                            />
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-500/30 rounded-full blur-3xl"></div>
                </div>

                {/* Right Side - Form */}
                <div className="flex-1 flex flex-col justify-center p-8 lg:p-16 bg-white">
                    <div className="w-full max-w-md mx-auto space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Send a Message</h2>
                            <p className="mt-2 text-gray-500">Fill out the form below and we will reach out to you shortly.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Abhishek Kumar"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="e.g. abhishek@example.com"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        id="mobile"
                                        value={form.mobile}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="How can we help you?"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || submitted}
                                className={`w-full flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white py-3.5 px-6 rounded-xl font-bold shadow-lg shadow-orange-200 transition-all duration-200 transform ${loading || submitted ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-1 hover:shadow-xl"
                                    }`}
                            >
                                {loading ? (
                                    "Sending..."
                                ) : submitted ? (
                                    "Message Sent!"
                                ) : (
                                    <>
                                        Send Message <Send size={18} />
                                    </>
                                )}
                            </button>

                            {submitted && (
                                <p className="text-green-600 text-center text-sm font-medium animate-pulse">
                                    Thank you! Your message has been sent successfully.
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
