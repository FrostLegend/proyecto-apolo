import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { plantasDemo } from '../plantas_demo';
import { DatePipe } from '@angular/common';
import { Supaservice } from '../../services/supaservice';
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';
import { Planta } from '../planta';

@Component({
  selector: 'app-plantas-detalle',
  imports: [DatePipe],
  templateUrl: './plantas-detalle.html',
  styleUrl: './plantas-detalle.css',
})
export class PlantasDetalle implements OnInit{
  private supaservices: Supaservice = inject(Supaservice);
  id = input<string>();

  /*planta = computed(() => {
    const idNum = Number(this.id());
    return plantasDemo.find(p => p.id === idNum);
  });*/

  planta = signal<Planta>({} as Planta);

  ngOnInit(): void{
    this.supaservices.getPlantasSupabaseById(Number(this.id())).then(
      (p:Planta)=> this.planta.set(p)
    );
  }
}
