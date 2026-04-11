import { Injectable } from '@angular/core';
import { ProductService, Product } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class DataInitService {

  constructor(private productService: ProductService) { }

  async initializeSampleData(): Promise<void> {
    const sampleProducts: Omit<Product, 'id'>[] = [
      {
        name: 'Gestor de Inventario Pro',
        description: 'Software completo para gestión de inventarios con reportes avanzados y sincronización en tiempo real.',
        price: 299.99,
        imageUrl: '',
        downloadUrl: '',
        category: 'Gestión',
        version: '2.1.0',
        size: '45 MB'
      },
      {
        name: 'Contabilidad Empresarial',
        description: 'Sistema de contabilidad completo con facturación electrónica y reportes fiscales automáticos.',
        price: 199.99,
        imageUrl: '',
        downloadUrl: '',
        category: 'Contabilidad',
        version: '1.8.5',
        size: '32 MB'
      },
      {
        name: 'CRM Clientes Premium',
        description: 'Gestión de relaciones con clientes, seguimiento de ventas y automatización de marketing.',
        price: 399.99,
        imageUrl: '',
        downloadUrl: '',
        category: 'CRM',
        version: '3.0.2',
        size: '67 MB'
      },
      {
        name: 'Editor de Imágenes Pro',
        description: 'Herramienta profesional de edición de imágenes con filtros avanzados y efectos especiales.',
        price: 149.99,
        imageUrl: '',
        downloadUrl: '',
        category: 'Multimedia',
        version: '4.2.1',
        size: '89 MB'
      },
      {
        name: 'Backup Automático',
        description: 'Sistema de respaldo automático con cifrado de datos y sincronización en la nube.',
        price: 79.99,
        imageUrl: '',
        downloadUrl: '',
        category: 'Seguridad',
        version: '1.5.3',
        size: '23 MB'
      },
      {
        name: 'Planificador de Tareas',
        description: 'Organizador personal y profesional con recordatorios inteligentes y sincronización multiplataforma.',
        price: 59.99,
        imageUrl: '',
        downloadUrl: '',
        category: 'Productividad',
        version: '2.3.0',
        size: '18 MB'
      }
    ];

    try {
      // Verificar si ya existen productos
      const existingProducts = await this.productService.getProducts().toPromise();
      
      if (!existingProducts || existingProducts.length === 0) {
        console.log('Inicializando productos de ejemplo...');
        
        for (const product of sampleProducts) {
          await this.productService.addProduct(product);
        }
        
        console.log('Productos de ejemplo creados exitosamente');
      } else {
        console.log('Los productos ya existen, omitiendo inicialización');
      }
    } catch (error) {
      console.error('Error inicializando datos de ejemplo:', error);
    }
  }
}
