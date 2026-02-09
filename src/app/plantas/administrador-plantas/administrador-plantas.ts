import { Component, signal } from '@angular/core';
import { Planta } from '../planta';
import { PlantasTable } from '../plantas-table/plantas-table';
import { AdministradorPlantasFormulario } from '../administrador-plantas-formulario/administrador-plantas-formulario';

@Component({
  selector: 'app-administrador-plantas',
  imports: [PlantasTable, AdministradorPlantasFormulario],
  templateUrl: './administrador-plantas.html',
  styleUrl: './administrador-plantas.css',
})
export class AdministradorPlantas {
  currentPlanta = signal<Planta>({} as Planta);
  
  onAction(event: {accion: 'editar' | 'eliminar', planta: any}) {
    console.log('Acción recibida en AdministradorPlantes:', event);
    this.currentPlanta.set(event.planta);
  }
}
