import { Categoriaservicio } from "./categoriaservicio";
import { empresa } from "./empresa";
import { Subcategoriaservicio } from "./subcategoriaservicio";

export class Servicio {
    idservicio!: number;
    idsubcat!: Subcategoriaservicio;
    idcatser!: Categoriaservicio;
    idempresa!: empresa;
    serimagen!: string;
    serduracion!: string;
    serdescripcion!: string;
    serprecio!: number;
    sernombre!: string;
    

}

