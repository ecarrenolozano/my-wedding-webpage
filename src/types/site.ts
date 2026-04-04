export type Locale = "es" | "en";

export type LocalizedText = Record<Locale, string>;
export type LocalizedTextList = Record<Locale, string[]>;

export type Dictionary = {
  nav: {
    languageLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    countdownLabel: string;
    yearsLabel: string;
    monthsLabel: string;
    daysLabel: string;
    hoursLabel: string;
    minutesLabel: string;
    secondsLabel: string;
  };
  overview: {
    label: string;
    heading: string;
    description: string;
  };
  sections: {
    storyLabel: string;
    storyHeading: string;
    scheduleLabel: string;
    scheduleHeading: string;
    routeLabel: string;
    routeHeading: string;
    venueLabel: string;
    venueHeading: string;
    travelLabel: string;
    travelHeading: string;
    faqLabel: string;
    faqHeading: string;
    rsvpLabel: string;
    rsvpHeading: string;
  };
  common: {
    dayLabel: string;
    timeLabel: string;
    placeLabel: string;
    addressLabel: string;
    airportLabel: string;
    hotelAreaLabel: string;
    optionalLabel: string;
    getDirectionsLabel: string;
    addToCalendarLabel: string;
    viewRouteLabel: string;
    hideMapLabel: string;
    touchMapHintLabel: string;
  };
  rsvp: {
    introTitle: string;
    introDescription: string;
    stepLabel: string;
    identityStep: string;
    attendanceStep: string;
    logisticsStep: string;
    confirmationStep: string;
    guestNameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    attendingQuestion: string;
    yesOption: string;
    noOption: string;
    unsureOption: string;
    companionQuestion: string;
    companionNameLabel: string;
    travelQuestion: string;
    accommodationQuestion: string;
    dietaryQuestion: string;
    dietaryPlaceholder: string;
    nextButton: string;
    backButton: string;
    closeButton: string;
    submitButton: string;
    confirmationTitle: string;
    confirmationAttending: string;
    confirmationNotAttending: string;
    confirmationUnsure: string;
    resetButton: string;
    validationName: string;
    validationEmail: string;
    validationPhone: string;
    validationAttendance: string;
    validationCompanionDecision: string;
    validationCompanion: string;
    validationTravel: string;
    validationAccommodation: string;
    entryDescription: string;
    openButton: string;
    submittingButton: string;
    submissionError: string;
    backendNotConfigured: string;
  };
  footer: {
    note: string;
    credit: string;
  };
};

export type ScheduleItem = {
  id: string;
  title: string;
  subtitle?: string;
  time: string;
  venue: string;
  address: string;
  directionsUrl: string;
  calendarUrl: string;
  image?: {
    src: string;
    alt: string;
  };
};

export type VenueDetails = {
  name: string;
  address: string;
  note: string;
};

export type TravelDetails = {
  airport: string;
  hotelArea: string;
  transportNote: string;
};

export type RouteDetails = {
  travelTimeLabel: string;
  distanceLabel: string;
  note: string;
  routeUrl: string;
  embedUrl: string;
};

export type PhotoStripImage = {
  id: string;
  src: string;
  alt: string;
};

export type FaqItem = {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
};

export type RsvpConfig = {
  deadlineLabel: string;
  contactLine: string;
  partySizeOptions: number[];
  highlights: string[];
};

export type SiteConfig = {
  couple: {
    partnerOne: string;
    partnerTwo: string;
  };
  event: {
    dateLabel: LocalizedText;
    dateTimeISO: string;
    scheduleDateLabel: LocalizedText;
    city: string;
    venue: string;
    overview: {
      headline: LocalizedText;
      details: LocalizedTextList;
    };
    photoStrip: PhotoStripImage[];
    schedule: ScheduleItem[];
    route: RouteDetails;
    venueDetails: VenueDetails;
    travel: TravelDetails;
    faq: FaqItem[];
    rsvp: RsvpConfig;
  };
  media: {
    heroImage: string;
  };
  theme: {
    background: string;
    foreground: string;
    accent: string;
    accentSoft: string;
    clay: string;
    wine: string;
    green: string;
    cream: string;
  };
};
