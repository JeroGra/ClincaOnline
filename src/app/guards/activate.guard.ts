import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LocalStorageEncriptService } from '../servicios/local-storage-encript.service';
import Swal from 'sweetalert2';

export const activateGuardAdmin: CanActivateFn = (route, state) => {
  let log = inject(LocalStorageEncriptService).GetEncriptStorage()
  let rol = log.user.tipo;
  if(rol !== "Administrador")
  {
    Swal.fire({
      text: "No tienes los permisos para acceder",
      showConfirmButton: false,
      timer: 1000,
      toast: true,
      position: 'top-right',
      icon:'error',
    })
  }
  return (log.logeado && rol === "Administrador");
};

export const activateGuardEspecialista: CanActivateFn = (route, state) => {
  let log = inject(LocalStorageEncriptService).GetEncriptStorage()
  let rol = log.user.tipo;
  if(rol !== "Especialista")
  {
    Swal.fire({
      text: "No tienes los permisos para acceder",
      showConfirmButton: false,
      timer: 1000,
      toast: true,
      position: 'top-right',
      icon:'error',
    })
  }
  return (log.logeado && rol === "Especialista");
};

export const activateGuarPaciente: CanActivateFn = (route, state) => {
  let log = inject(LocalStorageEncriptService).GetEncriptStorage()
  let rol = log.user.tipo;
  if(rol !== "Paciente")
  {
    Swal.fire({
      text: "No tienes los permisos para acceder",
      showConfirmButton: false,
      timer: 1000,
      toast: true,
      position: 'top-right',
      icon:'error',
    })
  }
  return (log.logeado && rol === "Paciente");
};
