import Link from "next/link";
import React from "react";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { FaMapMarkedAlt } from "react-icons/fa";
const Navbar = () => {
  const routes = [
    {
      name: "Home",
      icon: <AiOutlineHome />,
      link: "/",
    },
    {
      name: "Map",
      icon: <FaMapMarkedAlt />,
      link: "/map",
    },
    {
      name: "Profile",
      icon: <AiOutlineUser />,
      link: "/user",
    },
  ];

  return (
    <nav className="flex w-screen justify-center gap-9 fixed bottom-1 bg-white shadow-2xl">
      {routes.map((route, index) => (
        <span
          key={index}
          className="cursor-pointer my-4 text-gray-500 hover:text-gray-600 lg:md:text-4xl text-3xl mx-6"
        >
          <Link href={route.link}>
            <span>{route.icon}</span>
          </Link>
        </span>
      ))}
    </nav>
  );
};

export default Navbar;
