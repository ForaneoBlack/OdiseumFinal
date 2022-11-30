import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/Service/login.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioguardianGuard implements CanActivate {

  constructor(private router: Router, private service:LoginService) {}

  canActivate() {
    if(this.service.IsloggedIn()){
      
      return true;
    }else{
      this.router.navigate([''])
  return false;
    }
}
  


  
}
