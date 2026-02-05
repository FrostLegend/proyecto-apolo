import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Supaservice } from '../services/supaservice';

export const userGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const supabaseService: Supaservice = inject(Supaservice);
  const urlTree: UrlTree = router.parseUrl('home');
  return supabaseService.loggedSubject.getValue() ? true : urlTree;
};
  