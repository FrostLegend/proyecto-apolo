import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Supaservice } from '../../services/supaservice';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private supaservices: Supaservice = inject(Supaservice);

  plantas = toSignal(this.supaservices.plantasSubject);
}
