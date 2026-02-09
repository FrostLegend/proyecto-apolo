import { Component, inject, output } from '@angular/core';
import { Planta } from '../planta';
import { PlantasFila } from "../plantas-fila/plantas-fila";
import { Supaservice } from '../../services/supaservice';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-plantas-table',
  imports: [PlantasFila],
  templateUrl: './plantas-table.html',
  styleUrl: './plantas-table.css',
})
export class PlantasTable {
  private supaservices: Supaservice = inject(Supaservice);

  plantas = toSignal(this.supaservices.plantasSubject);
  //plantas: Planta[] = plantasDemo;

  accion = output<{accion: 'editar' | 'eliminar', planta: Planta}>();

  onAction(event: {accion: 'editar' | 'eliminar', planta: Planta}) {
    this.accion.emit(event);
  }

}
