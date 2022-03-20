
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';

@Injectable()
export class RoleGuardService implements CanActivate {
    tokenPayloads: any;
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {

        const expectedRole = route.data.expectedRole;

        const isAuthenticated = this.authService.isAuthenticated();

        this.tokenPayloads = decode(localStorage.token);

        if (isAuthenticated == true && this.tokenPayloads["role"] == expectedRole) {
            return true;
        }

        this.router.navigate(["/signin"]);
        return false;
    }
}