/**
 * Datos institucionales de Halcones Xtreme México / HXM LATAM.
 * Edita este archivo para actualizar nombres, teléfonos, direcciones o redes.
 * Los campos vacíos se muestran como placeholder en el sitio.
 */

export const PLACEHOLDER = 'PLACEHOLDER — INFORMACIÓN POR PROPORCIONAR';

export const site = {
  name: 'Halcones Xtreme México',
  brand: 'HXM LATAM',
  tagline: 'Donde el talento despega',
  secondaryTagline: 'Forma. Compite. Trasciende.',
  domain: 'hxmlatam.com',
  locale: 'es-MX',
  ogLocale: 'es_MX',

  seo: {
    defaultTitle: 'HXM LATAM | Halcones Xtreme México — Formación de Futbolistas',
    titleSuffix: 'HXM LATAM — Halcones Xtreme México',
    defaultDescription:
      'Halcones Xtreme México — HXM LATAM. Proyecto deportivo en Aguascalientes enfocado en formación futbolística, educación, alto rendimiento y proyección hacia el fútbol profesional.',
    ogImage: '/og-image.jpg',
    ogImageAlt: 'HXM LATAM · Halcones Xtreme México — Donde el talento despega',
  },

  contact: {
    phoneDisplay: '+52 449 256 8899',
    phoneE164: '+524492568899',
    whatsappNumber: '524492568899',
    whatsappMessage: 'Hola, quiero conocer el proyecto HXM LATAM / Halcones Xtreme México.',
    // PLACEHOLDER: correo institucional pendiente
    email: '',
  },

  address: {
    organization: 'Halcones Xtreme México',
    street: 'Altamira 125',
    neighborhood: 'Fracc. Municipio Libre',
    city: 'Aguascalientes',
    state: 'Aguascalientes',
    postalCode: '20199',
    country: 'México',
    countryCode: 'MX',
  },

  campus: {
    name: 'Ciudad Maderas',
    city: 'Aguascalientes',
    // La URL definitiva puede sobrescribirse con PUBLIC_MAP_URL
    mapUrl: 'https://maps.app.goo.gl/J4WKFbJHaZhM87AH6',
  },

  // No inventar URLs: completar cuando existan los perfiles oficiales.
  social: {
    facebook: '',
    instagram: '',
    tiktok: '',
    youtube: '',
    linkedin: '',
  },

  // No inventar datos legales: completar tras revisión jurídica.
  legal: {
    businessName: '',
    rfc: '',
    legalRepresentative: '',
    privacyEmail: '',
    lastUpdated: 'Octubre de 2026',
  },

  // Logotipo oficial: mientras sea null se usa el monograma tipográfico provisional.
  logo: null,

  copyrightYear: 2026,
};

export const socialLabels = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
};

export const stats = [
  { value: 80, label: 'Dormitorios' },
  { value: 3, label: 'Campos profesionales' },
  { value: 1, label: 'Centro de alto rendimiento' },
  { value: 2, label: 'Instituciones educativas' },
  { value: 1, label: 'Visión internacional' },
];

export const microcopy = {
  nextTalent: 'El siguiente gran talento puede estar aquí.',
  noBorders: 'El talento no tiene fronteras.',
  trainToCompete: 'Entrenar para competir.',
  educationForLife: 'Educación para la vida. Fútbol para el futuro.',
  buildOpportunities: 'Construimos oportunidades.',
  peopleFirst: 'Formamos personas antes que jugadores.',
  futureStarts: 'El futuro del fútbol comienza con una oportunidad.',
};

export const disclaimers = {
  concept: 'Imagen conceptual / proyecto en desarrollo',
  project: 'Halcones Xtreme México es un proyecto deportivo actualmente en desarrollo.',
  investment:
    'La información presentada en este sitio tiene carácter informativo y no constituye por sí misma una oferta pública, promesa de rendimiento, asesoría financiera ni garantía de resultados.',
  education:
    'El acceso a oportunidades académicas está sujeto a los requisitos y procesos de admisión de cada institución.',
  projection:
    'La proyección deportiva depende del desempeño, la evolución y las decisiones de cada jugador, así como de los procesos de clubes, ligas y terceros.',
  legalDraft:
    'Texto base sujeto a revisión legal. Debe ser validado por un abogado antes de considerarse definitivo.',
};
