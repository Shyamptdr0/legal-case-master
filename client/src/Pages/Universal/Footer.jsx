import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 fixed bottom-0 w-full">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-xl font-semibold mb-4">About Us</h4>
            <p>Your website's mission or a brief description of your organization.</p>
          </div>
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="list-none">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/profile" className="text-gray-300 hover:text-white">Profile</Link></li>
              <li><Link to="/editprofile" className="text-gray-300 hover:text-white">Edit Profile</Link></li>
              {/* Add more quick links here */}
            </ul>
          </div>
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p>Email: example@example.com</p>
            <p>Phone: 123-456-7890</p>
            {/* Add social media links/icons here */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
