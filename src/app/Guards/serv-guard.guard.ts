import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class ServGuardGuard implements CanActivate {
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
