import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isLoggedIn()) {
      return true
    } else {
      this._router.navigate(['/login'])
    }
  }

  isLoggedIn(): boolean {
    let status = false
    if (localStorage.getItem('isLoggedIn') == 'true') {
      status = true
    } else {
      status = false
    }
    return status
  }

  isAdmin(): boolean{
    if (localStorage.getItem('admin') == 'true'){
      return true;
    }else{
      return false;
    }
  }

  logout() {
    
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('id');
    localStorage.removeItem('admin');

    window.location.replace('/homepage');
  }
}
