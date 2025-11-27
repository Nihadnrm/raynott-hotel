import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addHotelApi,
  getHotelApi,
  getAllBookingApi,
  getEnquiryApi
} from "../services/AllApi";

const AdminDashboard = () => {

    const navigate=useNavigate()
  const [activeSection, setActiveSection] = useState("addHotel");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [hotel, setHotel] = useState({
    name: "",
    country: "",
    location: "",
    price: "",
    rating: "",
    image: "",
  });

  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");

  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  // POPUP ALERT
  const showAlert = (msg, type = "success") => {
    setAlertMsg(msg);
    setAlertType(type);
    setTimeout(() => setAlertMsg(""), 2500);
  };

  // FETCH HOTELS
  const fetchAllHotels = async () => {
    try {
      const res = await getHotelApi();
      if (res.status === 200) setHotels(res.data);
    } catch {
      console.log("Hotels fetch failed");
    }
  };

  // FETCH BOOKINGS
  const fetchAllBookings = async () => {
    try {
      const res = await getAllBookingApi();
      if (res.status === 200) setBookings(res.data);
    } catch {
      console.log("Booking fetch failed");
    }
  };

  // FETCH ENQUIRIES
  const fetchAllEnquiries = async () => {
    try {
      const res = await getEnquiryApi();
      if (res.status === 200) setEnquiries(res.data);
    } catch {
      console.log("Enquiry fetch failed");
    }
  };

  useEffect(() => {
    fetchAllHotels();
    fetchAllBookings();
    fetchAllEnquiries();
  }, []);

  // ADD HOTEL
  const handleAddHotel = async () => {
    const { name, country, location, price, rating, image } = hotel;

    if (!name || !country || !location || !price || !rating || !image) {
      showAlert("Please fill all fields", "error");
      return;
    }

    try {
      const response = await addHotelApi(hotel);
      if (response.status === 200) {
        showAlert("Hotel added successfully!");

        setHotel({
          name: "",
          country: "",
          location: "",
          price: "",
          rating: "",
          image: "",
        });

        fetchAllHotels();
      }
    } catch {
      showAlert("Failed to add hotel", "error");
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white px-3 py-2 rounded-md shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* SIDEBAR */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg p-6 transition-all duration-300 z-40 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h1 className="text-2xl font-bold text-indigo-600 mb-10">Admin Panel</h1>

        <ul className="space-y-4">
          {/* ADD HOTEL */}
          <li
            className={`cursor-pointer px-4 py-2 rounded-lg font-semibold ${
              activeSection === "addHotel"
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => {
              setActiveSection("addHotel");
              setSidebarOpen(false);
            }}
          >
            ➕ Add Hotel
          </li>

          {/* ALL HOTELS */}
          <li
            className={`cursor-pointer px-4 py-2 rounded-lg font-semibold ${
              activeSection === "allHotels"
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => {
              setActiveSection("allHotels");
              setSidebarOpen(false);
            }}
          >
            🏨 All Hotels
          </li>

          {/* ALL BOOKINGS */}
          <li
            className={`cursor-pointer px-4 py-2 rounded-lg font-semibold ${
              activeSection === "bookings"
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => {
              setActiveSection("bookings");
              setSidebarOpen(false);
            }}
          >
            📘 All Bookings
          </li>

          {/*  – ENQUIRIES */}
          <li
            className={`cursor-pointer px-4 py-2 rounded-lg font-semibold ${
              activeSection === "enquiries"
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => {
              setActiveSection("enquiries");
              setSidebarOpen(false);
            }}
          >
            📩 Enquiries
          </li>
         <li
  className={`cursor-pointer px-4 py-2 rounded-lg font-semibold ${
    activeSection === "exit"
      ? "bg-indigo-600 text-white"
      : "hover:bg-gray-200"
  }`}
  onClick={() => {
    navigate("/");       
    setSidebarOpen(false);
  }}
>
  Exit
</li>

        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10 mt-12 md:mt-0">

        {/* ALERT POPUP */}
        {alertMsg && (
          <div
            className={`fixed top-5 right-5 px-5 py-3 rounded-lg text-white shadow-xl font-semibold 
          ${alertType === "success" ? "bg-green-600" : "bg-red-600"}`}
          >
            {alertMsg}
          </div>
        )}

        {/* ADD HOTEL SECTION */}
        {activeSection === "addHotel" && (
          <div className="bg-white p-8 shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-6">Add New Hotel</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Hotel Name"
                className="border px-4 py-3 rounded-lg"
                value={hotel.name}
                onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
              />

              <select
                className="border px-4 py-3 rounded-lg text-gray-600"
                value={hotel.country}
                onChange={(e) => setHotel({ ...hotel, country: e.target.value })}
              >
                <option value="">Select Country</option>
                <option>India</option>
                <option>Dubai</option>
                <option>Maldives</option>
                <option>Switzerland</option>
                <option>Thailand</option>
              </select>

              <input
                type="text"
                placeholder="City / Location"
                className="border px-4 py-3 rounded-lg"
                value={hotel.location}
                onChange={(e) => setHotel({ ...hotel, location: e.target.value })}
              />

              <input
                type="number"
                placeholder="Price per night"
                className="border px-4 py-3 rounded-lg"
                value={hotel.price}
                onChange={(e) => setHotel({ ...hotel, price: e.target.value })}
              />

              <input
                type="number"
                placeholder="Rating (1-5)"
                className="border px-4 py-3 rounded-lg"
                value={hotel.rating}
                onChange={(e) => setHotel({ ...hotel, rating: e.target.value })}
              />

              <input
                type="text"
                placeholder="Image URL"
                className="border px-4 py-3 rounded-lg md:col-span-2"
                value={hotel.image}
                onChange={(e) => setHotel({ ...hotel, image: e.target.value })}
              />
            </div>

            <button
              onClick={handleAddHotel}
              className="mt-6 bg-indigo-600 text-white font-semibold px-10 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Add Hotel
            </button>
          </div>
        )}

        {/* ALL HOTELS SECTION */}
        {activeSection === "allHotels" && (
          <div className="bg-white p-8 shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-6">All Hotels</h2>

            {hotels.length === 0 ? (
              <p className="text-gray-500 text-center">No hotels added yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {hotels.map((h) => (
                  <div key={h._id} className="border rounded-lg p-4 shadow-sm bg-white">
                    <img src={h.image} className="w-full h-40 object-cover rounded-lg" />
                    <h3 className="text-lg font-bold mt-3">{h.name}</h3>
                    <p className="text-gray-600">📍 {h.location}</p>
                    <p className="text-indigo-600 font-semibold mt-2">₹{h.price} / night</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ALL BOOKINGS SECTION */}
        {activeSection === "bookings" && (
          <div className="bg-white p-8 shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-6">All Bookings</h2>

            {bookings.length === 0 ? (
              <p>No bookings found.</p>
            ) : (
              <div className="grid gap-6">
                {bookings.map((b) => (
                  <div key={b._id} className="border rounded-lg p-5 shadow-md flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-48">
                      <img
                        src={b.hotelId?.image}
                        className="w-full h-40 object-cover rounded-lg"
                        alt=""
                      />
                    </div>

                    <div className="flex-1">
                      <h2 className="text-xl font-bold">{b.hotelId?.name}</h2>
                      <p className="text-gray-600">📍 {b.hotelId?.location}</p>

                      <p><strong>Guest:</strong> {b.name}</p>
                      <p><strong>Email:</strong> {b.email}</p>

                      <p className="mt-2">
                        <strong>Check-in:</strong> {b.checkIn.slice(0, 10)}
                      </p>
                      <p>
                        <strong>Check-out:</strong> {b.checkOut.slice(0, 10)}
                      </p>
                    </div>

                    <div className="md:flex items-center">
                      <span className="px-3 py-1 bg-green-200 text-green-700 rounded-lg">
                        Confirmed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= ENQUIRIES SECTION ================= */}
        {activeSection === "enquiries" && (
          <div className="bg-white p-8 shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-6">All Enquiries</h2>

            {enquiries.length === 0 ? (
              <p className="text-gray-500 text-center">No enquiries submitted yet.</p>
            ) : (
              <div className="grid gap-6">
                {enquiries.map((q) => (
                  <div key={q._id} className="border p-5 rounded-lg shadow bg-white">
                    <h3 className="text-lg font-bold text-indigo-700">{q.name}</h3>
                    <p className="text-gray-700"><strong>Email:</strong> {q.email}</p>

                    <p className="mt-2 text-gray-800">
                      <strong>Message:</strong> {q.message}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                      📅 {q.createdAt?.slice(0, 10)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
