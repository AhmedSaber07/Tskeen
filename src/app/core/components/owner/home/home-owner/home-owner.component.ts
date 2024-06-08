import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AccountService } from '../../../../services/account.service';

@Component({
  selector: 'app-home-owner',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './home-owner.component.html',
  styleUrl: './home-owner.component.css'
})
export class HomeOwnerComponent {
  constructor(private accountService: AccountService,private router:Router){}
  logout(){
    this.accountService.logout();
    this.router.navigate(['/login']);
  }
}
