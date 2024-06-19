import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { RoomService } from '../../../services/room.service';
import { GetAllBuilding } from '../../../models/get-all-building';
import { GetFlat } from '../../../models/get-flat';
import { GetRoom } from '../../../models/get-room';

@Component({
  selector: 'app-room-details-student',
  standalone: true,
  imports: [],
  templateUrl: './room-details-student.component.html',
  styleUrl: './room-details-student.component.css'
})
export class RoomDetailsStudentComponent implements OnInit {
  build!:GetAllBuilding;
  flat!:GetFlat;
  room!:GetRoom;
  constructor(private roomService:RoomService,private accountService:AccountService){}

  ngOnInit(): void {
    this.roomService.GetRoomDetails(this.roomService.roomId).subscribe(
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
        // console.log(this.build)
        // console.log(this.flat);
        
      }
    )
  }

}
