import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categoria } from 'src/app/Models/categoria';
import { CategoriaService } from 'src/app/Service/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listacategoriaempresa',
  templateUrl: './listacategoriaempresa.component.html',
  styleUrls: ['./listacategoriaempresa.component.css']
})
export class ListacategoriaempresaComponent implements OnInit {
  categorias: Categoria = new Categoria();
  categoria: Categoria [] = [];

  ngOnInit(): void {

    this.getCategorias();

    this.activedRoute.params
      .subscribe(params => {
        let idcatemp: number = params['idcatemp'];
        if (idcatemp) {
          this.categoriaService.obtenerCategoria(idcatemp)
            .subscribe(response => this.categorias = response)
        }
      })
  }


  constructor(private modalService: NgbModal, private categoriaService: CategoriaService, private activedRoute: ActivatedRoute, private router: Router) {
  }

  getCategorias() {
    this.categoriaService.getCategoria()
      .subscribe(response => this.categoria = response);
  }


  agregarCategoria() {
    this.categoriaService.crearCategoria(this.categorias)
      .subscribe(response => {
        console.log('exito');
        console.log(response)
        this.categoria.push(response);
        // @ts-ignore
        document.getElementById("closeM1").click();

      });
  }

  cleanModal(){
    this.categorias = new Categoria();
  }
  actualizarCategoria() {
    this.categoriaService.updateCategoria(this.categorias)
      .subscribe(response => {
        console.log('actualizado');
       this.categoria.forEach((resp,index) => {

         if(resp.idcatemp == response.idcatemp){
           this.categoria[index] = response;
         }
       });
        // @ts-ignore
        document.getElementById("closeM2").click();
      })
  }

  abrirmodaleditar(categoria: Categoria) {
    this.categorias = {...categoria};

  }


  public delete(categoria: Categoria): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro de eliminar!',
      text: `la categoria : ${categoria.catnombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar!',
      reverseButtons: true
    }).then((result) => {
      console.log(result)
      if (result.isConfirmed) {
        //funcion eliminar
        this.categoriaService.eliminar(categoria).subscribe(data => {
          this.categoria = this.categoria.filter(del => del.idcatemp != categoria.idcatemp)
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            `Categoría eliminada ${categoria.idcatemp}`,
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

  verDetallesDelaCategoria(categoria: Categoria){
    this.router.navigate(['/dashboard/detallescategoria',categoria.idcatemp]);
  }

  }

