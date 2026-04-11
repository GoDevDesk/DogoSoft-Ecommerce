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
  newsImage = '/assets/novedad.jpg';

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

  onNewsImageError(event: Event) {
    const image = event.target as HTMLImageElement;
    image.src = '/assets/logo.png';
    image.alt = 'Novedad DogoSoft';
  }
}
