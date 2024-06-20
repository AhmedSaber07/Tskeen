import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../core/services/account.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  constructor(private router: Router,private accountService:AccountService){

  }
  navigateToLogin(userType: string): void {
    this.accountService.userType = userType;
    this.router.navigate(['/login'], { queryParams: { type: userType } });
  }
}
