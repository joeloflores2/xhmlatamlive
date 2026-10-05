/**
 * Instalaciones contempladas en el proyecto del campus.
 * Las imágenes actuales son planos conceptuales: al tener renders o fotografías
 * oficiales, reemplaza `image` y ajusta `conceptual` a false SOLO si la imagen
 * muestra instalaciones reales ya construidas.
 */

export const facilities = [
  {
    id: 'dormitorios',
    count: '80',
    title: 'Dormitorios',
    text: 'Residencias diseñadas para jugadores y estudiantes.',
    image: '/images/campus/dormitorios.svg',
    alt: 'Plano conceptual de la fachada de la residencia con 80 dormitorios',
    conceptual: true,
  },
  {
    id: 'canchas-sinteticas',
    count: '2',
    title: 'Canchas de pasto sintético profesional',
    text: 'Entrenamiento diario y preparación de alto rendimiento.',
    image: '/images/campus/canchas-sinteticas.svg',
    alt: 'Plano conceptual de dos canchas de pasto sintético vistas desde arriba',
    conceptual: true,
  },
  {
    id: 'cancha-natural',
    count: '1',
    title: 'Cancha de pasto natural profesional',
    text: 'Entrenamiento y competencia.',
    image: '/images/campus/cancha-natural.svg',
    alt: 'Plano conceptual de una cancha de pasto natural con patrón de corte',
    conceptual: true,
  },
  {
    id: 'gimnasio',
    count: '',
    title: 'Gimnasio',
    text: 'Preparación física, fuerza y rendimiento.',
    image: '/images/campus/gimnasio.svg',
    alt: 'Plano conceptual de la distribución del gimnasio',
    conceptual: true,
  },
  {
    id: 'alberca',
    count: '',
    title: 'Alberca',
    text: 'Entrenamiento complementario y recuperación.',
    image: '/images/campus/alberca.svg',
    alt: 'Plano conceptual de una alberca con carriles',
    conceptual: true,
  },
  {
    id: 'hidromasaje',
    count: '2',
    title: 'Tinas de hidromasaje',
    text: 'Recuperación y bienestar.',
    image: '/images/campus/hidromasaje.svg',
    alt: 'Plano conceptual de dos tinas de hidromasaje',
    conceptual: true,
  },
];

export const masterplan = {
  image: '/images/campus/plan-maestro-conceptual.svg',
  alt: 'Esquema conceptual del campus con tres canchas, residencia, gimnasio, alberca y tinas de hidromasaje',
  note: 'Esquema ilustrativo. No representa el proyecto arquitectónico definitivo ni la distribución real del terreno.',
};

export const environment = {
  title: 'Un entorno para crecer',
  statement:
    'Aguascalientes es reconocido por sus condiciones de seguridad y calidad de vida, ofreciendo un entorno atractivo para familias y jóvenes que buscan combinar educación y deporte.',
  points: [
    { title: 'Calidad de vida', text: 'Una ciudad de escala humana para concentrarse en entrenar, estudiar y crecer.' },
    { title: 'Entorno adecuado', text: 'Un contexto pensado para que las familias confíen en la etapa formativa de sus hijos.' },
    { title: 'Conectividad', text: 'Ubicación en el centro del país, con conexiones carreteras y aeropuerto internacional.' },
    { title: 'Formación', text: 'Oferta universitaria que permite combinar el fútbol con una carrera profesional.' },
    { title: 'Comunidad deportiva', text: 'Un estado con tradición deportiva y entorno favorable para el desarrollo de atletas.' },
  ],
  sourcesNote:
    'Cualquier estadística sobre seguridad o calidad de vida que se agregue a esta sección deberá provenir de fuentes oficiales y citarse.',
};

/**
 * Galería de fotografías o renders oficiales del campus (hero, obra, entrenamientos).
 * La sección "Galería" permanece oculta mientras esté vacía.
 * Formato: { src: '/images/gallery/archivo.webp', alt: '', caption: '', conceptual: true|false }
 * conceptual: true para renders o imágenes que no muestran instalaciones reales.
 */
export const gallery = [];
