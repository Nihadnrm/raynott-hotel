import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getHotelApi } from "../services/AllApi";

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  // SEARCH STATES
  const [country, setCountry] = useState("");
  const [locationText, setLocationText] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const fetchFeatured = async () => {
    try {
      const res = await getHotelApi();
      if (res.status === 200) setFeatured(res.data.slice(0, 3));
    } catch (err) {
      console.log("Failed to load featured hotels");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFeatured();
  }, []);

  const handleSearch = () => {
    navigate(
      `/hotellist?country=${country}&location=${locationText}&date=${date}`
    );
  };

  const directToSingle = (id) => navigate(`/hotelpage/${id}`);

  return (
    <div className="w-full">

      {/* HERO */}
      <section
        className="w-full h-[80vh] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/cd/f7/61/cdf76142f651d9387bc2fbd3741cfab5.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="text-center px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg animate-fadeIn">
            Welcome to Raynott Hotels
          </h1>
          <p className="mt-4 text-lg md:text-xl drop-shadow-lg opacity-90">
            Discover luxury, comfort, and world-class hospitality.
          </p>
        </div>
      </section>

      {/* SEARCH BAR */}
         {/* SEARCH BAR */}
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-8 -mt-16 relative z-10 border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            onChange={(e) => setCountry(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>Select country</option>
            <option>India</option>
            <option>Dubai</option>
            <option>maldives</option>
            <option>thailand</option>
          </select>

          <input
            type="text"
            placeholder="Enter destination"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            onChange={(e) => setLocationText(e.target.value)}
          />

          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            onChange={(e) => setDate(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className="w-full bg-indigo-600 text-white font-semibold rounded-lg px-4 py-3 hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
          >
            Search
          </button>
        </div>
      </div>


      {/* POPULAR DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">Popular Destinations</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <DestinationCard img="https://www.sunsiyam.com/media/qnfnzgmq/ssiv_general_04.jpg" name="Maldives" />
          <DestinationCard img="https://static.toiimg.com/thumb/msid-113370310,width-748,height-499/resizemode-4/imgsize-216138/.jpg" name="Switzerland" />
          <DestinationCard img="https://t4.ftcdn.net/jpg/01/80/78/75/360_F_180787547_2tJQRGs7f6QMuTetPwh5SxzafHLcxd8q.jpg" name="Dubai" />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10">What Our Guests Say</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <ReviewCard text="Amazing stay! Beautiful rooms." user="John D." />
          <ReviewCard text="Best vacation ever!" user="Sarah P." />
          <ReviewCard text="Top-class service!" user="Ahmed K." />
        </div>
      </section>

      {/* FEATURED HOTELS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Featured Hotels</h2>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((h) => (
              <div key={h._id} className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-2xl transition">
                <img src={h.image} className="w-full h-48 object-cover" />

                <div className="p-4">
                  <h3 className="text-lg font-semibold">{h.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">📍 {h.location}</p>

                  <button
                    onClick={() => directToSingle(h._id)}
                    className="text-indigo-600 mt-3 inline-block font-medium hover:underline"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* GET MORE */}
      <div className="flex justify-center pb-10">
        <Link
          className="px-1 py-1 rounded-lg bg-gradient-to-br from-indigo-500 to-rose-500 text-white hover:from-indigo-600 hover:to-rose-600 transition"
          to={"/hotellist"}
        >
         - Get More -
        </Link>
      </div>
    </div>
  );
};

/* DESTINATION CARD */
const DestinationCard = ({ img, name }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/hotellist?country=${name}`)}
      className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
    >
      <img src={img} className="w-full h-56 object-cover group-hover:scale-110 transition" />

      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition">
        {name}
      </div>
    </div>
  );
};

const ReviewCard = ({ text, user }) => (
  <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
    <p className="italic text-gray-700">"{text}"</p>
    <h4 className="mt-4 font-semibold text-gray-900">— {user}</h4>
  </div>
);

const SkeletonCard = () => (
  <div className="bg-gray-200 animate-pulse h-64 rounded-xl"></div>
);

export default HomePage;
