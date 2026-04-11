import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isLoading = false;
  isSubmitted = false;

  async onSubmit() {
    if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.message) {
      return;
    }

    this.isLoading = true;
    
    // Simular envío del formulario
    setTimeout(() => {
      this.isLoading = false;
      this.isSubmitted = true;
      this.resetForm();
    }, 2000);
  }

  resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }

  contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'contacto@dogosoft.com',
      description: 'Respuesta en 24 horas'
    },
    {
      icon: '📞',
      title: 'Teléfono',
      value: '+1 (555) 123-4567',
      description: 'Lunes a Viernes 9AM-6PM'
    },
    {
      icon: '💬',
      title: 'Chat en Vivo',
      value: 'Disponible 24/7',
      description: 'Soporte técnico inmediato'
    },
    {
      icon: '📍',
      title: 'Oficina',
      value: '123 Tech Street, Silicon Valley',
      description: 'Visítanos en nuestras oficinas'
    }
  ];
}
