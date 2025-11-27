import React, { useEffect, useState } from "react";
import { getBookingApi, DeleteBookingApi } from "../services/AllApi";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertMsg, setAlertMsg] = useState("");

  // Fetch bookings
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getBookingApi();
      if (response.status === 200) {
        setBookings(response.data);
      }
    } catch (err) {
      console.log("Error loading bookings:", err);
    }
    setLoading(false);
  };

  // DELETE BOOKING + INSTANT UI UPDATE + POPUP
  const deleteBooking = async (id) => {
    try {
      const response = await DeleteBookingApi(id);

      if (response.status === 200) {
        // Instantly remove the booking from UI
        setBookings((prev) => prev.filter((b) => b._id !== id));

        // Show popup
        setAlertMsg("Booking cancelled successfully!");
        setTimeout(() => setAlertMsg(""), 2500);
      }
    } catch (err) {
      console.log("Delete error:", err);
      setAlertMsg("Failed to cancel booking");
      setTimeout(() => setAlertMsg(""), 2500);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center text-xl font-semibold text-gray-700">
        Loading your bookings...
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center text-lg text-gray-600">
        You have no bookings yet.
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-16 max-w-5xl mx-auto">

      {/* POPUP SLIDE-UP ALERT */}
      {alertMsg && (
        <div
          className="
            fixed bottom-5 left-1/2 -translate-x-1/2 
            bg-red-400 text-white px-6 py-3 rounded-lg 
            shadow-lg font-semibold text-center 
            animate-slideUp
          "
        >
          {alertMsg}
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translate(-50%, 40px); opacity: 0; }
          to   { transform: translate(-50%, 0px); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }
      `}</style>

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

      {/* BOOKINGS LIST */}
      <div className="grid gap-8">

        {bookings.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row"
          >
            {/* IMAGE */}
            <img
              src={item.hotelId?.image}
              alt={item.hotelId?.name}
              className="w-full md:w-60 h-48 object-cover"
            />

            {/* CONTENT */}
            <div className="p-5 flex flex-col justify-between w-full">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {item.hotelId?.name}
                </h2>

                <p className="text-gray-600 text-sm mt-1">
                  📍 {item.hotelId?.location}
                </p>

                <p className="text-gray-600 text-sm mt-3">
                  <strong>Check-in:</strong>{" "}
                  {new Date(item.checkIn).toDateString()}
                </p>

                <p className="text-gray-600 text-sm">
                  <strong>Check-out:</strong>{" "}
                  {new Date(item.checkOut).toDateString()}
                </p>

                <p className="text-indigo-600 font-semibold text-lg mt-3">
                  ₹{item.hotelId?.price}
                </p>
              </div>

              {/* BUTTONS */}
              <div className="mt-4 flex items-center justify-between">
                <span className="px-3 py-1 bg-green-200 text-green-700 rounded-lg text-sm font-medium">
                  Confirmed
                </span>

                <button
                  onClick={() => deleteBooking(item._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
                >
                  Cancel
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
