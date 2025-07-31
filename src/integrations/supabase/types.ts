export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      audit_item_scores: {
        Row: {
          audit_result_id: string
          created_at: string
          id: string
          item_comments: string | null
          score: string
          scorecard_item_id: string
          updated_at: string
        }
        Insert: {
          audit_result_id: string
          created_at?: string
          id?: string
          item_comments?: string | null
          score: string
          scorecard_item_id: string
          updated_at?: string
        }
        Update: {
          audit_result_id?: string
          created_at?: string
          id?: string
          item_comments?: string | null
          score?: string
          scorecard_item_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_item_scores_audit_result_id_fkey"
            columns: ["audit_result_id"]
            isOneToOne: false
            referencedRelation: "audit_results"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_results: {
        Row: {
          audit_date: string
          auditor_comments: string | null
          auditor_name: string
          case_reference: string | null
          created_at: string
          employee_id: string
          id: string
          mandatory_score: number
          negatives: string | null
          outcome: string | null
          overall_score: number
          positives: string | null
          procedural_score: number
          remarks: string | null
          scorecard_id: string
          status: string
          summary_query: string | null
          updated_at: string
        }
        Insert: {
          audit_date?: string
          auditor_comments?: string | null
          auditor_name: string
          case_reference?: string | null
          created_at?: string
          employee_id: string
          id?: string
          mandatory_score?: number
          negatives?: string | null
          outcome?: string | null
          overall_score?: number
          positives?: string | null
          procedural_score?: number
          remarks?: string | null
          scorecard_id: string
          status?: string
          summary_query?: string | null
          updated_at?: string
        }
        Update: {
          audit_date?: string
          auditor_comments?: string | null
          auditor_name?: string
          case_reference?: string | null
          created_at?: string
          employee_id?: string
          id?: string
          mandatory_score?: number
          negatives?: string | null
          outcome?: string | null
          overall_score?: number
          positives?: string | null
          procedural_score?: number
          remarks?: string | null
          scorecard_id?: string
          status?: string
          summary_query?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      audit_results_backup: {
        Row: {
          audit_date: string | null
          auditor_comments: string | null
          auditor_name: string | null
          created_at: string | null
          employee_id: string | null
          id: string | null
          mandatory_score: number | null
          outcome: string | null
          overall_score: number | null
          procedural_score: number | null
          scorecard_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          audit_date?: string | null
          auditor_comments?: string | null
          auditor_name?: string | null
          created_at?: string | null
          employee_id?: string | null
          id?: string | null
          mandatory_score?: number | null
          outcome?: string | null
          overall_score?: number | null
          procedural_score?: number | null
          scorecard_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          audit_date?: string | null
          auditor_comments?: string | null
          auditor_name?: string | null
          created_at?: string | null
          employee_id?: string | null
          id?: string | null
          mandatory_score?: number | null
          outcome?: string | null
          overall_score?: number | null
          procedural_score?: number | null
          scorecard_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      employees: {
        Row: {
          created_at: string
          created_by: string | null
          department: string
          email: string | null
          employee_number: string | null
          hire_date: string | null
          id: string
          name: string
          position: string | null
          reporting_manager_id: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          department: string
          email?: string | null
          employee_number?: string | null
          hire_date?: string | null
          id?: string
          name: string
          position?: string | null
          reporting_manager_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          department?: string
          email?: string | null
          employee_number?: string | null
          hire_date?: string | null
          id?: string
          name?: string
          position?: string | null
          reporting_manager_id?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employees_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_reporting_manager_id_fkey"
            columns: ["reporting_manager_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employees_backup: {
        Row: {
          created_at: string | null
          department: string | null
          hire_date: string | null
          id: string | null
          name: string | null
          position: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          hire_date?: string | null
          id?: string | null
          name?: string | null
          position?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          hire_date?: string | null
          id?: string | null
          name?: string | null
          position?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          department: string
          id: string
          name: string
          role: Database["public"]["Enums"]["user_role"]
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          department: string
          id: string
          name: string
          role?: Database["public"]["Enums"]["user_role"]
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string
          id?: string
          name?: string
          role?: Database["public"]["Enums"]["user_role"]
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles_backup: {
        Row: {
          created_at: string | null
          department: string | null
          id: string | null
          name: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          id?: string | null
          name?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          id?: string | null
          name?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      role_audit_log: {
        Row: {
          changed_at: string
          changed_by: string
          id: string
          new_role: string
          old_role: string | null
          reason: string | null
          user_id: string
        }
        Insert: {
          changed_at?: string
          changed_by: string
          id?: string
          new_role: string
          old_role?: string | null
          reason?: string | null
          user_id: string
        }
        Update: {
          changed_at?: string
          changed_by?: string
          id?: string
          new_role?: string
          old_role?: string | null
          reason?: string | null
          user_id?: string
        }
        Relationships: []
      }
      scorecard_items: {
        Row: {
          category: string | null
          created_at: string
          description: string
          id: string
          item_id: string
          parent_item_id: string | null
          scorecard_id: string
          section_type: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description: string
          id?: string
          item_id: string
          parent_item_id?: string | null
          scorecard_id: string
          section_type: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string
          id?: string
          item_id?: string
          parent_item_id?: string | null
          scorecard_id?: string
          section_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "scorecard_items_parent_item_id_fkey"
            columns: ["parent_item_id"]
            isOneToOne: false
            referencedRelation: "scorecard_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scorecard_items_scorecard_id_fkey"
            columns: ["scorecard_id"]
            isOneToOne: false
            referencedRelation: "scorecards"
            referencedColumns: ["id"]
          },
        ]
      }
      scorecards: {
        Row: {
          category: string | null
          created_at: string
          department: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          department: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          department?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_edit_scorecards: {
        Args: { user_id: string }
        Returns: boolean
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
      manage_user_status: {
        Args: { target_user_id: string; new_status: string }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "qa_officer" | "manager" | "employee" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["qa_officer", "manager", "employee", "admin"],
    },
  },
} as const
