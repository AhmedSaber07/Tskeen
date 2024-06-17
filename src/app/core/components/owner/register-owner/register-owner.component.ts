import { Component, OnInit } from '@angular/core';
import { RegisterOwner } from '../../../models/register-owner';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-owner',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './register-owner.component.html',
  styleUrl: './register-owner.component.css'
})
export class RegisterOwnerComponent implements OnInit {
  ownerRegister!:RegisterOwner;
  ownerForm!: FormGroup;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  phonePattern = /^01[0125][0-9]{8}$/;
  passwordPattern = /^\d{6,}$/;
  constructor(private router:Router,private fb: FormBuilder, private accountService: AccountService) {}

  ngOnInit(): void {
    this.ownerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email,Validators.pattern(this.emailPattern)]],
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      password: ['', [Validators.required, Validators.minLength(6),Validators.pattern(this.passwordPattern)]],
      confirmPassword: ['', [Validators.required]],
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

  get firstName() { return this.ownerForm.get('firstName'); };
  get lastName() { return this.ownerForm.get('lastName');}
  get email() { return this.ownerForm.get('email');}
  get phone() { return this.ownerForm.get('phone');}
  get password() { return this.ownerForm.get('password');}
  get confirmPassword() { return this.ownerForm.get('confirmPassword');}

  onSubmit(){

    if(this.ownerForm.valid){
      this.ownerRegister ={
        firstName:this.ownerForm.value.firstName,
        lastName:this.ownerForm.value.lastName,
        email:this.ownerForm.value.email,
        password:this.ownerForm.value.password,
        confirmPassword:this.ownerForm.value.confirmPassword,
        phoneNumber:this.ownerForm.value.phone
      }
    //  console.log(this.ownerRegister);
      
      this.accountService.OwnerRegister(this.ownerRegister).subscribe(
        (data)=> {
          if(data){
            
        //    console.log(data);
            
            Swal.fire({
              title: "صحيح",
              text: `${data.message}`,
              icon: "success"
            });

            this.router.navigate(['/home-owner']);

          }
      },
      (err)=>{
      //  console.log(err);
        Swal.fire({
          icon: "error",
          title: "خطأ",
          text: "الايميل موجود من قبل",
        });
      });
    }
    else{
      this.ownerForm.markAllAsTouched();
      return;
    }
  }

}
