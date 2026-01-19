import { Component, computed, input } from '@angular/core';
import { plantasDemo } from '../plantas_demo';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-plantas-detalle',
  imports: [DatePipe],
  templateUrl: './plantas-detalle.html',
  styleUrl: './plantas-detalle.css',
})
export class PlantasDetalle {
  id = input<string>();

  planta = computed(() => {
    const idNum = Number(this.id());
    return plantasDemo.find(p => p.id === idNum);
  });

  fechaLegible = computed(() => {
    const ts = this.planta()?.created_at;
    if (!ts) return '';
    const date = new Date(ts * 1000); // multiplicar por 1000 porque es en segundos
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  });
}
