import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { DataInitService } from './services/data-init.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'DogoSoft';

  constructor(private dataInitService: DataInitService) {}

  async ngOnInit() {
    // Inicializar datos de ejemplo
    await this.dataInitService.initializeSampleData();
  }
}
