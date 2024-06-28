"use client"
import Services from '../service';
import ReviewForm from '../reviewForm';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi
} from "@/components/ui/carousel";
import { useEffect, useState, useCallback, useRef } from 'react';

interface Testimonial {
  name: string;
  rating: number;
  comment: string;
}

const Home: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (carouselApi) {
        carouselApi.scrollNext();
      }
    }, 3000); 

    return () => clearInterval(intervalId);
  }, [carouselApi]);

  return (
    <div>
      <Services />
      <section className="my-8">
        <h2 className="text-3xl font-bold text-center mb-6">Customer Testimonials</h2>
        <Carousel className="w-full max-w-2xl mx-auto mb-20" setApi={setCarouselApi}>
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-center">{testimonial.name}</h3>
                      <p className="text-center text-yellow-500 mt-2">Rating: {testimonial.rating} Stars</p>
                      <p className="mt-4 text-center text-gray-700">{testimonial.comment}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      <ReviewForm />
    </div>
  );
};

export default Home;
