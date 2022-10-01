import React, { useState, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { MdOutlineLocationOn } from "react-icons/md";
import {
  BsFillTelephoneInboundFill,
  BsFillBellFill,
  BsFillCameraVideoFill,
} from "react-icons/bs";
import { MapContext } from "../context/mapContext";
import axios from "axios";
import supabase from "../utils/supabase";
const HomePage = (user) => {
  const [currentLocation, setCurrentLocaton] = useState(null);
  const { lat, long } = useContext(MapContext);
  const [sound, setSound] = useState(true);
  const [phoneNumber1, setPhoneNumber1] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const getUser = async (e) => {
      try {
        const { data, error } = await supabase
          .from("emergency_contacts")
          .select("*")
          .eq("email", supabase.auth.user().email);
        if (error) {
          alert(error.message);
        } else {
          setPhoneNumber1(data[0].emergency[0].phone1);
          setPhoneNumber2(data[0].emergency[1].phone2);
        }
      } catch {
        setPhoneNumber1("");
        setPhoneNumber2("");
      }
    };
    getUser();
    const user = supabase.auth.user();
    try {
      setUserName(user.user_metadata.full_name);
    } catch (error) {
      setUserName("User");
    }
  }, []);

  const sendSOS1 = async () => {
    const res = await fetch("/api/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: `+91${phoneNumber1}`,
        body: `It's an emergency for ${userName}. Location is http://maps.google.com/maps?q=${lat},${long}. You are receiving this message because ${userName} has listed you as an emergency contact.`,
      }),
    });
    if (res.status === 200) {
      alert("Message sent successfully");
    }
  };

  const sendSOS2 = async () => {
    const res = await fetch("/api/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: `+91${phoneNumber2}`,
        body: `It's an emergency for ${userName}. Location is http://maps.google.com/maps?q=${lat},${long}. You are receiving this message because ${userName} has listed you as an emergency contact.`,
      }),
    });
  };

  axios
    .get(
      `http://api.positionstack.com/v1/reverse?access_key=${process.env.NEXT_PUBLIC_REVERSE_MAP_KEY}&query=${lat},${long}`
    )
    .then((res) => {
      setCurrentLocaton(res.data.data[0].label);
    })
    .catch((err) => {
      console.log(err);
    });

  function play() {
    var audio = document.getElementById("a1");
    if (sound) {
      audio.play();
      setSound(false);
    } else {
      audio.pause();
      setSound(true);
    }
  }
  // function handleClick(){
  //   alert("hello")
  // }

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <div className="flex w-3/4 pt-8 ml-4 gap-1">
        <MdOutlineLocationOn className="lg:md:text-4xl  text-3xl lg:md:mt-0 mt-0.5 text-gray-500" />
        <p className="lg:md:text-3xl text-xl font-black text-gray-500 hover:underline underline-offset-4">
          {currentLocation === "Earth" ? "Loading..." : currentLocation}
        </p>
      </div>
      <div className="mx-auto mt-24">
        <div className="flex">
          <div
            onClick={() => window.open(`tel:${phoneNumber1}`)}
            className="cursor-pointer border bg-[#b59e0e] hover:bg-[#b59e0e]/80 w-44 h-44 flex items-center justify-center rounded-tl-full"
          >
            <BsFillTelephoneInboundFill className="lg:md:text-4xl text-3xl lg:md:mt-6 text-gray-100 ml-8" />
          </div>
          <div
            onClick={play}
            className="cursor-pointer border bg-[#a157f9] hover:bg-[#a157f9]/80 w-44 h-44 flex items-center justify-center rounded-tr-full"
          >
            <BsFillBellFill className="lg:md:text-4xl  text-3xl lg:md:mt-6 text-gray-100 mr-4" />
            <audio id="a1" src="/sirenSound.mp3"></audio>
          </div>
        </div>
        <div className="flex">
          <div className="cursor-pointer border bg-[#53b175] hover:bg-[#53b175]/80 w-44 h-44 flex items-center justify-center rounded-bl-full">
            <BsFillCameraVideoFill className="lg:md:text-4xl  text-3xl lg:md:mt-0 text-gray-100 ml-8" />
          </div>
          <div
            onClick={() => {
              sendSOS1();
              sendSOS2();
            }}
            className="cursor-pointer border bg-[#f94c57] hover:bg-[#f94c57]/80 w-44 h-44 flex items-center justify-center rounded-br-full"
          >
            <span className="lg:md:text-4xl  text-3xl lg:md:mt-0 text-gray-100 mr-8">
              SOS
            </span>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default HomePage;
