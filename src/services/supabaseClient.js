import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const signInWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({provider: 'github'})
    if (error) console.error('Error logging in with GitHub:', error.message)
}