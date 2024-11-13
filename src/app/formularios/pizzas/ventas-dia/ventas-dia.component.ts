import { Component } from '@angular/core';
import { PedidoService } from '../pedido-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ventas-dia',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './ventas-dia.component.html',
  styles: ``
})
export default class VentasDiaComponent {
  pedidosDia: any[] = [];
  ventasTotalesDia: number = 0;
  fechaSeleccionada: string = '';
  mesSeleccionado: string = '';

  constructor(private pedidoService: PedidoService) {}

  mostrarVentasPorDia(): void {
    if (this.fechaSeleccionada) {
      this.pedidosDia = this.pedidoService.obtenerPedidosPorFecha(this.fechaSeleccionada);
      this.calcularVentasTotales();
    } else {
      alert("Por favor, selecciona una fecha.");
    }
  }

  mostrarVentasPorMes(): void {
    if (this.mesSeleccionado) {
      this.pedidosDia = this.pedidoService.obtenerVentasPorMes(this.mesSeleccionado);
      this.calcularVentasTotales();
    } else {
      alert("Por favor, selecciona un mes.");
    }
  }

  private calcularVentasTotales(): void {
    this.ventasTotalesDia = this.pedidosDia.reduce((total, pedido) => total + (pedido.total || 0), 0);
  }
}
