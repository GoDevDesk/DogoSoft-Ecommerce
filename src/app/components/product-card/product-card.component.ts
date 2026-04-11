import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  ngOnInit() {
    console.log('Producto recibido:', this.product.name, 'Imagen:', this.product.imageUrl);
  }

  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
