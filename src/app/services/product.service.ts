import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
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
      const products = await this.firebaseService.getProducts();
      this.productsSubject.next(products as Product[]);
    } catch (error) {
      console.error('Error cargando productos:', error);
      // Si hay error con Firebase, cargar productos mock
      this.loadMockProducts();
    }
  }

  private loadMockProducts(): void {
    console.log('Cargando productos mock...');
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Gestor de Inventario Pro',
        description: 'Software completo para gestión de inventarios con reportes avanzados y sincronización en tiempo real.',
        price: 299.99,
        imageUrl: '',
        downloadUrl: '',
        category: 'Gestión',
        version: '2.1.0',
        size: '45 MB',
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'Contabilidad Empresarial',
        description: 'Sistema de contabilidad completo con facturación electrónica y reportes fiscales automáticos.',
        price: 199.99,
        imageUrl: '',
        downloadUrl: '',
        category: 'Contabilidad',
        version: '1.8.5',
        size: '32 MB',
        createdAt: new Date()
      },
      {
        id: '3',
        name: 'CRM Clientes Premium',
        description: 'Gestión de relaciones con clientes, seguimiento de ventas y automatización de marketing.',
        price: 399.99,
        imageUrl: '',
        downloadUrl: '',
        category: 'CRM',
        version: '3.0.2',
        size: '67 MB',
        createdAt: new Date()
      },
      {
        id: '4',
        name: 'Editor de Imágenes Pro',
        description: 'Herramienta profesional de edición de imágenes con filtros avanzados y efectos especiales.',
        price: 149.99,
        imageUrl: '',
        downloadUrl: '',
        category: 'Multimedia',
        version: '4.2.1',
        size: '89 MB',
        createdAt: new Date()
      },
      {
        id: '5',
        name: 'Backup Automático',
        description: 'Sistema de respaldo automático con cifrado de datos y sincronización en la nube.',
        price: 79.99,
        imageUrl: '',
        downloadUrl: '',
        category: 'Seguridad',
        version: '1.5.3',
        size: '23 MB',
        createdAt: new Date()
      },
      {
        id: '6',
        name: 'Planificador de Tareas',
        description: 'Organizador personal y profesional con recordatorios inteligentes y sincronización multiplataforma.',
        price: 59.99,
        imageUrl: '',
        downloadUrl: '',
        category: 'Productividad',
        version: '2.3.0',
        size: '18 MB',
        createdAt: new Date()
      },
      {
        id: '7',
        name: 'Gestor de Proyectos',
        description: 'Herramienta completa para gestión de proyectos con diagramas de Gantt y seguimiento de equipos.',
        price: 249.99,
        imageUrl: '',
        downloadUrl: '',
        category: 'Gestión',
        version: '1.9.2',
        size: '52 MB',
        createdAt: new Date()
      },
      {
        id: '8',
        name: 'Antivirus Empresarial',
        description: 'Protección avanzada contra malware con análisis en tiempo real y gestión centralizada.',
        price: 129.99,
        imageUrl: '',
        downloadUrl: '',
        category: 'Seguridad',
        version: '2024.1',
        size: '156 MB',
        createdAt: new Date()
      },
      {
        id: '9',
        name: 'Editor de Código Pro',
        description: 'IDE profesional con soporte para múltiples lenguajes y herramientas de desarrollo integradas.',
        price: 199.99,
        imageUrl: '',
        downloadUrl: '',
        category: 'Desarrollo',
        version: '5.1.0',
        size: '234 MB',
        createdAt: new Date()
      }
    ];
    
    console.log('Productos mock cargados:', mockProducts.length);
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
