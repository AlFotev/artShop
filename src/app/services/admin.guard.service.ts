import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanLoad,
  Router,
  Route
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate, CanLoad {
  constructor(
    private authService : AuthService,
    private router : Router
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkIsAdmin(state.url);
  }

  canLoad(route: Route): boolean {
    return this.checkIsAdmin(route.path);
  }
  checkIsAdmin(url:string){
      if(this.authService.isAdmin()){
        return true;
      }
      this.router.navigateByUrl("/home");
      return false;
  }
}