"use client";
import Services from './service';
import ReviewForm from './reviewForm';
import TestimonialCarousel from './testimoniCarousel';
import { useEffect, useState } from 'react';

interface Testimonial {
  name: string;
  rating: number;
  comment: string;
}

const Home: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    async function fetchTestimonials() {
      const response = await fetch('/api/review');
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data.reviews);
      }
    }

    fetchTestimonials();
  }, []);

  return (
    <div>
      <Services />
      <section className="my-8">
        <h2 className="text-3xl font-bold text-center mb-6">Customer Testimonials</h2>
        <TestimonialCarousel testimonials={testimonials} />
      </section>
      <ReviewForm />
    </div>
  );
};

export default Home;
