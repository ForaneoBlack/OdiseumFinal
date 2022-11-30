import { Categoria } from "./categoria";
import { empresa } from "./empresa";
import { Subcategoriaempresa } from "./subcategoriaempresa";
import { Usuario } from "./usuario";

export class solicitud{

    idsolicitud!: number;
    sol_fecharegistro!: Date;
    sol_estado!: string;
    sol_detalleestado!: string;
    idempresa!: empresa;
    usu_id!: Usuario;
    idcatemp!: Categoria;
    idsubcatemp!: Subcategoriaempresa;
}