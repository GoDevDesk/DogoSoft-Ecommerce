import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) { }

  async downloadProduct(productId: string): Promise<void> {
    const user = this.authService.getCurrentUser();
    if (!user) {
      throw new Error('Debes estar autenticado para descargar productos');
    }

    try {
      // Verificar si el usuario tiene acceso al producto
      const hasAccess = await this.verifyUserAccess(user.uid, productId);
      if (!hasAccess) {
        throw new Error('No tienes acceso a este producto');
      }

      // Obtener la URL de descarga del producto
      const downloadUrl = await this.getProductDownloadUrl(productId);
      
      // Crear un enlace temporal para descargar el archivo
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `producto-${productId}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Registrar la descarga
      await this.recordDownload(user.uid, productId);

    } catch (error) {
      console.error('Error al descargar producto:', error);
      throw error;
    }
  }

  private async verifyUserAccess(userId: string, productId: string): Promise<boolean> {
    try {
      // Aquí verificarías en Firestore si el usuario tiene acceso al producto
      // Por ejemplo, si ha comprado el producto
      const orders = await this.firebaseService.getUserOrders(userId);
      return orders.some((order: any) => 
        order.products.some((product: any) => product.id === productId) && 
        order.status === 'completed'
      );
    } catch (error) {
      console.error('Error verificando acceso:', error);
      return false;
    }
  }

  private async getProductDownloadUrl(productId: string): Promise<string> {
    try {
      // Obtener la URL de descarga desde Firebase Storage
      const downloadUrl = await this.firebaseService.getDownloadURL(`products/${productId}/software.zip`);
      return downloadUrl;
    } catch (error) {
      console.error('Error obteniendo URL de descarga:', error);
      throw new Error('No se pudo obtener el archivo de descarga');
    }
  }

  private async recordDownload(userId: string, productId: string): Promise<void> {
    try {
      // Registrar la descarga en Firestore
      await this.firebaseService.addOrder({
        userId,
        productId,
        type: 'download',
        timestamp: new Date(),
        status: 'completed'
      });
    } catch (error) {
      console.error('Error registrando descarga:', error);
      // No lanzar error aquí para no interrumpir la descarga
    }
  }

  async uploadProductFile(file: File, productId: string): Promise<string> {
    try {
      const path = `products/${productId}/software.zip`;
      const downloadUrl = await this.firebaseService.uploadFile(file, path);
      return downloadUrl;
    } catch (error) {
      console.error('Error subiendo archivo:', error);
      throw error;
    }
  }
}
