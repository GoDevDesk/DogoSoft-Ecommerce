import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  showcaseImages = [
    {
      src: '/assets/landing/operations-wall.png',
      title: 'Control de cocina en tiempo real',
      description: 'Visualización en pantallas para coordinar pedidos y evitar demoras.'
    },
    {
      src: '/assets/landing/pos-counter.png',
      title: 'Punto de venta integral',
      description: 'Caja, catálogo, promociones y medios de pago en una sola interfaz.'
    },
    {
      src: '/assets/landing/pos-laptop.png',
      title: 'Operación completa del local',
      description: 'Gestión total de pedidos, stock y seguimiento del turno desde una vista central.'
    },
    {
      src: '/assets/landing/mobile-menu.png',
      title: 'Pedido online desde el celular',
      description: 'Tus clientes pueden pedir directo con experiencia móvil rápida.'
    },
    {
      src: '/assets/landing/mobile-kitchen.png',
      title: 'Monitoreo de pedidos por estado',
      description: 'Listas separadas por salón, delivery y para llevar con tiempos de preparación.'
    },
    {
      src: '/assets/landing/mobile-tracking.png',
      title: 'Seguimiento post-venta',
      description: 'El cliente sigue su pedido y reduce consultas por WhatsApp.'
    }
  ];

  keyPoints = [
    'Implementación ágil y acompañamiento personalizado.',
    'Funciona para salón, take away y delivery.',
    'Diseñado para aumentar velocidad operativa y control diario.'
  ];

  newsImage = '/assets/novedad.jpg';

  onNewsImageError(event: Event) {
    const image = event.target as HTMLImageElement;
    image.src = '/assets/landing/pos-laptop.png';
    image.alt = 'Novedad DogoSoft';
  }
}
