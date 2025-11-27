import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addBookingApi, getBookedDatesApi } from "../services/AllApi";

const BookingPage = () => {
  const location = useLocation();
  const hotel = location.state?.hotel;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
  });

  const [bookedDates, setBookedDates] = useState([]);
  const [popup, setPopup] = useState({ show: false, msg: "", type: "" });

  const showPopup = (msg, type = "error") => {
    setPopup({ show: true, msg, type });
    setTimeout(() => setPopup({ show: false, msg: "", type: "" }), 2500);
  };

  // ========= FETCH BOOKED DATES ============
  useEffect(() => {
    if (hotel?._id) loadBookedDates();
  }, [hotel]);

  const loadBookedDates = async () => {
    try {
      const res = await getBookedDatesApi(hotel._id);

      if (res.status === 200) {
        const dates = res.data.map((d) =>
          new Date(d).toISOString().split("T")[0]
        );
        setBookedDates(dates);
      }
    } catch (err) {
      console.log("Failed to load booked dates", err);
    }
  };

  if (!hotel) {
    return (
      <div className="w-full h-[70vh] flex justify-center items-center text-red-600 text-lg font-semibold">
        No hotel selected!
      </div>
    );
  }

  // Calculate nights
  const calculateNights = () => {
    if (!form.checkIn || !form.checkOut) return 1;

    const inDate = new Date(form.checkIn);
    const outDate = new Date(form.checkOut);
    const diff = outDate - inDate;

    const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };

  const totalPrice = hotel.price * calculateNights();

  // =========== HANDLE BOOKING ==========
  const handleBooking = async () => {
    if (!form.name || !form.email || !form.phone || !form.checkIn || !form.checkOut) {
      showPopup("Please fill all fields!", "error");
      return;
    }

    // ❌ Prevent booking unavailable dates
    let current = new Date(form.checkIn);
    const end = new Date(form.checkOut);

    while (current <= end) {
      const d = current.toISOString().split("T")[0];
      if (bookedDates.includes(d)) {
        showPopup("Selected date range includes unavailable dates!", "error");
        return;
      }
      current.setDate(current.getDate() + 1);
    }

    const user = JSON.parse(sessionStorage.getItem("userData"));

    const bookingData = {
      userId: user?._id,
      hotelId: hotel._id,
      name: form.name,
      email: form.email,
      phone: form.phone,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
    };

    try {
      const response = await addBookingApi(bookingData);

      if (response.status === 200) {
        showPopup("Booking Successful!", "success");

        setTimeout(() => {
          navigate("/success", { state: { booking: bookingData } });
        }, 800);
      }
    } catch (err) {
      console.log(err);
      showPopup("Booking failed. Try again.", "error");
    }
  };

  return (
    <div className="w-full py-16 px-6 max-w-3xl mx-auto">

      {/* Popup */}
      {popup.show && (
        <div
          className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white font-semibold 
            ${popup.type === "success" ? "bg-green-400" : "bg-red-400"}`}
        >
          {popup.msg}
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Booking</h1>

      {/* HOTEL */}
      <div className="bg-white shadow-lg rounded-lg p-5 flex gap-4 mb-8">
        <img src={hotel.image} className="w-32 h-24 object-cover rounded-lg" />
        <div>
          <h2 className="text-xl font-bold">{hotel.name}</h2>
          <p className="text-gray-600 text-sm">📍 {hotel.location}</p>
          <p className="text-indigo-600 font-semibold text-lg mt-1">
            ₹{hotel.price} / night
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white shadow-lg rounded-lg p-6">

        <h2 className="text-xl font-semibold mb-4">Your Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Full Name" className="border px-4 py-3 rounded-lg"
            onChange={(e) => setForm({ ...form, name: e.target.value })} />

          <input type="email" placeholder="Email Address" className="border px-4 py-3 rounded-lg"
            onChange={(e) => setForm({ ...form, email: e.target.value })} />

          <input type="text" placeholder="Phone Number" className="border px-4 py-3 rounded-lg"
            onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-4">Stay Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* CHECK-IN */}
          <div>
            <label className="text-gray-600 text-sm">Check-in Date</label>
            <input
              type="date"
              className={`border w-full px-4 py-3 rounded-lg mt-1 ${
                bookedDates.includes(form.checkIn) ? "bg-red-200 border-red-500" : ""
              }`}
              value={form.checkIn}
              onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
              min={new Date().toISOString().split("T")[0]}
            />

            {bookedDates.includes(form.checkIn) && (
              <p className="text-red-600 text-sm mt-1">❌ This date is unavailable</p>
            )}
          </div>

          {/* CHECK-OUT */}
          <div>
            <label className="text-gray-600 text-sm">Check-out Date</label>
            <input
              type="date"
              className={`border w-full px-4 py-3 rounded-lg mt-1 ${
                bookedDates.includes(form.checkOut) ? "bg-red-200 border-red-500" : ""
              }`}
              value={form.checkOut}
              onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
              min={form.checkIn}
            />

            {bookedDates.includes(form.checkOut) && (
              <p className="text-red-600 text-sm mt-1">❌ This date is unavailable</p>
            )}
          </div>
        </div>

        {/* PRICE */}
        <div className="mt-8 p-4 bg-gray-50 border rounded-lg flex justify-between items-center">
          <h3 className="text-lg font-semibold">Total Price</h3>
          <p className="text-indigo-600 font-bold text-xl">₹{totalPrice}</p>
        </div>

        <button
          onClick={handleBooking}
          className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Confirm Booking
        </button>

      </div>
    </div>
  );
};

export default BookingPage;
