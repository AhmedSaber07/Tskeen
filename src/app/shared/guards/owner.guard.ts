import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../../core/services/account.service';

export const ownerGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const _route = inject(Router); 
  if(accountService.isAuthenticated()&& accountService.isOwner())
  {
  return true;
  }
  else{
    _route.navigate(['/login']);
      return false;
  }
};
