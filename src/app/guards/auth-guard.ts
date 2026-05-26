import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  // Evita error SSR
  if(typeof window === 'undefined'){

    return false;
  }

  const user = localStorage.getItem('user');

  if(user){

    return true;
  }

  router.navigate(['/']);

  return false;
};