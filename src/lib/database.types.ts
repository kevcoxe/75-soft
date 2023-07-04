export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string | null
          days_sucessful: number
          id: number
          profile_pic: string | null
          score: number
          user_id: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          days_sucessful?: number
          id?: number
          profile_pic?: string | null
          score?: number
          user_id?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          days_sucessful?: number
          id?: number
          profile_pic?: string | null
          score?: number
          user_id?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      todos: {
        Row: {
          description: string | null
          id: number
          inserted_at: string
          is_complete: boolean | null
          name: string | null
          user_id: string
        }
        Insert: {
          description?: string | null
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          name?: string | null
          user_id: string
        }
        Update: {
          description?: string | null
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "todos_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
