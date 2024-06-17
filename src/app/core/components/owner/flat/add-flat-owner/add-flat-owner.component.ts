import { Component } from '@angular/core';
import { AddEditFlat } from '../../../../models/add-edit-flat';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccountService } from '../../../../services/account.service';
import { FlatService } from '../../../../services/flat.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { BuildingService } from '../../../../services/building.service';
@Component({
  selector: 'app-add-flat-owner',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './add-flat-owner.component.html',
  styleUrl: './add-flat-owner.component.css'
})
export class AddFlatOwnerComponent {
  addFlatForm!: FormGroup;
  imgFiles:File[]=[];
  flagErrorInFile: boolean=false;
  errorMessageInFile!: string;
  buildingId!:number;
  constructor(private route: ActivatedRoute,private router:Router,private buildingService:BuildingService,private flatService:FlatService,private fb: FormBuilder,private accountService:AccountService){}
  ngOnInit(): void {
    // this.route.queryParamMap.subscribe(params => {
    //   this.buildingId = Number(params.get('buildId'));
    //   console.log(this.buildingId);
      
    // });

    this.addFlatForm = this.fb.group({
      flatDescription: ['', [Validators.required, Validators.minLength(10)]],
      NumberOfFloor: ['', [Validators.required]],
      NumberOfRooms: ['', [Validators.required]],
      NumberOfBathroom: ['', [Validators.required]],
      ThereIsWasher: ['', [Validators.required]],
      ThereIsHeater: ['', [Validators.required]],
      TV: ['', [Validators.required]],
      Internet: ['', [Validators.required]],
      WasherType: ['', [Validators.required]],
      HeaterType: ['', [Validators.required]],
      FlatImagesFile: this.fb.array([this.FlatImagesArray()])
    });

    this.onWasherChange();
    this.onHeaterChange();
  }

  get flatDescription() { return this.addFlatForm.get('flatDescription');}
  get NumberOfFloor() { return this.addFlatForm.get('NumberOfFloor');}
  get NumberOfRooms() { return this.addFlatForm.get('NumberOfRooms');}
  get NumberOfBathroom() { return this.addFlatForm.get('NumberOfBathroom');}
  get ThereIsWasher() { return this.addFlatForm.get('ThereIsWasher');}
  get ThereIsHeater() { return this.addFlatForm.get('ThereIsHeater');}
  get TV() { return this.addFlatForm.get('TV');}
  get Internet() { return this.addFlatForm.get('Internet');}
  get WasherType() { return this.addFlatForm.get('WasherType');}
  get HeaterType() { return this.addFlatForm.get('HeaterType');}
  get FlatImagesFile() { return this.addFlatForm.get('FlatImagesFile') as FormArray };


  onWasherChange(): void {
    if (this.ThereIsWasher?.value === 'false') {
      this.WasherType?.setValue('none');
      console.log('Washer');
      
    }
    else{
      this.WasherType?.setValue('');
      console.log('No Washer');
    }
  }

  onHeaterChange(): void {
    if (this.ThereIsHeater?.value === 'false') {
      this.HeaterType?.setValue('none');
      console.log('Heater');
    }
    else{
      this.HeaterType?.setValue('');
      console.log('No Heater');
    }
  }

  FlatImagesArray(): FormGroup {
    return this.fb.group({
      FlatImageFile: ['',Validators.required],
    })
  }

  addFlatImageFile() {
    this.FlatImagesFile.push(this.FlatImagesArray());
  }

  removeFlatImagesFile(index: number) {
    if (this.FlatImagesFile.length > 1) {
      this.FlatImagesFile.removeAt(index);
    }
  }

  uploadFile(event: any, index: number): void {
    const file = event.currentTarget.files[0];
    const validTypes = ['image/png', 'image/gif', 'image/jpeg'];
    if (file && validTypes.includes(file.type) && file.size < 10000000) {
      this.flagErrorInFile = false;
      this.errorMessageInFile = '';
      this.imgFiles[index] = file;
      this.FlatImagesFile.at(index).get('FlatImageFile')?.setValue(file.name);
      console.log(this.FlatImagesFile.at(index).get('FlatImageFile'));
      
      console.log(this.imgFiles);
    } else {
      this.flagErrorInFile = true;
      if (!validTypes.includes(file.type)) {
        this.errorMessageInFile = ".jpg او .png او .gif الرجاء تحميل نوع صورة يحمل اي من هذا الامتداد";
      } else if (file.size >= 10000000) {
        this.errorMessageInFile = "يرجى تحميل صورة أقل من 10 ميغابايت";
      }
      console.log(this.errorMessageInFile);
    }
  }

  onSubmit(){
    if(this.addFlatForm.valid&&!this.flagErrorInFile){
      console.log(this.buildingId?.toString());

          const formData = new FormData();
          formData.append('Discreption',this.addFlatForm.value.flatDescription);
          formData.append('NumberOfFloor',this.addFlatForm.value.NumberOfFloor);
          formData.append('NumberOfRooms',this.addFlatForm.value.NumberOfRooms);
          formData.append('NumberOfBathroom',this.addFlatForm.value.NumberOfBathroom);
          formData.append('ThereIsWasher',this.addFlatForm.value.ThereIsWasher);
          formData.append('ThereIsHeater',this.addFlatForm.value.ThereIsHeater);
          formData.append('TV',this.addFlatForm.value.TV);
          formData.append('Internet',this.addFlatForm.value.Internet);
          formData.append('WasherType',this.addFlatForm.value.WasherType);
          formData.append('HeaterType',this.addFlatForm.value.HeaterType);
          formData.append('BuildingId',this.buildingService.buildId?.toString());
         
          this.imgFiles.forEach((file, index) => {
            formData.append(`FlatImagesFile`, file);
          });
          
      this.flatService.add(formData).subscribe(
        (data)=> {
            console.log(data);
            Swal.fire({
              title: "صحيح",
              text: `${data.message}`,
              icon: "success"
            });
            this.addFlatForm.reset();
            this.router.navigate(['/home-owner/homeFlat-owner']);
        }
      )
    // }
    }
    else{
      this.addFlatForm.markAllAsTouched();
    }
  }

}
