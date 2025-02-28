import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSearch, FaSignOutAlt } from "react-icons/fa";
import defaultAvatar from "../assests/s10.jpg";
const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:5000/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        let data = await response.json();
        setUser(data); // Update user state
        localStorage.setItem("user", JSON.stringify(data)); // Store in localStorage
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // 👇 Watch `user` state changes
  useEffect(() => {
    console.log("Updated User:", user);
  }, [user]); // This will trigger re-render

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and App Name */}
        <div className="text-xl font-bold">
          <Link to="/">Movie App</Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/MovieHome" className="hover:text-gray-300">
            Movie Home
          </Link>
          <Link to="/MovieForm" className="hover:text-gray-300">
            Add Movie
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="flex items-center">
          

          {/* Profile Picture */}
          <Link to="/profile" className="hover:opacity-80 mr-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <img
                src={user.user.ProfileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center text-sm bg-red-600 hover:bg-red-700 py-1 px-3 rounded transition duration-300"
          >
            <FaSignOutAlt className="mr-1" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
