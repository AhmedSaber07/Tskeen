import { Component, OnInit } from '@angular/core';
import { AddEditBuilding } from '../../../../models/add-edit-building';
import { BuildingService } from '../../../../services/building.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../../services/account.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-building-owner',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './add-building-owner.component.html',
  styleUrl: './add-building-owner.component.css'
})
export class AddBuildingOwnerComponent implements OnInit {
  
addBuilding!:AddEditBuilding;
addBuildingForm!: FormGroup;
imgFile!:File;
flagErrorInFile: boolean=false;
errorMessageInFile!: string;

constructor(private router:Router,private buildingService:BuildingService,private fb: FormBuilder,private accountService:AccountService){}
  ngOnInit(): void {
    this.addBuildingForm = this.fb.group({
      buildingName: ['', [Validators.required,Validators.minLength(6)]],
      buildingAddress: ['', [Validators.required,Validators.minLength(10)]],
      buildingDescription: ['', [Validators.required,Validators.minLength(15)]],
      UserGender: ['', [Validators.required]],
      Gas: ['', [Validators.required]],
      imageFile:['',[Validators.required]]
    })
  }


  get buildingName() { return this.addBuildingForm.get('buildingName');}
  get buildingAddress() { return this.addBuildingForm.get('buildingAddress');}
  get buildingDescription() { return this.addBuildingForm.get('buildingDescription');}
  get UserGender() { return this.addBuildingForm.get('UserGender');}
  get Gas() { return this.addBuildingForm.get('Gas');}
  get imageFile() { return this.addBuildingForm.get('imageFile');}
  

  uploadFile(event:any){
    const file = event.currentTarget.files[0];
    const validTypes = ['image/png', 'image/gif', 'image/jpeg'];
    // File is a PDF and size is less than 1M
    if(validTypes.includes(file.type) && file.size < 1000000)
      {
        this.flagErrorInFile=false;
       this.imgFile = file;
      // console.log(this.imgFile);
       
      }
      else{
        if(!validTypes.includes(file.type))
          {
            this.flagErrorInFile=true;
            this.errorMessageInFile=".jpg او .png او .gif الرجاء تحميل نوع صورة يحمل اي من هذا الامتداد";
           // console.log(this.errorMessageInFile);
            
          }
        else if(file.size < 1000000){
          this.flagErrorInFile=true;
          this.errorMessageInFile="يرجى تحميل صورةأقل من 1 ميغابايت";
         // console.log(this.errorMessageInFile);
        }
      }

  }


  onSubmit(){
    if(this.addBuildingForm.valid&&!this.flagErrorInFile){
      if(this.accountService.id)
        {
          const formData = new FormData();
          formData.append('Name',this.addBuildingForm.value.buildingName);
          formData.append('Address',this.addBuildingForm.value.buildingAddress);
          formData.append('Description',this.addBuildingForm.value.buildingDescription);
          formData.append('UserGender',this.addBuildingForm.value.UserGender);
          formData.append('Gas',this.addBuildingForm.value.Gas);
          formData.append('OwnerId',this.accountService.id);
          formData.append('ImageFile',this.imgFile);
         // console.log(formData);
          
      this.buildingService.add(formData).subscribe(
        (data)=> {
          if(data){
         //   console.log(data);
            Swal.fire({
              title: "صحيح",
              text: `${data.message}`,
              icon: "success"
            });
            this.addBuildingForm.reset();
            this.router.navigate(['/home-owner/homeBuilding-owner']);
          }
        }
      )
    }
    }
    else{
      this.addBuildingForm.markAllAsTouched();
    }
  }

}
