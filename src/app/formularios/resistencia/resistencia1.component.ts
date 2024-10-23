import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resistencia1',
  templateUrl: './resistencia1.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: []
})
export default class ResistenciaComponent {
  formulario: FormGroup;
  resultados: any[] = []; 
  valor: number = 0;
  valorMaximo: number = 0;
  valorMinimo: number = 0;

  colores = ['Negro', 'Cafe', 'Rojo', 'Naranja', 'Amarillo', 'Verde', 'Azul', 'Violeta', 'Gris', 'Blanco'];

  constructor(private fb: FormBuilder) {
   
    this.formulario = this.fb.group({
      color1: [''],
      color2: [''],
      color3: [''],
      tolerancia: ['']
    });
  }

 
  calcularValores(): void {
    const color1 = this.formulario.get('color1')?.value;
    const color2 = this.formulario.get('color2')?.value;
    const color3 = this.formulario.get('color3')?.value;
    const tolerancia = this.formulario.get('tolerancia')?.value;

  
    const valorColor1 = this.colores.indexOf(color1);
    const valorColor2 = this.colores.indexOf(color2);
    const multiplicador = Math.pow(10, this.colores.indexOf(color3));

   
    if (valorColor1 === -1 || valorColor2 === -1 || this.colores.indexOf(color3) === -1) {
      return; 
    }

    this.valor = (valorColor1 * 10 + valorColor2) * multiplicador;

   
    const toleranceFactor = tolerancia === 'oro' ? 0.05 : 0.10;
    this.valorMaximo = this.valor * (1 + toleranceFactor);
    this.valorMinimo = this.valor * (1 - toleranceFactor);
  }

  
  verResultados(): void {
    const resultadosGuardados = localStorage.getItem('coloresResistencia');
    if (resultadosGuardados) {
      this.resultados = JSON.parse(resultadosGuardados).map((res: any) => {
    
        const valorColor1 = this.colores.indexOf(res.color1);
        const valorColor2 = this.colores.indexOf(res.color2);
        const multiplicador = Math.pow(10, this.colores.indexOf(res.color3));
        const tolerancia = res.tolerancia;
        const valor = (valorColor1 * 10 + valorColor2) * multiplicador;
        const toleranceFactor = tolerancia === 'oro' ? 0.05 : 0.10;
        const valorMaximo = valor * (1 + toleranceFactor);
        const valorMinimo = valor * (1 - toleranceFactor);

        return {
          ...res,
          valor,
          valorMinimo,
          valorMaximo
        };
      });
    } else {
      this.resultados = [];
    }
  }

  
  guardarColores(): void {
    const color1 = this.formulario.get('color1')?.value;
    const color2 = this.formulario.get('color2')?.value;
    const color3 = this.formulario.get('color3')?.value;
    const tolerancia = this.formulario.get('tolerancia')?.value;

   
    const resultadoObj = {
      color1,
      color2,
      color3,
      tolerancia
    };

   
    const resultadosGuardados = localStorage.getItem('coloresResistencia');
    const resultados = resultadosGuardados ? JSON.parse(resultadosGuardados) : [];

    
    resultados.push(resultadoObj);
    localStorage.setItem('coloresResistencia', JSON.stringify(resultados));
  }

 
  calcularYVerResultados(): void {
    this.calcularValores();  
    this.guardarColores();   
    this.verResultados();     
  }

  
  getColorCode(color: string): string {
    switch(color) {
      case 'Negro': return '#000000';
      case 'Cafe': return '#814f17';
      case 'Rojo': return '#FF0000';
      case 'Naranja': return '#FFA500';
      case 'Amarillo': return '#FFFF00';
      case 'Verde': return '#008000';
      case 'Azul': return '#0000FF';
      case 'Violeta': return '#EE82EE';
      case 'Gris': return '#808080';
      case 'Blanco': return '#FFFFFF';
      default: return '#FFFFFF';
    }
  }

  
  getToleranceColor(tolerancia: string): string {
    return tolerancia === 'oro' ? '#FFD700' : '#C0C0C0'; 
  }
}
