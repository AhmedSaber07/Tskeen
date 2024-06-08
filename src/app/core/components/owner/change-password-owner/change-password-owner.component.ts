import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Changepassword } from '../../../../shared/models/changepassword';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-change-password-owner',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './change-password-owner.component.html',
  styleUrl: './change-password-owner.component.css'
})
export class ChangePasswordOwnerComponent implements OnInit {
  ownerForm!: FormGroup;
  changePassword!:Changepassword;
  passwordPattern = /^\d{6,}$/;
  constructor(private router:Router,private accountService:AccountService,private fb: FormBuilder){

  }
  ngOnInit(): void {
    this.ownerForm = this.fb.group({
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

get currentPassword() { return this.ownerForm.get('currentPassword');}
get newPassword() { return this.ownerForm.get('newPassword');}
get confirmNewPassword() { return this.ownerForm.get('confirmNewPassword');}


  onSubmit(){
    if(this.ownerForm.valid){
      if(this.accountService.id){
      this.changePassword ={
        id:this.accountService.id,
        currentPassword:this.ownerForm.value.currentPassword,
        newPassword:this.ownerForm.value.newPassword
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
  
            this.router.navigate(['/home-owner']);
  
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
      this.ownerForm.markAllAsTouched();
      return;
    }
  }
}
