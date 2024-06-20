import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OwnerRequest } from '../../../../models/owner-request';
import { AccountService } from '../../../../services/account.service';
import { BookingService } from '../../../../services/booking.service';

@Component({
  selector: 'app-confirmed-booking-owner',
  standalone: true,
  imports: [],
  templateUrl: './confirmed-booking-owner.component.html',
  styleUrl: './confirmed-booking-owner.component.css'
})
export class ConfirmedBookingOwnerComponent {
  ownerRequests!:OwnerRequest[];
  constructor(private router:Router,private bookingService:BookingService,private accountService:AccountService){}
  
  ngOnInit(): void {
    if(this.accountService.id)
      {
    this.bookingService.GetAllConfirmedBookings(this.accountService.id).subscribe(
      (data)=>{
console.log(data);
        this.ownerRequests = data.data;
      },
      (err)=>{
        console.log(err);
      }
    )
    }
  }
  navigateToStudentProfile(studentId:string)
  { 
    this.router.navigate(['/personal-student'], { queryParams: { studentId } });
  }

  navigateToRoom(roomId:number)
  {
    this.router.navigate(['/roomDetails-student'], { queryParams: { roomId } });
  }

  // confirmBooking(bookingId:number)
  // {
  //   // if(this.accountService.id)
  //   //   {
  //   // this.bookingService.ConfirmRequest(bookingId,this.accountService.id).subscribe(
  //   //   (data)=>{
  //   //     console.log(data);
  //   //   },
  //   //   (err)=>{
  //   //     console.log(err);
  //   //   }
  //   // )

  //   Swal.fire({
  //     title: "هل أنت متأكد؟",
  //     text: "لن تتمكن من التراجع عن هذا !",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "green",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "نعم أضفه"
  //   }).then((result) => {
  //     if (result.isConfirmed && this.accountService.id) {
  //       this.bookingService.ConfirmRequest(bookingId,this.accountService.id).subscribe(
  //         (data)=>{
  //           Swal.fire({
  //             title: `${data.message}`,
  //             icon: "success"
  //           });
  //           this.ngOnInit();
  //         },
  //         (err)=>{
  //           console.log(err);
  //         }
  //       )
  //     }
  //   });

  // }

    CancelBooking(bookingId:number)
  {

    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم، احذفه!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookingService.EndBooking(bookingId).subscribe(
          (data)=>{
            Swal.fire({
              title: "تم الحذف",
              text: `${data.message}`,
              icon: "success"
            });
            this.ngOnInit();
          },
          (err)=>{
            console.log(err);
          }
        )
      }
    });
  }
}
