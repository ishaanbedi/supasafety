import supabase from "../utils/supabase";
const getUser = async (e) => {
  const { data, error } = await supabase
    .from("emergency_contacts")
    .select("*")
    .eq("email", supabase.auth.user().email);
};
export default getUser;
