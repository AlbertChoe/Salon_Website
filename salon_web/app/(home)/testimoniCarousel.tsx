"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi
} from "@/components/ui/carousel";

interface Testimonial {
  name: string;
  rating: number;
  comment: string;
}

interface Props {
  testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<Props> = ({ testimonials }) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (carouselApi) {
        carouselApi.scrollNext();
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [carouselApi]);
  
  if (testimonials.length===0) {
    return (
      <div className="w-full max-w-2xl mx-auto mb-20 text-center">
        <p className="text-xl text-gray-700">
          Currently, there are no testimonials available. Check back later for updates!
        </p>
      </div>
    );
  }

  return (
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
  );
};

export default TestimonialCarousel;
