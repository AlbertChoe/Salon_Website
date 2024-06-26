const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-8 m">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold">SEA Salon</h2>
        <p className="italic mb-4">“Beauty and Elegance Redefined”</p>
        <p>Contact Us</p>
        <p>Thomas: 08123456789</p>
        <p>Sekar: 08164829372</p>
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
  );
};

export default Footer;
