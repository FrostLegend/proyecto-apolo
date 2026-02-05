import { Component, computed, inject, input, OnChanges, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Supaservice } from '../../services/supaservice';
import { Planta } from '../planta';
import { Registres } from '../../registros/registres';
import { RegistrosItem } from '../../registros/registros-item/registros-item';

@Component({
  selector: 'app-plantas-detalle',
  imports: [DatePipe, RegistrosItem],
  templateUrl: './plantas-detalle.html',
  styleUrl: './plantas-detalle.css',
})
export class PlantasDetalle implements OnChanges{
  private supaservices: Supaservice = inject(Supaservice);
  id = input<string>();

  /*planta = computed(() => {
    const idNum = Number(this.id());
    return plantasDemo.find(p => p.id === idNum);
  });*/

  planta = signal<Planta>({} as Planta);
  registros = signal<Registres[]>([]);

  async ngOnChanges(): Promise<void>{
    this.supaservices.getPlantasSupabaseById(Number(this.id())).then(
      (p:Planta)=> this.planta.set(p)
    );
    this.supaservices.getRegistrosSupabase(Number(this.id())).then(
      (r:Registres[])=> this.registros.set(r)
    );
  }
}
