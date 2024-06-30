import Image from "next/image";
const services = [
  {
    title: "Haircuts and Styling",
    description: "Experience the best haircuts and styling from our expert stylists.",
    image: "/serviceImage/haircuts.webp", 
  },
  {
    title: "Manicure and Pedicure",
    description: "Pamper yourself with our luxurious manicure and pedicure services.",
    image: "/serviceImage/manicure.webp", 
  },
  {
    title: "Facial Treatments",
    description: "Rejuvenate your skin with our signature facial treatments.",
    image: "/serviceImage/facial.webp", 
  },
];

const Services = () => {
  return (
    <section className="my-8">
      <h2 className="text-3xl font-bold text-center mb-6">Our Main Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-6 rounded-lg  shadow-md">
            <Image src={service.image} alt={service.title}  width={500} height={375} className="rounded-lg mx-auto   " />
            <h3 className="text-xl font-semibold mt-4 ml-9">{service.title}</h3>
            <p className="mt-2 ml-9">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
