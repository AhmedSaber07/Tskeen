import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AccountService } from '../../../../services/account.service';

@Component({
  selector: 'app-home-student',
  standalone: true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './home-student.component.html',
  styleUrl: './home-student.component.css'
})
export class HomeStudentComponent {
  constructor(private accountService: AccountService,private router:Router) { }
  logout(){
    this.accountService.logout();
    this.router.navigate(['/main']);
  }
}
