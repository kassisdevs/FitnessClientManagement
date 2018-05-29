import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(
    private fa : AngularFireAuth
  ) { }
  log(email:string, password:string) {
    return this.fa.auth.signInWithEmailAndPassword(email, password)
  }
  checkStatus(){
    return this.fa.authState
  }
  logOut(){
    this.fa.auth.signOut()
  }
  registerUser(email:string, password:string){
    return this.fa.auth.createUserWithEmailAndPassword(email, password)
  }
}
