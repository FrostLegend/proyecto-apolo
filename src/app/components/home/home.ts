import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Supaservice } from '../../services/supaservice';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private supaservices: Supaservice = inject(Supaservice);

  plantas = toSignal(this.supaservices.plantasSubject);
  estadisticas = signal<{produccionTotal: number, rendimiento: number}>({produccionTotal: 0, rendimiento: 0});

  async ngOnInit() {
    const stats = await this.supaservices.getEstadisticas();
    this.estadisticas.set(stats);
  }
}
