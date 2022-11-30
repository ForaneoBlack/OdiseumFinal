import { Categoria } from "./categoria";
import { empresa } from "./empresa";
import { Subcategoriaempresa } from "./subcategoriaempresa";

export class Cat_Sub_Emp{
    iddetalle!: number;
    csedetalle!: string;
    idempresa!: empresa;
    idcatemp!: Categoria;
    idsubcatemp!: Subcategoriaempresa;
}