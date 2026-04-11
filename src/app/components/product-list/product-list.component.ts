import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  updates = [
    {
      title: 'FastFood POS para comercios gastronómicos',
      date: 'Abril 2026',
      description: 'Sistema integral para pedidos, cocina, caja e inventario pensado para negocios de comida rápida.',
      image: 'assets/novedad-emprendimiento.jpg',
      highlights: [
        'Gestión centralizada de pedidos, cocina, caja e inventario.',
        'Módulos para delivery, tesorería e impresión en una sola plataforma.',
        'Ruta de evolución con más reportes, integraciones y experiencia en la nube.'
      ]
    }
  ];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.isLoading = false;
    });
  }

  onAddToCart(product: Product) {
    this.productService.addToCart(product);
  }

  onUpdateImageError(event: Event) {
    const image = event.target as HTMLImageElement;
    image.src = 'assets/logo.png';
    image.alt = 'Imagen de novedad DogoSoft';
  }
}
