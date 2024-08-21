import { FaFacebookSquare, FaInstagramSquare } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-gold-thin py-8 border-t border-gold-light font-roboto">
      <div className="w-full max-w-7xl mx-auto px-8 gap-4 md:flex md:justify-between md:items-start">
        {/* About Us Section */}
        <div className="mb-8 md:mb-0 md:w-3/6">
          <h2 className="font-playfair text-xl font-semibold mb-2">About Us</h2>
          <p className="text-sm text-gray-700">
            We are a small business dedicated to providing high-quality handmade crafts. Each piece is crafted with love and attention to detail.
          </p>
        </div>
        
        {/* Contact Us Section */}
        <div className="mb-8 md:mb-0 md:w-2/6">
          <h2 className="font-playfair text-xl font-semibold mb-2">Contact Us</h2>
          <p className="text-sm text-gray-700">Email: info@handicraftshop.com</p>
          <p className="text-sm text-gray-700">Phone: +123 456 7890</p>
          <p className="text-sm text-gray-700">Address: 123 Handicraft St., Craftsville</p>
        </div>
        
        {/* Follow Us Section */}
        <div className='md:w-1/6 '>
          <h2 className="font-playfair text-xl font-semibold mb-2">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="text-gold">
              <FaFacebookSquare size={24} />
            </a>
            <a href="#" aria-label="Instagram" className="text-gold">
              <FaInstagramSquare size={24} />
            </a>
          </div>
        </div>
      </div>
      
      <div className='w-full max-w-7xl mx-auto px-8 '>
        <div className="border-t border-gold-light mt-8 pt-4 text-center text-sm text-gray-700">
            © 2024 CO&#39;s Crochet. All rights reserved.
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
