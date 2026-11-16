/**
 * Todos los datos de la boda viven aquí.
 * Cambia estos valores y la página entera se actualiza.
 *
 * Los textos marcados con "POR CONFIRMAR" son de ejemplo: reemplázalos
 * con la información real antes de compartir la página.
 */

export interface WeddingEvent {
  /** Sigla que va antes de "Wedding" en los títulos: "US" o "NIC". */
  code: string;
  /** Nombre completo, por ejemplo "US Wedding" (para lectores de pantalla). */
  label: string;
  place: string;
  /** Fecha y hora de la ceremonia, con el desfase horario del lugar. */
  date: Date;
  /** Zona horaria del lugar, para mostrar la fecha correcta. */
  timeZone: string;
  /** Cómo se escribe la fecha: 'us' = MM/DD/AAAA, 'nic' = DD/MM/AAAA. */
  dateStyle: 'us' | 'nic';
}

export interface ScheduleItem {
  time: string;
  title: string;
  place: string;
  description: string;
  icon: 'rings' | 'glass' | 'dinner' | 'music' | 'moon';
}

/** Detalles de cada boda: lugar y código de vestimenta. */
export interface WeddingDetail {
  label: string;
  place: string;
  venue: string;
  address: string;
  /** Vacío mientras no haya lugar confirmado. */
  mapsUrl: string;
  dressCode: { title: string; description: string };
}

