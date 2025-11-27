import React from "react";
import { useNavigate } from "react-router-dom";

const HotelCard = ({ id, image, name, price, rating }) => {
  const navigate = useNavigate();

  const directToSingle = () => {
    navigate(`/hotelpage/${id}`);
  };

  return (
    <div
      onClick={directToSingle}
      className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
    >
      {/* Image */}
      <img src={image} alt={name} className="w-full h-48 object-cover" />

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>

        <div className="flex justify-between items-center mt-2">
          <span className="text-indigo-600 font-semibold">₹{price} / night</span>

          <span className="text-yellow-500 font-medium">⭐ {rating}</span>
        </div>

        <button
          onClick={directToSingle}
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
