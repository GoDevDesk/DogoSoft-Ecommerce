import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { siteConfig } from '../../site.config';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly email = siteConfig.email;

  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isLoading = false;
  isSubmitted = false;

  ngOnInit() {
    const intent = this.route.snapshot.queryParamMap.get('intent');
    if (intent === 'trial') {
      this.contactForm.subject = 'Quiero probar DogoSoft FastFood 14 días';
      this.contactForm.message =
        'Hola, quiero crear un local y empezar la prueba de 14 días. Mi rubro es: ';
    }
  }

  onSubmit() {
    if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.message) {
      return;
    }

    this.isLoading = true;
    const body = [
      this.contactForm.message,
      '',
      `Nombre: ${this.contactForm.name}`,
      `Email: ${this.contactForm.email}`
    ].join('\n');
    const mailto = `mailto:${this.email}?subject=${encodeURIComponent(this.contactForm.subject || 'Consulta DogoSoft FastFood')}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    this.isLoading = false;
    this.isSubmitted = true;
  }

  resetForm() {
    this.isSubmitted = false;
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
