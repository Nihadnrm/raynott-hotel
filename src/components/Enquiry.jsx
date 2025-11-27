import React, { useState } from "react";
import { AddEnquiryApi } from "../services/AllApi";

const Enquiry = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [popup, setPopup] = useState({ show: false, msg: "", type: "" });
  const [loading, setLoading] = useState(false);

  const showPopup = (msg, type = "success") => {
    setPopup({ show: true, msg, type });
    setTimeout(() => setPopup({ show: false, msg: "", type: "" }), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      showPopup("Please fill required fields!", "error");
      return;
    }

    try {
      setLoading(true);
      const response = await AddEnquiryApi(form);

      if (response.status === 200) {
        showPopup("Enquiry sent successfully!", "success");
        setForm({ name: "", email: "", message: "" });
      } else {
        showPopup("Failed to send enquiry!", "error");
      }
    } catch (err) {
      console.log(err);
      showPopup("Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      {/* Popup */}
      {popup.show && (
        <div
          className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-5 py-3 rounded-lg text-white font-semibold shadow-lg transition-all duration-500
            ${popup.type === "success" ? "bg-blue-400" : "bg-red-400"}
            animate-slideUp`}
        >
          {popup.msg}
        </div>
      )}

      {/* Animation */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0px); }
        }
        .animate-slideUp { animation: slideUp .4s ease forwards; }
      `}</style>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center">
        Head Office
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Form */}
        <div className="bg-white shadow-md p-8 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Send us an enquiry</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Your Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg outline-none focus:border-indigo-600"
            />

            <input
              type="email"
              placeholder="Email Address *"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg outline-none focus:border-indigo-600"
            />

            <textarea
              placeholder="Your Message *"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg h-32 outline-none resize-none focus:border-indigo-600"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white rounded-lg font-semibold transition 
                ${loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}`}
            >
              {loading ? "Sending..." : "Send Enquiry"}
            </button>

          </form>
        </div>

        {/* Map */}
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <iframe
            title="Head Office Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1164232836!2d72.74109918071159!3d19.082197839170457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce4b0b1b7f7f%3A0x7f6e3f6f0b1b3a1a!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1629983456789"
            className="w-full h-[400px]"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default Enquiry;
