import { Component, OnInit } from '@angular/core';
import { StudentRequest } from '../../../../models/student-request';
import { AccountService } from '../../../../services/account.service';
import { BookingService } from '../../../../services/booking.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notify-student',
  standalone: true,
  imports: [],
  templateUrl: './notify-student.component.html',
  styleUrl: './notify-student.component.css'
})
export class NotifyStudentComponent implements OnInit{
  StudentRequests!:StudentRequest[];
  constructor(private router:Router,private accountService:AccountService,private bookingService:BookingService){}
  ngOnInit(): void {
    if(this.accountService.id)
      {
    this.bookingService.GetAllBookingForStudent(this.accountService.id).subscribe(
      (data)=>{
        this.StudentRequests=data.data;
        console.log(this.StudentRequests);
        
      }
      )
    }
}

// confirmBooking(bookingId:number){

// }

cancelBooking(bookingId:number){
  Swal.fire({
    title: "هل أنت متأكد؟",
    text: "لن تتمكن من التراجع عن هذا !",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "نعم، احذفه"
  }).then((result) => {
    if (result.isConfirmed) {
      this.bookingService.StudentCancelRequest(bookingId).subscribe(
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
          Swal.fire({
            icon: "error",
            title: "خطأ",
            text: "حدث خطأ",
          });
        }
      )
    }
  });
}

showRoom(roomId:number){
  this.router.navigate(['/home-student/roomDetails-student'], { queryParams: { roomId } });
}

}
