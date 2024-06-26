"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ReservationForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Haircuts and styling");
  const [dateTime, setDateTime] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/reservation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, service, dateTime }),
    });

    if (response.ok) {
      setName("");
      setPhone("");
      setService("Haircuts and styling");
      setDateTime("");
      router.refresh();
    } else {
      // Handle error
      console.error('Failed to submit reservation');
    }
  };

  return (
    <section className="my-8  mt-24 mb-24">
      <h2 className="text-3xl font-bold text-center mb-6">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Active Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Type of Service</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg"
            required
          >
            <option value="Haircuts and styling">Haircuts and styling</option>
            <option value="Manicure and pedicure">Manicure and pedicure</option>
            <option value="Facial treatments">Facial treatments</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date and Time</label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg"
            required
            min="2023-01-01T09:00"
            max="2023-01-01T21:00"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Book Appointment
        </button>
      </form>
    </section>
  );
};

export default ReservationForm;
