"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        // Clear token
        localStorage.removeItem('token');

        // Force a hard reload to clear any application state and redirect to home
        window.location.href = '/';
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <p>Logging out...</p>
        </div>
    );
}
