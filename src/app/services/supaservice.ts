import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, resource, signal, Signal } from '@angular/core';
import { AuthChangeEvent, createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject, debounceTime, distinctUntilChanged, from, map, Observable, subscribeOn } from 'rxjs';
import { environment } from '../../environments/environment';
import { Planta } from '../plantas/planta';
import { Registres } from '../registros/registres';

@Injectable({
  providedIn: 'root',
})

export class Supaservice {
  private http = inject(HttpClient); // singleton  = new service = llama al servicio y emplea los métodos sin necesidad de importar y pegar su código
  
  private supabase: SupabaseClient;

  plantasSubject = new BehaviorSubject<Planta[]>([]);
  plantasSearchSignal = signal('');

  subjectSearrchString = new BehaviorSubject('');
  
  setSearchString(searchString: string){
    this.subjectSearrchString.next(searchString);
  }


  constructor(){
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.authChangesObservable().subscribe(() =>{
      //this.plantasResource.reload();
    });
    this.subjectSearrchString
    .pipe(
      map(s => Boolean(s) ? s : ''),
      debounceTime(500),
      distinctUntilChanged(),
      map((s) => s.toLocaleLowerCase()),
    )
    .subscribe(async (searchString) => {
      console.log(searchString);
      const plantas = await this.searchPlantasSupabase(searchString);
      this.plantasSubject.next(plantas);
      console.log(plantas);
    })
  }
  

                // Peticiones  \\

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

  async getRegistrosSupabase(plantaId: number): Promise<Registres[]>{
    const {data, error} = await this.supabase.from("registres")
    .select("*")
    .eq("planta", plantaId)
    .limit(288)
    .order('created_at', {ascending: false});
    if (error) {
      console.error("Error fetching plantas " , error);
      throw error;
    }
    return data;
  }
  
                // Busqueda  \\

  async searchPlantasSupabase(searchString: string): Promise<Planta[]>{
    const {data, error} = await this.supabase
    .from("plantas")
    .select("*")
    .ilike("nombre", `%${searchString}%`);
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

  /*plantasResource = resource({
    params:()=>({}),
    loader: async()=> {
      return await this.getPlantasSupabase();
    }
  })

  plantasSignal: Signal<Planta[]> = computed(() =>
    this.plantasResource.hasValue() ? this.plantasResource.value() : []
  );*/
  
                // Autentificación \\

  async login(loginData: {email: string, password: string}){
    let { data, error } = await this.supabase.auth.signInWithPassword(loginData);
    if (error) {
      console.error("Error fetching plantas " , error);
      throw error;
    }
    return data;
  }

  async register(loginData: {email: string, password: string}){
    let { data, error } = await this.supabase.auth.signUp(loginData);
    if (error) {
      console.error("Error fetching plantas " , error);
      throw error;
    }
    return data;
  }

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
