export const UPIICSA_BASE_URL = 'https://www.upiicsa.ipn.mx';

export const ALLOWED_DOMAINS = [
  'www.upiicsa.ipn.mx',
  'upiicsa.ipn.mx'
];

export const SCRAPING_RULES = {
  maxDepth: 10,
  excludePatterns: [
    /\.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$/i,
    /\?/,
    /#/,
    /mailto:/,
    /tel:/,
    /login/,
    /admin/,
    /wp-/
  ],
  includePatterns: [
    /^https?:\/\/(www\.)?upiicsa\.ipn\.mx/,
    // Sección "Conócenos"
    /conocenos\/directrices/,
    /conocenos\/titular/,
    /conocenos\/estructura-upiicsa/,
    /conocenos\/antecedentes/,
    /conocenos\/comunicacion/,
    /conocenos\/manuales-upiicsa/,
    /conocenos\/directorio-upiicsa/,
    /conocenos\/evaluacion-curricular/,
    // Sección "Estudiantes"
    /estudiantes\/servicio-social/,
    /estudiantes\/gestion-escolar/,
    /estudiantes\/movilidad-academica/,
    /estudiantes\/becas/,
    /estudiantes\/atencion-salud/,
    /estudiantes\/tutorias/,
    /estudiantes\/practicas-profesionales/,
    /estudiantes\/actividades-deportivas/,
    /estudiantes\/actividades-culturales/,
    /estudiantes\/mallas-curriculares/,
    /estudiantes\/electivas/,
    /estudiantes\/orientacion-juvenil/,
    // Sección "Oferta Educativa"
    /oferta-educativa\/licenciatura-en-ciencias-de-la-informatica/,
    /oferta-educativa\/ingenieria-en-industrial/,
    /oferta-educativa\/ingenieria-en-transporte/,
    /oferta-educativa\/ingenieria-en-metalurgia/,
    /oferta-educativa\/ingenieria-en-energia/,
    // Sección "Educación Continua"
    /educacion-continua\/seminarios-de-titulacion/,
    /educacion-continua\/cursos-diplomados/,
    // Sección "Posgrado"
    /sepi/,
    // Sección "Egresados"
    /egresados\/titulacion/,
    // Sección "Transparencia"
    /transparencia/,
    // Sección "CELEX"
    /celex-upiicsa/,
    // Elementos generales
    /biblioteca/,
    /tramites/,
    /carreras/,
  ]
};

export const SELECTORS = {
  title: 'title, h1, .page-title',
  content: 'p, h1, h2, h3, h4, h5, h6, li, article, .content, .main-content, .entry-content, .post-content',
  links: 'a[href]',
  menu: 'nav a, .menu a, .navbar a, .navigation a'
};
