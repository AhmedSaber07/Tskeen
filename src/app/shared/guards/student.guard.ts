import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../../core/services/account.service';

export const studentGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const _route = inject(Router); 
  if(accountService.isAuthenticated()&& accountService.isStudent() && accountService.isFirstRegisterStudent())
  {
  return true;
  }
  else if(accountService.isAuthenticated()&& accountService.isStudent() )
    {
     return true; 
    }
  else{
    _route.navigate(['/login']);
      return false;
  }
};
