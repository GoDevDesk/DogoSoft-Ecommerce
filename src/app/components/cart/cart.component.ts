import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService, CartItem } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  cartTotal = 0;
  isAuthenticated = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {
    this.cartItems$ = this.productService.getCartItems();
  }

  ngOnInit() {
    this.cartItems$.subscribe(items => {
      this.cartTotal = this.productService.getCartTotal();
    });
    
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  updateQuantity(productId: string, quantity: number) {
    this.productService.updateCartItemQuantity(productId, quantity);
  }

  removeItem(productId: string) {
    this.productService.removeFromCart(productId);
  }

  proceedToCheckout() {
    if (!this.isAuthenticated) {
      this.router.navigate(['/auth']);
      return;
    }
    
    // Aquí implementarías la lógica de checkout
    this.router.navigate(['/checkout']);
  }

  clearCart() {
    this.productService.clearCart();
  }
}
