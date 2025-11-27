import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleHotelApi } from "../services/AllApi";

const SingleHotelPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // FETCH HOTEL BY ID
  useEffect(() => {
    fetchHotel();
  }, []);

  const fetchHotel = async () => {
    try {
      const response = await getSingleHotelApi(id);
      if (response.status === 200) {
        setHotel(response.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center text-xl font-semibold text-gray-700">
        Loading hotel details...
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center text-xl font-semibold text-red-600">
        Hotel not found
      </div>
    );
  }

  const goToBooking = () => {
    navigate("/booking", { state: { hotel } });
  };

  return (
    <div className="w-full">

      {/* ----- BANNER ----- */}
      <div
        className="w-full h-[60vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url('${hotel.image}')` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold drop-shadow-2xl">
            {hotel.name}
          </h1>
          <p className="text-gray-200 text-lg mt-2 drop-shadow-lg">
            Luxury • Comfort • Elegance
          </p>
        </div>
      </div>

      {/* ----- MAIN CONTENT ----- */}
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* LOCATION + RATING + PRICE */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-gray-700 text-lg flex items-center gap-2">
            📍 {hotel.location}
          </p>

          <div className="flex items-center gap-6">
            <p className="text-yellow-500 font-semibold text-lg">
              ⭐ {hotel.rating} / 5
            </p>
            <p className="text-indigo-700 font-bold text-xl">
              ₹{hotel.price} / night
            </p>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-700 mt-6 text-lg leading-relaxed">
          {hotel.description}
        </p>

        {/* ----- GALLERY ----- */}
        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <img src={hotel.image} className="h-40 w-full object-cover rounded-xl shadow" />
          <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b" className="h-40 w-full object-cover rounded-xl shadow" />
          <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" className="h-40 w-full object-cover rounded-xl shadow" />
        </div>

        {/* ----- HIGHLIGHTS ----- */}
        <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-900">Highlights</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-1">🏊 Swimming Pool</h3>
            <p className="text-gray-600 text-sm">Luxury pool with temperature control.</p>
          </div>

          <div className="p-5 rounded-xl border shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-1">🍽 Fine Dining</h3>
            <p className="text-gray-600 text-sm">Premium multi-cuisine dining.</p>
          </div>

          <div className="p-5 rounded-xl border shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-1">🛏 Deluxe Rooms</h3>
            <p className="text-gray-600 text-sm">Elegant rooms with skyline view.</p>
          </div>
        </div>

        {/* ----- AMENITIES ----- */}
        <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-900">Amenities</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-gray-700">
          <p>✔ Free Wi-Fi</p>
          <p>✔ Room Service</p>
          <p>✔ Free Parking</p>
          <p>✔ Air Conditioning</p>
          <p>✔ Spa & Wellness</p>
          <p>✔ 24/7 Support</p>
        </div>

        {/* ----- BOOK NOW BUTTON (BUTTON VERSION) ----- */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={goToBooking}
            className="w-full md:w-64 bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition shadow-lg"
          >
            Book Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default SingleHotelPage;
