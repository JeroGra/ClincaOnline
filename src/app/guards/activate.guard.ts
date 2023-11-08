import { CanActivateFn } from '@angular/router';

export const activateGuard: CanActivateFn = (route, state) => {
  return true;
};
