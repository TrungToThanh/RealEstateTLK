import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vtfiapgucfjufpdveswy.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0ZmlhcGd1Y2ZqdWZwZHZlc3d5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxOTM3NzM5NCwiZXhwIjoyMDM0OTUzMzk0fQ._LuTzpkoF1_INuFVYW1R5ti-A9PorCkOz6WmrW_vDx8";
const adminRole =  createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
})
  
const adminAuthClient = adminRole.auth.admin
export default adminAuthClient;