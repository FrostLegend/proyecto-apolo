import { Component, input, linkedSignal } from '@angular/core';
import { Planta } from '../planta';
import { form, FormField } from '@angular/forms/signals';

type PlantaFormModel = Omit<Planta, 'foto'> & { foto: string };// Omit se emplea para modificar una interfaz para eliminar uno de los parámetros o añadir otro

@Component({
  selector: 'app-administrador-plantas-formulario',
  imports: [FormField],
  templateUrl: './administrador-plantas-formulario.html',
  styleUrl: './administrador-plantas-formulario.css',
})
export class AdministradorPlantasFormulario {
  planta = input.required<Planta>();

  plantaModel = linkedSignal<PlantaFormModel>(() => {
  const p = this.planta();
    return {
      id: p?.id ?? 0,
      created_at: p?.created_at ?? 0,
      nombre: p?.nombre ?? 'plantaModel',
      ubicacion: p?.ubicacion ?? { latitude: 0, longitude: 0 },
      capacidad: p?.capacidad ?? 0,
      usuario: p?.usuario ?? '',
      foto: '',
      favorite: false,
    };
  });
  plantaForm = form(this.plantaModel);
}
