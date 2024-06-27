"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DatePickerDemo } from "@/components/ui/date-picker";

const ReservationForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Haircuts and styling");
  const [date, setDate] = useState(new Date()); 
  const [time, setTime] = useState("8:00");
  const router = useRouter();

  // Generate time slots dynamically from 8 AM to 9 PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 21; hour++) {
      slots.push(`${hour}:00`);
    }
    return slots;
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!date) {
      alert('Fill all the data');
      return;
    }
    // Formatting date to send only the date part
    const formattedDate = date.toISOString().split('T')[0];

    const response = await fetch('/api/reservation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, service, date: formattedDate, time }),
    });

    if (response.ok) {
      setName("");
      setPhone("");
      setService("Haircuts and styling");
      setDate(new Date());
      setTime("");
      router.push('/'); // Change to a confirmation page or refresh
    } else {
      console.error('Failed to submit reservation');
    }
  };

  return (
    <section className="my-8 mt-24 mb-24">
      <h2 className="text-3xl font-bold text-center mb-6">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
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
          <select value={service} onChange={(e) => setService(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg" required>
            <option value="Haircuts and styling">Haircuts and styling</option>
            <option value="Manicure and pedicure">Manicure and pedicure</option>
            <option value="Facial treatments">Facial treatments</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <DatePickerDemo date={date} setDate={setDate} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Time</label>
          <select value={time} onChange={(e) => setTime(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg" required>
            {generateTimeSlots().map(slot => (
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
