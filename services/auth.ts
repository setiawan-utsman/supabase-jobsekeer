import { supabase } from "@/lib/supabaseClient";

export async function registerUser(params:any) {
  const { data, error } = await supabase.auth.signUp({
    email: params.email,
    password: params.password,
  });

  if (error) throw error;
  return data;
}

export const loginUser = async (params:any) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: params.email,
    password: params.password,
  });
  if (error) throw error;
  return data;
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;

  // Hapus cookie server-side
//   await fetch("/api/logout", { method: "POST" });

  return true;
};
