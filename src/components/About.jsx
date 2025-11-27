import React from "react";

const About = () => {
  return (
    <div className="w-full">

      {/* ----- HERO BANNER ----- */}
      <div
        className="w-full h-[60vh] bg-cover bg-center flex items-center justify-center relative text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1505761671935-60b3a7427bad')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <h1 className="relative z-10 text-4xl md:text-6xl font-extrabold drop-shadow-lg">
          About Raynott Hotels
        </h1>
      </div>

      {/* ----- ABOUT SECTION ----- */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>

        <p className="text-gray-700 leading-relaxed text-lg">
          Raynott Hotels is committed to providing luxurious hospitality with comfort,
          elegance, and world-class service. Our hotels are located in prime destinations 
          around the world, offering unforgettable experiences for family vacations, business 
          trips, and romantic getaways.
        </p>

        <p className="text-gray-700 leading-relaxed text-lg mt-4">
          With a focus on quality, comfort, and guest satisfaction, we continue to set 
          new standards in the hospitality industry. Your comfort and happiness are at 
          the heart of our mission.
        </p>
      </section>

      {/* ----- MISSION & VISION ----- */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">

        {/* Mission */}
        <div className="p-6 border rounded-xl shadow-md hover:shadow-xl transition">
          <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
          <p className="text-gray-700 text-lg">
            To redefine global hospitality by offering an unforgettable luxury 
            experience with comfort, trust, and exceptional service.
          </p>
        </div>

        {/* Vision */}
        <div className="p-6 border rounded-xl shadow-md hover:shadow-xl transition">
          <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
          <p className="text-gray-700 text-lg">
            To become the world’s most loved and trusted hotel brand, delivering 
            unforgettable stays and unmatched customer satisfaction.
          </p>
        </div>

      </section>

      {/* ----- HOTEL STATS SECTION ----- */}
      <section className="w-full bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">

          <div>
            <h3 className="text-4xl font-bold text-indigo-600">20+</h3>
            <p className="text-gray-700 mt-2">Years of Excellence</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-indigo-600">35+</h3>
            <p className="text-gray-700 mt-2">Hotel Branches</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-indigo-600">1M+</h3>
            <p className="text-gray-700 mt-2">Happy Guests</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-indigo-600">50+</h3>
            <p className="text-gray-700 mt-2">International Awards</p>
          </div>

        </div>
      </section>

      {/* ----- TEAM SECTION ----- */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          Meet Our Team
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">

          {/* Team Member 1 */}
          <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition text-center p-6">
            <img
              src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61"
              className="w-28 h-28 mx-auto rounded-full object-cover"
            />
            <h3 className="text-xl font-semibold mt-4">Arjun Mehta</h3>
            <p className="text-gray-600">CEO & Founder</p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition text-center p-6">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
              className="w-28 h-28 mx-auto rounded-full object-cover"
            />
            <h3 className="text-xl font-semibold mt-4">Samantha Lee</h3>
            <p className="text-gray-600">Hotel Operations Head</p>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition text-center p-6">
            <img
              src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39"
              className="w-28 h-28 mx-auto rounded-full object-cover"
            />
            <h3 className="text-xl font-semibold mt-4">Rahul Sharma</h3>
            <p className="text-gray-600">Guest Relations Manager</p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;
