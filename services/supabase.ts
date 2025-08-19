import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function fetchUsers(): Promise<User[]> {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return data ?? [];
}

export async function fetchMessages(): Promise<Message[]> {
  const { data, error } = await supabase.from("messages")
                                        .select("*")
                                        .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

async function signUpNewUser(email: string, password: string) {
  const result = await supabase.auth.signUp({email, password});
  return result;
}

export async function signInWithEmail(email: string, password: string) {
  const result = await supabase.auth.signInWithPassword({email, password});
  return result;
}

export async function createNewUser(
  email: string,
  password: string,
  username: string
) {
    const { data: authData, error: authError } = await signUpNewUser(
      email,
      password
    );

    if (authError) throw authError;

    const userId = authData.user?.id;
    const created_at = authData.user?.created_at ?? new Date().toISOString();

    if (!userId) throw new Error("createNewUser: no user id returned from supabase after sign up")

    const { error: insertError } = await supabase.from("users").insert([
      {
        id: userId,
        created_at,
        username,
        email
      },
    ]).select().single();

    if (insertError) throw insertError;
}
