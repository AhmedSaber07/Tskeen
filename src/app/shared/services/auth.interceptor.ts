import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../../core/services/account.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AccountService);
  const cloneRequest = req.clone({
    setHeaders:{
      Authorization:`Bearer ${authService.token}`
    }
  });
  // console.log(authService.token);
  
  return next(cloneRequest);
};
