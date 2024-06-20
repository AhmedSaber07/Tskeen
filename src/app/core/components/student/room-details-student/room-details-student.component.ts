import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { RoomService } from '../../../services/room.service';
import { GetAllBuilding } from '../../../models/get-all-building';
import { GetFlat } from '../../../models/get-flat';
import { GetRoom } from '../../../models/get-room';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { BookingService } from '../../../services/booking.service';
import { RequestBooking } from '../../../models/request-booking';

@Component({
  selector: 'app-room-details-student',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './room-details-student.component.html',
  styleUrl: './room-details-student.component.css'
})
export class RoomDetailsStudentComponent implements OnInit {
  build!:GetAllBuilding;
  flat!:GetFlat;
  room!:GetRoom;
  requestBooking!:RequestBooking;
  roomId!:number;
  role!:string;
  bookedRoomIds: number[] = [];
  constructor(private route: ActivatedRoute,private bookingService:BookingService,private router:Router,private roomService:RoomService,private accountService:AccountService){}

  ngOnInit(): void {
    if(this.accountService.role)
      {
    this.role = this.accountService.role;
      }
    this.route.queryParams.subscribe(params => {
      this.roomId = params['roomId'];
    });
    if(this.roomId === undefined || null)
      {
        this.roomId =this.roomService.roomId;
      }
    this.roomService.GetRoomDetails(this.roomId).subscribe(
      (data)=>{
        // console.log(data.data);
        data = data.data;
        this.build = data.flat.building;
        this.flat = {
          id: data.flat.id,
          discreption: data.flat.discreption,
          numberOfFloor: data.flat.numberOfFloor,
          numberOfRooms: data.flat.numberOfRooms,
          numberOfBathroom: data.flat.numberOfBathroom,
          thereIsWasher: data.flat.thereIsWasher,
          washerType: data.flat.washerType,
          thereIsHeater: data.flat.thereIsHeater,
          heaterType: data.flat.heaterType,
          tv: data.flat.tv,
          internet: data.flat.internet,
          images: data.flat.images
        };
        this.room = {
          id: data.id,
          description: data.description,
          airCondition: data.airCondition,
          numberOfBeds: data.numberOfBeds,
          numberOfDisks: data.numberOfDisks,
          numberOfChairs: data.numberOfChairs,
          numberOfCupboards: data.numberOfCupboards,
          windowType: data.windowType,
          servicesPrice: data.servicesPrice,
          insurancePrice: data.insurancePrice,
          monthPrice: data.monthPrice,
          dayPrice: data.dayPrice,
          currentState: data.currentState,
          images: data.images,
          address: this.build.address 
        };
        
        // console.log(this.room);
        //  console.log(this.build)
        // console.log(this.flat);
        
      }
    )
    if(this.accountService.id)
      {
    this.bookingService.GetAllBookingForStudent(this.accountService.id).subscribe(
      (data)=>{
        // console.log(data);
        if(data.data)
          {
        this.bookedRoomIds = data.data.map((booking: any) => booking.roomId);
        console.log(this.bookedRoomIds);   
          }     
        
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  }

  isRoomBooked(roomId: number): boolean {
    return this.bookedRoomIds.includes(roomId);
  }

  CancelBooking(id:number)
  {
    this.bookingService.StudentCancelRequest(id).subscribe(
      (data)=>{
        // console.log(data);
        Swal.fire({
          title: `${data.message}`,
          icon:'success',
          confirmButtonText: 'اوك'
      });
      },
      (error)=>{
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: "<a href>Why do I have this issue?</a>"
        });
      }
    )
  }


  Booking(roomId:number){
    Swal.fire({
      title: 'ارسل رسالة لصاحب السكن',
      input: 'text',
      // inputPlaceholder: 'اكتب هنا......',
      showCancelButton: true,
      confirmButtonText: 'تأكيد',
      cancelButtonText: 'الغاء',
  }).then((result) => {
    // console.log(result.value);
    
      if (result.isConfirmed) {
        if(this.accountService.id && this.build.ownerId)
          {
        this.requestBooking = {
          studentId: this.accountService.id,
          ownerId: this.build.ownerId,
          roomId: roomId,
          message: result.value
        }
      }
        this.bookingService.BookingRequest(this.requestBooking).subscribe(
          (data)=>{
            if(data){
              // console.log(data);
              Swal.fire({
                // title: 'You entered:',
                title: `${data.message}`,
                icon: 'success',
                confirmButtonText: 'اوك'
            });
          this.router.navigate(['/home-student/recommendedRooms-student']);  
          }
          },
          (err)=>{
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "خطأ",
              text: "حدث خطأ اثناء ارسال الطلب",
            });
          }
        )
      }
  });
  }

}
