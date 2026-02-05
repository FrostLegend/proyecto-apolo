import { Component, input } from '@angular/core';
import { Registres } from '../registres';
import { DatePipe } from '@angular/common';

@Component({
  selector: '[app-registros-item]',
  imports: [DatePipe],
  templateUrl: './registros-item.html',
  styleUrl: './registros-item.css',
})
export class RegistrosItem {
  registro = input.required<Registres>({alias: 'registroId'});
}
