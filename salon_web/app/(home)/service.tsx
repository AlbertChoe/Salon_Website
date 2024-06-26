import Image from "next/image";

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

const Services = () => {
  return (
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
  );
};

export default Services;
