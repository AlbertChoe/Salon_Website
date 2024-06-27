"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Reservation {

    phone: string;
    id: string;
    time: string;
    name:string,
    service: string;
    date: string; 
}

const CustomerDashboard = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const router = useRouter();

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

        fetchReservations();
    }, []);

    return (
        <div>
            <h1>Your Past Reservations</h1>
            <ul>
                {reservations.map(reservation => (
                    <li key={reservation.id}>
                        {reservation.name} - {reservation.phone} - {reservation.service} - {new Date(reservation.date).toLocaleDateString()} - {reservation.time} 
                    </li>
                ))}
            </ul>
            <button onClick={() => router.push('/reservation')}>Book New Appointment</button>
        </div>
    );
};

export default CustomerDashboard;
