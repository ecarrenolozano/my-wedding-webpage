export type Locale = "es" | "en";

export type LocalizedText = Record<Locale, string>;
export type LocalizedTextList = Record<Locale, string[]>;

export type Dictionary = {
  nav: {
    languageLabel: string;
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
};

export type HomePageContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    countdownLabel: string;
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
  footer: {
    note: string;
    credit: string;
  };
};

export type PageVisual = {
  src?: string;
  alt: string;
  label: string;
  tone?: "forest" | "cream" | "sky" | "gold" | "charcoal";
};

export type FactIcon = {
  src?: string;
  alt: string;
  key: "calendar" | "mountain" | "volcano" | "thermometer";
};

export type LocationFact = {
  id: string;
  text: string;
  icon: FactIcon;
};

export type TravelSupportContact = {
  name: string;
  phone: string;
};

export type JourneyInfoItem = {
  label: string;
  value: string;
};

export type JourneyStep = {
  id: string;
  stepNumber: string;
  icon: "plane" | "building" | "takeoff" | "pin" | "car" | "city";
  title: string;
  description: string;
  shortLabel: string;
  cardText: string;
  visual: PageVisual;
  infoItems?: JourneyInfoItem[];
  assistanceTitle?: string;
  assistanceDescription?: string;
  contacts?: TravelSupportContact[];
  ctaLabel?: string;
};

export type LodgingOption = {
  id: string;
  name: string;
  price: string;
  label?: string;
  distance?: string;
  location?: string;
  description: string;
  href?: string;
  actionLabel?: string;
  visual: PageVisual;
};

export type ExploreOption = {
  id: string;
  number: string;
  title: string;
  description: string;
  visual: PageVisual;
};

export type LocationStayPageContent = {
  seo: {
    title: string;
    description: string;
  };
  nav: {
    backLabel: string;
  };
  labels: {
    overviewBadge: string;
    journeyHint: string;
    support: string;
    lodging: string;
    activities: string;
  };
  hero: {
    title: string;
    subtitle: string;
    metadata: string[];
    visual: PageVisual;
  };
  location: {
    title: string;
    description: string;
    facts: LocationFact[];
    mapVisual: PageVisual;
  };
  arrival: {
    title: string;
    intro: string;
    overviewVisual: PageVisual;
    steps: JourneyStep[];
    supportCardTitle: string;
    supportCardDescription: string;
  };
  lodging: {
    title: string;
    intro: string;
    options: LodgingOption[];
  };
  explore: {
    title: string;
    intro: string;
    options: ExploreOption[];
  };
  closing: {
    title: string;
    description: string;
    buttonLabel: string;
  };
};

export type ScheduleItem = {
  id: string;
  title: LocalizedText;
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
