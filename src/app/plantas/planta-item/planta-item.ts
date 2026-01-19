import { Component, input, output } from '@angular/core';
import { Planta } from '../planta';

@Component({
  selector: '[app-planta-item]',
  imports: [],
  templateUrl: './planta-item.html',
  styleUrl: './planta-item.css',
})
export class PlantaItem {
  planta = input.required<Planta>({alias: 'plantaId'});
  
  favoriteToggled = output<void>();
  
  toggleFavorite(){
    //this.planta().favorite = !this.planta().favorite;
    this.favoriteToggled.emit();
  }
}
