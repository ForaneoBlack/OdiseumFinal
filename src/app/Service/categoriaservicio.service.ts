import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Categoriaservicio} from "../Models/categoriaservicio";

@Injectable({
    providedIn: 'root'
})
export class CategoriaservicioService {

    private HttpHeaders=new HttpHeaders({'Content-Type':'application/json'})
    url: string = 'https://bryantenemea.com/api/categoriaservicio';

    constructor(private http: HttpClient) {
    }

    getServicio(): Observable<Categoriaservicio[]> {
        return this.http.get<Categoriaservicio[]>(this.url + '/listar',{headers: this.HttpHeaders});
    }

    crearServicio(catservicio: Categoriaservicio): Observable<Categoriaservicio> {
        return this.http.post<Categoriaservicio>(this.url + '/crear', catservicio,{headers: this.HttpHeaders});
    }

    obtenerServicio(idcatser: number): Observable<Categoriaservicio> {
        return this.http.get<Categoriaservicio>(this.url + '/listar id/' + idcatser,{headers: this.HttpHeaders});
    }

    updateServicio(catservicio: Categoriaservicio): Observable<Categoriaservicio> {
        return this.http.put<Categoriaservicio>(this.url + '/editar/' + catservicio.idcatser, catservicio,{headers: this.HttpHeaders});
    }

    eliminar(catservicio: Categoriaservicio) {
        const path = `${this.url}/${catservicio.idcatser}`;
        return this.http.delete<Categoriaservicio>(this.url + "/eliminar/" + catservicio.idcatser,{headers: this.HttpHeaders});
    }
}