import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  /** Si hay varias URLs, la tarjeta muestra galería (miniaturas + imagen principal). */
  galleryUrls?: string[];
  downloadUrl: string;
  category: string;
  version: string;
  size: string;
  createdAt?: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor(private firebaseService: FirebaseService) {
    // Cargar productos mock inmediatamente
    this.loadMockProducts();
  }

  async loadProducts(): Promise<void> {
    try {
      const raw = (await this.firebaseService.getProducts()) as Product[];
      const fastfood = raw
        .filter((p) => p.name === 'DogoSoft FastFood')
        .map((p) => this.withFastFoodGallery(p as Product));
      if (fastfood.length > 0) {
        this.productsSubject.next(fastfood);
      } else {
        this.loadMockProducts();
      }
    } catch (error) {
      console.error('Error cargando productos:', error);
      this.loadMockProducts();
    }
  }

  private readonly fastFoodGallery = [
    '/assets/fastfood-novedad.png',
    '/assets/fastfood-programa.jpeg'
  ];

  private withFastFoodGallery(p: Product): Product {
    const galleryUrls = [...this.fastFoodGallery];
    return {
      ...p,
      galleryUrls,
      imageUrl: p.imageUrl || galleryUrls[0]
    };
  }

  private loadMockProducts(): void {
    const mockProducts: Product[] = [
      {
        id: 'dogosoft-fastfood',
        name: 'DogoSoft FastFood',
        description:
          'Sistema integral de pedidos para comida rápida: operación, cocina, caja, inventario, delivery, tesorería e impresión.',
        price: 0,
        imageUrl: this.fastFoodGallery[0],
        galleryUrls: [...this.fastFoodGallery],
        downloadUrl: '',
        category: 'POS',
        version: '1.8',
        size: '—',
        createdAt: new Date()
      }
    ];
    this.productsSubject.next(mockProducts);
  }

  async addProduct(product: Omit<Product, 'id'>): Promise<string> {
    try {
      const productId = await this.firebaseService.addProduct({
        ...product,
        createdAt: new Date()
      });
      await this.loadProducts(); // Recargar productos
      return productId;
    } catch (error) {
      throw error;
    }
  }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProductById(id: string): Product | undefined {
    return this.productsSubject.value.find(product => product.id === id);
  }

  // Carrito de compras
  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this.cartSubject.value;
    const existingItem = currentCart.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCart.push({ product, quantity });
    }

    this.cartSubject.next([...currentCart]);
  }

  removeFromCart(productId: string): void {
    const currentCart = this.cartSubject.value;
    const updatedCart = currentCart.filter(item => item.product.id !== productId);
    this.cartSubject.next(updatedCart);
  }

  updateCartItemQuantity(productId: string, quantity: number): void {
    const currentCart = this.cartSubject.value;
    const item = currentCart.find(item => item.product.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.cartSubject.next([...currentCart]);
      }
    }
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cart$;
  }

  getCartTotal(): number {
    return this.cartSubject.value.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  clearCart(): void {
    this.cartSubject.next([]);
  }

  getCartItemCount(): number {
    return this.cartSubject.value.reduce((total, item) => total + item.quantity, 0);
  }
}
