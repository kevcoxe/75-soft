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
          miles_walked: number
          profile_pic: string | null
          score: number
          user_id: string
          username: string
        }
        Insert: {
          created_at?: string | null
          days_sucessful?: number
          id?: number
          miles_walked?: number
          profile_pic?: string | null
          score?: number
          user_id: string
          username: string
        }
        Update: {
          created_at?: string | null
          days_sucessful?: number
          id?: number
          miles_walked?: number
          profile_pic?: string | null
          score?: number
          user_id?: string
          username?: string
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
      incrementDay: {
        Args: {
          userid: string
          score_increment: number
        }
        Returns: undefined
      }
      incrementMiles: {
        Args: {
          userid: string
          score_increment: number
          mile_increment: number
        }
        Returns: undefined
      }
      incrementScore: {
        Args: {
          userid: string
          score_increment: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
