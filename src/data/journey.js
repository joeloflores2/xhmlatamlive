/**
 * Secuencias: ruta del jugador, etapas del proyecto y escalera de proyección.
 */

export const playerRoute = [
  { title: 'Contacto', text: 'Envías el perfil del jugador o nos escribes por WhatsApp.' },
  { title: 'Evaluación', text: 'Revisión de video y, en su caso, evaluación técnica, física y deportiva.' },
  { title: 'Admisión', text: 'Resultado de la evaluación y requisitos para ingresar al programa.' },
  { title: 'Integración', text: 'Llegada al campus, residencia e inicio de actividades académicas.' },
  { title: 'Formación', text: 'Entrenamiento diario, estudio y seguimiento individual.' },
  { title: 'Competencia', text: 'Partidos y torneos para medir el progreso.' },
  { title: 'Proyección', text: 'Exposición ante oportunidades en distintos mercados futbolísticos.' },
];

export const projectStages = [
  { title: 'Concepción', text: 'Definición del modelo deportivo, académico y residencial.' },
  { title: 'Planeación', text: 'Diseño del campus, alianzas y estructura del proyecto.' },
  { title: 'Infraestructura', text: 'Construcción y habilitación de las instalaciones.' },
  { title: 'Formación', text: 'Inicio de los programas deportivos y académicos.' },
  { title: 'Competencia', text: 'Participación en competencias.' },
  { title: 'Proyección', text: 'Vinculación con oportunidades nacionales e internacionales.' },
];

/**
 * Etapa actual del proyecto. Dejar vacío hasta confirmarla oficialmente.
 * Valor esperado: uno de los títulos de projectStages (ej. 'Planeación').
 */
export const currentStage = '';

export const projectionPath = [
  { flag: '🇲🇽', name: 'Liga Premier', region: 'México' },
  { flag: '🇲🇽', name: 'Liga de Expansión MX', region: 'México' },
  { flag: '🇺🇸', name: 'MLS', region: 'Estados Unidos y Canadá' },
  { flag: '🇪🇺', name: 'Europa', region: 'Ligas europeas' },
  { flag: '🌎', name: 'Mercados internacionales', region: 'Otros mercados' },
];

export const projectionText =
  'El objetivo es preparar jugadores para competir y aprovechar oportunidades en diferentes mercados futbolísticos.';

export const projectionMeaning = [
  { title: 'Preparación', text: 'Llegar listo: nivel competitivo, hábitos profesionales y formación académica.' },
  { title: 'Exposición', text: 'Partidos, torneos y material audiovisual que permiten que el talento sea visto.' },
  { title: 'Seguimiento', text: 'Registro del progreso de cada jugador a lo largo de su formación.' },
  { title: 'Vinculación', text: 'Búsqueda de oportunidades acordes con el nivel y la etapa de cada jugador.' },
];
