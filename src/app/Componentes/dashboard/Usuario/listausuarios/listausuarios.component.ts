import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../../../Models/usuario";
import {UsuarioService} from "../../../../Service/usuario.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {RolService} from "../../../../Service/rol.service";
import {Rol} from "../../../../Models/rol";
import {Persona} from "../../../../Models/persona";
import {PersonaService} from "../../../../Service/persona.service";
import Swal from "sweetalert2";




@Component({
    selector: 'app-listausuarios',
    templateUrl: './listausuarios.component.html',
    styleUrls: ['./listausuarios.component.css']
})
export class ListausuariosComponent implements OnInit {

    user: Usuario = new Usuario();
    users: Usuario [] = [];
    rol: Rol = new Rol();
    roles: Rol [] = [];
    persona: Persona = new Persona();
    personas: Persona [] = [];

    constructor(private modalService: NgbModal, private rolService: RolService, private userService: UsuarioService, private personaService: PersonaService, private activedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.getUsers();
        this.getRoles();

        this.activedRoute.params
            .subscribe(params => {
                let usu_id: number = params['usu_id'];
                if (usu_id) {
                    this.userService.obtenerUser(usu_id)
                        .subscribe(response => this.user = response)
                }
            })
    }

    getUsers() {
        this.userService.getUser()
            .subscribe(response => {
                this.users = response
                console.log(response)
            })

    }
    obetenerusuario(usu_id: number){
        this.userService.obtenerUser(usu_id)
        .subscribe(response => {
            this.user = response
            console.log(response)
        });

    }

    getRoles() {
        this.rolService.getRol()
            .subscribe(response => this.roles = response);
    }

    abrirmodaleditar(user: Usuario) {
        this.user = {...user};
        this.persona = this.user.persona
        this.rol = this.user.rol_id
    }

    agregarUser() {

        /*   console.log(this.user)*/
        this.personaService.crearPersona(this.persona)
            .subscribe(response => {
                console.log("persona guardada")
                this.user.persona = response
                this.user.rol_id = this.rol
        console.log(this.user)
                this.userService.crearUser(this.user)
                    .subscribe(res => {
                        console.log('exito');
                        console.log(res);
                        this.users.push(res);
                        console.log();
                        // @ts-ignore
                      document.getElementById("closeM1").click();
                    })
            })


    }

    actualizarUsuario(){
        this.personaService.actualizarPersona(this.persona)
            .subscribe(response => {
                console.log("persona guardada")
                this.user.persona = response
                this.user.rol_id = this.rol
                console.log(this.user.persona)
                this.personas.forEach((resp,index) => {
                    if(resp.idpersona == response.idpersona){
                        // @ts-ignore
                      this.user.persona[index] = response;

                    }

                })


                this.userService.updateUser(this.user)
                    .subscribe(res => {
                        console.log('exito');
                        console.log(res);
                        this.users.forEach((r, index2) =>{
                            if(r.usu_id == res.usu_id){
                                // @ts-ignore
                              this.user[index2] = res;
                            }
                        })

                        this.users.push(res);
                        // @ts-ignore
                      document.getElementById("closeM2").click();
                    })
            })
    }

    public delete(user: Usuario): void {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success mx-3',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Esta seguro de eliminar!',
            text: `El usuario : ${user.usuusuario}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar!',
            reverseButtons: true
        }).then((result) => {
            console.log(result)
            if (result.isConfirmed) {
                //funcion eliminar
                this.userService.eliminarUser(user).subscribe(data => {
                    this.users = this.users.filter(del => del.usu_id != user.usu_id)
                    swalWithBootstrapButtons.fire(
                        'Eliminado!',
                        `El usuario eliminado ${user.usuusuario}`,
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

    cleanModal() {
        this.user = new Usuario();
        console.log(this.user)
        this.persona = new Persona();
        this.rol = new Rol();
    }

    compararrol(r1: Rol, r2: Rol): boolean{
        if(r1==undefined && r2 == undefined)return true;
        return r1 == null || r2 ==null || r1 == undefined || r2 == undefined ? false : r1.idrol == r2.idrol;

    }


}
