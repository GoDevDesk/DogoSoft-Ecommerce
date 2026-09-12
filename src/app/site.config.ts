export const siteConfig = {
  name: 'DogoSoft FastFood',
  product: 'FastFood',
  brand: 'DogoSoft',
  email: 'contacto@dogosoft.com',
  /** URL para crear el local / iniciar la prueba. Si está vacío, el CTA va a contacto. */
  signupUrl: '/contact?intent=trial',
  trialDays: 30,
  trialLabel: '1 mes',
  trialCta: 'Probar 1 mes gratis',
  graceDays: 3,
  prices: {
    starterLabel: '$ 9.900 / mes',
    proLabel: '$ 16.000 / mes',
    enterpriseLabel: '$ 34.900 / mes'
  }
} as const;

export const subscriptionPlans = [
  {
    id: 'starter',
    name: 'Starter',
    badge: 'Para empezar',
    featured: false,
    blurb:
      'Ideal para empezar: carta pública, productos y combos. El cliente arma el pedido y continúa por WhatsApp.',
    amount: '$ 9.900',
    period: '/ mes',
    features: [
      'Carta online con link y QR',
      'Cierre del pedido por WhatsApp',
      'Productos y combos'
    ],
    cta: siteConfig.trialCta
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'Más elegido',
    featured: true,
    blurb: 'Todas las funciones del sistema para operar el local completo.',
    amount: '$ 16.000',
    period: '/ mes',
    features: [
      'Todo lo de Starter',
      'POS, cocina y pedidos',
      'Stock, proveedores y tesorería',
      'Delivery y reportes',
      'Listas de precios y configuración completa'
    ],
    cta: 'Crear mi local'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: 'Premium',
    featured: false,
    blurb:
      'Para cadenas y operaciones avanzadas. Hoy incluye todo Pro; las novedades premium llegan primero acá.',
    amount: '$ 34.900',
    period: '/ mes',
    features: [
      'Todo lo de Pro',
      'Prioridad en nuevas funciones',
      'Soporte prioritario',
      'Pensado para operar a escala'
    ],
    cta: 'Hablar con DogoSoft'
  }
] as const;

export const landingFaqs = [
  {
    question: '¿Hay prueba gratis?',
    answer:
      'Sí. Al crear tu local tenés 1 mes de prueba gratis, sin compromiso. Podés cargar productos, armar la carta y probar el sistema antes de elegir plan.'
  },
  {
    question: '¿Cómo se paga la suscripción?',
    answer:
      'El cobro es mensual con Mercado Pago. Activás el plan desde la configuración del local cuando quieras seguir después de la prueba.'
  },
  {
    question: '¿Cobran comisión por cada pedido o venta?',
    answer:
      'No. El precio es la suscripción mensual del plan. No nos quedamos con un porcentaje de tus ventas. La carta online está incluida en los tres planes.'
  },
  {
    question: '¿Qué pasa si falla un pago?',
    answer:
      'Si tenés una suscripción activa y el pago falla, hay 3 días de gracia antes de bloquear el acceso. Así no te quedás afuera en medio de un servicio.'
  },
  {
    question: '¿Puedo cambiar de plan después?',
    answer:
      'Sí. Desde la configuración del local gestionás la suscripción y podés pasar de Starter a Pro o Enterprise (o al revés) cuando el negocio lo pida.'
  },
  {
    question: '¿Qué incluye Starter?',
    answer:
      'Carta online con link y QR, productos y combos. El cliente arma el pedido y continúa por WhatsApp. No incluye POS, cocina, stock, tesorería, delivery ni reportes.'
  },
  {
    question: '¿Qué incluye Pro?',
    answer:
      'Todo lo de Starter, más POS, cocina y pedidos, stock, proveedores y tesorería, delivery y reportes, listas de precios y la configuración completa del local.'
  },
  {
    question: '¿Qué incluye Enterprise?',
    answer:
      'Todo lo de Pro, con prioridad en nuevas funciones y soporte prioritario. Está pensado para cadenas y operaciones a escala. Hoy incluye el mismo sistema Pro; las novedades premium llegan primero a este plan.'
  },
  {
    question: '¿Tengo que instalar un programa?',
    answer:
      'No. Es un sistema web: lo usás desde el navegador, en el local. Cada negocio es un local independiente (SaaS multi-local).'
  },
  {
    question: '¿La carta online se paga aparte?',
    answer:
      'No. Está incluida en Starter, Pro y Enterprise. En Starter el pedido cierra por WhatsApp. En Pro y Enterprise entra al mismo flujo de cocina y gestión.'
  },
  {
    question: '¿Se integra con PedidosYa o Rappi?',
    answer:
      'Hoy no. DogoSoft FastFood cubre tu operación propia: mostrador, carta web y delivery del local. No prometemos integraciones con marketplaces que todavía no existen en el producto.'
  },
  {
    question: '¿Incluye facturación fiscal AFIP?',
    answer:
      'No está incluida. El sistema registra ventas, caja y tesorería para operar el local; la facturación fiscal integrada no forma parte de la oferta actual.'
  }
];
