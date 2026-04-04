export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AdminRole = "admin" | "collaborator";

export type Database = {
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          created_at: string;
          display_name: string | null;
          email: string;
          id: string;
          role: AdminRole;
        };
        Insert: {
          created_at?: string;
          display_name?: string | null;
          email: string;
          id: string;
          role?: AdminRole;
        };
        Update: {
          created_at?: string;
          display_name?: string | null;
          email?: string;
          id?: string;
          role?: AdminRole;
        };
        Relationships: [];
      };
      rsvp_responses: {
        Row: {
          attendance: string;
          companion_name: string | null;
          created_at: string;
          dietary_restrictions: string | null;
          email: string;
          full_name: string;
          has_companion: boolean | null;
          id: string;
          locale: string;
          needs_accommodation: boolean;
          phone_country_code: string;
          phone_country_name: string;
          phone_number: string;
          travel_from_outside: boolean;
        };
        Insert: {
          attendance: string;
          companion_name?: string | null;
          created_at?: string;
          dietary_restrictions?: string | null;
          email: string;
          full_name: string;
          has_companion?: boolean | null;
          id?: string;
          locale?: string;
          needs_accommodation: boolean;
          phone_country_code: string;
          phone_country_name: string;
          phone_number: string;
          travel_from_outside: boolean;
        };
        Update: {
          attendance?: string;
          companion_name?: string | null;
          created_at?: string;
          dietary_restrictions?: string | null;
          email?: string;
          full_name?: string;
          has_companion?: boolean | null;
          id?: string;
          locale?: string;
          needs_accommodation?: boolean;
          phone_country_code?: string;
          phone_country_name?: string;
          phone_number?: string;
          travel_from_outside?: boolean;
        };
        Relationships: [];
      };
    };
  };
};
