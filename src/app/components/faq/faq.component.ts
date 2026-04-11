import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FAQItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  faqs: FAQItem[] = [
    {
      question: '¿Cómo funciona la descarga de software?',
      answer: 'Una vez que completes tu compra, recibirás un enlace de descarga por email. También puedes acceder a tus descargas desde tu cuenta de usuario.'
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos tarjetas de crédito/débito (Visa, MasterCard, American Express), PayPal y transferencias bancarias.'
    },
    {
      question: '¿Ofrecen soporte técnico?',
      answer: 'Sí, ofrecemos soporte técnico gratuito por 30 días después de la compra. Puedes contactarnos por email o chat en vivo.'
    },
    {
      question: '¿Puedo usar el software en múltiples computadoras?',
      answer: 'Depende de la licencia que compres. Las licencias individuales permiten uso en una computadora, mientras que las licencias empresariales permiten múltiples instalaciones.'
    },
    {
      question: '¿Qué pasa si tengo problemas con la instalación?',
      answer: 'Nuestro equipo de soporte técnico te ayudará con la instalación. También proporcionamos guías detalladas y videos tutoriales.'
    },
    {
      question: '¿Ofrecen garantía de devolución?',
      answer: 'Sí, ofrecemos una garantía de devolución de 30 días si no estás satisfecho con el producto. Contacta nuestro servicio al cliente para procesar la devolución.'
    },
    {
      question: '¿Cómo actualizo mi software?',
      answer: 'Las actualizaciones están incluidas en tu licencia. Recibirás notificaciones automáticas cuando haya nuevas versiones disponibles.'
    },
    {
      question: '¿El software es compatible con Mac y Windows?',
      answer: 'La mayoría de nuestros productos son compatibles con ambos sistemas operativos. Revisa la descripción del producto para confirmar la compatibilidad.'
    }
  ];

  openFaq: number | null = null;

  toggleFaq(index: number) {
    this.openFaq = this.openFaq === index ? null : index;
  }
}
