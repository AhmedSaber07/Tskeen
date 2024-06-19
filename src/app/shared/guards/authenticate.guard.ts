import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../../core/services/account.service';

export const authenticateGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const _route = inject(Router); 
  if(accountService.isAuthenticated())
  {
  return true;
  }
  else{
    _route.navigate(['/login']);
      return false;
  }
};
