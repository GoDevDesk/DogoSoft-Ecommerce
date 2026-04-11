import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { DataInitService } from './services/data-init.service';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'DogoSoft';

  constructor(
    private dataInitService: DataInitService,
    private productService: ProductService
  ) {}

  async ngOnInit() {
    await this.dataInitService.initializeSampleData();
    await this.productService.loadProducts();
  }
}
