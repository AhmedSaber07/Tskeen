import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileOwner } from '../../../../models/profile-owner';
import { AccountService } from '../../../../services/account.service';

@Component({
  selector: 'app-personal-owner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './personal-owner.component.html',
  styleUrl: './personal-owner.component.css'
})
export class PersonalOwnerComponent implements OnInit  {
  ownerProfile!:ProfileOwner;
  // firstName!:string;
  // lastName!:string;
  constructor(private accountService:AccountService){

  }
  ngOnInit(): void {
    if(this.accountService.id)
      {
    this.accountService.getOwnerProfile(this.accountService.id).subscribe(
      (data)=>{
          this.ownerProfile = data.data;
          console.log(this.ownerProfile);
          
          // this.firstName = this.ownerProfile.fullName.split(' ')[0];
          // this.lastName = this.ownerProfile.fullName.split(' ')[1];
      });
    }
}
}
