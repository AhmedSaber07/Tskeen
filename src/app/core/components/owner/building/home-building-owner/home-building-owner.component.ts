import { Component, OnInit } from '@angular/core';
import { GetAllBuilding } from '../../../../models/get-all-building';
import { BuildingService } from '../../../../services/building.service';
import { AccountService } from '../../../../services/account.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-home-building-owner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-building-owner.component.html',
  styleUrl: './home-building-owner.component.css'
})
export class HomeBuildingOwnerComponent implements OnInit {

  buildings! : GetAllBuilding[];
  constructor(private buildingService:BuildingService,private accountService:AccountService,private router: Router){

  }
  ngOnInit(): void {
    if(this.accountService.id)
      {
    this.buildingService.getAll(this.accountService.id).subscribe((data)=>{
      this.buildings = data.data;
     // console.log(this.buildings);
    })
      }
  }

  nagivateToHomeFlat(buildId:number){
    this.buildingService.buildId = buildId;
    this.router.navigate(['/home-owner/homeFlat-owner'], { queryParams: { buildId: buildId } });
  }


  editBuild(buildId: number) {
    this.router.navigate(['/editBuilding-owner'], { queryParams: { id: buildId } });
  }

  deleteBuild(id:number){

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
        this.buildingService.delete(id).subscribe((data)=>{
       //   console.log(data);
        Swal.fire({
          title: "تم الحذف",
          text: `${data.message}`,
          icon: "success"
        });
        this.ngOnInit();
      })
      }
    });
  
  }


}
