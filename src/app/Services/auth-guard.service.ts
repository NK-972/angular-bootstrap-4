import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { InitService } from './init.service.ts'

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private initServices: InitService, private router: Router) { }
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this.initServices.isAuth) {
          console.log('Connection ok');
          return true;
        } else {
          console.log('Connection refusée')
          this.router.navigate(['auth']);
        }
    }
}