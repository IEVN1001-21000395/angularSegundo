import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddMessageComponent } from './tem/add-message/add-message.component';
import { ListMessageComponent } from './tem/list-message/list-message.component';
import { CapturaPedidoComponent } from './formulario/pizzas/captura-pedido/captura-pedido.component';
import { DetallePedidoComponent } from './formulario/pizzas/detalle-pedido/detalle-pedido.component';
import { VentasDiaComponent } from './formulario/pizzas/ventas-dia/ventas-dia.component';
import { NavbarComponent } from './navbar/navbar.component';
//import { Ejemplo1Component } from './formulario/ejemplo1/ejemplo1.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularSegundo';
}
