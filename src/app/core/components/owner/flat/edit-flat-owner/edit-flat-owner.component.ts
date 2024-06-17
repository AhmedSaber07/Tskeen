import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BuildingService } from '../../../../services/building.service';
import { FlatService } from '../../../../services/flat.service';
import Swal from 'sweetalert2';
import { GetFlat } from '../../../../models/get-flat';
@Component({
  selector: 'app-edit-flat-owner',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './edit-flat-owner.component.html',
  styleUrl: './edit-flat-owner.component.css'
})
export class EditFlatOwnerComponent implements OnInit {
  editFlatForm!:FormGroup;
  imgFiles:File[]=[];
  flagErrorInFile: boolean=false;
  errorMessageInFile!: string;
  flatId!:number;
  getFlat!:GetFlat;

  get flatDescription() { return this.editFlatForm.get('flatDescription');}
  get NumberOfFloor() { return this.editFlatForm.get('NumberOfFloor');}
  get NumberOfRooms() { return this.editFlatForm.get('NumberOfRooms');}
  get NumberOfBathroom() { return this.editFlatForm.get('NumberOfBathroom');}
  get ThereIsWasher() { return this.editFlatForm.get('ThereIsWasher');}
  get ThereIsHeater() { return this.editFlatForm.get('ThereIsHeater');}
  get TV() { return this.editFlatForm.get('TV');}
  get Internet() { return this.editFlatForm.get('Internet');}
  get WasherType() { return this.editFlatForm.get('WasherType');}
  get HeaterType() { return this.editFlatForm.get('HeaterType');}
  get FlatImagesFile() { return this.editFlatForm.get('FlatImagesFile') as FormArray };

  constructor(private route: ActivatedRoute,private router:Router,private buildingService:BuildingService,private flatService:FlatService,private fb: FormBuilder){}
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.flatId = Number(params.get('id'));
    });

    this.flatService.getById(this.flatId).subscribe((data) => {
      this.getFlat = data.data;
      console.log(this.getFlat);
      this.initForm();
    });
this.onWasherChange();
this.onHeaterChange();
  }
  initForm() {
    this.editFlatForm = this.fb.group({
      flatDescription: [this.getFlat ? this.getFlat.discreption : '', [Validators.required, Validators.minLength(10)]],
      NumberOfFloor: [this.getFlat ? this.getFlat.numberOfFloor : '', [Validators.required]],
      NumberOfRooms: [this.getFlat ? this.getFlat.numberOfRooms : '', [Validators.required]],
      NumberOfBathroom: [this.getFlat ? this.getFlat.numberOfBathroom : '', [Validators.required]],
      ThereIsWasher: [this.getFlat ? this.getFlat.thereIsWasher : false, [Validators.required]],
      ThereIsHeater: [this.getFlat ? this.getFlat.thereIsHeater : false, [Validators.required]],
      TV: [this.getFlat ? this.getFlat.tv : false, [Validators.required]],
      Internet: [this.getFlat ? this.getFlat.internet : false, [Validators.required]],
      WasherType: [this.getFlat ? this.getFlat.washerType.toString() : '', [Validators.required]],
      HeaterType: [this.getFlat ? this.getFlat.heaterType.toString() : '', [Validators.required]],
      FlatImagesFile: this.fb.array([this.FlatImagesArray()])
    });
  }

  onWasherChange(): void {
    if (this.ThereIsWasher?.value === false) {
      this.WasherType?.setValue('none');
      console.log('Washer');
      
    }
    else{
      this.WasherType?.setValue('');
      console.log('No Washer');
    }
  }

  onHeaterChange(): void {
    if (this.ThereIsHeater?.value === false) {
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
    if(this.editFlatForm.valid&&!this.flagErrorInFile){
      // if(this.accountService.id)
      //   {
      // console.log(this..toString());

          const formData = new FormData();
          formData.append('Discreption',this.editFlatForm.value.flatDescription);
          formData.append('NumberOfFloor',this.editFlatForm.value.NumberOfFloor);
          formData.append('NumberOfRooms',this.editFlatForm.value.NumberOfRooms);
          formData.append('NumberOfBathroom',this.editFlatForm.value.NumberOfBathroom);
          formData.append('ThereIsWasher',this.editFlatForm.value.ThereIsWasher);
          formData.append('ThereIsHeater',this.editFlatForm.value.ThereIsHeater);
          formData.append('TV',this.editFlatForm.value.TV);
          formData.append('Internet',this.editFlatForm.value.Internet);
          formData.append('WasherType',this.editFlatForm.value.WasherType);
          formData.append('HeaterType',this.editFlatForm.value.HeaterType);
          formData.append('BuildingId',this.buildingService.buildId?.toString());
          this.imgFiles.forEach((file, index) => {
            formData.append(`FlatImagesFile`, file);
          });
          
      this.flatService.update(this.flatId,formData).subscribe(
        (data)=> {
            console.log(data);
            Swal.fire({
              title: "صحيح",
              text: `${data.message}`,
              icon: "success"
            });
            this.editFlatForm.reset();
            this.router.navigate(['/home-owner/homeFlat-owner']);
        },
        (err)=>{
          console.log(err);
          
        }
      )
    // }
    }
    else{
      this.editFlatForm.markAllAsTouched();
    }
  }
}
