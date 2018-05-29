import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
@Injectable()
export class Authguard implements CanActivate {
  permitted:boolean
  constructor(
    private authservice : AngularFireAuth,
    public router : Router,
  ) { }
  canActivate() : Observable<boolean> {
   return this.authservice.authState.map(status => {
     if(!status) {
       this.router.navigate(['login'])
       return false
     } else {
       return true
     }
   })
  }

}
