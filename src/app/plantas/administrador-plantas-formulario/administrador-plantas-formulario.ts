import { Component, inject, input, linkedSignal } from '@angular/core';
import { Planta } from '../planta';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { NgClass } from '@angular/common';
import { map } from 'rxjs';
import { Supaservice } from '../../services/supaservice';
import { toSignal } from '@angular/core/rxjs-interop';

type PlantaFormModel = Omit<Planta, 'foto'> & { foto: string };// Omit se emplea para modificar una interfaz para eliminar uno de los parámetros o añadir otro

@Component({
  selector: 'app-administrador-plantas-formulario',
  imports: [FormField, NgClass],
  templateUrl: './administrador-plantas-formulario.html',
  styleUrl: './administrador-plantas-formulario.css',
})
export class AdministradorPlantasFormulario {
  supaservice: Supaservice = inject(Supaservice);
  
  sesion = toSignal(
    this.supaservice.authChangesObservable().pipe(
      map(({ session }) => session?.user?.id ?? '')
    ),
    { initialValue: '' }
  );

  planta = input.required<Planta>(); // Read Only

  plantaModel = linkedSignal<PlantaFormModel>(() => {// signal que depende de otra que se puede editar
  const p = this.planta();
    return {
      id: p?.id ?? 0,
      created_at: p?.created_at ?? 0,
      nombre: p?.nombre ?? 'plantaModel',
      ubicacion: p?.ubicacion ?? { latitud: 0, longitud: 0 },
      capacidad: p?.capacidad ?? 0,
      usuario: p?.usuario ?? this.sesion(),
      foto: '',
      favorite: false,
    };
  });

  plantaForm = form(this.plantaModel,(schemaPath)=>{
    required(schemaPath.nombre, {message: "Nombre is required"});
    minLength(schemaPath.nombre, 5, {message: "Nombre has to be 5 characters long"});
    });
    
  getErrorMessage(campo: any): string {
    if (campo().touched() && campo().invalid()) {
      const errores = campo().errors();
    if (errores && errores.length > 0) {
      return errores[0].message;
      }
    }
    return '';
  }

  crearPlanta($event: Event){
    $event.preventDefault();
    this.supaservice.createPlanta(this.plantaModel());
  }

  actualizarPlanta($event: Event){
    $event.preventDefault();
    this.supaservice.updatePlanta(this.plantaModel());
  }
}
