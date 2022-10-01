import Head from "next/head";
import HomePage from "../components/HomePage";
import Signup from "../components/Signup";
import LoadingScreen from "../components/LoadingScreen";
import supabase from "../utils/supabase";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    checkUser();
  }, []);
  async function checkUser() {
    try {
      const user = await supabase.auth.user();
      setUser(user);
      if (user) {
        setLoggedIn(true);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        await checkUser();
      }
    );
    return () => {
      authListener.unsubscribe();
    };
  }, []);
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <main>
      <Head>
        <title>SupaSafety | Home</title>
      </Head>
      {loading ? (
        "Loading"
      ) : (
        <>{loggedIn ? <HomePage user={user} /> : <Signup />}</>
      )}
    </main>
  );
}
