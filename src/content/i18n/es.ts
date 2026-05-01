import type { Dictionary } from "@/types/site";

export const es: Dictionary = {
  nav: {
    languageLabel: "Idioma",
  },
  common: {
    dayLabel: "Día",
    timeLabel: "Hora",
    placeLabel: "Lugar",
    addressLabel: "Dirección",
    airportLabel: "Aeropuerto",
    hotelAreaLabel: "Hospedaje sugerido",
    optionalLabel: "Opcional",
    getDirectionsLabel: "Cómo llegar",
    addToCalendarLabel: "Agregar al calendario",
    viewRouteLabel: "Ver trayecto",
    hideMapLabel: "Ocultar mapa",
    touchMapHintLabel:
      "En celular puedes mover el mapa con dos dedos y tocar una vez para abrir Google Maps.",
  },
  rsvp: {
    introTitle: "Confirma tu presencia",
    introDescription: "",
    stepLabel: "Paso",
    identityStep: "Datos personales",
    attendanceStep: "Asistencia",
    logisticsStep: "Logística de viaje",
    confirmationStep: "Cierre",
    guestNameLabel: "Nombre completo",
    emailLabel: "Correo electrónico",
    phoneLabel: "Número telefónico",
    attendingQuestion: "¿Podrás acompañarnos en este día?",
    yesOption: "Sí",
    noOption: "No",
    unsureOption: "Aún no estoy seguro",
    companionQuestion: "¿Vendrás con acompañante?",
    companionNameLabel: "Nombre de acompañante",
    travelQuestion: "¿Viajarás desde otra ciudad o país para asistir a la boda?",
    accommodationQuestion:
      "¿Te gustaría recibir información o recomendaciones sobre opciones de alojamiento cercanas al lugar de la boda?",
    dietaryQuestion:
      "¿Tienes alguna restricción alimentaria o alergia que debamos tener en cuenta?",
    dietaryPlaceholder:
      "Escribe aquí cualquier restricción alimentaria, alergia o comentario especial.",
    nextButton: "Continuar",
    backButton: "Volver",
    closeButton: "Cerrar",
    submitButton: "Enviar confirmación",
    confirmationTitle: "Hemos recibido tu respuesta.",
    confirmationAttending:
      "Nos encantará celebrar contigo. Gracias por acompañarnos en este momento tan especial.",
    confirmationNotAttending:
      "Gracias por avisarnos con tiempo. Tu respuesta nos ayuda a organizar cada detalle con cariño.",
    confirmationUnsure:
      "Gracias por contarnos que aún estás decidiendo. Estaremos felices de saber de ti cuando tengas una respuesta.",
    resetButton: "Enviar otra respuesta",
    validationName: "Por favor escribe tu nombre.",
    validationEmail: "Por favor escribe tu correo electrónico.",
    validationPhone: "Por favor escribe tu número telefónico.",
    validationAttendance: "Por favor selecciona si podrás asistir o no.",
    validationCompanionDecision: "Por favor indícanos si vendrás con acompañante.",
    validationCompanion: "Por favor escribe el nombre de tu acompañante.",
    validationTravel:
      "Por favor indícanos si viajarás desde otra ciudad o país.",
    validationAccommodation:
      "Por favor indícanos si deseas información sobre alojamiento.",
    entryDescription: "Agradecemos tu respuesta tan pronto como te sea posible.",
    openButton: "RSVP",
    submittingButton: "Enviando...",
    submissionError:
      "No fue posible guardar tu respuesta en este momento. Por favor intenta nuevamente.",
    backendNotConfigured:
      "El formulario aún no está conectado a la base de datos. Configura Supabase para guardar respuestas reales.",
  },
};
