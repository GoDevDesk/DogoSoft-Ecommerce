import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  user$: Observable<User | null>;
  cartItemCount = 0;
  cartTotal = 0;
  logoUrl = '';

  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {
    this.user$ = this.authService.user$;
  }

  ngOnInit() {
    this.productService.cart$.subscribe(cart => {
      this.cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
      this.cartTotal = this.productService.getCartTotal();
    });

    // Intentar cargar la imagen
    this.loadLogo();
  }

  loadLogo() {
    // Probar diferentes rutas
    const paths = [
      './assets/logo.png',
      'assets/logo.png',
      '/assets/logo.png',
      'http://localhost:4200/assets/logo.png'
    ];
    
    let currentPath = 0;
    const tryNextPath = () => {
      if (currentPath >= paths.length) {
        this.logoUrl = '';
        return;
      }
      
      const img = new Image();
      img.onload = () => {
        this.logoUrl = paths[currentPath];
        console.log('Logo cargado desde:', paths[currentPath]);
      };
      img.onerror = () => {
        currentPath++;
        tryNextPath();
      };
      img.src = paths[currentPath];
    };
    
    tryNextPath();
  }

  async signOut() {
    try {
      await this.authService.signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
