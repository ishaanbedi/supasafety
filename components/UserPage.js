import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { BsChevronRight } from "react-icons/bs";
import supabase from "../utils/supabase";
import Link from "next/link";
const UserPage = () => {
  const [name, setName] = useState(null);
  const route = [
    {
      name: "Your Details",
      link: "/",
    },
    {
      name: "Emergency Contacts",
      link: "/emergency-contact",
    },
    {
      name: "FAQ",
      link: "/",
    },
    {
      name: "Help",
      link: "/",
    },
    {
      name: "About",
      link: "/",
    },
    {
      name: "Sign Out",
      link: "/sign-out",
    },
  ];
  useEffect(() => {
    const user = supabase.auth.user();
    try {
      setName(user.user_metadata.full_name);
    } catch (error) {
      setName("User");
    }
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <div className="flex flex-col gap-8 pt-28">
        <h1 className="text-4xl text-red-500 pl-7">Hi {name}!</h1>
        <div>
          {route.map((item, index) => (
            <Link href={item.link} key={index}>
              <div className="cursor-pointer border-b-[1px] mx-6 border-black hover:text-black/60 border-opacity-50 flex opacity-70 mt-6">
                <p className="mr-auto text-xl">{item.name}</p>
                <BsChevronRight />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default UserPage;
