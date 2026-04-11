import { Injectable } from '@angular/core';
import { ProductService, Product } from './product.service';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class DataInitService {
  constructor(
    private productService: ProductService,
    private firebaseService: FirebaseService
  ) {}

  async initializeSampleData(): Promise<void> {
    const dogoSoftFastFood: Omit<Product, 'id'> = {
      name: 'DogoSoft FastFood',
      description:
        'Sistema integral de pedidos para comida rápida: operación, cocina, caja, inventario, delivery, tesorería e impresión.',
      price: 0,
      imageUrl: '/assets/fastfood-novedad.png',
      galleryUrls: [
        '/assets/fastfood-novedad.png',
        '/assets/fastfood-programa.jpeg'
      ],
      downloadUrl: '',
      category: 'POS',
      version: '1.8',
      size: '—'
    };

    try {
      const existing = await this.firebaseService.getProducts();
      const hasFastFood = (existing as Product[]).some(
        (p) => p.name === 'DogoSoft FastFood'
      );
      if (!hasFastFood) {
        await this.productService.addProduct(dogoSoftFastFood);
      }
    } catch (error) {
      console.error('Error inicializando datos de ejemplo:', error);
    }
  }
}
