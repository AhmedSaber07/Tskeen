import { Component, OnInit } from '@angular/core';
import { GetAllFlats } from '../../../../models/get-all-flats';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FlatService } from '../../../../services/flat.service';
import Swal from 'sweetalert2';
import { BuildingService } from '../../../../services/building.service';
@Component({
  selector: 'app-home-flat-owner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-flat-owner.component.html',
  styleUrl: './home-flat-owner.component.css'
})
export class HomeFlatOwnerComponent implements OnInit {
flats!:GetAllFlats[];
buildingId!:number;
constructor(private buildingService:BuildingService,private route: ActivatedRoute,private flatService:FlatService,private router: Router){}
ngOnInit(): void {
  this.buildingId = this.buildingService.buildId;
  this.flatService.getAll(this.buildingId).subscribe((data)=>{
    this.flats = data.data;
  })
  console.log(this.buildingId);
}

navigateToAddFlat(){
  this.router.navigate(['/addFlat-owner'], { queryParams: { buildId: this.buildingId } });
}

editFlat(flatId: number) {
  this.router.navigate(['/editFlat-owner'], { queryParams: { id: flatId } });
}

deleteFlat(id:number){

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
      this.flatService.delete(id).subscribe((data)=>{
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
