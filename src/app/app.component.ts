import { Component, OnInit } from '@angular/core';
import { BusquedaService } from './servicios/busqueda.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'HolaMundo';

  constructor(private busqueda: BusquedaService) {}

  ngOnInit() {
    this.busqueda.buscar('angular').then(
      (response) => {
        alert('Total:' + response.total_count);
      },
      (error) => {
        alert('Error: ' + error.statusText);
      }
    );
  }
}
