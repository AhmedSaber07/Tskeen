import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AccountService } from '../../../core/services/account.service';
import { Changepassword } from '../../models/changepassword';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  changePassword!:Changepassword;
  passwordPattern = /^\d{6,}$/;
  constructor(private router:Router,private accountService:AccountService,private fb: FormBuilder){

  }
  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required,Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6),Validators.pattern(this.passwordPattern)]],
      confirmNewPassword: ['', [Validators.required]] 
  },
  {
    validator: this.passwordMatchValidator
  });
}
passwordMatchValidator(group: FormGroup) {
  const passwordControl = group.get('newPassword');
  const confirmPasswordControl = group.get('confirmNewPassword');

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

get currentPassword() { return this.changePasswordForm.get('currentPassword');}
get newPassword() { return this.changePasswordForm.get('newPassword');}
get confirmNewPassword() { return this.changePasswordForm.get('confirmNewPassword');}


navigateBackToHome(){
 if(this.accountService.role == 'owner')
  {
    this.router.navigate(['/home-owner']);
  } 
  else{
    this.router.navigate(['/home-student']);
  }
}

  onSubmit(){
    if(this.changePasswordForm.valid){
      if(this.accountService.id){
      this.changePassword ={
        id:this.accountService.id,
        currentPassword:this.changePasswordForm.value.currentPassword,
        newPassword:this.changePasswordForm.value.newPassword
      }
    }
  //  console.log(this.changePassword);
      if(this.accountService.id)
        {
      this.accountService.changePassword(this.changePassword).subscribe(
        (data)=> {
          if(data){
            
      //      console.log(data);
            
            Swal.fire({
              title: "صحيح",
              text: `${data.message}`,
              icon: "success"
            });
            if(this.accountService.role==='owner')
            this.router.navigate(['/home-owner']);
          else
          this.router.navigate(['/home-student']);
  
          }
      },
      (err)=>{
   //     console.log(err);
        Swal.fire({
          icon: "error",
          title: "خطأ",
          text: "كلمة المرور الحالية غير صحيحة",
        });
      });
    }
    }
    else{
      this.changePasswordForm.markAllAsTouched();
      return;
    }
  }
}
