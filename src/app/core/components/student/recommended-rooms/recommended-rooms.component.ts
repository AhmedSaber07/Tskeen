import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room.service';
import { GetRoom } from '../../../models/get-room';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';
import { BookingService } from '../../../services/booking.service';

@Component({
  selector: 'app-recommended-rooms',
  standalone: true,
  imports: [],
  templateUrl: './recommended-rooms.component.html',
  styleUrl: './recommended-rooms.component.css'
})
export class RecommendedRoomsComponent implements OnInit {
  rooms!:GetRoom[];
constructor(private bookingService:BookingService,private router:Router,private roomService:RoomService,private accountService:AccountService){}
  ngOnInit(): void {
    // if(this.accountService.id)
    //   {
    // this.roomService.GetAllRoomsRecommended(this.accountService.id).subscribe(
    //   (data)=>{
    //     this.rooms = data.data;
    //    console.log(this.rooms);
    //   },
    //   (error)=>{
    //     console.log(error);
    //   }
    // )

    //   }
    this.roomService.GetAllRooms().subscribe(
      (data)=>{
        this.rooms = data.data;
       console.log(this.rooms);
      },
      (err)=>{
        console.log(err);
        
      }
    )
  }

  navigateToRoomDetails(roomId:number){
    this.roomService.roomId = roomId;
    this.router.navigate(['/roomDetails-student'], { queryParams: { roomId } });
  }


}
