import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccountService } from '../../../../services/account.service';
import { FlatService } from '../../../../services/flat.service';
import { RoomService } from '../../../../services/room.service';
import Swal from 'sweetalert2';
import { GetRoom } from '../../../../models/get-room';

@Component({
  selector: 'app-edit-room-owner',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './edit-room-owner.component.html',
  styleUrl: './edit-room-owner.component.css'
})
export class EditRoomOwnerComponent implements OnInit{
  editRoomForm!: FormGroup;
  imgFiles:File[]=[];
  flagErrorInFile: boolean=false;
  errorMessageInFile!: string;
  roomId!:number;
  getRoom!:GetRoom;
  constructor(private route: ActivatedRoute,private router:Router,private roomService:RoomService,private flatService:FlatService,private fb: FormBuilder,private accountService:AccountService){}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.roomId = Number(params.get('roomId'));
    });

    this.roomService.getById(this.roomId).subscribe((data) => {
      this.getRoom = data.data;
      console.log(this.getRoom);
      console.log(this.getRoom.description);
      this.initForm();
    });

  }
  initForm() {
    this.editRoomForm = this.fb.group({
      Description: [this.getRoom ? this.getRoom.description : '', [Validators.required, Validators.minLength(10)]],
      AirCondition: [this.getRoom ? this.getRoom.airCondition : '', [Validators.required]],
      NumberOfBeds: [this.getRoom ? this.getRoom.numberOfBeds : '', [Validators.required]],
      NumberOfDisks: [this.getRoom ? this.getRoom.numberOfDisks : '', [Validators.required]],
      NumberOfChairs: [this.getRoom ? this.getRoom.numberOfChairs : '', [Validators.required]],
      NumberOfCupboards: [this.getRoom ? this.getRoom.numberOfCupboards : '', [Validators.required]],
      WindowType: [this.getRoom ? this.getRoom.windowType : '', [Validators.required]],
      ServicesPrice: [this.getRoom ? this.getRoom.servicesPrice : '', [Validators.required]],
      InsurancePrice: [this.getRoom ? this.getRoom.insurancePrice : '', [Validators.required]],
      MonthPrice: [this.getRoom ? this.getRoom.monthPrice : '', [Validators.required]],
      DayPrice:[this.getRoom ? this.getRoom.dayPrice : '',Validators.required],
      RoomImagesFiles: this.fb.array([this.RoomImagesArray()])
    });
  }

  get Description() { return this.editRoomForm.get('Description');}
  get AirCondition() { return this.editRoomForm.get('AirCondition');}
  get NumberOfBeds() { return this.editRoomForm.get('NumberOfBeds');}
  get NumberOfDisks() { return this.editRoomForm.get('NumberOfDisks');}
  get NumberOfChairs() { return this.editRoomForm.get('NumberOfChairs');}
  get NumberOfCupboards() { return this.editRoomForm.get('NumberOfCupboards');}
  get WindowType() { return this.editRoomForm.get('WindowType');}
  get ServicesPrice() { return this.editRoomForm.get('ServicesPrice');}
  get InsurancePrice() { return this.editRoomForm.get('InsurancePrice');}
  get MonthPrice() { return this.editRoomForm.get('MonthPrice');}
  get DayPrice() { return this.editRoomForm.get('DayPrice');}
  get RoomImagesFiles() { return this.editRoomForm.get('RoomImagesFiles') as FormArray };

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
    if(this.editRoomForm.valid&&!this.flagErrorInFile){

          const formData = new FormData();
          formData.append('Description',this.editRoomForm.value.Description);
          formData.append('AirCondition',this.editRoomForm.value.AirCondition);
          formData.append('NumberOfBeds',this.editRoomForm.value.NumberOfBeds);
          formData.append('NumberOfDisks',this.editRoomForm.value.NumberOfDisks);
          formData.append('NumberOfChairs',this.editRoomForm.value.NumberOfChairs);
          formData.append('NumberOfCupboards',this.editRoomForm.value.NumberOfCupboards);
          formData.append('WindowType',this.editRoomForm.value.WindowType);
          formData.append('ServicesPrice',this.editRoomForm.value.ServicesPrice);
          formData.append('InsurancePrice',this.editRoomForm.value.InsurancePrice);
          formData.append('MonthPrice',this.editRoomForm.value.MonthPrice);
          formData.append('DayPrice',this.editRoomForm.value.DayPrice);
          formData.append('FlatId',this.flatService.flatId?.toString());

          console.log('Description',this.editRoomForm.value.Description);
          console.log('AirCondition',this.editRoomForm.value.AirCondition);
          console.log('NumberOfBeds',this.editRoomForm.value.NumberOfBeds);
          console.log('NumberOfDisks',this.editRoomForm.value.NumberOfDisks);
          console.log('NumberOfChairs',this.editRoomForm.value.NumberOfChairs);
          console.log('NumberOfCupboards',this.editRoomForm.value.NumberOfCupboards);
          console.log('WindowType',this.editRoomForm.value.WindowType);
          console.log('ServicesPrice',this.editRoomForm.value.ServicesPrice);
          console.log('InsurancePrice',this.editRoomForm.value.InsurancePrice);
          console.log('MonthPrice',this.editRoomForm.value.MonthPrice);
          console.log('DayPrice',this.editRoomForm.value.DayPrice);
          console.log('FlatId',this.flatService.flatId?.toString());
          
         
          this.imgFiles.forEach((file, index) => {
            formData.append(`RoomImagesFiles`, file);
            console.log(file);
            
          });
          
      this.roomService.update(this.roomId,formData).subscribe(
        (data)=> {
            console.log(data);
            Swal.fire({
              title: "صحيح",
              text: `${data.message}`,
              icon: "success"
            });
            this.editRoomForm.reset();
            this.router.navigate(['/home-owner/homeRoom-owner']);
        },
        (err)=>{
          console.log(err);
          Swal.fire({
            text: `${err.error.message}`,
            icon: "warning"
          });
          this.editRoomForm.reset();
          this.router.navigate(['/home-owner/homeRoom-owner']);
        }
      )
    // }
    }
    else{
      this.editRoomForm.markAllAsTouched();
    }
  }

}
