import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RoomService } from '../../../../services/room.service';
import { AccountService } from '../../../../services/account.service';
import { FlatService } from '../../../../services/flat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-room-owner',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './add-room-owner.component.html',
  styleUrl: './add-room-owner.component.css'
})
export class AddRoomOwnerComponent implements OnInit  {
  addRoomForm!: FormGroup;
  imgFiles:File[]=[];
  flagErrorInFile: boolean=false;
  errorMessageInFile!: string;
  constructor(private route: ActivatedRoute,private router:Router,private roomService:RoomService,private flatService:FlatService,private fb: FormBuilder,private accountService:AccountService){}
  ngOnInit(): void {
    this.addRoomForm = this.fb.group({
      Description: ['', [Validators.required, Validators.minLength(10)]],
      AirCondition: ['', [Validators.required]],
      NumberOfBeds: ['', [Validators.required]],
      NumberOfDisks: ['', [Validators.required]],
      NumberOfChairs: ['', [Validators.required]],
      NumberOfCupboards: ['', [Validators.required]],
      WindowType: ['', [Validators.required]],
      ServicesPrice: ['', [Validators.required]],
      InsurancePrice: ['', [Validators.required]],
      MonthPrice: ['', [Validators.required]],
      DayPrice:['',Validators.required],
      RoomImagesFiles: this.fb.array([this.RoomImagesArray()])
    });
  }

  get Description() { return this.addRoomForm.get('Description');}
  get AirCondition() { return this.addRoomForm.get('AirCondition');}
  get NumberOfBeds() { return this.addRoomForm.get('NumberOfBeds');}
  get NumberOfDisks() { return this.addRoomForm.get('NumberOfDisks');}
  get NumberOfChairs() { return this.addRoomForm.get('NumberOfChairs');}
  get NumberOfCupboards() { return this.addRoomForm.get('NumberOfCupboards');}
  get WindowType() { return this.addRoomForm.get('WindowType');}
  get ServicesPrice() { return this.addRoomForm.get('ServicesPrice');}
  get InsurancePrice() { return this.addRoomForm.get('InsurancePrice');}
  get MonthPrice() { return this.addRoomForm.get('MonthPrice');}
  get DayPrice() { return this.addRoomForm.get('DayPrice');}
  get RoomImagesFiles() { return this.addRoomForm.get('RoomImagesFiles') as FormArray };


  RoomImagesArray(): FormGroup {
    return this.fb.group({
      RoomImageFile: ['',Validators.required],
    })
  }

  addRoomImageFile() {
    this.RoomImagesFiles.push(this.RoomImagesArray());
  }

  removeRoomImageFile(index: number) {
    if (this.RoomImagesFiles.length > 1) {
      this.RoomImagesFiles.removeAt(index);
    }
  }

  uploadFile(event: any, index: number): void {
    const file = event.currentTarget.files[0];
    const validTypes = ['image/png', 'image/gif', 'image/jpeg'];
    if (file && validTypes.includes(file.type) && file.size < 10000000) {
      this.flagErrorInFile = false;
      this.errorMessageInFile = '';
      this.imgFiles[index] = file;
      this.RoomImagesFiles.at(index).get('RoomImageFile')?.setValue(file.name);
      console.log(this.RoomImagesFiles.at(index).get('RoomImageFile'));
      
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
    if(this.addRoomForm.valid&&!this.flagErrorInFile){

          const formData = new FormData();
          formData.append('Description',this.addRoomForm.value.Description);
          formData.append('AirCondition',this.addRoomForm.value.AirCondition);
          formData.append('NumberOfBeds',this.addRoomForm.value.NumberOfBeds);
          formData.append('NumberOfDisks',this.addRoomForm.value.NumberOfDisks);
          formData.append('NumberOfChairs',this.addRoomForm.value.NumberOfChairs);
          formData.append('NumberOfCupboards',this.addRoomForm.value.NumberOfCupboards);
          formData.append('WindowType',this.addRoomForm.value.WindowType);
          formData.append('ServicesPrice',this.addRoomForm.value.ServicesPrice);
          formData.append('InsurancePrice',this.addRoomForm.value.InsurancePrice);
          formData.append('MonthPrice',this.addRoomForm.value.MonthPrice);
          formData.append('DayPrice',this.addRoomForm.value.DayPrice);
          formData.append('FlatId',this.flatService.flatId?.toString());

          console.log('Description',this.addRoomForm.value.Description);
          console.log('AirCondition',this.addRoomForm.value.AirCondition);
          console.log('NumberOfBeds',this.addRoomForm.value.NumberOfBeds);
          console.log('NumberOfDisks',this.addRoomForm.value.NumberOfDisks);
          console.log('NumberOfChairs',this.addRoomForm.value.NumberOfChairs);
          console.log('NumberOfCupboards',this.addRoomForm.value.NumberOfCupboards);
          console.log('WindowType',this.addRoomForm.value.WindowType);
          console.log('ServicesPrice',this.addRoomForm.value.ServicesPrice);
          console.log('InsurancePrice',this.addRoomForm.value.InsurancePrice);
          console.log('MonthPrice',this.addRoomForm.value.MonthPrice);
          console.log('DayPrice',this.addRoomForm.value.DayPrice);
          console.log('FlatId',this.flatService.flatId?.toString());
          
         
          this.imgFiles.forEach((file, index) => {
            formData.append(`RoomImagesFiles`, file);
            console.log(file);
            
          });
          
      this.roomService.add(formData).subscribe(
        (data)=> {
            console.log(data);
            Swal.fire({
              title: "صحيح",
              text: `${data.message}`,
              icon: "success"
            });
            this.addRoomForm.reset();
            this.router.navigate(['/home-owner/homeRoom-owner']);
        },
        (err)=>{
          console.log(err);
          Swal.fire({
            text: `${err.error.message}`,
            icon: "warning"
          });
          this.addRoomForm.reset();
          this.router.navigate(['/home-owner/homeRoom-owner']);
        }
      )
    // }
    }
    else{
      this.addRoomForm.markAllAsTouched();
    }
  }

}
