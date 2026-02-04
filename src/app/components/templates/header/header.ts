import { Component, inject } from '@angular/core';
import { Supaservice } from '../../../services/supaservice';
import { map, Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  supaservice: Supaservice = inject(Supaservice);
  router: Router = inject(Router);
  
  sesion: string | null = null;
  suscriptor = new Subscription;

  searchString = '';
  search($evento: string){
    this.supaservice.setSearchString($evento);
  }

  setSearch($event: Event){
    this.router.navigate(['/plantas',this.searchString]);
  }

  /*constructor(){
    this.suscriptor = this.supaservice.authChangesObservable().subscribe(({ event, session }) =>{
      this.sesion = session?.user?.email || null;
      console.log(session?.user.email);
      console.log(event);
    });
  }*/

  sesion$ = this.supaservice.authChangesObservable().pipe(
    map(({ session }) => session?.user?.email ?? null)
  );

  logOut(){
    this.supaservice.logout();
  }

  ngOnDestroy(){
    this.suscriptor?.unsubscribe();
  }
}
