import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnChanges {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  activeGalleryIndex = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.activeGalleryIndex = 0;
    }
  }

  get gallerySources(): string[] {
    if (this.product?.galleryUrls?.length) {
      return this.product.galleryUrls;
    }
    return this.product?.imageUrl ? [this.product.imageUrl] : [];
  }

  get activeGallerySrc(): string {
    return this.gallerySources[this.activeGalleryIndex] ?? '';
  }

  setGalleryIndex(i: number): void {
    if (i >= 0 && i < this.gallerySources.length) {
      this.activeGalleryIndex = i;
    }
  }

  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