/** Bloque de "Travel & Accommodations" para cada país. */
export interface TravelGuide {
  id: string;
  flag: string;
  greeting: string;
  tagline: string;
  intro: string[];
  venue: { name: string; address: string };
  accommodations: string[];
  phones: string[];
  transportation: string[];
  closing: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface GalleryPhoto {
  src: string;
  thumb: string;
  alt: string;
  orientation: 'portrait' | 'landscape';
}

const portrait = new Set([1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 19, 21]);

export const WEDDING = {
  /** Nombres tal como aparecen en la portada. */
  partnerOne: 'Justin',
  partnerTwo: 'Melanie',
  /** Monograma del menú y del pie de página. */
  initials: { one: 'J', two: 'M' },

  /**
   * Las dos bodas, en orden. Cada una tiene su propia cuenta regresiva.
   * La hora (4:00 p. m.) está POR CONFIRMAR en las dos.
   */
  weddings: [
    {
      code: 'US',
      label: 'US Wedding',
      place: 'Texas',
      date: new Date('2027-02-27T16:00:00-06:00'),
      timeZone: 'America/Chicago',
      dateStyle: 'us',
    },
    {
      code: 'NIC',
      label: 'NIC Wedding',
      place: 'Nicaragua',
      date: new Date('2027-11-27T16:00:00-06:00'),
      timeZone: 'America/Managua',
      dateStyle: 'nic',
    },
  ] satisfies WeddingEvent[],

  /** Fecha límite para confirmar asistencia (POR CONFIRMAR). */
  rsvpDeadline: new Date('2027-01-27T23:59:00-06:00'),

  /** Zona horaria para mostrar la fecha límite del RSVP. */
  timeZone: 'America/Managua',

  welcome: [
    'Welcome to our wedding website!',
    'We created this space to share all the details of our big day with you: the schedule, how to get there and everything else you need to know.',
    'We can\'t wait to celebrate with you.',
  ],

  /** Frase de la portada de entrada y de la animación. */
  introQuote: 'Not even distance could separate what God had destined to unite.',

  story: {
    title: 'Our Love Story',
    subtitle: 'A Love Beyond Distance',
    quote:
      'Some souls are destined to find one another, no matter the distance, the time, or the paths they must travel.',
    /**
     * Fotos del carrusel de "Nuestra historia" (números de images/gallery/NN.jpg).
     * `bw: true` la muestra en blanco y negro.
     */
    carousel: [
      { n: 1, bw: false },
      { n: 8, bw: true },
      { n: 16, bw: false },
      { n: 3, bw: false },
      { n: 13, bw: true },
      { n: 21, bw: false },
      { n: 5, bw: false },
      { n: 23, bw: true },
      { n: 10, bw: false },
      { n: 2, bw: true },
      { n: 19, bw: false },
      { n: 11, bw: true },
      { n: 6, bw: false },
      { n: 12, bw: true },
    ],
    paragraphs: [
      'Our love story is a beautiful reminder that true love knows no boundaries. Though miles once stood between us, fate had already begun writing a story that would bring our hearts together.',
      'What began as a love across the distance blossomed into a promise of forever, reminding us that when two souls are meant to be, no distance is ever too great.',
      'Today, with grateful hearts and God’s blessings, we celebrate not only the journey that brought us together but also the beautiful life we are building side by side.',
    ],
  },

  /** Sección "Two Countries, One Love Story": por qué hay dos bodas. */
  twoWeddings: {
    title: 'Two Countries, One Love Story',
    quote: 'Two countries, two celebrations, one everlasting promise.',
    intro: [
      'Our love story brings together not only two hearts, but also two countries, two cultures, and the people we hold most dear.',
      'To honor the places that have shaped our journey, we have chosen to celebrate our marriage through two meaningful occasions.',
    ],
    celebrations: [
      {
        code: 'US',
        place: 'Texas, United States',
        text: 'A celebration of love, joy, and togetherness, surrounded by cherished family and friends as we commemorate the beginning of our forever.',
      },
      {
        code: 'NIC',
        place: 'Managua, Nicaragua',
        text: 'A sacred celebration of our union before God, where we will receive the Sacrament of Holy Matrimony and exchange our vows in the presence of those closest to our hearts.',
      },
    ],
    closing: [
      'Though separated by borders, both celebrations are united by one beautiful purpose: to honor our love, our faith, and the families who have supported us along the way.',
      'It would be our greatest joy to share these unforgettable moments with you.',
    ],
  },

  /** Detalles de cada boda (sección "Wedding Details"), en el mismo orden que `weddings`. */
  details: [
    {
      label: 'US Wedding',
      place: 'Texas, United States',
      venue: 'Coming Soon',
      address: 'Venue details and location will be announced soon.',
      mapsUrl: '',
      dressCode: {
        title: 'Western Chic Black Tie',
        description: 'Formal eveningwear with sophisticated Western touches.',
      },
    },
    {
      label: 'NIC Wedding',
      place: 'Managua, Nicaragua',
      venue: 'Ángeles – Centro de Eventos',
      address: 'Balcones de Santo Domingo, Managua, Nicaragua',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=%C3%81ngeles%20Centro%20de%20Eventos%20Balcones%20de%20Santo%20Domingo%20Managua',
      dressCode: {
        title: 'Formal Attire',
        description: 'Floor-length gowns and elegant suits are encouraged.',
      },
    },
  ] satisfies WeddingDetail[],

  /** Sección "Travel & Accommodations". */
  travel: [
    {
      id: 'nicaragua',
      flag: '🇳🇮',
      greeting: '¡Bienvenidos a Nicaragua!',
      tagline: 'The Land of Lakes and Volcanoes',
      intro: [
        'With hearts full of joy, we welcome you to beautiful Nicaragua, a land of breathtaking landscapes, rich traditions, and unforgettable charm.',
        'It means so much to us to share this special place with our loved ones as we celebrate our love and begin this beautiful chapter together.',
      ],
      venue: {
        name: 'Ángeles – Centro de Eventos',
        address: 'Balcones de Santo Domingo, Managua, Nicaragua.',
      },
      accommodations: [
        'For your convenience, our wedding venue offers charming private cottages (casitas) available for short-term rentals, perfect for guests who wish to stay close to the celebration.',
        'We encourage you to inquire about availability and make reservations in advance.',
      ],
      phones: ['+505 8926-8202', '+505 5831-9742'],
      transportation: [
        'For guests traveling from the United States, please reach out to the bride directly for assistance with transportation arrangements and travel recommendations.',
        'We want to make your journey to Nicaragua as smooth and enjoyable as possible!',
      ],
      closing:
        'We hope you fall in love with the beauty of Nicaragua and create unforgettable memories during your stay!',
    },
    {
      id: 'texas',
      flag: '🇺🇸',
      greeting: '¡Bienvenidos a Texas!',
      tagline: 'The Lone Star State',
      intro: [
        'With great excitement, we welcome our family and friends to Texas, a place known for its Southern charm, timeless traditions, and warm hospitality.',
        'We are beyond grateful to celebrate another beautiful chapter of our love story surrounded by the people who mean the most to us.',
      ],
      venue: {
        name: 'Coming Soon',
        address: 'Venue details and location will be announced soon.',
      },
      accommodations: [
        'Hotel recommendations and nearby accommodation options will be shared once our wedding venue has been finalized.',
        'We encourage our out-of-town guests to check back for updates as we continue planning.',
      ],
      phones: [],
      transportation: [],
      closing:
        'We can’t wait to welcome you to Texas and celebrate a day filled with love, laughter, and unforgettable memories!',
    },
  ] satisfies TravelGuide[],

  faqs: [
    {
      question: 'Are children welcome?',
      answer:
        'Children are warmly welcomed at our Texas celebration. However, our wedding in Nicaragua will be an adults-only affair. We sincerely appreciate your understanding.',
    },
    {
      question: 'What is the dress code?',
      answer:
        'Texas: Western Chic Black Tie — formal eveningwear with sophisticated Western touches. Nicaragua: Formal Attire — floor-length gowns and elegant suits are encouraged.',
    },
    {
      question: 'May I bring a plus-one?',
      answer:
        'We kindly request that attendance be limited to the guests specifically named on your invitation.',
    },
    {
      question: 'When should I RSVP?',
      answer:
        'We kindly ask that you confirm your attendance by the RSVP deadline indicated on your invitation.',
    },
    {
      question: 'What time should I arrive?',
      answer:
        'We recommend arriving 30 minutes before the ceremony to allow for a relaxed and timely beginning.',
    },
    {
      question: 'Will accommodations be recommended?',
      answer: 'Please visit our Travel & Accommodations section for recommended places to stay.',
    },
    {
      question: 'Why are there two wedding celebrations?',
      answer:
        'Each celebration holds a special place in our hearts. Our Texas wedding brings our loved ones together, while our Nicaragua wedding honors our union through the sacrament of Holy Matrimony.',
    },
    {
      question: 'Is there a wedding registry?',
      answer:
        'Your presence is our greatest gift. For those who wish to honor us further, our registry is available on our website.',
    },
    {
      question: 'Can I attend both celebrations?',
      answer:
        'Absolutely! We would be delighted to have you join us for both celebrations as we commemorate these special moments together.',
    },
    {
      question: 'Will transportation be provided?',
      answer:
        'Please refer to our Travel & Accommodations section for transportation details and recommendations.',
    },
    {
      question: 'Will the ceremony and reception take place at the same location?',
      answer: 'Please refer to the Wedding Details section for ceremony and reception locations.',
    },
    {
      question: 'Will dinner be served?',
      answer: 'Yes, we look forward to sharing a lovely dining experience with our guests.',
    },
    {
      question: 'Can dietary restrictions be accommodated?',
      answer:
        'Please let us know of any dietary restrictions or allergies when submitting your RSVP.',
    },
    {
      question: 'Who should I contact with additional questions?',
      answer:
        'Should you have any further questions, please feel free to reach out to us. We would be delighted to assist.',
    },
  ] satisfies Faq[],

  schedule: [
    {
      time: '3:30 PM',
      title: 'Guest arrival',
      place: 'Ceremony',
      description: 'Please arrive early so you can find your seat without rushing.',
      icon: 'rings',
    },
    {
      time: '4:00 PM',
      title: 'Ceremony',
      place: 'Ceremony',
      description: 'The most special moment: "I do."',
      icon: 'rings',
    },
    {
      time: '5:00 PM',
      title: 'Cocktail hour',
      place: 'Reception',
      description: 'Drinks, bites and photos as the sun goes down.',
      icon: 'glass',
    },
    {
      time: '6:30 PM',
      title: 'Dinner',
      place: 'Reception',
      description: 'Toasts, a few words from our loved ones and dinner together.',
      icon: 'dinner',
    },
    {
      time: '8:00 PM',
      title: 'Let\'s dance!',
      place: 'Reception',
      description: 'Our first dance, then the party goes on as long as you can keep up.',
      icon: 'music',
    },
    {
      time: '12:00 AM',
      title: 'Farewell',
      place: 'Reception',
      description: 'Thank you for sharing this special day with us.',
      icon: 'moon',
    },
  ] satisfies ScheduleItem[],

  gifts: {
    message:
      'Your presence is the greatest gift. If you would like to give us something, a contribution toward our honeymoon and our new home would be greatly appreciated.',
    // POR CONFIRMAR: datos bancarios o enlace a mesa de regalos.
    options: [
      { title: 'Card box', detail: 'There will be a card box at the reception.' },
      { title: 'Bank transfer', detail: 'Bank details to be announced' },
    ],
  },

  /**
   * Canción de fondo: suena completa con el reproductor de YouTube.
   * Si YouTube no deja reproducirla dentro de la página (algunos videos tienen
   * la inserción desactivada), se usa el reproductor de Spotify como respaldo.
   */
  music: {
    title: 'Just the Two of Us',
    artist: 'Grover Washington, Jr. feat. Bill Withers',
    /** Video "Official Audio": https://www.youtube.com/watch?v=6IO74QV6wHY */
    youtubeVideoId: '6IO74QV6wHY',
    spotifyTrackId: '2tH28YyKYOldxhuBHoI79M',
  },

  rsvp: {
    /**
     * URL que recibe las respuestas del formulario (por ejemplo Formspree o
     * un Google Apps Script). Si se deja vacío, el formulario abre un correo
     * con la respuesta lista para enviar a `email`.
     */
    endpoint: '',
    email: 'correo@ejemplo.com', // POR CONFIRMAR
    /** Teléfono para dudas (formato internacional, sin "+"). POR CONFIRMAR */
    whatsapp: '',
    maxGuests: 4,
  },

  gallery: Array.from({ length: 24 }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return {
      src: `images/gallery/${n}.jpg`,
      thumb: `images/gallery/thumbs/${n}.jpg`,
      alt: `Justin and Melanie engagement session, photo ${i + 1}`,
      orientation: portrait.has(i + 1) ? 'portrait' : 'landscape',
    } satisfies GalleryPhoto;
  }),
} as const;

export type Wedding = typeof WEDDING;
