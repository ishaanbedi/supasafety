import Router from "next/router";
import { useEffect } from "react";
import supabase from "../utils/supabase";

const SignOut = () => {
  useEffect(() => {
    supabase.auth.signOut();
    Router.push("/");
  }, []);
  return <div>Logging out</div>;
};

export default SignOut;
