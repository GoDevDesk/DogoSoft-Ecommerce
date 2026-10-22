/**
 * Configuración y textos de la landing de DogoSoft FastFood.
 * Precios: fuente única para tarjetas, comparativa y textos. Si cambian,
 * actualizar también el JSON-LD de src/index.html.
 */
export const siteConfig = {
  name: 'DogoSoft FastFood',
  brand: 'DogoSoft',
  product: 'FastFood',
  email: 'contacto@dogosoft.com',
  /** URL para crear el local / iniciar la prueba (app actual). */
  signupUrl: 'https://dogo-sogft-app-web.vercel.app/registro',
  loginUrl: 'https://dogo-sogft-app-web.vercel.app/login',
  /** TODO: reemplazar por una carta pública de ejemplo cuando exista. */
  demoCartaUrl: '',
  whatsappUrl:
    'https://wa.me/5491121566878?text=' +
    encodeURIComponent('Hola, quiero saber más de DogoSoft FastFood'),
  whatsappLabel: '11 2156-6878',
  /** WhatsApp de ventas con el mensaje del plan Enterprise (no tiene alta online). */
  enterpriseWhatsappUrl:
    'https://wa.me/5491121566878?text=' +
    encodeURIComponent('Hola, quiero el plan Enterprise multisucursal'),
  /** TODO: usuario de Instagram pendiente. */
  instagramUrl: '',
  trialLabel: '1 mes',
  prices: {
    starter: 9900,
    starterLabel: '$ 9.900',
    pro: 19900,
    proLabel: '$ 19.900'
  },
  /**
   * Precio founders: solo texto. No cambia lo que se cobra (el monto sale de la base).
   * Los primeros 10 locales mantienen el precio de lanzamiento por 6 meses.
   */
  founders: {
    badge: 'Founders · precio de lanzamiento',
    note: 'Precio de lanzamiento para los primeros 10 usuarios founders, congelado por 6 meses. Después: Pro $24.900 y Starter $14.900 por mes.',
    short: 'Primeros 10 locales, congelado por 6 meses.',
    starterAfterLabel: '$ 14.900',
    proAfterLabel: '$ 24.900'
  },
  /**
   * Enterprise (multisucursal / franquicias): solo texto, se contrata por WhatsApp.
   * Total = consolidado + licencia de cada local. Ej. 3 locales: 24.900 + 3 x 19.900 = 84.600;
   * después: 24.900 + 3 x 22.000 = 90.900.
   */
  enterprise: {
    consolidatedLabel: '$ 24.900',
    perLocationFoundersLabel: '$ 19.900',
    perLocationLabel: '$ 22.000',
    exampleFoundersLabel: '$\u00a084.600',
    exampleAfterLabel: '$\u00a090.900'
  }
} as const;

export interface Plan {
  id: 'starter' | 'pro' | 'enterprise';
  name: string;
  tag?: string;
  price: string | null;
  /** Precio founders de lanzamiento: muestra el badge y el precio de después. */
  founders?: boolean;
  afterPrice?: string;
  /** Texto bajo el precio (Enterprise: qué incluye ese monto). */
  priceNote?: string;
  /** Precio por local (Enterprise). */
  perLocation?: { label: string; price: string; note: string }[];
  example?: string;
  /** Plan sin alta online: el botón abre este link de contacto. */
  contactUrl?: string;
  blurb: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  available: boolean;
}

export const subscriptionPlans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: siteConfig.prices.starterLabel,
    founders: true,
    afterPrice: siteConfig.founders.starterAfterLabel,
    blurb: 'Solo carta online, pedidos por WhatsApp.',
    features: ['Carta con QR y link', 'Tus colores y tu logo', 'Sin comisión por pedido'],
    cta: 'Empezar con Starter',
    highlighted: false,
    available: true
  },
  {
    id: 'pro',
    name: 'Pro',
    tag: '1 mes gratis',
    price: siteConfig.prices.proLabel,
    founders: true,
    afterPrice: siteConfig.founders.proAfterLabel,
    blurb: 'Todo el sistema.',
    features: [
      'Carta online con pago y seguimiento',
      'Punto de venta, cocina y delivery',
      'Stock, caja y reportes',
      'Sin comisión por pedido'
    ],
    cta: 'Probar 1 mes gratis',
    highlighted: true,
    available: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tag: '1 mes gratis',
    price: siteConfig.enterprise.consolidatedLabel,
    priceNote: 'Sistema consolidado, más la licencia de cada local:',
    perLocation: [
      { label: 'Primeros 10 founders', price: siteConfig.enterprise.perLocationFoundersLabel, note: 'por local, congelado 6 meses desde el primer pago' },
      { label: 'Después de los founders', price: siteConfig.enterprise.perLocationLabel, note: 'por local (la licencia individual es $\u00a024.900)' }
    ],
    example: `Ejemplo con 3 locales: ${siteConfig.enterprise.exampleFoundersLabel}/mes founders y ${siteConfig.enterprise.exampleAfterLabel}/mes después.`,
    blurb: 'Para cadenas y franquicias: cada local con su licencia y un sistema consolidado que ve los datos de todas las sucursales juntas.',
    features: ['Todo lo de Pro en cada local', 'Datos de todas las sucursales juntos', 'Sin comisión por pedido'],
    cta: 'Consultar por WhatsApp',
    contactUrl: siteConfig.enterpriseWhatsappUrl,
    highlighted: false,
    available: true
  }
];

export const landingFaqs = [
  { q: '¿Tengo que instalar algo?', a: 'No. Entrás desde el navegador en la compu, la tablet o el celular.' },
  { q: '¿Cómo funciona el mes gratis?', a: 'Al crear tu local probás el plan Pro completo durante 1 mes.' },
  { q: '¿Qué es el precio founders?', a: siteConfig.founders.note },
  { q: '¿Me cobran comisión por cada pedido?', a: 'No. Pagás el plan por mes y los pedidos de tu carta son todos tuyos.' },
  { q: '¿Cómo me pagan los clientes de la carta?', a: 'Con Mercado Pago o por transferencia, desde la misma carta.' },
  { q: '¿Sirve para un kiosco?', a: 'Sí. Tiene códigos de barra, stock, fiado y precios por lista.' },
  { q: '¿Se conecta con Rappi o PedidosYa?', a: 'Todavía no. Hoy tus clientes piden directo en tu carta, sin comisión.' },
  { q: '¿Hace factura electrónica (AFIP)?', a: 'Todavía no está incluida. Está entre lo próximo que viene.' },
  {
    q: '¿Tengo varias sucursales, me sirve?',
    a: 'Sí, con el plan Enterprise. Cada local paga su licencia y se suma un sistema consolidado de $ 24.900 por mes que ve los datos de todas las sucursales juntas. Por local: $ 19.900 para los primeros 10 founders (congelado 6 meses desde el primer pago) y después $ 22.000. También tiene 1 mes gratis. Escribinos por WhatsApp y lo armamos.'
  }
];
