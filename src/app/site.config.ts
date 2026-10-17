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
  /** TODO: usuario de Instagram pendiente. */
  instagramUrl: '',
  trialLabel: '1 mes',
  prices: {
    starter: 9900,
    starterLabel: '$ 9.900',
    pro: 19900,
    proLabel: '$ 19.900'
  }
} as const;

export interface Plan {
  id: 'starter' | 'pro' | 'enterprise';
  name: string;
  tag?: string;
  price: string | null;
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
    price: null,
    blurb: 'Para varias sucursales.',
    features: [],
    cta: 'Escribinos por WhatsApp',
    highlighted: false,
    available: false
  }
];

export const landingFaqs = [
  { q: '¿Tengo que instalar algo?', a: 'No. Entrás desde el navegador en la compu, la tablet o el celular.' },
  { q: '¿Cómo funciona el mes gratis?', a: 'Al crear tu local probás el plan Pro completo durante 1 mes.' },
  { q: '¿Me cobran comisión por cada pedido?', a: 'No. Pagás el plan por mes y los pedidos de tu carta son todos tuyos.' },
  { q: '¿Cómo me pagan los clientes de la carta?', a: 'Con Mercado Pago o por transferencia, desde la misma carta.' },
  { q: '¿Sirve para un kiosco?', a: 'Sí. Tiene códigos de barra, stock, fiado y precios por lista.' },
  { q: '¿Se conecta con Rappi o PedidosYa?', a: 'Todavía no. Hoy tus clientes piden directo en tu carta, sin comisión.' },
  { q: '¿Hace factura electrónica (AFIP)?', a: 'Todavía no está incluida. Está entre lo próximo que viene.' },
  { q: '¿Tengo varias sucursales, me sirve?', a: 'El plan para varias sucursales viene pronto. Escribinos por WhatsApp y te contamos.' }
];
