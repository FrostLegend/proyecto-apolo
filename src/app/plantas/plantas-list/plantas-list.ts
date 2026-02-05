import { Component, effect, inject, input, OnInit, signal, } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Planta } from '../planta';
import { PlantaItem } from '../planta-item/planta-item';
import { Supaservice } from '../../services/supaservice';
import { from } from 'rxjs';

@Component({
  selector: 'app-plantas-list',
  imports: [PlantaItem],
  templateUrl: './plantas-list.html',
  styleUrl: './plantas-list.css',
})
export class PlantasList /*implements OnInit*/{
  private supaservices: Supaservice = inject(Supaservice);

  plantas = toSignal(this.supaservices.plantasSubject);

  search= input('');

  constructor(){
    effect(()=> {
      console.log('search', this.search());
      this.supaservices.setSearchString(this.search());
    });
  }

  toggleFavorite(planta: Planta){
    planta.favorite = !planta.favorite
  }


  //plantas = signal<Planta[]>([]);

  /*ngOnInit(): void{
    this.supaservices.getPlantas().subscribe(
      (plantasSupabase: Planta[])=> {
        this.plantas.set(plantasSupabase);
      }
    )
    
    //this.plantas.set(plantasDemo);
    //console.log(this.supaservices.getEcho("hola mundo"))


    this.supaservices.getPlantasSupabase().then(
      (p:Planta[])=> this.plantas.set(p)
    );
  }*/
}
