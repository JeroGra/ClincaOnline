import { Injectable } from '@angular/core';
import { EncryptStorage } from 'encrypt-storage';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageEncriptService {

  constructor() { }

    private encryptStorage = new EncryptStorage('secret-key-value', {});

    EncriptStorage(userLog:Usuario){
      
      this.encryptStorage.setMultipleItems([
        [
          'userLog',
          {
            id: userLog.id,
            email: userLog.email,
            user:userLog,
            logeadoDate:Date.now(),
            logeado:true,
          },
        ],
      ]);
    }

    GetEncriptStorage(){
      const rt = this.encryptStorage.getItem<any>('userLog');
      return rt;
    }

    RemoveEncriptStorage(){
      this.encryptStorage.removeItem('userLog');
    }

    EncriptValue(value:any){
      const rt = this.encryptStorage.encryptValue(value);
      return rt;
    }

    DecriptValue(encript:any){
      const rt = this.encryptStorage.decryptValue(encript);
      return rt;
    }
}
