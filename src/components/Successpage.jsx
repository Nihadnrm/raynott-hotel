import React from "react";
import { Link } from "react-router-dom";

const Successpage = () => {
  return (
    <div className="w-full flex items-center justify-center py-20 px-6">

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">

        {/* ----- SUCCESS MESSAGE ----- */}
        <h1 className="text-3xl font-bold text-green-600">
          Your Booking is Confirmed! 🎉
        </h1>

        <p className="text-gray-600 mt-3 text-lg">
          Thank you for choosing Raynott Hotels.
        </p>

        {/* ----- BOOKING DETAILS ----- */}
       

        {/* ----- GO HOME BUTTON ----- */}
        <Link
          to="/"
          className="mt-8 inline-block w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Go Home
        </Link>

      </div>

    </div>
  );
};

export default Successpage;
