
import Services from '../service';
import ReviewForm from '../reviewForm';

import Image from 'next/image';
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
  return (
    <div>
      <Services />
      {/* <section className="my-8">
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
      </section> */}
      <ReviewForm />

    </div>
  );
};

export default Home;
