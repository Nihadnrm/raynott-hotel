import React, { useEffect, useState } from "react";
import { getHotelApi } from "../services/AllApi";
import { Link, useLocation, useNavigate } from "react-router-dom";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const selectedCountry = query.get("country");
  const selectedLocation = query.get("location");
  const selectedDate = query.get("date");

  const fetchHotels = async () => {
    try {
      const response = await getHotelApi();

      if (response.status === 200) {
        let all = response.data;

        if (selectedCountry) {
          all = all.filter(
            (h) =>
              h.country?.toLowerCase() === selectedCountry.toLowerCase()
          );
        }

        if (selectedLocation) {
          all = all.filter((h) =>
            h.location
              ?.toLowerCase()
              .includes(selectedLocation.toLowerCase())
          );
        }

        if (selectedDate) {
          all = all.filter((h) => !h.bookedDates?.includes(selectedDate));
        }

        setHotels(all);
      }
    } catch (err) {
      console.log("Error fetching hotels:", err);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [location.search]);

  return (
    <div className="w-full px-6 py-16 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Hotels
      </h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition"
            >
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold">{hotel.name}</h3>

                <p className="text-gray-600 text-sm mt-1">
                  📍 {hotel.location}
                </p>

                <p className="text-indigo-600 font-bold text-lg mt-2">
                  ₹{hotel.price} / night
                </p>

                <button
                  onClick={() => navigate(`/hotelpage/${hotel._id}`)}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg">No hotels found.</p>
        )}
      </div>
    </div>
  );
};

export default HotelList;
