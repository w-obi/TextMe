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

export async function fetchChat(sender_id: string): Promise<MessageComp[]> {
  const {data, error} = await supabase.from("messages_with_users").select("*").or(
    `and(sender_id.eq.${CURRENT_USER_ID},receiver_id.eq.${sender_id}),and(sender_id.eq.${sender_id},receiver_id.eq.${CURRENT_USER_ID})`
  ).order("created_at", {ascending: true});
  
  if (error) throw error;
  return (data ?? []) as MessageComp[];
}

export async function fetchUsersChat(): Promise<PreviewUserChat[]> {
  const {data: currentUser, error: currentUserError} = await supabase.from("users").select("contacts").eq("id", CURRENT_USER_ID).single();
  if (currentUserError) throw currentUserError;

  const contacts: string[] = currentUser?.contacts ?? [];

  if (!contacts || contacts.length === 0) return [];

  const {data: message, error: messageError} = await supabase.from("users_with_last_message").select("*").or(
    `and(sender_id.eq.${CURRENT_USER_ID},receiver_email.in.(${contacts})),receiver_id.eq.${CURRENT_USER_ID}`
  ).order("created_at", { ascending: false });
  // and(receiver_id.eq.${CURRENT_USER_ID},sender_email.in.(${contacts}))
  if (messageError) {console.log(messageError); throw messageError;}
  return (message ?? []) as PreviewUserChat[];
}

async function signUpNewUser(email: string, password: string) {
  const result = await supabase.auth.signUp({email, password});
  return result;
}

export async function signInWithEmail(email: string, password: string) {
  const {data: authData, error: authError} = await supabase.auth.signInWithPassword({email, password});
  if (authError) throw authError;
  CURRENT_USER_ID = authData.user?.id;
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

    CURRENT_USER_ID = regData.user?.id;
    const userId = regData.user?.id;
    if (!userId) throw new Error("createNewUser: no user id returned from supabase after sign up");

    const created_at = regData.user?.created_at ?? new Date().toISOString();

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

export async function sendMessage(message: string | null, document_title: string | null, storage_path: string | null, receiver_id: string) {  
  const res = await supabase.from("messages").insert([{
    message,
    sender_id: CURRENT_USER_ID,
    document_title,
    storage_path,
    receiver_id
  }]).select().single();
  if (res.error) throw res.error;
}