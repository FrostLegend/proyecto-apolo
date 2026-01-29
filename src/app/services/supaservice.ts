import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, resource } from '@angular/core';
import { AuthChangeEvent, createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { from, Observable, subscribeOn } from 'rxjs';
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
    this.authChangesObservable().subscribe(() =>{
      this.plantasResource.reload();
    });
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

  /*getPlantas(): Observable<Planta[]>{
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
  }*/

  async login(loginData: {email: string, password: string}){
    let { data, error } = await this.supabase.auth.signInWithPassword(loginData);
    if (error) {
      console.error("Error fetching plantas " , error);
      throw error;
    }
    return data;
  }

  plantasResource = resource({
    params:()=>({}),
    loader: async()=> {
      return await this.getPlantasSupabase();
    }
  })

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void){
    return this.supabase.auth.onAuthStateChange(callback); // Recivir una notificación con cada envento de autentificación
  }

  authChangesObservable():Observable<{event: AuthChangeEvent; session: Session | null}>{
    return new Observable((subscriber) => {
      const {data: authListener } = this.authChanges(
      // Funcion Callback que le pasamaos a authChanges de arriba
      (event: AuthChangeEvent, session: Session | null) => {
        // Con cada evento de autentificación los suscriptores reciben un aviso
        subscriber.next({event, session});
      },
    );
      return () => {
        authListener.subscription.unsubscribe();
      }
    });
  }

  async logout(){
    let {error} = await this.supabase.auth.signOut();
  }
}
