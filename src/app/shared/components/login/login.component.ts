import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../models/login';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AccountService } from '../../../core/services/account.service';
import { AuthData } from '../../models/auth-data';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  userLogin!:Login;
  userType!: string;
  response!:AuthData;
  constructor(private router:Router,private formBuilder: FormBuilder,private route:ActivatedRoute,private accountService:AccountService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.accountService.logout();
    this.route.queryParams.subscribe(params => {
      this.userType = params['type'];
      if(this.userType ===undefined )
        {
          this.userType = localStorage.getItem('userType') ?? '';
        }
      //console.log(this.userType); // Will log 'owner' or 'student'
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  NavigateToRegister(){
    if(this.userType === 'owner')
      {
        this.router.navigate(['/register-owner']);
      }
    else{
      this.router.navigate(['/register-student']);
    }
  } 

  onSubmit(){
    if(this.loginForm.valid){
      this.userLogin ={
        email:this.loginForm.value.email,
        password:this.loginForm.value.password
      }
      this.accountService.login(this.userLogin).subscribe(
        (data)=> {
          if(data){
            this.response = data.data;
            this.accountService.id=this.response.id;
            this.accountService.token = this.response.token;
            this.accountService.role = this.response.role;
            if(this.userType==='owner')
            this.router.navigate(['/home-owner']);
          else
          this.router.navigate(['/home-student']);
          }
          else {
            Swal.fire({
              icon: "error",
              title: "خطأ",
              text: "ايميل او كلمة المرور",
            });
          }
      },
      (err)=>{
      //  console.log(err);
        Swal.fire({
          icon: "error",
          title: "خطأ",
          text: "ايميل او كلمة المرور",
        });
      }
    );
    }
    this.loginForm.markAllAsTouched();
    return;
  }
}
