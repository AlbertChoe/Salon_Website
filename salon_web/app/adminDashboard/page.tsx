"use client";
import React, { useState } from 'react';

const AdminDashboard = () => {
    const [serviceName, setServiceName] = useState('');
    const [duration, setDuration] = useState('');

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
        <div>
            <h1>Admin Dashboard</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="Service Name"
                    required
                />
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Duration (minutes)"
                    required
                />
                <button type="submit">Add Service</button>
            </form>
        </div>
    );
};

export default AdminDashboard;
