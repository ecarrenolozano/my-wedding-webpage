import { assetUrl } from "@/lib/assets";
import type { LocationStayPageContent } from "@/types/site";

export const locationStayEs: LocationStayPageContent = {
  seo: {
    title: "Ubicacion y Hospedaje",
    description:
      "Ubicacion de Pasto, guia de llegada, hoteles recomendados y actividades para disfrutar la ciudad durante nuestra boda.",
  },
  nav: {
    backLabel: "Volver al inicio",
  },
  labels: {
    overviewBadge: "Vista general del viaje",
    journeyHint: "Desliza para ver cada etapa en detalle",
    support: "Necesitas ayuda en Bogota?",
    lodging: "Hospedaje",
    activities: "Que hacer en Pasto?",
  },
  hero: {
    title: "Ubicacion y Hospedaje",
    subtitle: "Pasto, Colombia",
    metadata: ["Octubre", "7 C - 17 C", "Clima frio y lluvioso"],
    visual: {
      src: "/location/pasto-scaled.jpg",
      alt: "Vista panoramica de Pasto con montanas al fondo",
      label: "Pasto, Colombia",
      tone: "forest",
    },
  },
  location: {
    title: "Una ciudad con historia y naturaleza",
    description:
      "Pasto es una ciudad con una rica herencia historica, fundada alrededor de 1537. Ubicada en el valle de Atriz, al pie del volcan Galeras.",
    facts: [
      {
        id: "founded",
        text: "Fundada alrededor de 1537",
        icon: {
          key: "calendar",
          alt: "Icono de calendario",
          src: "/home/egcarren/Documents/Boda/ubicacion/location/calendar-icon.png",
        },
      },
      {
        id: "atriz",
        text: "Ubicada en el valle de Atriz",
        icon: {
          key: "mountain",
          alt: "Icono de montanas",
        },
      },
      {
        id: "galeras",
        text: "Al pie del volcan Galeras",
        icon: {
          key: "volcano",
          alt: "Icono de volcan",
        },
      },
      {
        id: "weather",
        text: "Clima frio y lluvioso en octubre",
        icon: {
          key: "thermometer",
          alt: "Icono de termometro",
        },
      },
    ],
    mapVisual: {
      src: "/location/map-pasto.png",
      alt: "Mapa de Colombia con un marcador indicando Pasto",
      label: "Pasto dentro de Colombia",
      tone: "cream",
    },
  },
  arrival: {
    title: "Como llegar si estas por fuera de Colombia?",
    intro:
      "Este es el recorrido para llegar a Pasto. La idea es que tengas una vision general primero y luego puedas revisar cada etapa con calma.",
    overviewVisual: {
      src: assetUrl("header-background-cropped.png"),
      alt: "Panoramica de Pasto con montanas y cielo abierto",
      label: "Recorrido general",
      tone: "forest",
    },
    steps: [
      {
        id: "international",
        stepNumber: "1",
        icon: "plane",
        title: "Vuelos Internacionales",
        shortLabel: "Llegada a Colombia",
        description: "Llegada a Colombia",
        cardText:
          "Los vuelos internacionales llegan al Aeropuerto El Dorado, en Bogota.",
        visual: {
          alt: "Aeropuerto internacional con un avion despegando",
          label: "Aeropuerto El Dorado",
          tone: "sky",
        },
        infoItems: [
          {
            label: "Aeropuerto",
            value: "El Dorado (BOG)",
          },
          {
            label: "Ubicacion",
            value: "Bogota, Colombia",
          },
          {
            label: "Duracion del vuelo",
            value: "Depende de tu ciudad de origen",
          },
        ],
      },
      {
        id: "bogota",
        stepNumber: "2",
        icon: "building",
        title: "Bogota (El Dorado)",
        shortLabel: "Conexion en Bogota",
        description: "Conexion en Bogota",
        cardText:
          "Puedes quedarte para conocer Bogota antes de continuar tu viaje.",
        visual: {
          alt: "Vista urbana de Bogota con montanas al fondo",
          label: "Escala en Bogota",
          tone: "charcoal",
        },
        assistanceTitle: "Necesitas ayuda en Bogota?",
        assistanceDescription:
          "Ponte en contacto con nosotros, estamos para ayudarte.",
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
        title: "Vuelo Nacional Bogota -> Pasto",
        shortLabel: "45 min - 1 hora",
        description: "Conexion rapida y directa",
        cardText:
          "La conexion desde El Dorado hacia Pasto se realiza normalmente desde el Aeropuerto Antonio Narino.",
        visual: {
          alt: "Avion en vuelo al atardecer",
          label: "Conexion a Pasto",
          tone: "gold",
        },
        infoItems: [
          {
            label: "Duracion",
            value: "45 min - 1 hora",
          },
          {
            label: "Aerolineas recomendadas",
            value: "Avianca, LATAM, Satena",
          },
          {
            label: "Tipo de vuelo",
            value: "Directo",
          },
        ],
      },
      {
        id: "pasto-airport",
        stepNumber: "4",
        icon: "pin",
        title: "Pasto (Antonio Narino)",
        shortLabel: "Llegada al aeropuerto",
        description: "Llegada al aeropuerto",
        cardText:
          "El aeropuerto Antonio Narino queda ubicado a las afueras de la ciudad de Pasto.",
        visual: {
          alt: "Terminal del Aeropuerto Antonio Narino",
          label: "Aeropuerto Antonio Narino",
          tone: "forest",
        },
        infoItems: [
          {
            label: "Aeropuerto",
            value: "Antonio Narino (PSO)",
          },
          {
            label: "Ubicacion",
            value: "Pasto, Narino, Colombia",
          },
          {
            label: "Clima en octubre",
            value: "Frio y lluvioso",
          },
          {
            label: "Temperatura",
            value: "7 C - 17 C",
          },
        ],
      },
      {
        id: "ground-transfer",
        stepNumber: "5",
        icon: "car",
        title: "Traslado por tierra",
        shortLabel: "Aprox. 30 min",
        description: "Del aeropuerto a la ciudad",
        cardText:
          "Desde el aeropuerto hasta Pasto hay aproximadamente 30 minutos por tierra.",
        visual: {
          alt: "Carretera montanosa hacia la ciudad",
          label: "Ruta por tierra",
          tone: "forest",
        },
        infoItems: [
          {
            label: "Duracion aproximada",
            value: "30 min",
          },
          {
            label: "Recomendacion",
            value: "Coordinar transporte con anticipacion",
          },
        ],
      },
      {
        id: "city-arrival",
        stepNumber: "6",
        icon: "city",
        title: "A la ciudad",
        shortLabel: "Llegada a tu hospedaje",
        description: "Llegada a tu hospedaje",
        cardText:
          "Por favor, avisanos si necesitas asistencia para llegar a tu hospedaje.",
        visual: {
          alt: "Centro historico de Pasto",
          label: "Llegada a Pasto",
          tone: "cream",
        },
        ctaLabel: "Contactanos",
      },
    ],
    supportCardTitle: "Necesitas ayuda en Bogota?",
    supportCardDescription:
      "Ponte en contacto con nosotros, estamos para ayudarte.",
  },
  lodging: {
    title: "Hospedaje",
    intro:
      "Hemos seleccionado algunas opciones cercanas a los eventos para que tu experiencia sea lo mas comoda posible.",
    options: [
      {
        id: "v1501",
        name: "Hotel V1501",
        price: "$$$ Costoso",
        label: "Descuento por boda",
        distance: "A 5 min del evento",
        description: "Una opcion elegante y muy conveniente para la recepcion.",
        href: "https://www.google.com/maps/search/?api=1&query=Hotel+V1501+Pasto",
        actionLabel: "Ver mas",
        visual: {
          src: assetUrl("hotel-v1501.jpg"),
          alt: "Hotel V1501 en Pasto",
          label: "Hotel V1501",
          tone: "gold",
        },
      },
      {
        id: "parque-reservado",
        name: "Hotel Parque Reservado",
        price: "$$ Precio medio",
        distance: "A 7 min del evento",
        description: "Una estancia comoda para moverte facilmente por la ciudad.",
        actionLabel: "Ver mas",
        visual: {
          alt: "Hotel Parque Reservado",
          label: "Hotel Parque Reservado",
          tone: "forest",
        },
      },
      {
        id: "palermo-suit",
        name: "Hotel Palermo Suit",
        price: "$$ Precio medio",
        distance: "A 6 min del evento",
        description: "Alternativa practica para invitados que quieren buena ubicacion.",
        actionLabel: "Ver mas",
        visual: {
          alt: "Hotel Palermo Suit",
          label: "Hotel Palermo Suit",
          tone: "charcoal",
        },
      },
      {
        id: "san-juan-boutique",
        name: "Hotel San Juan Boutique",
        price: "$$$ Costoso",
        distance: "A 6 min del evento",
        description: "Una opcion boutique con ambiente mas intimo.",
        actionLabel: "Ver mas",
        visual: {
          alt: "Hotel San Juan Boutique",
          label: "Hotel San Juan Boutique",
          tone: "gold",
        },
      },
      {
        id: "airbnb",
        name: "Busqueda en Airbnb",
        price: "$ Barato",
        location: "Sector Av. Los Estudiantes",
        description: "Ideal si prefieres una estancia mas flexible.",
        href: "https://www.airbnb.com/s/Pasto--Nari%C3%B1o--Colombia/homes",
        actionLabel: "Ver opciones",
        visual: {
          alt: "Busqueda de opciones en Airbnb",
          label: "Airbnb",
          tone: "cream",
        },
      },
    ],
  },
  explore: {
    title: "Que hacer en Pasto?",
    intro: "Si tienes tiempo, te recomendamos disfrutar un poco de la ciudad.",
    options: [
      {
        id: "cocha",
        number: "1",
        title: "Visita la Laguna de la Cocha",
        description:
          "Situada a unos 40-60 minutos de Pasto, con clima frio. Ofrece paseos en lancha, paisajes andinos y turismo comunitario.",
        visual: {
          alt: "Laguna de la Cocha",
          label: "Laguna de la Cocha",
          tone: "sky",
        },
      },
      {
        id: "museo-oro",
        number: "2",
        title: "Visita el Museo del Oro",
        description:
          "Una experiencia cultural para conocer el legado de las culturas indigenas que ocuparon el departamento desde hace unos 2500 anos.",
        visual: {
          alt: "Museo del Oro",
          label: "Museo del Oro",
          tone: "charcoal",
        },
      },
      {
        id: "museo-carnaval",
        number: "3",
        title: "Visitar el Museo del Carnaval",
        description:
          "Conoce la historia y el arte del Carnaval de Negros y Blancos, una de las tradiciones mas importantes de Pasto.",
        visual: {
          alt: "Museo del Carnaval",
          label: "Museo del Carnaval",
          tone: "gold",
        },
      },
      {
        id: "gastronomia",
        number: "4",
        title: "Experiencia gastronomica unica",
        description:
          "Descubre la diversidad de la cocina nariñense visitando restaurantes locales.",
        visual: {
          alt: "Plato tradicional de gastronomia nariñense",
          label: "Gastronomia local",
          tone: "forest",
        },
      },
    ],
  },
  closing: {
    title: "Necesitas ayuda con tu viaje?",
    description:
      "Estamos aqui para ayudarte a que tu experiencia sea increible.",
    buttonLabel: "Contactanos",
  },
};
