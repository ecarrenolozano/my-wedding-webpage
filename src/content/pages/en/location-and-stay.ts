import { assetUrl } from "@/lib/assets";
import type { LocationStayPageContent } from "@/types/site";

export const locationStayEn: LocationStayPageContent = {
  seo: {
    title: "Location and Stay",
    description:
      "Pasto location, arrival guide, recommended hotels, and activities for our wedding weekend.",
  },
  nav: {
    backLabel: "Back to home",
  },
  labels: {
    overviewBadge: "Journey overview",
    journeyHint: "Swipe to explore each stage in detail",
    support: "Need help in Bogota?",
    lodging: "Lodging",
    activities: "What to do in Pasto?",
  },
  hero: {
    title: "Location and Stay",
    subtitle: "Pasto, Colombia",
    metadata: ["October", "7 C - 17 C", "Cold and rainy weather"],
    visual: {
      src: "/location/pasto-scaled.jpg",
      alt: "Panoramic view of Pasto with mountains in the background",
      label: "Pasto, Colombia",
      tone: "forest",
    },
  },
  location: {
    title: "A city shaped by history and nature",
    description:
      "Pasto is a city with a rich historical heritage, founded around 1537. It is located in the Atriz valley, at the foot of the Galeras volcano.",
    facts: [
      {
        id: "founded",
        text: "Founded around 1537",
        icon: {
          key: "calendar",
          alt: "Calendar icon",
        },
      },
      {
        id: "atriz",
        text: "Located in the Atriz valley",
        icon: {
          key: "mountain",
          alt: "Mountain icon",
        },
      },
      {
        id: "galeras",
        text: "At the foot of the Galeras volcano",
        icon: {
          key: "volcano",
          alt: "Volcano icon",
        },
      },
      {
        id: "weather",
        text: "Cold and rainy weather in October",
        icon: {
          key: "thermometer",
          alt: "Thermometer icon",
        },
      },
    ],
    mapVisual: {
      src: "/location/map-pasto.png",
      alt: "Map of Colombia with a marker for Pasto",
      label: "Pasto within Colombia",
      tone: "cream",
    },
  },
  arrival: {
    title: "How to arrive if you are traveling from outside Colombia?",
    intro:
      "This is the full route to reach Pasto. First, you get the overview, then you can review each stage in detail.",
    overviewVisual: {
      src: assetUrl("header-background-cropped.png"),
      alt: "Panoramic landscape of Pasto and the surrounding mountains",
      label: "Full journey",
      tone: "forest",
    },
    steps: [
      {
        id: "international",
        stepNumber: "1",
        icon: "plane",
        title: "International Flights",
        shortLabel: "Arrival in Colombia",
        description: "Arrival in Colombia",
        cardText:
          "International flights arrive at El Dorado Airport in Bogota.",
        visual: {
          alt: "International airport with a plane taking off",
          label: "El Dorado Airport",
          tone: "sky",
        },
        infoItems: [
          {
            label: "Airport",
            value: "El Dorado (BOG)",
          },
          {
            label: "Location",
            value: "Bogota, Colombia",
          },
          {
            label: "Flight duration",
            value: "Depends on your city of origin",
          },
        ],
      },
      {
        id: "bogota",
        stepNumber: "2",
        icon: "building",
        title: "Bogota (El Dorado)",
        shortLabel: "Connection in Bogota",
        description: "Connection in Bogota",
        cardText:
          "You may stay to explore Bogota before continuing your trip.",
        visual: {
          alt: "Urban skyline of Bogota with mountains in the distance",
          label: "Stopover in Bogota",
          tone: "charcoal",
        },
        assistanceTitle: "Need help in Bogota?",
        assistanceDescription:
          "Get in touch with us. We are here to help.",
        contacts: [
          {
            name: "Pablo Fernandez",
            phone: "+57 318 3902915",
          },
          {
            name: "Daniela Alvarado",
            phone: "+57 320 8094102",
          },
        ],
      },
      {
        id: "domestic-flight",
        stepNumber: "3",
        icon: "takeoff",
        title: "Domestic Flight Bogota -> Pasto",
        shortLabel: "45 min - 1 hour",
        description: "Fast and direct connection",
        cardText:
          "The connection from El Dorado to Pasto is usually served through Antonio Narino Airport.",
        visual: {
          alt: "Airplane wing during a domestic flight at sunset",
          label: "Flight to Pasto",
          tone: "gold",
        },
        infoItems: [
          {
            label: "Duration",
            value: "45 min - 1 hour",
          },
          {
            label: "Recommended airlines",
            value: "Avianca, LATAM, Satena",
          },
          {
            label: "Flight type",
            value: "Direct",
          },
        ],
      },
      {
        id: "pasto-airport",
        stepNumber: "4",
        icon: "pin",
        title: "Pasto (Antonio Narino)",
        shortLabel: "Arrival at the airport",
        description: "Arrival at the airport",
        cardText:
          "Antonio Narino Airport is located on the outskirts of the city of Pasto.",
        visual: {
          alt: "Antonio Narino Airport terminal",
          label: "Antonio Narino Airport",
          tone: "forest",
        },
        infoItems: [
          {
            label: "Airport",
            value: "Antonio Narino (PSO)",
          },
          {
            label: "Location",
            value: "Pasto, Narino, Colombia",
          },
          {
            label: "October weather",
            value: "Cold and rainy",
          },
          {
            label: "Temperature",
            value: "7 C - 17 C",
          },
        ],
      },
      {
        id: "ground-transfer",
        stepNumber: "5",
        icon: "car",
        title: "Ground Transfer",
        shortLabel: "Approx. 30 min",
        description: "From the airport to the city",
        cardText:
          "From the airport to Pasto, the drive takes around 30 minutes.",
        visual: {
          alt: "Mountain road leading toward the city",
          label: "Road transfer",
          tone: "forest",
        },
        infoItems: [
          {
            label: "Approximate duration",
            value: "30 min",
          },
          {
            label: "Recommendation",
            value: "Arrange transportation in advance",
          },
        ],
      },
      {
        id: "city-arrival",
        stepNumber: "6",
        icon: "city",
        title: "Into the City",
        shortLabel: "Arrival at your stay",
        description: "Arrival at your stay",
        cardText:
          "Please let us know if you need assistance getting to your accommodation.",
        visual: {
          alt: "Historic center of Pasto",
          label: "Arrival in Pasto",
          tone: "cream",
        },
        ctaLabel: "Contact us",
      },
    ],
    supportCardTitle: "Need help in Bogota?",
    supportCardDescription:
      "Get in touch with us. We are here to help.",
  },
  lodging: {
    title: "Lodging",
    intro:
      "We selected a few options close to the events so your stay can be as comfortable as possible.",
    options: [
      {
        id: "v1501",
        name: "Hotel V1501",
        price: "$$$ Premium",
        label: "Wedding discount",
        distance: "5 min from the event",
        description: "An elegant and very convenient option for the reception.",
        href: "https://www.google.com/maps/search/?api=1&query=Hotel+V1501+Pasto",
        actionLabel: "See more",
        visual: {
          src: assetUrl("hotel-v1501.jpg"),
          alt: "Hotel V1501 in Pasto",
          label: "Hotel V1501",
          tone: "gold",
        },
      },
      {
        id: "parque-reservado",
        name: "Hotel Parque Reservado",
        price: "$$ Mid-range",
        distance: "7 min from the event",
        description: "A comfortable stay with convenient access around the city.",
        actionLabel: "See more",
        visual: {
          alt: "Hotel Parque Reservado",
          label: "Hotel Parque Reservado",
          tone: "forest",
        },
      },
      {
        id: "palermo-suit",
        name: "Hotel Palermo Suit",
        price: "$$ Mid-range",
        distance: "6 min from the event",
        description: "A practical option for guests who want a good location.",
        actionLabel: "See more",
        visual: {
          alt: "Hotel Palermo Suit",
          label: "Hotel Palermo Suit",
          tone: "charcoal",
        },
      },
      {
        id: "san-juan-boutique",
        name: "Hotel San Juan Boutique",
        price: "$$$ Premium",
        distance: "6 min from the event",
        description: "A boutique option with a more intimate atmosphere.",
        actionLabel: "See more",
        visual: {
          alt: "Hotel San Juan Boutique",
          label: "Hotel San Juan Boutique",
          tone: "gold",
        },
      },
      {
        id: "airbnb",
        name: "Airbnb Search",
        price: "$ Budget",
        location: "Av. Los Estudiantes area",
        description: "Ideal if you prefer a more flexible stay.",
        href: "https://www.airbnb.com/s/Pasto--Nari%C3%B1o--Colombia/homes",
        actionLabel: "View options",
        visual: {
          alt: "Search for Airbnb options",
          label: "Airbnb",
          tone: "cream",
        },
      },
    ],
  },
  explore: {
    title: "What to do in Pasto?",
    intro: "If you have time, we recommend enjoying a bit of the city.",
    options: [
      {
        id: "cocha",
        number: "1",
        title: "Visit Laguna de la Cocha",
        description:
          "Located about 40-60 minutes from Pasto, with cold weather. It offers boat rides, Andean scenery, and community-based tourism.",
        visual: {
          alt: "Laguna de la Cocha",
          label: "Laguna de la Cocha",
          tone: "sky",
        },
      },
      {
        id: "museo-oro",
        number: "2",
        title: "Visit the Gold Museum",
        description:
          "A cultural experience to discover the legacy of the Indigenous cultures that lived in the region around 2,500 years ago.",
        visual: {
          alt: "Gold Museum",
          label: "Gold Museum",
          tone: "charcoal",
        },
      },
      {
        id: "museo-carnaval",
        number: "3",
        title: "Visit the Carnival Museum",
        description:
          "Learn about the history and artistry of the Blacks and Whites Carnival, one of Pasto's most important traditions.",
        visual: {
          alt: "Carnival Museum",
          label: "Carnival Museum",
          tone: "gold",
        },
      },
      {
        id: "gastronomia",
        number: "4",
        title: "Unique culinary experience",
        description:
          "Discover the diversity of Narino cuisine by visiting local restaurants.",
        visual: {
          alt: "Traditional Narino dish",
          label: "Local cuisine",
          tone: "forest",
        },
      },
    ],
  },
  closing: {
    title: "Need help with your trip?",
    description:
      "We are here to help make your experience incredible.",
    buttonLabel: "Contact us",
  },
};
