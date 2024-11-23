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
  /servicio-social/,
  /electivas/,
  /titulacion/,
  /practicas-profesionales/,
  /tramites/
]
};

export const SELECTORS = {
  title: 'title, h1, .page-title',
  content: 'p, h1, h2, h3, h4, h5, h6, li, article, .content, .main-content, .entry-content, .post-content',
  links: 'a[href]',
  menu: 'nav a, .menu a, .navbar a, .navigation a'
};
