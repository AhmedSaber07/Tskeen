import { Component } from '@angular/core';
import { ProfileOwner } from '../../../models/profile-owner';
import { AccountService } from '../../../services/account.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditprofileOwner } from '../../../models/editprofile-owner';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-edit-profile-owner',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './edit-profile-owner.component.html',
  styleUrl: './edit-profile-owner.component.css'
})
export class EditProfileOwnerComponent  {
  ownerForm!: FormGroup;
  ownerProfile!:ProfileOwner;
  _firstName!:string;
  _lastName!:string;
  editOwnerProfile!:EditprofileOwner;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  phonePattern = /^01[0125][0-9]{8}$/;
  constructor(private router:Router,private accountService:AccountService,private fb: FormBuilder){}
  ngOnInit(): void {
    if(this.accountService.id)
      {
    this.accountService.getOwnerProfile(this.accountService.id).subscribe(
      (data)=>{
          this.ownerProfile = data.data;
         // console.log(this.ownerProfile);
          
          this._firstName = this.ownerProfile.fullName.split(' ')[0];
          this._lastName = this.ownerProfile.fullName.split(' ')[1];
          this.initForm();
        });
    }
}

initForm(): void {  
  this.ownerForm = this.fb.group({
    firstName: [this._firstName, [Validators.required, Validators.minLength(3)]],
    lastName: [this._lastName, [Validators.required, Validators.minLength(3)]],
    email: [this.ownerProfile.email, [Validators.required, Validators.email,Validators.pattern(this.emailPattern)]],
    phone: [this.ownerProfile.phoneNumber, [Validators.required, Validators.pattern(this.phonePattern)]],

})
}


get firstName() { return this.ownerForm.get('firstName'); };
get lastName() { return this.ownerForm.get('lastName');}
get email() { return this.ownerForm.get('email');}
get phone() { return this.ownerForm.get('phone');}

onSubmit(){
  if(this.ownerForm.valid){
    this.editOwnerProfile ={
      firstName:this.ownerForm.value.firstName,
      lastName:this.ownerForm.value.lastName,
      phoneNumber:this.ownerForm.value.phone
    }
   // console.log(this.editOwnerProfile);
    if(this.accountService.id)
      {
    this.accountService.editOwnerProfile(this.accountService.id,this.editOwnerProfile).subscribe(
      (data)=> {
        if(data){
          
        //  console.log(data);
          
          Swal.fire({
            title: "صحيح",
            text: `${data.message}`,
            icon: "success"
          });

          this.router.navigate(['/home-owner']);

        }
    },
    (err)=>{
      //console.log(err);
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "حدث خطأ",
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
