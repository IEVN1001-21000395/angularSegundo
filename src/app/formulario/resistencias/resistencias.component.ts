import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-resistencias',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './resistencias.component.html',
  styles: ``,
})
export default class ResistenciasComponent implements OnInit {
  colores: string[] = ['Rojo', 'Negro', 'Café', 'Naranja', 'Amarillo', 'Verde', 'Azul', 'Violeta', 'Gris', 'Blanco'];
  tolerancias: string[] = ['Oro', 'Plata'];

  formulario!: FormGroup;
  valor: number = 0;
  valorMaximo: number = 0;
  valorMinimo: number = 0;
  resultado: boolean = false;
  datosResistencias: any[] = [];

  ngOnInit(): void {
    this.formulario = new FormGroup({
      color1: new FormControl('', Validators.required),
      color2: new FormControl('', Validators.required),
      color3: new FormControl('', Validators.required),
      tolerancia: new FormControl('', Validators.required),
    });
  }

  guardarColores(): void {
    const color1 = this.formulario.get('color1')?.value;
    const color2 = this.formulario.get('color2')?.value;
    const color3 = this.formulario.get('color3')?.value;
    const tolerancia = this.formulario.get('tolerancia')?.value;

    const nuevoRegistro = {
      color1,
      color2,
      color3,
      tolerancia,
      valor: this.calcularValor(color1, color2, color3, tolerancia),
      valorMaximo: this.valorMaximo,
      valorMinimo: this.valorMinimo,
    };

    const registrosGuardados = JSON.parse(localStorage.getItem('datosResistencias') || '[]');
    registrosGuardados.push(nuevoRegistro);
    localStorage.setItem('datosResistencias', JSON.stringify(registrosGuardados));

    this.datosResistencias.push(nuevoRegistro);
    this.resultado = true;
  }

  calcularValor(color1: string, color2: string, color3: string, tolerancia: string): number {
    const valoresColores: { [key: string]: number } = {
      'Negro': 0,
      'Café': 1,
      'Rojo': 2,
      'Naranja': 3,
      'Amarillo': 4,
      'Verde': 5,
      'Azul': 6,
      'Violeta': 7,
      'Gris': 8,
      'Blanco': 9
    };

    const valorColor1 = valoresColores[color1];
    const valorColor2 = valoresColores[color2];
    const multiplicador = Math.pow(10, valoresColores[color3]);

    this.valor = (valorColor1 * 10 + valorColor2) * multiplicador;

    const factorTolerancia = tolerancia === 'Oro' ? 0.05 : 0.10;
    this.valorMaximo = this.valor * (1 + factorTolerancia);
    this.valorMinimo = this.valor * (1 - factorTolerancia);

    return this.valor;
  }

  cargarDatos(): void {
    const registrosGuardados = JSON.parse(localStorage.getItem('datosResistencias') || '[]');
    if (registrosGuardados.length) {
      this.datosResistencias = registrosGuardados;
      this.resultado = true;
    } else {
      alert('No hay registros guardados.');
      this.resultado = false;
    }
  }

  obtenerColorTolerancia(tolerancia: string): string {
    return tolerancia === 'Oro' ? 'gold' : 'silver';
  }

  obtenerColor(color: string): string {
    switch (color) {
      case 'Rojo': return '#FF0000';
      case 'Negro': return '#000000';
      case 'Café': return '#8B4513';
      case 'Naranja': return '#FFA500';
      case 'Amarillo': return '#FFFF00';
      case 'Verde': return '#008000';
      case 'Azul': return '#0000FF';
      case 'Violeta': return '#800080';
      case 'Gris': return '#808080';
      case 'Blanco': return '#FFFFFF';
      default: return '#FFFFFF';
    }
  }
}
