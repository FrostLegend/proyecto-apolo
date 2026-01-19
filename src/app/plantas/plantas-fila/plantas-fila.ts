import { Component, input } from '@angular/core';
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
}
