import type { SiteConfig } from "@/types/site";
import { assetUrl } from "@/lib/assets";

export const siteConfig: SiteConfig = {
  couple: {
    partnerOne: "Camila",
    partnerTwo: "Edwin",
  },
  event: {
    dateLabel: {
      es: "10 de Octubre de 2026",
      en: "October 10th, 2026",
    },
    dateTimeISO: "2026-10-10T15:30:00-05:00",
    scheduleDateLabel: {
      es: "10 de Octubre de 2026",
      en: "October 10th, 2026",
    },
    city: "Pasto, Colombia",
    venue: "Hacienda Los Olivos",
    overview: {
      headline: {
        es: "Sin buscarlo, el destino nos puso en el mismo camino. Fue uno de esos momentos que cambian la vida para siempre cuando menos lo esperas.",
        en: "Without looking for it, destiny placed us on the same path. It was one of those moments that changes your life forever when you least expect it.",
      },
      details: {
        es: [
          "Desde ese 2022 no nos hemos soltado. Hemos compartido risas, aventuras y momentos inolvidables que han fortalecido nuestro lazo día tras día.",
          "Hoy caminamos con un objetivo claro: construir una familia llena de amor, valores y, por supuesto, mucho humor.",
        ],
        en: [
          "Since 2022, we have never let go of each other. We have shared laughter, adventures, and unforgettable moments that have strengthened our bond day by day.",
          "Today, we walk forward with a clear purpose: to build a family filled with love, values, and of course, plenty of humor.",
        ],
      },
    },
    photoStrip: [
      {
        id: "vienna-cathedral-front",
        src: assetUrl("gallery-1.jpeg"),
        alt: "Camila y Edwin frente a una catedral durante un viaje por Europa",
      },
      {
        id: "vienna-cathedral-side",
        src: assetUrl("gallery-2.jpeg"),
        alt: "Camila y Edwin abrazados frente a una catedral gotica",
      },
      {
        id: "city-square",
        src: assetUrl("gallery-3.jpeg"),
        alt: "Camila y Edwin posando juntos en una plaza europea",
      },
      {
        id: "rainy-statue",
        src: assetUrl("gallery-4.jpeg"),
        alt: "Camila y Edwin compartiendo un paraguas durante un día lluvioso",
      },
      {
        id: "mountain-view",
        src: assetUrl("gallery-5.jpeg"),
        alt: "Selfie de Camila y Edwin frente a un paisaje de montanas",
      },
      {
        id: "night-arch",
        src: assetUrl("gallery-6.jpeg"),
        alt: "Camila y Edwin de noche frente a un arco historico",
      },
      {
        id: "garden-pavilion",
        src: assetUrl("gallery-7.jpeg"),
        alt: "Camila y Edwin sonriendo frente a un pabellon y jardines",
      },
      {
        id: "autumn-bridge",
        src: assetUrl("gallery-8.jpeg"),
        alt: "Camila y Edwin en un puente durante el otono",
      },
      {
        id: "sunny-brunch",
        src: assetUrl("gallery-9.jpeg"),
        alt: "Camila y Edwin abrazados en una terraza iluminada por el sol",
      },
    ],
    schedule: [
      {
        id: "ceremony",
        title: "Ceremonia",
        time: "15:30",
        venue: "Casa de Ejercicios de San Ignacio",
        address: "Cl 15 #15, Pasto, Nariño, Colombia",
        directionsUrl:
          "https://www.google.com/maps/dir/?api=1&origin=Cra+24+%2319-53%2C+Pasto%2C+Narino%2C+Colombia&destination=Casa+de+Ejercicios+de+San+Ignacio%2C+Cl+15+%2315%2C+Pasto%2C+Narino%2C+Colombia&travelmode=driving",
        calendarUrl:
          "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ceremonia+-+Camila+y+Edwin&dates=20261010T203000Z/20261010T223000Z&details=Boda+de+Camila+y+Edwin&location=Casa+de+Ejercicios+de+San+Ignacio%2C+Cl+15+%2315%2C+Pasto%2C+Narino%2C+Colombia",
        image: {
          src: assetUrl("casa-ignacio.jpg"),
          alt: "Exterior view of Casa de Ejercicios de San Ignacio",
        },
      },
      {
        id: "reception",
        title: "Recepcion",
        time: "18:00 - 02:00",
        venue: "Hotel V1501",
        address: "Cl 20 #33-60, Pasto, Nariño, Colombia",
        directionsUrl:
          "https://www.google.com/maps/dir/?api=1&origin=Cra+24+%2319-53%2C+Pasto%2C+Narino%2C+Colombia&destination=Hotel+V1501%2C+Cl+20+%2333-60%2C+Pasto%2C+Narino%2C+Colombia&travelmode=driving",
        calendarUrl:
          "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Recepcion+-+Camila+y+Edwin&dates=20261010T230000Z/20261011T070000Z&details=Boda+de+Camila+y+Edwin&location=Hotel+V1501%2C+Cl+20+%2333-60%2C+Pasto%2C+Narino%2C+Colombia",
        image: {
          src: assetUrl("hotel-v1501.jpg"),
          alt: "Exterior view of Hotel V1501 in Pasto",
        },
      },
    ],
    route: {
      travelTimeLabel: "12 min en carro",
      distanceLabel: "4.2 km entre ceremonia y recepcion",
      note: "Te recomendamos salir con unos minutos de anticipacion para llegar con calma al inicio de la recepcion.",
      routeUrl:
        "https://www.google.com/maps/dir/Casa+de+Ejercicios+de+San+Ignacio,+Cl+15+%2315,+Pasto,+Narino,+Colombia/Hotel+V1501,+Cl+20+%2333-60,+Pasto,+Narino,+Colombia",
      embedUrl:
        "https://maps.google.com/maps?width=100%25&height=600&hl=es&q=Casa%20de%20Ejercicios%20de%20San%20Ignacio%20Pasto%20to%20Hotel%20V1501%20Pasto&z=13&ie=UTF8&iwloc=B&output=embed",
    },
    venueDetails: {
      name: "Hacienda Los Olivos",
      address: "Vereda Catambuco, Pasto, Nariño, Colombia",
      note: "Espacio campestre con arquitectura cálida, jardines abiertos y ambientación nocturna.",
    },
    travel: {
      airport: "Aeropuerto Antonio Nariño",
      hotelArea: "Centro de Pasto y alrededores de Catambuco",
      transportNote: "La version inicial puede incluir recomendaciones simples y luego crecer con mapas y enlaces.",
    },
    faq: [
      {
        id: "children",
        question: {
          es: "¿Los niños están invitados?",
          en: "Are children invited?",
        },
        answer: {
          es: "Queremos que todos puedan relajarse y disfrutar la celebración, por eso nuestra boda será una reunión solo para adultos.",
          en: "We want everyone to relax and enjoy the celebration, so our wedding will be an adults-only gathering.",
        },
      },
      {
        id: "deadline",
        question: {
          es: "¿Hasta cuándo debemos confirmar?",
          en: "Until when should we RSVP?",
        },
        answer: {
          es: "Agradecemos su respuesta antes del **30 de mayo de 2026** para quienes se encuentran en Colombia, y antes del **30 de junio de 2026** para quienes residen en el extranjero.",
          en: "We kindly ask for your response by **May 30th, 2026** for guests in Colombia, and by **June 30th, 2026** for guests living abroad.",
        },
      },
    ],
    rsvp: {
      deadlineLabel: "Confirmar antes del 15 de agosto de 2026",
      contactLine: "Si necesitas ayuda con transporte o alojamiento, podremos ampliar esta experiencia más adelante con integraciones reales.",
      partySizeOptions: [1, 2, 3, 4],
      highlights: [
        "Flujo de confirmacion por pasos con una experiencia mas cercana a una invitacion digital cuidada.",
        "Arquitectura preparada para conectar con Supabase sin reescribir la interfaz.",
        "Estados claros para asistencia confirmada o declinada, con un mensaje final elegante.",
      ],
    },
  },
  media: {
    heroImage: assetUrl("hero-placeholder.svg"),
  },
  theme: {
    background: "#f4e2ca",
    foreground: "#1a2c38",
    accent: "#a84e29",
    accentSoft: "#f4e2ca",
    clay: "#bd6537",
    wine: "#691b17",
    green: "#546350",
    cream: "#f4e2ca",
  },
};
