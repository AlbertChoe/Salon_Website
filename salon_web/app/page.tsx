"use client";

import Image from "next/image";
import { useState } from "react";

const services = [
  {
    title: "Haircuts and Styling",
    description: "Experience the best haircuts and styling from our expert stylists.",
    image: "/images/haircut.jpg", // Replace with the actual path
  },
  {
    title: "Manicure and Pedicure",
    description: "Pamper yourself with our luxurious manicure and pedicure services.",
    image: "/images/manicure.jpg", // Replace with the actual path
  },
  {
    title: "Facial Treatments",
    description: "Rejuvenate your skin with our signature facial treatments.",
    image: "/images/facial.jpg", // Replace with the actual path
  },
];

const testimonials = [
  {
    name: "Jane Doe",
    rating: 5,
    comment: "SEA Salon offers the best haircut experience! The staff is friendly and professional. Highly recommend!",
    image: "/images/testimonial1.jpg", // Replace with the actual path
  },
  {
    name: "John Smith",
    rating: 5,
    comment: "I had an amazing manicure and pedicure session. The atmosphere is so relaxing, and the service is top-notch!",
    image: "/images/testimonial2.jpg", // Replace with the actual path
  },
  {
    name: "Emily Johnson",
    rating: 5,
    comment: "The facial treatments at SEA Salon are fantastic. My skin feels rejuvenated and glowing. Will definitely come back!",
    image: "/images/testimonial3.jpg", // Replace with the actual path
  },
];

const Home = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({ name, rating, comment });
    setName("");
    setRating(1);
    setComment("");
  };

  return (
    <main>
    <div className="container mx-auto px-4">
      <section className="my-8">
        <h2 className="text-3xl font-bold text-center mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <Image src={service.image} alt={service.title} width={400} height={300} className="rounded-lg" />
              <h3 className="text-xl font-semibold mt-4">{service.title}</h3>
              <p className="mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="my-8">
        <h2 className="text-3xl font-bold text-center mb-6">Customer Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <Image src={testimonial.image} alt={testimonial.name} width={100} height={100} className="rounded-full mx-auto" />
              <h3 className="text-xl font-semibold mt-4 text-center">{testimonial.name}</h3>
              <p className="text-center mt-2">Rating: {testimonial.rating} Stars</p>
              <p className="mt-4">{testimonial.comment}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="my-8">
        <h2 className="text-3xl font-bold text-center mb-6">Leave a Review</h2>
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
            <label className="block text-gray-700">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} Star{star > 1 && "s"}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-lg"
              rows={4}
              required
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Submit Review
          </button>
        </form>
      </section>

      <footer className="bg-blue-600 text-white py-8 mt-8">
        <div className="container mx-auto text-center">
          <p>Contact Us</p>
          <p>123 Salon St, City, Country</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: info@seasalon.com</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </footer>
    </div></main>
  );
};

export default Home;
