import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccountService } from '../../../../services/account.service';
import { BuildingService } from '../../../../services/building.service';
import { AddEditBuilding } from '../../../../models/add-edit-building';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { GetAllBuilding } from '../../../../models/get-all-building';
@Component({
  selector: 'app-edit-building-owner',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './edit-building-owner.component.html',
  styleUrls: ['./edit-building-owner.component.css']
})
export class EditBuildingOwnerComponent implements OnInit {
  buildId!: number;
  getBuilding!: GetAllBuilding;
  editBuildingForm!: FormGroup;
  imgFile!: File;
  flagErrorInFile: boolean = false;
  errorMessageInFile!: string;

  constructor(private router:Router,private fb: FormBuilder, private route: ActivatedRoute, private accountService: AccountService, private buildingService: BuildingService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.buildId = Number(params.get('id'));
    });

    console.log('Building ID:', this.buildId);
    this.buildingService.getById(this.buildId).subscribe((data) => {
      this.getBuilding = data.data;
      console.log(this.getBuilding.name);
      this.initForm();
    });
  }

  initForm(): void {
    this.editBuildingForm = this.fb.group({
      buildingName: [this.getBuilding ? this.getBuilding.name : '', [Validators.required, Validators.minLength(6)]],
      buildingAddress: [this.getBuilding ? this.getBuilding.address : '', [Validators.required, Validators.minLength(10)]],
      buildingDescription: [this.getBuilding ? this.getBuilding.description : '', [Validators.required, Validators.minLength(15)]],
      UserGender: [this.getBuilding ? this.getBuilding.userGender?.toString() : '', [Validators.required]],
      Gas: [this.getBuilding ? this.getBuilding.gas : false, [Validators.required]],
      imageFile: ['', [Validators.required ]]
    });
  }

  get buildingName() { return this.editBuildingForm.get('buildingName'); }
  get buildingAddress() { return this.editBuildingForm.get('buildingAddress'); }
  get buildingDescription() { return this.editBuildingForm.get('buildingDescription'); }
  get UserGender() { return this.editBuildingForm.get('UserGender'); }
  get Gas() { return this.editBuildingForm.get('Gas'); }
  get imageFile() { return this.editBuildingForm.get('imageFile'); }

  uploadFile(event: any) {
    const file = event.currentTarget.files[0];
    const validTypes = ['image/png', 'image/gif', 'image/jpeg'];
    if (validTypes.includes(file.type) && file.size < 1000000) {
      this.flagErrorInFile = false;
      this.imgFile = file;
      console.log(this.imgFile);
    } else {
      this.flagErrorInFile = true;
      this.errorMessageInFile = !validTypes.includes(file.type) ? ".jpg او .png او .gif الرجاء تحميل نوع صورة يحمل اي من هذا الامتداد" : "يرجى تحميل صورةأقل من 1 ميغابايت";
      console.log(this.errorMessageInFile);
    }
  }

  onSubmit() {
    if (this.editBuildingForm.valid && !this.flagErrorInFile) {
      if (this.accountService.id) {
        const formData = new FormData();
        formData.append('Name', this.editBuildingForm.value.buildingName);
        formData.append('Address', this.editBuildingForm.value.buildingAddress);
        formData.append('Description', this.editBuildingForm.value.buildingDescription);
        formData.append('UserGender', this.editBuildingForm.value.UserGender);
        formData.append('Gas', this.editBuildingForm.value.Gas);
        formData.append('OwnerId', this.accountService.id);
        formData.append('ImageFile', this.imgFile);
        console.log(formData);

        this.buildingService.update(this.buildId,formData).subscribe(
          (data) => {
            if (data) {
              console.log(data);
              Swal.fire({
                title: "صحيح",
                text: `${data.message}`,
                icon: "success"
              });
              this.editBuildingForm.reset();
              this.router.navigate(['/home-owner/homeBuilding-owner']);
            }
          }
        );
      }
    } else {
      this.editBuildingForm.markAllAsTouched();
    }
  }
}

