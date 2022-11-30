import {Component, OnInit} from '@angular/core';
import {Categoriaservicio} from "../../../../Models/categoriaservicio";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CategoriaservicioService} from "../../../../Service/categoriaservicio.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Categoria} from "../../../../Models/categoria";
import Swal from "sweetalert2";

@Component({
    selector: 'app-listacategoriaservicio',
    templateUrl: './listacategoriaservicio.component.html',
    styleUrls: ['./listacategoriaservicio.component.css']
})
export class ListacategoriaservicioComponent implements OnInit {

    catServicio: Categoriaservicio = new Categoriaservicio();
    catServicios: Categoriaservicio [] = [];

    constructor(private modalService: NgbModal, private catSer: CategoriaservicioService, private activedRoute: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.getCatService();

        this.activedRoute.params
            .subscribe(params => {
                let idcatser: number = params['idcatser'];
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

    cleanModal() {
        this.catServicio = new Categoriaservicio;
    }

    agregarCategoria() {
        this.catSer.crearServicio(this.catServicio)
            .subscribe(response => {
                console.log('exito');
                console.log(response)
                this.catServicios.push(response);
                // @ts-ignore
              document.getElementById("closeM1").click();

            });
    }
    actualizarCategoria() {
        this.catSer.updateServicio(this.catServicio)
            .subscribe(response => {
                console.log('actualizado');
                this.catServicios.forEach((resp,index) => {

                    if(resp.idcatser == response.idcatser){
                        // @ts-ignore
                      this.catServicio[index] = response;
                    }
                });
                // @ts-ignore
              document.getElementById("closeM2").click();
            })
    }

    abrirmodaleditar(catt: Categoriaservicio) {
        this.catServicio = {...catt};

    }

    public delete(catt: Categoriaservicio): void {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Esta seguro de eliminar!',
            text: `la categoria : ${catt.catnombre}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar!',
            reverseButtons: true
        }).then((result) => {
            console.log(result)
            if (result.isConfirmed) {
                //funcion eliminar
                this.catSer.eliminar(catt).subscribe(data => {
                    this.catServicios = this.catServicios.filter(del => del.idcatser != catt.idcatser)
                    swalWithBootstrapButtons.fire(
                        'Eliminado!',
                        `Categoría eliminada ${catt.idcatser}`,
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
