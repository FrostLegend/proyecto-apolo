import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Planta } from '../plantas/planta';

@Injectable({
  providedIn: 'root',
})

export class Supaservice {
  private http = inject(HttpClient);

  getEcho(data: string){
    return data;
  }

  getPlantas(): Observable<Planta[]>{
    return this.http.get<Planta[]>(environment.supabaseUrl+"/rest/v1/plantas?select=*",{
      headers: new HttpHeaders({
        apikey: environment.supabaseKey,
        Authorization: `Bearer ${environment.supabaseKey}`
      })
    })
  }
}
