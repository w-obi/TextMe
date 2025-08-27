import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export let CURRENT_USER_ID: string = "";

export async function fetchUsers(): Promise<User[]> {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return data ?? [];
}

export async function fetchUserProfile(user_id: string): Promise<User> {
  const {data, error} = await supabase.from("users").select("*").eq("id", user_id).single();
  if (error) throw error;
  return (data ?? []) as User;
}

export async function fetchChat(sender_id: string): Promise<MessageComp[]> {
  const {data, error} = await supabase.from("messages_with_users").select("*").or(
    `and(sender_id.eq.${CURRENT_USER_ID},receiver_id.eq.${sender_id}),and(sender_id.eq.${sender_id},receiver_id.eq.${CURRENT_USER_ID})`
  ).order("created_at", {ascending: true});
  
  if (error) throw error;
  return (data ?? []) as MessageComp[];
}

export async function fetchUsersChat(): Promise<PreviewUserChat[]> {
  const {data: currentUser, error: currentUserError} = await supabase.from("users").select("id, contacts").eq("id", CURRENT_USER_ID).single();
  if (currentUserError) throw currentUserError;

  const contacts: string[] = currentUser?.contacts ?? [];
  if (contacts.length === 0) return [];

  const {data: contactUsers, error: contactUsersError} = await supabase.from("users").select("id, username, profile_picture_url, email").in("email", contacts);
  if (contactUsersError) throw contactUsersError;

  const result: PreviewUserChat[] = [];

  for (const contact of contactUsers) {
    const {data: message, error: messageError} = await supabase.from("messages").select("id, message, created_at, sender_id, receiver_id").or(`and(sender_id.eq.${CURRENT_USER_ID},receiver_id.eq.${contact.id}),and(receiver_id.eq.${CURRENT_USER_ID},sender_id.eq.${contact.id})`).order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (messageError) throw messageError;

    result.push({
      chat_id: `${CURRENT_USER_ID}-${contact.id}`,
      id: message?.id ?? null,
      message: message?.message ?? null,
      created_at: message?.created_at ?? null,

      user_id: contact.id,
      username: contact.username,
      profile_picture_url: contact.profile_picture_url,
    })
  }
  
  return result;
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

    const userId = regData.user?.id;
    if (!userId) throw new Error("createNewUser: no user id returned from supabase after sign up");
    CURRENT_USER_ID = userId;

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

  if (!contacts.includes(newContact)) {

    const updatedContacts = [...contacts, newContact];

    const res = await supabase.from("users").update({contacts: updatedContacts}).eq("id", CURRENT_USER_ID);
    if (res.error) throw res.error;
  }

  const {data: otherUser, error: otherUserError} = await supabase.from("users").select("id, contacts").eq("email", newContact).single();
  if (otherUserError) throw otherUserError;

  const otherContacts: string[] = otherUser?.contacts ?? [];
  const otherUserId: string = otherUser.id;

  const {data: curuserEmail, error: curuserEmailError} = await supabase.from("users").select("email").eq("id", CURRENT_USER_ID).single();
  if (curuserEmailError) throw curuserEmailError;

  const newContactCurrentUser = curuserEmail?.email;

  if (!otherContacts.includes(newContactCurrentUser)) {

    const newUpdatedContacts = [...otherContacts, newContactCurrentUser];

    const res2 = await supabase.from("users").update({contacts: newUpdatedContacts}).eq("id", otherUserId);
    if (res2.error) throw res2.error;
  }
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