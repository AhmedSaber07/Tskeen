import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RoomService } from '../../../../services/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlatService } from '../../../../services/flat.service';
import { ShowRoom } from '../../../../models/show-room';

@Component({
  selector: 'app-home-room-owner',
  standalone: true,
  imports: [],
  templateUrl: './home-room-owner.component.html',
  styleUrl: './home-room-owner.component.css'
})
export class HomeRoomOwnerComponent implements OnInit {
  rooms!:ShowRoom[];
flatId!:number;
  constructor(private roomService:RoomService,private route: ActivatedRoute,private flatService:FlatService,private router: Router){}
  ngOnInit(): void {
    this.flatId = this.flatService.flatId;
    this.roomService.getAll(this.flatId).subscribe((data)=>{
      this.rooms = data.data;
      console.log(this.rooms);
      
    })
    console.log(this.rooms);
  }
  navigateToAddRoom(){
    this.router.navigate(['/addRoom-owner'], { queryParams: { flatId: this.flatId } });
  }
  
  
  editRoom(roomId: number) {
    this.router.navigate(['/editRoom-owner'], { queryParams: { roomId: roomId } });
  }
  
  deleteRoom(id:number){
  
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.roomService.delete(id).subscribe((data)=>{
          console.log(data);
        Swal.fire({
          title: "Deleted!",
          text: `${data.message}`,
          icon: "success"
        });
        this.ngOnInit();
      })
      }
    });
  
  }
}
