import { Component, OnInit } from '@angular/core';
import { ProfileStudent } from '../../../../models/profile-student';
import { AccountService } from '../../../../services/account.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-personal-student',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './personal-student.component.html',
  styleUrl: './personal-student.component.css'
})
export class PersonalStudentComponent implements OnInit {
  studentProfile!:ProfileStudent;
  studentId!:string;
  role!:string;
  // firstName!:string;
  // lastName!:string;
  constructor(private route: ActivatedRoute,private accountService:AccountService){

  }
  ngOnInit(): void {
    if(this.accountService.role)
      this.role = this.accountService.role;
    
      this.route.queryParams.subscribe(params => {
      this.studentId = params['studentId'];
    });
    if((this.studentId === undefined || this.studentId === null) &&this.accountService.id ) {
      this.studentId = this.accountService.id;
    }
    this.accountService.getStudentProfile(this.studentId).subscribe(
      (data)=>{
          this.studentProfile = data.data;
          //console.log(this.ownerProfile);
          
          // this.firstName = this.ownerProfile.fullName.split(' ')[0];
          // this.lastName = this.ownerProfile.fullName.split(' ')[1];
      });
}
}
