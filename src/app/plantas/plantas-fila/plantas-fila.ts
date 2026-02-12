import { Component, input, output } from '@angular/core';
import { Planta } from '../planta';

@Component({
  selector: '[app-plantas-fila]',
  imports: [],
  templateUrl: './plantas-fila.html',
  styleUrl: './plantas-fila.css',
})
export class PlantasFila {
  //planta!: Planta

  planta = input.required<Planta>({alias: 'plantaId'});
  accion = output<{accion: 'editar' | 'eliminar', planta: Planta}>(); // Output es lo que se envia
  editar(){
    this.accion.emit({accion: 'editar', planta: this.planta()}); // Emit es quien provaca que se envie
  }
  eliminar(){
    this.accion.emit({accion: 'eliminar', planta: this.planta()});
  }
}
