import { Component, OnInit } from '@angular/core';
import { empresa } from 'src/app/Models/empresa';
import { EmpresaService } from 'src/app/Service/empresa.service';
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-crud-empresa',
  templateUrl: './crud-empresa.component.html',
  styleUrls: ['./crud-empresa.component.css']
})
export class CrudEmpresaComponent implements OnInit {

  empresas: empresa[]= [];
  empresaNueva: empresa = new empresa();

  constructor(private modalService: NgbModal, private empresaService: EmpresaService, private activedRoute: ActivatedRoute, router: Router) { }

  getEmpresas() {
    this.empresaService.getEmpresa()
      .subscribe(response => this.empresas = response);
  }

  ngOnInit(): void {
    this.getEmpresas();

    this.activedRoute.params
      .subscribe(params => {
        let idempresa: number = params['idempresa'];
        if (idempresa) {
          this.empresaService.obtenerEmpresa(idempresa)
            .subscribe(response => this.empresaNueva = response)
        }
      })
  }



  agregarEmpresa(){
    this.empresaService.crearEmpresa(this.empresaNueva)
    .subscribe(response => console.log("exito"))
  }

  actualizarEmpresa() {
    this.empresaService.updateEmpresa(this.empresaNueva)
      .subscribe(response => {
        console.log('actualizado');
       this.empresas.forEach((resp,index) => {

         if(resp.idempresa == response.idempresa){
           this.empresas[index] = response;
         }
       });
        // @ts-ignore
        document.getElementById("closeM2").click();
      })
  }

  abrirdetalle(empresa: empresa) {
    this.empresaNueva = {...empresa};

  }

  delete(){

  }

}
