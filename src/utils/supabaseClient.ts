import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vtfiapgucfjufpdveswy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0ZmlhcGd1Y2ZqdWZwZHZlc3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzNzczOTQsImV4cCI6MjAzNDk1MzM5NH0.avcuZ-e4rkbWP3PVcvMjlCXXLSyYaXwUIXL17e4Ip3w";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;