"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Branch {
    id: string;
    name: string;
}

const AdminDashboard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [branches, setBranches] = useState<Branch[]>([]);
    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
    const [serviceName, setServiceName] = useState('');
    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.role !== 'Admin') {
            router.replace('/');
            return;
        }
    }, [status, session, router]);

    useEffect(() => {
        async function fetchBranches() {
            const response = await fetch('/api/branches');
            if (response.ok) {
                const data = await response.json();
                setBranches(data.branches);
            }
        }

        fetchBranches();
    }, []);

    const handleBranchSelect = (branchId: string) => {
        const branch = branches.find(branch => branch.id === branchId);
        setSelectedBranch(branch || null);
    };

    const uploadImage = async () => {
        if (!image) return '';

        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                formData
            );
            return response.data.secure_url;
        } catch (error) {
            console.error('Error uploading file:', error);
            return '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!selectedBranch) {
            alert('Please select a branch.');
            setIsSubmitting(false);
            return;
        }

        const imageUrl = await uploadImage();

        const response = await fetch('/api/servicess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                name: serviceName, 
                duration: parseInt(duration, 10), 
                price, 
                branchId: selectedBranch.id, 
                imageUrl 
            }),
        });

        if (response.ok) {
            alert('Service added successfully!');
            setServiceName('');
            setDuration('');
            setPrice('');
            setImage(null);
            setSelectedBranch(null);
        } else {
            alert('Failed to add service');
        }
        
        setIsSubmitting(false);
    };

    if (status !== 'loading' && (!session || session.user.role !== 'Admin')) {
        router.replace('/');
        return null;
    }

    return (
        <div className="h-screen max-w-md mx-auto mt-10 mb-10">
            <h1 className="text-2xl font-bold text-center mb-6">Add Service</h1>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="branch">
                    Select Branch
                </label>
                <select
                    id="branch"
                    value={selectedBranch?.id || ""}
                    onChange={(e) => handleBranchSelect(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                >
                    <option value="">Select a branch</option>
                    {branches.map(branch => (
                        <option key={branch.id} value={branch.id}>
                            {branch.name}
                        </option>
                    ))}
                </select>
            </div>
            {selectedBranch && (
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
                    <div className="mb-4">
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
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Price
                        </label>
                        <input
                            id="price"
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                            Service Image
                        </label>
                        <input
                            id="image"
                            type="file"
                            onChange={(e) => setImage(e.target.files?.[0] || null)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={isSubmitting}>
                            {isSubmitting ? 'Adding...' : 'Add Service'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AdminDashboard;
