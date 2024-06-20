import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AccountService } from '../../../services/account.service';
import { CommonModule } from '@angular/common';
import { EditprofileStudent } from '../../../models/editprofile-student';
import { ProfileStudent } from '../../../models/profile-student';

@Component({
  selector: 'app-edit-profile-student',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './edit-profile-student.component.html',
  styleUrl: './edit-profile-student.component.css'
})
export class EditProfileStudentComponent implements OnInit{
  studentForm!: FormGroup;
  studentProfile!:ProfileStudent;
  _firstName!:string;
  _city!:string;
  _governorate!:string;
  _lastName!:string;
  _bithDate!:string;
  editStudentProfile!:EditprofileStudent;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  phonePattern = /^01[0125][0-9]{8}$/;
  constructor(private router:Router,private accountService:AccountService,private fb: FormBuilder){}
  ngOnInit(): void {
    if(this.accountService.id)
      {
    this.accountService.getStudentProfile(this.accountService.id).subscribe(
      (data)=>{
          this.studentProfile = data.data;
          this._bithDate = this.formatDate(this.studentProfile.birthDate);
          this._firstName = this.studentProfile.fullName.split(' ')[0];
          this._lastName = this.studentProfile.fullName.split(' ')[1];
          this._city = this.studentProfile.address.split('/')[0];
          this._governorate = this.studentProfile.address.split('/')[1];          
          this.initForm();
        });
    }
}

initForm(): void {  
  this.studentForm = this.fb.group({
    firstName: [this._firstName, [Validators.required, Validators.minLength(3)]],
    lastName: [this._lastName, [Validators.required, Validators.minLength(3)]],
    email: [this.studentProfile.email, [Validators.required, Validators.email,Validators.pattern(this.emailPattern)]],
    phone: [this.studentProfile.phoneNumber, [Validators.required, Validators.pattern(this.phonePattern)]],
    gender: [this.studentProfile.gender, [Validators.required]],
    faculty: [this.studentProfile.faculty, [Validators.required]],
    grade: [this.studentProfile.grade, [Validators.required]],
    governorate: [this._governorate, [Validators.required]],
    city: [this._city, [Validators.required]],
    birthDate: [this._bithDate, [Validators.required]]
})
}


get firstName() { return this.studentForm.get('firstName'); };
get lastName() { return this.studentForm.get('lastName');}
get email() { return this.studentForm.get('email');}
get phone() { return this.studentForm.get('phone');}
get gender() { return this.studentForm.get('gender');}
get faculty() { return this.studentForm.get('faculty');}
get grade() { return this.studentForm.get('grade');}
get governorate() { return this.studentForm.get('governorate');}
get city() { return this.studentForm.get('city');}
get birthDate() { return this.studentForm.get('birthDate');}

formatDate(dateString: string): string {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
  const day = ('0' + dateObject.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}


onSubmit(){
  if(this.studentForm.valid){
    this.editStudentProfile ={
      firstName:this.studentForm.value.firstName,
      lastName:this.studentForm.value.lastName,
      phoneNumber:this.studentForm.value.phone,
      gender:this.studentForm.value.gender,
      faculty:this.studentForm.value.faculty,
      grade:this.studentForm.value.grade,
      governorate:this.studentForm.value.governorate,
      city:this.studentForm.value.city,
      birthDate:this.studentForm.value.birthDate
    }
  //  console.log(this.editStudentProfile);
  //  console.log(this.accountService.id);
   
    if(this.accountService.id)
      {
    this.accountService.editStudentProfile(this.accountService.id,this.editStudentProfile).subscribe(
      (data)=> {
        if(data){
          
        //  console.log(data);
          
          Swal.fire({
            title: "صحيح",
            text: `${data.message}`,
            icon: "success"
          });

          this.router.navigate(['/home-student']);

        }
    },
    (err)=>{
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "حدث خطأ",
      });
    });
  }
  }
  else{
    this.studentForm.markAllAsTouched();
    return;
  }
}

}
