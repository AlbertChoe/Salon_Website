import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-8">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-2">SEA Salon</h2>
        <p className="italic mb-4">“Beauty and Elegance Redefined”</p>
        <div className="mb-4">
          <p className="font-semibold">Contact Us</p>
          <p>Thomas: 08123456789</p>
          <p>Sekar: 08164829372</p>
        </div>
        <div className="flex justify-center space-x-6 mt-4 mb-4">
  
          <Link href="https://www.instagram.com/albert__choe/" className="text-white hover:text-gray-300" target="_blank" 
  rel="noopener noreferrer">
            
              <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
            
          </Link>
          <Link href="https://www.linkedin.com/in/albertchoe2004/" className="text-white hover:text-gray-300" target="_blank" 
  rel="noopener noreferrer">
            
              <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
            
          </Link>
        </div>
        <div className="border-t border-gray-400 pt-4 mt-4 text-center">
        <p>&copy; {new Date().getFullYear()} SEA Salon. All rights reserved.</p>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
