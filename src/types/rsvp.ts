import type { Locale } from "@/types/site";

export type RsvpAttendance = "yes" | "no" | "unsure";
export type RsvpBinaryChoice = "yes" | "no";

export type RsvpSubmission = {
  guestName: string;
  email: string;
  phoneCountryName: string;
  phoneCountryCode: string;
  phone: string;
  attendance: RsvpAttendance;
  hasCompanion: RsvpBinaryChoice | null;
  companionName: string;
  travelFromOutside: RsvpBinaryChoice;
  needsAccommodation: RsvpBinaryChoice;
  dietaryRestrictions: string;
  locale: Locale;
};
