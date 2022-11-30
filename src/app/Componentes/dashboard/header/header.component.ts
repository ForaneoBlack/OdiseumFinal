import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Credenciales } from 'src/app/Models/credenciales';
import { Usuario } from 'src/app/Models/usuario';
import { LoginService } from 'src/app/Service/login.service';
import { Userlogin, rol_id } from '../../../Models/userlogin';
import { EmpresaLogin } from '../../../Models/empresalogin';
import { empresa } from 'src/app/Models/empresa';
import { UsuarioService } from '../../../Service/usuario.service';
import { empty, isObservable, Observable, observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public datos: Userlogin = new Userlogin();
  public datosemp: empresa = new empresa();
  public rol?: String = "";
  public nombre: String = "";
  public pruab: String = "";
  issloading = true;
  usuario: Usuario[] = [];
  public persona: Credenciales = new Credenciales();
  constructor(private router: Router, private loginservice: LoginService, private ususervice: UsuarioService) { }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.issloading = false;
    }, 1000)
  }

  ngOnInit(): void {

    if (JSON.parse(sessionStorage['usuario']) != "") {
      //datos de usuario rol username

      this.datos = JSON.parse(sessionStorage['usuario']);


      // @ts-ignore
      this.rol = this.datos.rol_id.rolnombre;
      this.nombre = this.datos.usuusuario;
      console.log(this.ususervice.consultarempresa(this.datos.usu_id));
      this.ususervice.consultarempresa(this.datos.usu_id).subscribe(response => { sessionStorage.setItem('empresa', JSON.stringify(response)) });
      this.datosemp = JSON.parse(sessionStorage['empresa']);
      // this.pruab = this.datosemp.idempresa + "";
      if (this.datosemp.idempresa== null) {

        this.rol = 'sinempresa'


      } else {


      }



    } else {
      window.localStorage.clear();
      localStorage.removeItem("usuario");
      console.log("regresar al login");


    }
  }

  logout(): void {
    console.log("cerrando sesion")
    sessionStorage.clear;
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("empresa");
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

}
