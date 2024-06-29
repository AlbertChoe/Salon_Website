"use client";
import React, { useEffect, useState } from 'react';

interface Branch {
    id: string;
    name: string;
    location: string;
    phone: string;
    openingTime: string;
    closingTime: string;
}

const BranchesPage = () => {
    const [branches, setBranches] = useState<Branch[]>([]);

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

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Our Branches</h1>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                    {branches.map(branch => (
                        <div key={branch.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{branch.name}</h2>
                                <p className="text-gray-600"><strong>Location:</strong> {branch.location}</p>
                                <p className="text-gray-600"><strong>Phone:</strong> {branch.phone}</p>
                                <p className="text-gray-600"><strong>Opening Time:</strong> {branch.openingTime}</p>
                                <p className="text-gray-600"><strong>Closing Time:</strong> {branch.closingTime}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BranchesPage;
