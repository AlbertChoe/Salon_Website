"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { DatePickerDemo } from "@/components/ui/date-picker";

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
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<string>("");
    const [timeSlots, setTimeSlots] = useState<string[]>([]);
    const [bookedSlots, setBookedSlots] = useState<TimeSlot[]>([]);
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        async function fetchServices() {
            const response = await fetch('/api/servicess');
            if (response.ok) {
                const data = await response.json();
                setServices(data.services);
                setSelectedService(data.services[0] || null);
            }
        }

        fetchServices();
    }, []);

    useEffect(() => {
      async function fetchBookedSlots() {
          if (date) {
              const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
              const formattedDate = localDate.toISOString().split('T')[0];
              const response = await fetch(`/api/reservation?date=${formattedDate}`);
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
  }, [date,selectedService]);

    const generateTimeSlots = useCallback(() => {
        if (!selectedService || !date) return;

        const service = services.find(s => s.id === selectedService.id);
        if (!service) return;

        const duration = service.duration;
        const slots = [''];
        const selectedDate = new Date(date); 

        for (let hour = 9; hour < 21; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
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
    }, [selectedService, services, bookedSlots, date]);

    useEffect(() => {
        generateTimeSlots();
    }, [generateTimeSlots]);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!date) {
          alert('Please fill all the data.');
          return;
      }
      if (!session) {
          alert('Reservations can only be made by members. Please log in first.');
          return;
      }
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      const formattedDate = localDate.toISOString().split('T')[0];
      console.log(name, phone, selectedService?.id, selectedService?.duration, formattedDate, time);
      const response = await fetch('/api/reservation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, service: selectedService?.id, duration: selectedService?.duration, date: formattedDate, time }),
      });

      if (response.ok) {
          setName("");
          setPhone("");
          setSelectedService(services[0] || null);
          setDate(null);
          setTime("");
          router.push('/');
          alert('Reservation submitted successfully!');
      } else {
          alert('Failed to submit reservation');
      }
  };

    return (
        <section className="my-8 mt-24 mb-24">
            <h2 className="text-3xl font-bold text-center mb-6">Book an Appointment</h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
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
                        {services.map(service => (
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
        </section>
    );
};

export default ReservationForm;


