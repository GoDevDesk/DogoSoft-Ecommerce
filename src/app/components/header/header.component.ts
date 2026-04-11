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
  }

  async signOut() {
    try {
      await this.authService.signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
