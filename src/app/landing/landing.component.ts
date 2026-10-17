import { DOCUMENT } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { landingFaqs, siteConfig, subscriptionPlans } from '../site.config';

type Theme = 'light' | 'dark';

interface FeatureTab {
  id: string;
  title: string;
  points: string[];
  shot: string;
  alt: string;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html'
})
export class LandingComponent {
  private readonly doc = inject(DOCUMENT);

  readonly site = siteConfig;
  readonly plans = subscriptionPlans;
  readonly faqs = landingFaqs;
  readonly year = new Date().getFullYear();

  menuOpen = false;
  openFaq = new Set<number>([0, 1]);
  theme: Theme = (this.doc.documentElement.getAttribute('data-theme') as Theme) || 'light';

  readonly steps = [
    { title: 'El cliente pide y paga', text: 'Elige en tu carta online y paga con Mercado Pago o transferencia.' },
    { title: 'Te llega el aviso', text: 'El pedido entra al local con un aviso de pedido nuevo.' },
    { title: 'La cocina lo prepara', text: 'Cocina ve qué hay que hacer y marca cuándo está listo.' },
    { title: 'Sale y lo sigue en vivo', text: 'El repartidor lo lleva y el cliente ve en qué etapa está.' }
  ];

  // Capturas reales de la app. Los tabs sin captura propia reutilizan la más cercana (ver TODO).
  readonly tabs: FeatureTab[] = [
    { id: 'pos', title: 'Punto de venta', shot: 'assets/media/app-pos.png', alt: 'Punto de venta de DogoSoft FastFood',
      points: ['Tomá pedidos de salón, para llevar y delivery', 'Cobrá con varios medios de pago', 'Mandá el pedido a la cocina con un toque'] },
    { id: 'cocina', title: 'Cocina', shot: 'assets/media/cocina.jpg', alt: 'Pantalla de cocina',
      points: ['Cada pedido entra a la pantalla de cocina', 'Marcá en preparación y listo', 'Mostrador, delivery y web en un solo flujo'] },
    { id: 'stock', title: 'Stock y compras', shot: 'assets/media/app-productos.png', alt: 'Productos y stock',
      points: ['Stock por producto con alertas', 'Cargá compras a proveedores', 'Recetas e insumos que se descuentan solos'] },
    { id: 'precios', title: 'Listas de precios', shot: 'assets/media/app-productos.png', alt: 'Listas de precios',
      points: ['Un precio por canal: salón, delivery y carta', 'Margen sobre costo o precio a mano', 'Cambiá precios en segundos'] },
    { id: 'delivery', title: 'Delivery y repartidores', shot: 'assets/media/seguimiento-pedido.jpg', alt: 'Seguimiento de delivery',
      points: ['Asigná cada pedido a un repartidor', 'Recargo de envío configurable', 'El cliente sigue el pedido en vivo'] },
    { id: 'caja', title: 'Caja y cuentas', shot: 'assets/media/app-cuentas.png', alt: 'Caja y cuentas',
      points: ['Apertura y cierre de caja', 'Efectivo, deudas y proveedores', 'El resultado del local, claro'] },
    { id: 'reportes', title: 'Reportes', shot: 'assets/media/app-reportes.png', alt: 'Reportes de ventas',
      points: ['Qué se vende y cuánto', 'Ventas por período y por producto', 'El día del local desde el celular'] },
    { id: 'equipo', title: 'Equipo y permisos', shot: 'assets/media/app-dashboard.png', alt: 'Panel del dueño',
      points: ['Dueño, administrador, cajero y cocina', 'Cada rol ve solo lo suyo', 'Permisos que ajustás vos'] }
  ];
  activeTab = this.tabs[0];

  // Fuentes: Pedix, datos de Lucas (17/10/2026). Fudo: https://fu.do/es-ar/precios/ (consultado 17/10/2026):
  // Plan Inicial $ 22.500, Avanzado $ 43.900 (stock y reportes), Pro $ 69.500 (listas de precios). Revisar periódicamente.
  readonly comparison: { f: string; us: string; pedix: string; fudo: string }[] = [
    { f: 'Carta online', us: '✓', pedix: '✓', fudo: '✓' },
    { f: 'Punto de venta', us: '✓', pedix: '✕', fudo: '✓' },
    { f: 'Cocina', us: '✓', pedix: '✕', fudo: '✓' },
    { f: 'Stock', us: '✓', pedix: '✕', fudo: '✓' },
    { f: 'Caja', us: '✓', pedix: '✕', fudo: '✓' },
    { f: 'Delivery y repartidores', us: '✓', pedix: '✕', fudo: '✓' },
    { f: 'Sin comisión por pedido', us: '✓', pedix: '✓', fudo: '✓' },
    { f: 'Precio por mes', us: siteConfig.prices.proLabel, pedix: '$\u00a019.900', fudo: 'Desde $\u00a043.900*' }
  ];

  toggleTheme(): void {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.doc.documentElement.setAttribute('data-theme', this.theme);
    try { localStorage.setItem('ds-theme', this.theme); } catch { /* sin storage */ }
  }

  toggleFaq(i: number): void {
    this.openFaq.has(i) ? this.openFaq.delete(i) : this.openFaq.add(i);
  }

  selectTab(i: number): void { this.activeTab = this.tabs[i]; }

  onTabKey(e: KeyboardEvent, i: number): void {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    const n = (i + d + this.tabs.length) % this.tabs.length;
    this.selectTab(n);
    (this.doc.getElementById('tab-' + this.tabs[n].id) as HTMLElement | null)?.focus();
  }

  @HostListener('document:keydown.escape') closeMenu(): void { this.menuOpen = false; }
}
