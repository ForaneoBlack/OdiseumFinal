import {Component, OnChanges, OnInit} from '@angular/core';
import {Rol} from "../../../Models/rol";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RolService} from "../../../Service/rol.service";
import { ActivatedRoute, Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit{

  roles: Rol = new Rol();
  rol: Rol [] = [];

  ngOnInit(): void {

    this.getRoles();

    this.activedRoute.params
      .subscribe(params => {
        let idrol: number = params['idrol'];
        if (idrol) {
          this.rolService.obtenerRol(idrol)
            .subscribe(response => this.roles = response)
        }
      })
  }


  constructor(private modalService: NgbModal, private rolService: RolService, private activedRoute: ActivatedRoute) {
  }

  getRoles() {
    this.rolService.getRol()
      .subscribe(response => this.rol = response);
  }


  agregarRol() {
    this.rolService.crearRol(this.roles)
      .subscribe(response => {
        console.log('exito');
        console.log(response);
        this.rol.push(response);
        // @ts-ignore
        document.getElementById("closeM1").click();

      });
  }

  cleanModal(){
    this.roles = new Rol();
  }
  actualizarRol() {
    this.rolService.updateRol(this.roles)
      .subscribe(response => {
        console.log('actualizado');
       this.rol.forEach((resp,index) => {

         if(resp.idrol == response.idrol){
           this.rol[index] = response;
         }
       });
        // @ts-ignore
        document.getElementById("closeM2").click();
      })
  }

  abrirmodaleditar(rol: Rol) {
    this.roles = {...rol};

  }


  public delete(rol: Rol): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-3',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro de eliminar!',
      text: `El rol : ${rol.rolnombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar!',
      reverseButtons: true
    }).then((result) => {
      console.log(result)
      if (result.isConfirmed) {
        //funcion eliminar
        this.rolService.eliminar(rol).subscribe(data => {
          this.rol = this.rol.filter(del => del.idrol != rol.idrol)
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            `Rol eliminado ${rol.idrol}`,
            'success'
          );

        })


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          ' ',
          'error'
        )
      }
    })
  }


}
