import { Injectable } from '@angular/core';
import { EncryptStorage } from 'encrypt-storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageEncriptService {

  constructor() { }

    private encryptStorage = new EncryptStorage('secret-key-value', {});



    EncriptStorage(userLog:any){
      
      this.encryptStorage.setMultipleItems([
        [
          'userLog',
          {
            id: userLog.id,
            email: userLog.email,
            contrasenia: userLog.contrasenia,
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
