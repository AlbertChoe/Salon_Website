"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Reservation {
    phone: string;
    id: string;
    time: string;
    name: string;
    service: string;
    date: string;
}

const CustomerDashboard = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {

        async function fetchReservations() {
            const response = await fetch('/api/reservation/customers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                const data = await response.json();
                setReservations(data.reservations);
            }
        }

        if (status !== 'loading' && (!session || session.user.role !== 'Customer')) {
            router.replace('/');
            return;
        }

        if (status === 'authenticated' && session.user.role === 'Customer') {
            fetchReservations();
        }
    }, [status, session, router]);



    return (
        <div className="min-h-screen max-w-4xl mx-auto py-10">
            <h1 className="text-2xl font-bold text-center mb-6">Your Past Reservations</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {reservations.map(reservation => (
                    <div key={reservation.id} className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold">{reservation.service}</h2>
                        <p className="text-gray-700">{reservation.name} ({reservation.phone})</p>
                        <p className="text-gray-600">{new Date(reservation.date).toLocaleDateString()} at {reservation.time}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => router.push('/reservation')}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Book New Appointment
            </button>
        </div>
    );
};

export default CustomerDashboard;
