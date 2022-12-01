import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { empresa } from 'src/app/Models/empresa';
import { Producto } from 'src/app/Models/producto';
import { ProductoService } from 'src/app/Service/producto.service';

@Component({
  selector: 'app-reporteproductos',
  templateUrl: './reporteproductos.component.html',
  styleUrls: ['./reporteproductos.component.css']
})
export class ReporteproductosComponent implements OnInit {

  productos: Producto = new Producto();
  producto: Producto [] = [];

  empresas: empresa = new empresa();
  empresa: empresa [] = [];

  datas: String[] = [];
  idempres!: number;
  total!:number;


  constructor(private productoService: ProductoService, private activedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getProducto();
    this.operacion();
    /*this.getVenta(this.total)*/
    this.total = suma(this.producto);
    this.activedRoute.params
      .subscribe(params => {
        let idproducto: number = params['idproducto'];
        if (idproducto) {
          this.productoService.obtenerProducto(idproducto)
            .subscribe(response => this.productos = response)
        }
      })

    this.idempres = 2
    this.productoService.getreporte(this.idempres).subscribe(
      response => {
        console.log(response[0]);

        console.log(this.datas[2]);
      }
    )
  }

  getProducto() {
    this.productoService.getProducto()
      .subscribe(response => this.producto = response);
  }

  /* getVenta(id: number){
    this.productoService.obtenerVenta(id)
      .subscribe(response => this.productos = response);


  }*/

  operacion(){
    this.productoService.getProducto()
    this.total= (this.productos.precio*this.productos.stock);
  }
}
function suma(params:Producto[]){
  let dataprecio= [];
  let datacantidad=[];
  let multiplicacion=0;
  let sumatota=0;

  for (let i =0; i<params.length; i++){
    dataprecio.push(params[i].precio);
    datacantidad.push(params[i].stock);
  }
  for (let a =0; a<dataprecio.length; a++){
    multiplicacion = dataprecio[a]*datacantidad[a];
    sumatota= sumatota+multiplicacion;
  }
  return sumatota;
}
