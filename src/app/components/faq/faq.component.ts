import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { landingFaqs } from '../../site.config';

@Component({
  selector: 'app-faq',
  imports: [RouterLink],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  faqs = landingFaqs;
  openFaq: number | null = 0;

  toggleFaq(index: number) {
    this.openFaq = this.openFaq === index ? null : index;
  }
}
