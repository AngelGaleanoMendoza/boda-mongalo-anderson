import { WEDDING } from '../wedding.config';
import type { Content } from './i18n';

/**
 * Versión en español de los textos de `wedding.config.ts`.
 * Si cambias un texto en inglés allá, cambia también su traducción aquí.
 */
export const CONTENT_ES: Content = {
  welcome: [
    '¡Bienvenidos a nuestra página de boda!',
    'Creamos este espacio para compartir con ustedes todos los detalles de nuestro gran día: el itinerario, cómo llegar y todo lo que necesitan saber.',
    'No vemos la hora de celebrar con ustedes.',
  ],

  introQuote: 'Ni siquiera la distancia pudo separar lo que Dios había destinado a unir.',

  story: {
    ...WEDDING.story,
    title: 'Nuestra historia de amor',
    subtitle: 'Un amor más allá de la distancia',
    quote:
      'Hay almas destinadas a encontrarse, sin importar la distancia, el tiempo ni los caminos que deban recorrer.',
    paragraphs: [
      'Nuestra historia de amor es un hermoso recordatorio de que el amor verdadero no conoce fronteras. Aunque alguna vez nos separaron muchos kilómetros, el destino ya había comenzado a escribir una historia que uniría nuestros corazones.',
      'Lo que empezó como un amor a la distancia floreció en una promesa para siempre, recordándonos que cuando dos almas están destinadas a estar juntas, ninguna distancia es demasiado grande.',
      'Hoy, con el corazón agradecido y la bendición de Dios, celebramos no solo el camino que nos unió, sino también la hermosa vida que estamos construyendo juntos.',
    ],
  },

  twoWeddings: {
    title: 'Dos países, una historia de amor',
    quote: 'Dos países, dos celebraciones, una promesa eterna.',
    intro: [
      'Nuestra historia de amor une no solo dos corazones, sino también dos países, dos culturas y a las personas que más queremos.',
      'Para honrar los lugares que han marcado nuestro camino, decidimos celebrar nuestro matrimonio en dos ocasiones muy especiales.',
    ],
    celebrations: [
      {
        code: 'US',
        place: 'Texas, Estados Unidos',
        text: 'Una celebración de amor, alegría y unión, rodeados de familiares y amigos queridos, para conmemorar el comienzo de nuestro para siempre.',
      },
      {
        code: 'NIC',
        place: 'Managua, Nicaragua',
        text: 'Una celebración sagrada de nuestra unión ante Dios, donde recibiremos el Sacramento del Matrimonio e intercambiaremos nuestros votos en presencia de los más cercanos a nuestro corazón.',
      },
    ],
    closing: [
      'Aunque las separan fronteras, ambas celebraciones comparten un mismo propósito: honrar nuestro amor, nuestra fe y a las familias que nos han apoyado en el camino.',
      'Sería nuestra mayor alegría compartir estos momentos inolvidables con ustedes.',
    ],
  },

  details: [
    {
      label: 'US Wedding',
      place: 'Texas, Estados Unidos',
      venue: 'Próximamente',
      address: 'Los detalles y la ubicación se anunciarán pronto.',
      mapsUrl: '',
      dressCode: {
        title: 'Etiqueta rigurosa con toque western',
        description: 'Ropa formal de noche con sofisticados toques del oeste.',
      },
    },
    {
      label: 'NIC Wedding',
      place: 'Managua, Nicaragua',
      venue: 'Ángeles – Centro de Eventos',
      address: 'Balcones de Santo Domingo, Managua, Nicaragua',
      mapsUrl: WEDDING.details[1].mapsUrl,
      dressCode: {
        title: 'Formal',
        description: 'Se sugieren vestidos largos y trajes elegantes.',
      },
    },
  ],

  travel: [
    {
      id: 'nicaragua',
      flag: '🇳🇮',
      greeting: '¡Bienvenidos a Nicaragua!',
      tagline: 'Tierra de lagos y volcanes',
      intro: [
        'Con el corazón lleno de alegría les damos la bienvenida a la hermosa Nicaragua, una tierra de paisajes impresionantes, tradiciones ricas y un encanto inolvidable.',
        'Significa mucho para nosotros compartir este lugar tan especial con nuestros seres queridos mientras celebramos nuestro amor y comenzamos este hermoso capítulo juntos.',
      ],
      venue: {
        name: 'Ángeles – Centro de Eventos',
        address: 'Balcones de Santo Domingo, Managua, Nicaragua.',
      },
      accommodations: [
        'Para su comodidad, el lugar de la boda ofrece encantadoras casitas privadas en alquiler por estadías cortas, ideales para quienes deseen quedarse cerca de la celebración.',
        'Les recomendamos consultar la disponibilidad y reservar con anticipación.',
      ],
      phones: ['+505 8926-8202', '+505 5831-9742'],
      transportation: [
        'Si viajan desde Estados Unidos, por favor comuníquense directamente con la novia para recibir ayuda con el transporte y recomendaciones de viaje.',
        '¡Queremos que su viaje a Nicaragua sea lo más cómodo y agradable posible!',
      ],
      closing:
        '¡Esperamos que se enamoren de la belleza de Nicaragua y creen recuerdos inolvidables durante su estadía!',
    },
    {
      id: 'texas',
      flag: '🇺🇸',
      greeting: '¡Bienvenidos a Texas!',
      tagline: 'El Estado de la Estrella Solitaria',
      intro: [
        'Con mucha ilusión damos la bienvenida a nuestra familia y amigos a Texas, un lugar conocido por su encanto sureño, sus tradiciones y su cálida hospitalidad.',
        'Estamos profundamente agradecidos de celebrar otro hermoso capítulo de nuestra historia de amor rodeados de las personas que más significan para nosotros.',
      ],
      venue: {
        name: 'Próximamente',
        address: 'Los detalles y la ubicación se anunciarán pronto.',
      },
      accommodations: [
        'Las recomendaciones de hoteles y opciones de hospedaje cercanas se compartirán cuando el lugar de la boda esté confirmado.',
        'Invitamos a quienes vienen de fuera a visitar esta página de nuevo para ver las novedades mientras seguimos planeando.',
      ],
      phones: [],
      transportation: [],
      closing:
        '¡No vemos la hora de recibirlos en Texas y celebrar un día lleno de amor, risas y recuerdos inolvidables!',
    },
  ],

  faqs: [
    {
      question: '¿Pueden asistir niños?',
      answer:
        'Los niños son bienvenidos en nuestra celebración en Texas. Sin embargo, nuestra boda en Nicaragua será solo para adultos. Agradecemos sinceramente su comprensión.',
    },
    {
      question: '¿Cuál es el código de vestimenta?',
      answer:
        'Texas: etiqueta rigurosa con toque western, ropa formal de noche con sofisticados detalles del oeste. Nicaragua: formal, se sugieren vestidos largos y trajes elegantes.',
    },
    {
      question: '¿Puedo llevar acompañante?',
      answer:
        'Les pedimos amablemente que la asistencia se limite a los invitados nombrados en su invitación.',
    },
    {
      question: '¿Cuándo debo confirmar mi asistencia?',
      answer:
        'Les pedimos confirmar su asistencia antes de la fecha límite indicada en su invitación.',
    },
    {
      question: '¿A qué hora debo llegar?',
      answer:
        'Les recomendamos llegar 30 minutos antes de la ceremonia para que todo comience con calma y a tiempo.',
    },
    {
      question: '¿Recomiendan hospedaje?',
      answer: 'Visiten nuestra sección de Viaje y hospedaje para ver los lugares recomendados.',
    },
    {
      question: '¿Por qué hay dos celebraciones?',
      answer:
        'Cada celebración ocupa un lugar especial en nuestro corazón. Nuestra boda en Texas reúne a nuestros seres queridos, y nuestra boda en Nicaragua honra nuestra unión con el Sacramento del Matrimonio.',
    },
    {
      question: '¿Hay mesa de regalos?',
      answer:
        'Su presencia es nuestro mejor regalo. Para quienes deseen tener un detalle con nosotros, nuestra mesa de regalos está disponible en esta página.',
    },
    {
      question: '¿Puedo asistir a las dos celebraciones?',
      answer:
        '¡Por supuesto! Nos encantaría que nos acompañen en ambas celebraciones mientras celebramos estos momentos tan especiales.',
    },
    {
      question: '¿Habrá transporte?',
      answer:
        'Consulten nuestra sección de Viaje y hospedaje para ver los detalles y recomendaciones de transporte.',
    },
    {
      question: '¿La ceremonia y la recepción serán en el mismo lugar?',
      answer: 'Consulten la sección de Detalles de la boda para ver los lugares de la ceremonia y la recepción.',
    },
    {
      question: '¿Habrá cena?',
      answer: 'Sí, será un gusto compartir una deliciosa cena con nuestros invitados.',
    },
    {
      question: '¿Pueden atender restricciones alimentarias?',
      answer:
        'Por favor indíquennos cualquier restricción alimentaria o alergia al enviar su confirmación.',
    },
    {
      question: '¿A quién contacto si tengo más preguntas?',
      answer:
        'Si tienen cualquier otra pregunta, no duden en escribirnos. Con gusto les ayudaremos.',
    },
  ],

  schedule: [
    {
      time: '3:30 p. m.',
      title: 'Llegada de invitados',
      place: 'Ceremonia',
      description: 'Les pedimos llegar con tiempo para acomodarse con calma.',
      icon: 'rings',
    },
    {
      time: '4:00 p. m.',
      title: 'Ceremonia',
      place: 'Ceremonia',
      description: 'El momento más especial: el "sí, acepto".',
      icon: 'rings',
    },
    {
      time: '5:00 p. m.',
      title: 'Cóctel de bienvenida',
      place: 'Recepción',
      description: 'Bebidas, bocadillos y fotos mientras cae el atardecer.',
      icon: 'glass',
    },
    {
      time: '6:30 p. m.',
      title: 'Cena',
      place: 'Recepción',
      description: 'Brindis, unas palabras de nuestros seres queridos y una cena para compartir.',
      icon: 'dinner',
    },
    {
      time: '8:00 p. m.',
      title: '¡A bailar!',
      place: 'Recepción',
      description: 'Nuestro primer baile y fiesta hasta que el cuerpo aguante.',
      icon: 'music',
    },
    {
      time: '12:00 a. m.',
      title: 'Despedida',
      place: 'Recepción',
      description: 'Gracias por acompañarnos en este día tan especial.',
      icon: 'moon',
    },
  ],

  gifts: {
    message:
      'Su presencia es nuestro mejor regalo. Si desean tener un detalle con nosotros, agradeceremos su aporte para nuestra luna de miel y nuestro nuevo hogar.',
    options: [
      { title: 'Lluvia de sobres', detail: 'Habrá un buzón especial durante la recepción.' },
      { title: 'Transferencia', detail: 'Datos bancarios por confirmar' },
    ],
  },
};
