import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-950 text-gray-300 pt-16 pb-10 px-6 mt-20">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* BRAND */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-br from-indigo-500 to-rose-500 bg-clip-text text-transparent">
            Raynott Hotels
          </h2>
          <p className="mt-3 text-gray-400 leading-relaxed">
            Experience luxury, comfort, and elegance at our world-class hotels crafted
            for unforgettable stays.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-5 text-2xl mt-6">
            <a href="#" className="hover:text-indigo-400 transition transform hover:scale-110">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-indigo-400 transition transform hover:scale-110">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <a href="#" className="hover:text-indigo-400 transition transform hover:scale-110">
              <i className="fa-solid fa-phone"></i>
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li className="hover:text-indigo-400 transition">
              <a href="/">Home</a>
            </li>
            <li className="hover:text-indigo-400 transition">
              <a href="/hotellist">Hotels</a>
            </li>
            <li className="hover:text-indigo-400 transition">
              <a href="/about">About Us</a>
            </li>
            <li className="hover:text-indigo-400 transition">
              <a href="/enquiry">Enquiry</a>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>

          <p className="text-gray-400">📍 Mumbai, India</p>
          <p className="text-gray-400 mt-1">📞 +91 98765 43210</p>
          <p className="text-gray-400 mt-1">📧 support@raynotthotels.com</p>

          <p className="text-xs text-gray-500 mt-4">
            Available 24/7 for your convenience
          </p>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="text-center mt-12 border-t border-gray-800 pt-6">
        <p className="text-gray-500 text-sm">
          © 2025 <span className="text-white font-medium">Raynott Hotels</span>.
          All rights reserved.
        </p>
      </div>

    </footer>
  );
};

export default Footer;
