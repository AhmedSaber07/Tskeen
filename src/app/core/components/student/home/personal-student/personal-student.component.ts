import { Component, OnInit } from '@angular/core';
import { ProfileStudent } from '../../../../models/profile-student';
import { AccountService } from '../../../../services/account.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-personal-student',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './personal-student.component.html',
  styleUrl: './personal-student.component.css'
})
export class PersonalStudentComponent implements OnInit {
  studentProfile!:ProfileStudent;
  // firstName!:string;
  // lastName!:string;
  constructor(private accountService:AccountService){

  }
  ngOnInit(): void {
    if(this.accountService.id)
      {
    this.accountService.getStudentProfile(this.accountService.id).subscribe(
      (data)=>{
          this.studentProfile = data.data;
          //console.log(this.ownerProfile);
          
          // this.firstName = this.ownerProfile.fullName.split(' ')[0];
          // this.lastName = this.ownerProfile.fullName.split(' ')[1];
      });
    }
}
}
