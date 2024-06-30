"use client";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const AddBranchPage = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');
    const [openingTime, setOpeningTime] = useState('');
    const [closingTime, setClosingTime] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !location || !phone || !openingTime || !closingTime) {
            toast.error("Please fill in all fields.");
            return;
        }

        setIsSubmitting(true);
        const formattedOpeningTime = formatTime(openingTime);
        const formattedClosingTime = formatTime(closingTime);

        const response = await fetch('/api/branches/addBranch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, location, phone, openingTime: formattedOpeningTime, closingTime: formattedClosingTime }),
        });

        setIsSubmitting(false);
        
        if (response.ok) {
            toast.success('Branch added successfully!');
          
           
            setTimeout(() => {
              router.push('/branch');
            }, 700);  
        }else {
            toast.error('Failed to add branch.');
        }
    };

    if (session?.user?.role !== 'Admin') {
        return <p>Unauthorized. Only admins can add branches.</p>;
    }

    return (
        <div className="max-w-md mx-auto mt-10 mb-10">
            <h1 className="text-2xl font-bold text-center mb-6">Add Branch</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Branch Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                        Location
                    </label>
                    <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                        Phone
                    </label>
                    <input
                        id="phone"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="openingTime">
                        Opening Time
                    </label>
                    <input
                        id="openingTime"
                        type="time"
                        value={openingTime}
                        onChange={(e) => setOpeningTime(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="closingTime">
                        Closing Time
                    </label>
                    <input
                        id="closingTime"
                        type="time"
                        value={closingTime}
                        onChange={(e) => setClosingTime(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={isSubmitting}>
                        {isSubmitting ? 'Adding...' : 'Add Branch'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBranchPage;
