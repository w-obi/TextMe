import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export let CURRENT_USER_ID: string | undefined = "";

export async function fetchUsers(): Promise<User[]> {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return data ?? [];
}

export async function fetchUsersChat(): Promise<UsersChat[]> {
  const {data: user, error: userError} = await supabase.from("users").select("contacts").eq("id", CURRENT_USER_ID).single();

  if (userError) throw userError;

  const contacts = user?.contacts ?? [];

  const res = await supabase.from("users_with_last_message").select("*").in("email", contacts);

  if (res.error) throw res.error;

  return (res.data ?? []) as UsersChat[];
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
  const {data: authData, error: authError} = await supabase.auth.signInWithPassword({email, password});
  CURRENT_USER_ID = authData.user?.id;
  if (authError) throw authError;
}

export async function createNewUser(
  email: string,
  password: string,
  username: string
) {
    const { data: regData, error: regError } = await signUpNewUser(
      email,
      password
    );

    if (regError) throw regError;

    const userId = regData.user?.id;
    CURRENT_USER_ID = regData.user?.id;
    const created_at = regData.user?.created_at ?? new Date().toISOString();

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

export async function addContacts(newContact: string) {
  const {data: user, error: userError} = await supabase.from("users").select("contacts").eq("id", CURRENT_USER_ID).single();

  if (userError) throw userError;

  const contacts: string[] = user?.contacts ?? [];

  if (contacts.includes(newContact)) return;

  const updatedContacts = [...contacts, newContact];

  const res = await supabase.from("users").update({contacts: updatedContacts}).eq("id", CURRENT_USER_ID);

  if (res.error) throw res.error;
}