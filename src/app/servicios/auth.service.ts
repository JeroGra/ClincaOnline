import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword , getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth : Auth) { }
 
  Registrar(email:any, contrasenia:any)
  {
    return createUserWithEmailAndPassword(this.auth,email,contrasenia);
  }

  Logear(email:any, contrasenia:any)
  {
    return signInWithEmailAndPassword(this.auth,email,contrasenia);
  }

  DesLogear()
  {
    return signOut(this.auth);
  }

}
