import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { KitchenRailComponent } from '../kitchen-rail/kitchen-rail.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { landingFaqs, siteConfig, subscriptionPlans } from '../../site.config';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, KitchenRailComponent, RevealDirective],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  readonly site = siteConfig;
  readonly faqs = landingFaqs;
  readonly plans = subscriptionPlans;
  openFaq: number | null = 0;
  activeModule = 'pos';

  readonly steps = [
    {
      n: '01',
      title: 'Armás el local',
      text: 'Cargás productos, precios y combos. Cada local tiene su carta pública por URL y un QR para compartir.'
    },
    {
      n: '02',
      title: 'El cliente pide',
      text: 'Desde el celular arma el pedido en tu canal, no en un marketplace. Puede seguir el estado hasta que llega.'
    },
    {
      n: '03',
      title: 'Cocina y caja',
      text: 'El pedido entra al mismo flujo que el mostrador: cocina, cobros y tesorería. Un sistema, un turno.'
    }
  ];

  readonly proofs = [
    {
      title: 'Canal propio',
      text: 'La carta y el cliente son del local. Hoy no hay Rappi ni PedidosYa: operás tu propio canal.'
    },
    {
      title: 'Cuota fija',
      text: 'Suscripción mensual con Mercado Pago. No nos quedamos con un porcentaje de cada venta.'
    },
    {
      title: 'Sin instalar',
      text: 'Sistema web, desde el navegador. 14 días de prueba al crear el local.'
    }
  ];

  readonly modules = [
    {
      id: 'pos',
      title: 'POS',
      lead: 'Vender y cobrar sin fricción',
      points: [
        'Pantalla principal de venta y catálogo por categorías',
        'Varias listas de precios (salón / delivery)',
        'Carrito con productos, notas y combos',
        'Cobro con múltiples medios de pago y venta rápida',
        'Pedidos contra entrega y panel de pedidos activos'
      ]
    },
    {
      id: 'ops',
      title: 'Cocina',
      lead: 'Pedidos ordenados, no gritos',
      points: [
        'Vista cocina con pedidos en preparación',
        'Pedidos del día: órdenes activas de hoy',
        'Mostrador, web y delivery en el mismo flujo'
      ]
    },
    {
      id: 'catalog',
      title: 'Productos y combos',
      lead: 'El menú como lo armás en el local',
      points: [
        'Alta y edición de productos, categorías y listas de precios',
        'Actualización masiva de precios y costos',
        'Recetas que consumen insumos',
        'Combos con sustituciones (por ejemplo, elegir bebida)'
      ]
    },
    {
      id: 'cash',
      title: 'Tesorería',
      lead: 'Caja clara al final del turno',
      points: [
        'Ventas con detalle de cobros y libro diario',
        'Métodos de pago y cuentas financieras',
        'Gastos operativos, pagos a proveedores y deudas',
        'Caja: apertura, cierre, arqueo, historial y varias cajas'
      ]
    },
    {
      id: 'full',
      title: 'Pro',
      lead: 'Cuando el local deja de ir a ojo (Pro y Enterprise)',
      points: [
        'Proveedores y compras a proveedor',
        'Stock de insumos, movimientos y ajustes',
        'Delivery: repartidores, historial y cobros en efectivo',
        'Reportes: órdenes, delivery y ranking de productos'
      ]
    }
  ];

  readonly pains = [
    {
      title: 'Pedidos mezclados',
      text: 'Mostrador, delivery y web en un solo flujo de cocina.'
    },
    {
      title: 'Caja a ciegas',
      text: 'Ventas, medios de pago y arqueo sin planilla al costado.'
    },
    {
      title: 'Stock a ojo',
      text: 'Insumos, compras y faltantes en Pro y Enterprise.'
    },
    {
      title: 'Combos imposibles',
      text: 'Sustituciones y precio propio, no un POS genérico.'
    },
    {
      title: 'Carta en otra app',
      text: 'Link, QR y pedidos que entran directo al local.'
    },
    {
      title: 'Equipo sin roles',
      text: 'Dueño, admin, supervisor, cajero y cocina ven lo suyo.'
    }
  ];

  readonly roles = ['Dueño', 'Administrador', 'Supervisor', 'Cajero', 'Cocina'];

  readonly comparison = [
    { feature: 'Carta online con link y QR', starter: true, pro: true, enterprise: true },
    { feature: 'Cierre del pedido por WhatsApp', starter: true, pro: true, enterprise: true },
    { feature: 'Productos y combos', starter: true, pro: true, enterprise: true },
    { feature: 'POS, cocina y pedidos', starter: false, pro: true, enterprise: true },
    { feature: 'Tesorería y caja', starter: false, pro: true, enterprise: true },
    { feature: 'Stock, proveedores y compras', starter: false, pro: true, enterprise: true },
    { feature: 'Delivery y reportes', starter: false, pro: true, enterprise: true },
    { feature: 'Listas de precios y config. completa', starter: false, pro: true, enterprise: true },
    { feature: 'Prioridad en nuevas funciones', starter: false, pro: false, enterprise: true },
    { feature: 'Soporte prioritario', starter: false, pro: false, enterprise: true }
  ];

  constructor() {
    const title = inject(Title);
    const meta = inject(Meta);
    title.setTitle('DogoSoft FastFood | POS, cocina y carta online para tu local');
    meta.updateTag({
      name: 'description',
      content:
        'Sistema web para hamburgueserías, pizzerías y rotiserías en Argentina. Mostrador, cocina, delivery propio y carta online en un solo lugar. 14 días de prueba gratis.'
    });
  }

  toggleFaq(index: number) {
    this.openFaq = this.openFaq === index ? null : index;
  }

  selectModule(id: string) {
    this.activeModule = id;
  }

  get currentModule() {
    return this.modules.find((m) => m.id === this.activeModule) ?? this.modules[0];
  }
}
