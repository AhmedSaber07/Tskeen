import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { MainComponent } from './shared/components/main/main.component';
import { RegisterOwnerComponent } from './core/components/owner/register-owner/register-owner.component';
import { HomeOwnerComponent } from './core/components/owner/home/home-owner/home-owner.component';
import { NotifyOwnerComponent } from './core/components/owner/home/notify-owner/notify-owner.component';
import { MainOwnerComponent } from './core/components/owner/home/main-owner/main-owner.component';
import { PersonalOwnerComponent } from './core/components/owner/home/personal-owner/personal-owner.component';
import { EditProfileOwnerComponent } from './core/components/owner/edit-profile-owner/edit-profile-owner.component';
import { HomeBuildingOwnerComponent } from './core/components/owner/building/home-building-owner/home-building-owner.component';
import { AddBuildingOwnerComponent } from './core/components/owner/building/add-building-owner/add-building-owner.component';
import { EditBuildingOwnerComponent } from './core/components/owner/building/edit-building-owner/edit-building-owner.component';
import { ownerGuard } from './shared/guards/owner.guard';
import { HomeFlatOwnerComponent } from './core/components/owner/flat/home-flat-owner/home-flat-owner.component';
import { AddFlatOwnerComponent } from './core/components/owner/flat/add-flat-owner/add-flat-owner.component';
import { EditFlatOwnerComponent } from './core/components/owner/flat/edit-flat-owner/edit-flat-owner.component';
import { HomeRoomOwnerComponent } from './core/components/owner/room/home-room-owner/home-room-owner.component';
import { AddRoomOwnerComponent } from './core/components/owner/room/add-room-owner/add-room-owner.component';
import { EditRoomOwnerComponent } from './core/components/owner/room/edit-room-owner/edit-room-owner.component';
import { RegisterStudentComponent } from './core/components/student/register-student/register-student.component';
import { ConfirmRegisterStudentComponent } from './core/components/student/confirm-register-student/confirm-register-student.component';
import { QuestionnaireStudentComponent } from './core/components/student/questionnaire-student/questionnaire-student.component';
import { HomeStudentComponent } from './core/components/student/home/home-student/home-student.component';
import { studentGuard } from './shared/guards/student.guard';
import { MainStudentComponent } from './core/components/student/home/main-student/main-student.component';
import { NotifyStudentComponent } from './core/components/student/home/notify-student/notify-student.component';
import { PersonalStudentComponent } from './core/components/student/home/personal-student/personal-student.component';
import { ChangePasswordComponent } from './shared/components/change-password/change-password.component';
import { authenticateGuard } from './shared/guards/authenticate.guard';
import { EditProfileStudentComponent } from './core/components/student/edit-profile-student/edit-profile-student.component';
import { RecommendedRoomsComponent } from './core/components/student/recommended-rooms/recommended-rooms.component';
import { RoomDetailsStudentComponent } from './core/components/student/room-details-student/room-details-student.component';
import { NotConfirmedBookingOwnerComponent } from './core/components/owner/home/not-confirmed-booking-owner/not-confirmed-booking-owner.component';
import { ConfirmedBookingOwnerComponent } from './core/components/owner/home/confirmed-booking-owner/confirmed-booking-owner.component';

export const routes: Routes = [
    {path:'',redirectTo:'main', pathMatch: 'full' },
    {path:'main',component:MainComponent,title:'Main Page'},
    {path: 'login', component:LoginComponent},
    {path: 'change-password', component:ChangePasswordComponent,canActivate:[authenticateGuard]},
    {path: 'register-owner', component:RegisterOwnerComponent},
    {path: 'register-student', component:RegisterStudentComponent},
    {path: 'confirm-register-student', component:ConfirmRegisterStudentComponent,canActivate:[studentGuard]},
    {path: 'questionnaire-student', component:QuestionnaireStudentComponent,canActivate:[studentGuard]},
    { path: 'home-owner', component: HomeOwnerComponent, canActivate: [ownerGuard],
        // { path: 'home-owner', component: HomeOwnerComponent,
    children: [
        { path: '', redirectTo: 'main-owner', pathMatch: 'full' },
        { path: 'main-owner', component: MainOwnerComponent, title: 'Owner Main' },
        { path: 'personal-owner', component: PersonalOwnerComponent, title: 'Owner Personal'},
        { path: 'homeBuilding-owner', component: HomeBuildingOwnerComponent, title: 'Home Building Owner'},
        {path:'homeFlat-owner',component:HomeFlatOwnerComponent, title: 'Home Flat Owner'},
        {path:'homeRoom-owner',component:HomeRoomOwnerComponent, title: 'Home Room Owner'},
        { path: 'notify-owner', component: NotifyOwnerComponent, title: 'Owner Notify',children:[
            { path: '', redirectTo: 'not-confirmed-booking', pathMatch: 'full' },
            { path: 'not-confirmed-booking', component: NotConfirmedBookingOwnerComponent, title: 'Not Confirmed Booking' },
            { path: 'confirmed-booking', component: ConfirmedBookingOwnerComponent, title: 'Confirmed Booking'},
        ]},
    ]
},
{ path: 'home-student', component: HomeStudentComponent, canActivate: [studentGuard],
    // { path: 'home-owner', component: HomeOwnerComponent,
children: [
    { path: '', redirectTo: 'main-student', pathMatch: 'full' },
    { path: 'main-student', component: MainStudentComponent, title: 'Student Main' },
    { path: 'notify-student', component: NotifyStudentComponent, title: 'Student Notify'},
    { path: 'recommendedRooms-student', component: RecommendedRoomsComponent, title: 'Student Recommended Rooms'},
]
},
{ path: 'roomDetails-student', component: RoomDetailsStudentComponent, title: 'Student Room Details',canActivate: [authenticateGuard]},
{ path: 'personal-student', component: PersonalStudentComponent, title: 'Student Personal',canActivate: [authenticateGuard]},
{ path: 'editProfile-owner', component: EditProfileOwnerComponent, title: 'Edit Profile Owner', canActivate: [ownerGuard] },
{ path: 'addBuilding-owner', component: AddBuildingOwnerComponent, title: 'Add Building Owner', canActivate: [ownerGuard] },
{ path: 'editBuilding-owner', component: EditBuildingOwnerComponent, title: 'Edit Building Owner', canActivate: [ownerGuard] },
{ path: 'addFlat-owner', component: AddFlatOwnerComponent, title: 'Add Flat Owner',  canActivate: [ownerGuard]},
{ path: 'editFlat-owner', component: EditFlatOwnerComponent, title: 'Edit Flat Owner',canActivate: [ownerGuard] },
{ path: 'addRoom-owner', component: AddRoomOwnerComponent, title: 'Add Room Owner',  canActivate: [ownerGuard]},
{ path: 'editRoom-owner', component: EditRoomOwnerComponent, title: 'Edit Room Owner',canActivate: [ownerGuard] },
{ path: 'editProfile-student', component: EditProfileStudentComponent, title: 'Edit Profile Student', canActivate: [studentGuard] },];