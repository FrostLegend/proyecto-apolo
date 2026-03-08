import { Component, inject, signal } from '@angular/core';
import { Planta } from '../planta';
import { PlantasTable } from '../plantas-table/plantas-table';
import { AdministradorPlantasFormulario } from '../administrador-plantas-formulario/administrador-plantas-formulario';
import { Supaservice } from '../../services/supaservice';

@Component({
  selector: 'app-administrador-plantas',
  imports: [PlantasTable, AdministradorPlantasFormulario],
  templateUrl: './administrador-plantas.html',
  styleUrl: './administrador-plantas.css',
})
export class AdministradorPlantas {
  currentPlanta = signal<Planta>({} as Planta);
  private supaservices: Supaservice = inject(Supaservice);
  
  async onAction(event: {accion: 'editar' | 'eliminar', planta: any}) {
    console.log('Acción recibida en AdministradorPlantes:', event);
    
    if (event.accion === 'editar') {
      this.currentPlanta.set(event.planta);
    } else if (event.accion === 'eliminar') {
      await  this.supaservices.deletePlanta(event.planta.id); // ajusta el nombre del método
    }
  }
}
