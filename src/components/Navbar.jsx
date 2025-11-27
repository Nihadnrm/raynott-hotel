import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false); // Mobile dropdown
    const nav = useNavigate();

    useEffect(() => {
        const storedUser = sessionStorage.getItem("userData");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userData");
        setUser(null);
        setMenuOpen(false);
        nav("/auth");
    };

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="w-full bg-white fixed top-0 left-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* NAVBAR */}
                <div className="h-16 flex items-center justify-between">

                    {/* LOGO */}
                    <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-rose-500 text-white flex items-center justify-center font-bold">
                            R
                        </div>

                        <div className="hidden sm:flex flex-col">
                            <span className="text-lg font-semibold">Raynott</span>
                            <span className="text-xs text-gray-500 -mt-1">Hotels</span>
                        </div>
                    </Link>

                    {/* DESKTOP MENU */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/" className="nav-item">Home</Link>
                        <Link to="/about" className="nav-item">About</Link>
                        <Link to="/hotellist" className="nav-item">Hotels</Link>
                        <Link to="/enquiry" className="nav-item">Enquiry</Link>

                        {/* SHOW ONLY WHEN LOGGED IN */}
                        {user && <Link to="/mybookings" className="nav-item">My Bookings</Link>}
                        <Link to="/admin" className="nav-item">Admin</Link>


                        {user ? (
                            <>
                                <span className="font-semibold text-gray-800">
                                    👋 {user.username}
                                </span>

                                <button onClick={handleLogout} className="btn-primary ">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/auth" className="text-indigo-600 font-semibold hover:underline">
                                Login
                            </Link>
                        )}
                    </nav>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden flex flex-col gap-1 cursor-pointer"
                    >
                        <span className={`w-6 h-[3px] bg-gray-700 rounded transition ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                        <span className={`w-6 h-[3px] bg-gray-700 rounded transition ${menuOpen ? "opacity-0" : ""}`}></span>
                        <span className={`w-6 h-[3px] bg-gray-700 rounded transition ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
                    </button>
                </div>
            </div>

            {/* MOBILE DROPDOWN */}
            <div
                className={`md:hidden bg-white shadow-md border-t transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <Link to="/" onClick={closeMenu} className="mobile-item">Home</Link>
                <Link to="/about" onClick={closeMenu} className="mobile-item">About</Link>
                <Link to="/hotellist" onClick={closeMenu} className="mobile-item">Hotels</Link>
                <Link to="/enquiry" onClick={closeMenu} className="mobile-item">Enquiry</Link>

                {/* SHOW ONLY WHEN LOGGED IN */}
                {user && (
                    <Link to="/mybookings" onClick={closeMenu} className="mobile-item">
                        My Bookings
                    </Link>
                )}
                <Link to="/admin" className="mobile-item">Admin</Link>


                {user ? (
                    <button
                        onClick={handleLogout}
                        className="mx-4 my-3 btn-primary w-[90%]"
                    >
                        Logout ({user.username})
                    </button>
                ) : (
                    <Link to="/auth" onClick={closeMenu} className="mobile-item text-indigo-600 font-semibold">
                        Login
                    </Link>
                )}
            </div>

            {/* EXTRA CSS */}
            <style>{`
        .nav-item {
          color: #374151;
          font-weight: 500;
        }
        .nav-item:hover {
          color: #4f46e5;
        }
        .mobile-item {
          display: block;
          padding: 12px 16px;
          color: #374151;
        }
        .mobile-item:hover {
          background: #f3f4f6;
        }
       .btn-primary {
  background: linear-gradient(to right, #6366f1, #f43f5e);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;      /* IMPORTANT: makes gradient show */
  font-weight: 700;
  padding: 8px 16px;
}
.btn-primary:hover {
  opacity: 0.8;
}
      `}</style>
        </header>
    );
};

export default Navbar;
