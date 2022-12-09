import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credenciales } from '../Models/credenciales';
import { Userlogin } from '../Models/userlogin';
import { EmpresaLogin } from '../Models/empresalogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private HttpHeaders=new HttpHeaders({'Content-Type':'application/json'})
  //url: string = 'https://bryantenemea.com/api/usuario';
 //url: string = 'http://apiemprendimientos-env.eba-d95suqjg.us-east-1.elasticbeanstalk.com/api/usuario'

 url: string = 'http://localhost:8080/api/usuario';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http:HttpClient) { }


  // Login(userRequest: Userlogin):Observable<EmpresaLogin>{

  //     return this.http.post<EmpresaLogin>(this.url+"/login_web",userRequest ,{headers: this.HttpHeaders});
  // }

  Loginuser(userRequest: Userlogin):Observable<Userlogin>{

    return this.http.post<Userlogin>(this.url+"/loginweb",userRequest ,{headers: this.HttpHeaders});
}

  IsloggedIn(){

    return sessionStorage.getItem('usuario')!=null;
  }

}
