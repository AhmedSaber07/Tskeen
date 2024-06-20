import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterOwner } from '../../../models/register-owner';
import { AccountService } from '../../../services/account.service';
import Swal from 'sweetalert2';
import { RegisterStudent } from '../../../models/register-student';
import { CommonModule } from '@angular/common';
import { AuthData } from '../../../../shared/models/auth-data';

@Component({
  selector: 'app-register-student',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './register-student.component.html',
  styleUrl: './register-student.component.css'
})
export class RegisterStudentComponent implements OnInit{
  studentRegister!:RegisterStudent;
  studentForm!: FormGroup;
  response!:AuthData;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  phonePattern = /^01[0125][0-9]{8}$/;
  passwordPattern = /^\d{6,}$/;
  constructor(private router:Router,private fb: FormBuilder, private accountService: AccountService) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email,Validators.pattern(this.emailPattern)]],
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      password: ['', [Validators.required, Validators.minLength(6),Validators.pattern(this.passwordPattern)]],
      confirmPassword: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      faculty: ['', [Validators.required]],
      grade: ['', [Validators.required]],
      governorate: ['', [Validators.required]],
      city: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ mismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
    return true;
  }

  get firstName() { return this.studentForm.get('firstName'); };
  get lastName() { return this.studentForm.get('lastName');}
  get email() { return this.studentForm.get('email');}
  get phone() { return this.studentForm.get('phone');}
  get password() { return this.studentForm.get('password');}
  get confirmPassword() { return this.studentForm.get('confirmPassword');}
  get gender() { return this.studentForm.get('gender');}
  get faculty() { return this.studentForm.get('faculty');}
  get grade() { return this.studentForm.get('grade');}
  get governorate() { return this.studentForm.get('governorate');}
  get city() { return this.studentForm.get('city');}
  get birthDate() { return this.studentForm.get('birthDate');}

  onSubmit(){

    if(this.studentForm.valid){
      this.studentRegister ={
        firstName:this.studentForm.value.firstName,
        lastName:this.studentForm.value.lastName,
        email:this.studentForm.value.email,
        password:this.studentForm.value.password,
        confirmPassword:this.studentForm.value.confirmPassword,
        phoneNumber:this.studentForm.value.phone,
        gender:Number(this.studentForm.value.gender),
        faculty:this.studentForm.value.faculty,
        grade:this.studentForm.value.grade,
        governorate:this.studentForm.value.governorate,
        city:this.studentForm.value.city,
        birthDate:this.studentForm.value.birthDate
      }
      
      this.accountService.StudentRegister(this.studentRegister).subscribe(
        (data)=> {
          console.log(data);
          this.response = data.data;
          this.accountService.id=this.response.id;
          this.accountService.token = this.response.token;
          this.accountService.role = this.response.role;
          this.accountService.FirstRegisterStudent = 'true';
            Swal.fire({
              title: "صحيح",
              text: `${data.message}`,
              icon: "success"
            });
            this.router.navigate(['/confirm-register-student']);
      },
      (err)=>{
        console.log(err);
        
        Swal.fire({
          icon: "error",
          title: "خطأ",
          text:`${err.error.message}`,
        });
      });
    }
    else{
      this.studentForm.markAllAsTouched();
      return;
    }
  }

}
