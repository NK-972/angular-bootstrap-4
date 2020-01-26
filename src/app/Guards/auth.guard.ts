import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { InitService } from '../Services/init.service.ts'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private initServices: InitService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
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
