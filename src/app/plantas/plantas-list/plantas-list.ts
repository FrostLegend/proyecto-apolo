import { Component, inject, OnInit, signal } from '@angular/core';
import { Planta } from '../planta';
import { plantasDemo } from '../plantas_demo';
import { PlantaItem } from '../planta-item/planta-item';
import { Supaservice } from '../../services/supaservice';

@Component({
  selector: 'app-plantas-list',
  imports: [PlantaItem],
  templateUrl: './plantas-list.html',
  styleUrl: './plantas-list.css',
})
export class PlantasList implements OnInit{
  private supaservices: Supaservice = inject(Supaservice);
  
  plantas = signal<Planta[]>([]);

  ngOnInit(): void{
    this.supaservices.getPlantas().subscribe(
      (plantasSupabase: Planta[])=> {
        this.plantas.set(plantasSupabase);
      }
    )
    
    //this.plantas.set(plantasDemo);
    //console.log(this.supaservices.getEcho("hola mundo"))
  }

  toggleFavorite(planta: Planta){
    planta.favorite = !planta.favorite
  }
}
