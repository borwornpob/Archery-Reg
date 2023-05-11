import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cpvyrudlihsnoospuxkf.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwdnlydWRsaWhzbm9vc3B1eGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM4MDA4MTQsImV4cCI6MTk5OTM3NjgxNH0.RYRViGl-ABJeWaRtAFJECm3SVgliBUTk1ImTnDkZ-EE";
export const supabase = createClient(supabaseUrl, supabaseKey);
