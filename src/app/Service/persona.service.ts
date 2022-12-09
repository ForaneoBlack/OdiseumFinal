import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Persona} from "../Models/persona";

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private HttpHeaders=new HttpHeaders({'Content-Type':'application/json'})

  url: string = 'http://localhost:8080/api/persona';

  constructor(private http: HttpClient) { }

  crearPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.url + '/crear', persona,{headers: this.HttpHeaders});

  }
  actualizarPersona(persona: Persona): Observable<Persona>{
    return this.http.put<Persona>(this.url+'/editar/'+persona.idpersona,persona,{headers: this.HttpHeaders});
  }

}
