import { Component, signal, Signal } from '@angular/core';
import { plantasDemo } from '../plantas_demo';
import { Planta } from '../planta';
import { PlantasFila } from "../plantas-fila/plantas-fila";

@Component({
  selector: 'app-plantas-table',
  imports: [PlantasFila],
  templateUrl: './plantas-table.html',
  styleUrl: './plantas-table.css',
})
export class PlantasTable {
  //plantas: Planta[] = plantasDemo;
  plantas = signal<Planta[]>(plantasDemo);
}
