import { Database as DB } from "@/lib/database.types";

declare global {
  type Database = DB
  type Todo = Database['public']['Tables']['todos']['Row']
  type Profile = Database['public']['Tables']['profiles']['Row']
}