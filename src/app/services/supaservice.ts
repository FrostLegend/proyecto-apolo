import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Planta } from '../plantas/planta';

@Injectable({
  providedIn: 'root',
})

export class Supaservice {
  private http = inject(HttpClient); // singleton  = new service = llama al servicio y emplea los métodos sin necesidad de importar y pegar su código
  
  private supabase: SupabaseClient;

  constructor(){
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async getPlantasSupabase(){
    const {data, error} = await this.supabase.from("plantas")
    .select("*");
    if (error) {
      console.error("Error fetching plantas " , error);
      throw error;
    }
    return data;
  }

  getPlantasObservable(): Observable<Planta[]>{
    return from(this.getPlantasSupabase());
  }

  async getPlantasSupabaseById(id: number): Promise<Planta>{
    const {data, error} = await this.supabase.from("plantas")
    .select("*").eq("id", id).single();
    if (error) {
      console.error("Error fetching plantas " , error);
      throw error;
    }
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

  getPlantasById(id: number): Observable<Planta[]>{
    return this.http.get<Planta[]>(environment.supabaseUrl+"/rest/v1/plantas?select="+id,{
      headers: new HttpHeaders({
        apikey: environment.supabaseKey,
        Authorization: `Bearer ${environment.supabaseKey}`
      })
    })
  }
}
