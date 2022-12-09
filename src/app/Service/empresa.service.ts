import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { empresa } from '../Models/empresa';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private HttpHeaders=new HttpHeaders({'Content-Type':'application/json'})
  url: string = 'http://localhost:8080/api/empresa';

  constructor(private http: HttpClient) {}

  getEmpresa(): Observable<empresa[]> {
    return this.http.get<empresa[]>(this.url+'/listar',{headers: this.HttpHeaders});
  }

  getEmpresa_usuid(): Observable<empresa[]> {
    return this.http.get<empresa[]>(this.url+'/listar',{headers: this.HttpHeaders});
  }

  crearEmpresa(empresa: empresa): Observable<empresa>{
    return this.http.post<empresa>(this.url+'/crear',empresa,{headers: this.HttpHeaders});
  }

  obtenerEmpresa(idempresa: number): Observable<empresa>{
    return this.http.get<empresa>(this.url+'/listar id/'+idempresa,{headers: this.HttpHeaders});
  }

  updateEmpresa(empresa: empresa): Observable<empresa>{
    return this.http.put<empresa>(this.url+'/editar/'+empresa.idempresa,empresa,{headers: this.HttpHeaders});
  }
}