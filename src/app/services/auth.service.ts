import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';

export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private firebaseService: FirebaseService) {
    // Escuchar cambios en el estado de autenticación
    this.firebaseService.getCurrentUser();
  }

  async signIn(email: string, password: string): Promise<User> {
    try {
      const user = await this.firebaseService.signIn(email, password);
      const userData: User = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || undefined
      };
      this.userSubject.next(userData);
      return userData;
    } catch (error) {
      throw error;
    }
  }

  async signUp(email: string, password: string): Promise<User> {
    try {
      const user = await this.firebaseService.signUp(email, password);
      const userData: User = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || undefined
      };
      this.userSubject.next(userData);
      return userData;
    } catch (error) {
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.firebaseService.signOut();
      this.userSubject.next(null);
    } catch (error) {
      throw error;
    }
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  isAuthenticated(): boolean {
    return this.userSubject.value !== null;
  }
}
