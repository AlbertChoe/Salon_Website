"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { DatePickerDemo } from "@/components/ui/date-picker";

interface Branch {
    id: string;
    name: string;
    openingTime: string;
    closingTime: string;
}

interface Service {
    id: string;
    name: string;
    duration: number;
    price: string;
}

interface TimeSlot {
    startTime: string;
    endTime: string;
}

const ReservationForm = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [branches, setBranches] = useState<Branch[]>([]);
    const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<string>("");
    const [timeSlots, setTimeSlots] = useState<string[]>([]);
    const [bookedSlots, setBookedSlots] = useState<TimeSlot[]>([]);
    const router = useRouter();
    const { data: session } = useSession();

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

    const handleBranchSelect = async (branchId: string) => {
        const branch = branches.find(branch => branch.id === branchId);
        setSelectedBranch(branch || null);
        if (branch) {
            const response = await fetch(`/api/servicess?branchId=${branch.id}`);
            if (response.ok) {
                const data = await response.json();
                setServices(data);
                setSelectedService(data[0] || null);
            } else {
                setServices([]);
                setSelectedService(null);
            }
        } else {
            setServices([]);
            setSelectedService(null);
        }
    };
    

    useEffect(() => {
        async function fetchBookedSlots() {
            if (date && selectedBranch) {
                const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
                const formattedDate = localDate.toISOString().split('T')[0];
                const response = await fetch(`/api/reservation?date=${formattedDate}&branchId=${selectedBranch.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setBookedSlots(data.bookedSlots);
                }
            } else {
                setTimeSlots([]);
            }
        }

        fetchBookedSlots();
        setTime("");
    }, [date, selectedService, selectedBranch]);

    const generateTimeSlots = useCallback(() => {
        if (!selectedService || !date || !selectedBranch) return;

        const service = services.find(s => s.id === selectedService.id);
        if (!service) return;

        const duration = service.duration;
        const slots: string[] = [];
        const selectedDate = new Date(date);
        const [openingHour, openingMinute] = selectedBranch.openingTime.split(':').map(Number);
        const [closingHour, closingMinute] = selectedBranch.closingTime.split(':').map(Number);

        for (let hour = openingHour; hour < closingHour || (hour === closingHour && openingMinute < closingMinute); hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                if (hour === closingHour && minute >= closingMinute) break;

                const startDateTime = new Date(selectedDate);
                startDateTime.setHours(hour, minute, 0, 0);
                const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

                const isBooked = bookedSlots.some(slot => {
                    const [bookedStartHour, bookedStartMinute] = slot.startTime.split(':').map(Number);
                    const [bookedEndHour, bookedEndMinute] = slot.endTime.split(':').map(Number);

                    const bookedStartTime = new Date(selectedDate);
                    bookedStartTime.setHours(bookedStartHour, bookedStartMinute, 0, 0);
                    const bookedEndTime = new Date(selectedDate);
                    bookedEndTime.setHours(bookedEndHour, bookedEndMinute, 0, 0);

                    return (startDateTime >= bookedStartTime && startDateTime < bookedEndTime) ||
                        (endDateTime > bookedStartTime && endDateTime <= bookedEndTime);
                });

                if (!isBooked) {
                    slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
                }
            }
        }

        setTimeSlots(slots);
    }, [selectedService, services, bookedSlots, date, selectedBranch]);

    useEffect(() => {
        generateTimeSlots();
    }, [generateTimeSlots]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!date || !selectedBranch) {
            alert('Please fill all the data.');
            return;
        }
        if (!session) {
            alert('Reservations can only be made by members. Please log in first.');
            return;
        }
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        const formattedDate = localDate.toISOString().split('T')[0];

        const response = await fetch('/api/reservation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                phone,
                service: selectedService?.name,
                duration: selectedService?.duration,
                date: formattedDate,
                time,
                branchId: selectedBranch.id
            }),
        });

        if (response.ok) {
            setName("");
            setPhone("");
            setSelectedService(services[0] || null);
            setDate(null);
            setTime("");
            
            alert('Reservation submitted successfully!');
        } else {
            alert('Failed to submit reservation');
        }
    };

    return (
        <section className="my-8 mt-24 mb-24 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-6">Book an Appointment</h2>
            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Select Branch</label>
                    <select
                        value={selectedBranch?.id || ""}
                        onChange={(e) => handleBranchSelect(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-lg"
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
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Active Phone Number</label>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Type of Service</label>
                            <select value={selectedService?.id || ""} onChange={(e) => {
                                const service = services.find(s => s.id === e.target.value);
                                setSelectedService(service || null);
                            }} className="w-full border border-gray-300 p-2 rounded-lg" required>
                                {services && services.map(service => (
                                    <option key={service.id} value={service.id}>
                                        {service.name} - ${service.price} for {service.duration} minutes
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Date</label>
                            <DatePickerDemo date={date} setDate={setDate} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Time</label>
                            <select value={time} onChange={(e) => setTime(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg" required>
                                {date && timeSlots.map(slot => (
                                    <option key={slot} value={slot}>{slot}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                            Book Appointment
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
};

export default ReservationForm;
