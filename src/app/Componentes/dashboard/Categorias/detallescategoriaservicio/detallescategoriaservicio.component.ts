import {Component, OnInit} from '@angular/core';
import {Categoriaservicio} from "../../../../Models/categoriaservicio";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CategoriaservicioService} from "../../../../Service/categoriaservicio.service";
import {ActivatedRoute} from "@angular/router";
import {Subcategoriaservicio} from "../../../../Models/subcategoriaservicio";
import {SubcategoriaservicioService} from "../../../../Service/subcategoriaservicio.service";

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

    abrirmodaleditar(subcatser: Subcategoriaservicio) {
        this.subcatServicio = {...subcatser};
    }
}
