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

  constructor(private productService: ProductService) {}

  ngOnInit() {
    console.log('ProductListComponent inicializado');
    // Suscribirse a los productos
    this.productService.getProducts().subscribe(products => {
      console.log('Productos recibidos:', products.length);
      this.products = products;
      this.isLoading = false;
    });
  }

  onAddToCart(product: Product) {
    this.productService.addToCart(product);
  }
}
