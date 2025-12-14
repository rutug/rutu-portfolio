"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import RevealFx from "../components/RevealFx";
import { User, Lock, ArrowRight } from 'lucide-react';

export default function Edit() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem('token');
        if (token) {
            // If logged in, maybe show edit interface? 
            // For now, we'll just redirect to home or stay here.
            // router.push('/dashboard'); 
        }
    }, [router]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                // On success, we might want to stay here and show edit tools, 
                // or redirect. For now, let's redirect to home as per original login.
                router.push('/');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-gray-900 to-gray-800">
            <RevealFx>
                <div className="text-center space-y-8 w-full max-w-md">
                    {/* Header */}
                    <div className="space-y-2">
                        <h1 className="text-[8vw] md:text-[3vw] font-bold text-white">
                            Admin Access
                        </h1>
                        <p className="text-[4vw] md:text-[18px] text-gray-400">
                            Login to edit portfolio
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-8 py-3 rounded-full text-gray-300 border border-gray-700/50 backdrop-blur-sm bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-all duration-300"
                                    placeholder="Email"
                                    required
                                />
                                <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>

                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-8 py-3 rounded-full text-gray-300 border border-gray-700/50 backdrop-blur-sm bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-all duration-300"
                                    placeholder="Password"
                                    required
                                />
                                <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 px-8 py-3 rounded-full text-gray-300 border border-gray-700/50 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Logging in...' : (
                                <>
                                    <span>Login</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </RevealFx>
        </div>
    );
}
