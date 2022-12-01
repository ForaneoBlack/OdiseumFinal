import { empresa } from "./empresa";
import { Factura } from "./factura";
import { Persona } from "./persona";
import { Producto } from "./producto";
import { Servicio } from "./servicio";
import { Usuario } from "./usuario";

export class Detalle_Factura{
    iddetalle!: number;
    cantidad!: number;
    precio!: number;
    tipo!: string;
    idservicio!: Servicio;
    idproducto!: Producto;
    idempresa!: empresa;
    usu_id!: Usuario;
    idpersona!: Persona;
    idfactura!: Factura;
}