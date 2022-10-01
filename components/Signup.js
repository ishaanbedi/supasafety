import Image from "next/image";
import React, { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import supabase from "../utils/supabase";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const handleGoogleSignup = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signIn(
      { provider: "google" },
      {
        redirectTo: 'http://localhost:3000',
      }
    );
    if (error) {
      alert(error.message);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex">
      <div className="m-auto max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Security tool for your{" "}
            <strong className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-red-800 sm:block">
              Loved Ones
            </strong>
          </h1>

          <p className="mt-4 sm:leading-relaxed sm:text-xl">
            A project by Bhavya, Ishar & Ishaan
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button
              type="submit"
              className="flex justify-evenly w-72 py-4 ml-3 text-base text-white bg-red-500 hover:bg-red-500/90 rounded-lg font-semibold"
              onClick={(e) => {
                handleGoogleSignup(e);
              }}
            >
              <BsGoogle className="mt-1" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
