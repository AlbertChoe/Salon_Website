"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [serviceName, setServiceName] = useState('');
    const [duration, setDuration] = useState('');
    const { data: session, status } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (status === 'authenticated' && session?.user?.role !== 'Admin') {
            router.replace('/');
            return;

        }
    }, [status, session, router]);

    if (status !== 'loading' && (!session || session.user.role !== 'Admin')) {
        router.replace('/');
        return;
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const response = await fetch('/api/servicess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: serviceName, duration: parseInt(duration, 10) }),
        });

        if (response.ok) {
            alert('Service added successfully!');
            setServiceName('');
            setDuration('');
        } else {
            alert('Failed to add service');
        }
    };


    return (
        <div className="h-screen max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serviceName">
                        Service Name
                    </label>
                    <input
                        id="serviceName"
                        type="text"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        placeholder="Service Name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
                        Duration (minutes)
                    </label>
                    <input
                        id="duration"
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="Duration (minutes)"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Add Service
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminDashboard;
