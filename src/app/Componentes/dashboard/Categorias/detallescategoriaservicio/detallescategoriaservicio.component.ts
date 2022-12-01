import {Component, OnInit} from '@angular/core';
import {Categoriaservicio} from "../../../../Models/categoriaservicio";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CategoriaservicioService} from "../../../../Service/categoriaservicio.service";
import {ActivatedRoute} from "@angular/router";
import {Subcategoriaservicio} from "../../../../Models/subcategoriaservicio";
import {SubcategoriaservicioService} from "../../../../Service/subcategoriaservicio.service";
import {Usuario} from "../../../../Models/usuario";
import Swal from "sweetalert2";

@Component({
    selector: 'app-detallescategoriaservicio',
    templateUrl: './detallescategoriaservicio.component.html',
    styleUrls: ['./detallescategoriaservicio.component.css']
})
export class DetallescategoriaservicioComponent implements OnInit {

    id!: number;
    catServicio: Categoriaservicio = new Categoriaservicio();
    catServicios: Categoriaservicio [] = [];

    subcatServicio: Subcategoriaservicio = new Subcategoriaservicio();
    subcatServicios: Subcategoriaservicio [] = [];

    constructor(private modalService: NgbModal, private catSer: CategoriaservicioService, private subCatSer: SubcategoriaservicioService, private activedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.getCatService();
        this.getSubCatService();

        this.activedRoute.params
            .subscribe(params => {
                let idcatser: number = params['idcatser'];
                console.log(idcatser)
                if (idcatser) {
                    this.catSer.obtenerServicio(idcatser)
                        .subscribe(response => this.catServicio = response)
                }
            })

    }

    getCatService() {
        this.catSer.getServicio()
            .subscribe(response => this.catServicios = response)
    }

    getSubCatService() {
        this.subCatSer.getSubcategoria()
            .subscribe(response => this.subcatServicios = response);
    }

    agregarSubcategoria() {
        this.subCatSer.crearSubcategoria(this.subcatServicio)
            .subscribe(response => {
                console.log('exito');
                console.log(response)
                this.subcatServicios.push(response);
                // @ts-ignore
              document.getElementById("closeM1").click();

            });
    }

    cleanModal(){
        this.subcatServicio = new Subcategoriaservicio();
        this.catServicio = new Categoriaservicio();
    }

    actualizarCategoria() {
        this.subCatSer.updateSubcategoria(this.subcatServicio)
            .subscribe(response => {
                console.log('actualizado');
                this.subcatServicios.forEach((resp,index) => {

                    if(resp.idsubcat == response.idsubcat){
                        this.subcatServicios[index] = response;
                    }
                });
                // @ts-ignore
              document.getElementById("closeM2").click();
            })
    }

  public delete(subcat: Subcategoriaservicio): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-3',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro de eliminar!',
      text: `La subcategoria : ${subcat.idcatser}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar!',
      reverseButtons: true
    }).then((result) => {
      console.log(result)
      if (result.isConfirmed) {
        //funcion eliminar
        this.subCatSer.eliminar(subcat).subscribe(data => {
          this.subcatServicios = this.subcatServicios.filter(del => del.idcatser != subcat.idcatser)
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            `La subcategoria eliminado ${subcat.idcatser}`,
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
    abrirmodaleditar(subcatser: Subcategoriaservicio) {
        this.subcatServicio = {...subcatser};
        this.catServicio = this.subcatServicio.idcatser;
    }
}
