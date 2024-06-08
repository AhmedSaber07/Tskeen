import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { MainComponent } from './shared/components/main/main.component';
import { RegisterOwnerComponent } from './core/components/owner/register-owner/register-owner.component';
import { HomeOwnerComponent } from './core/components/owner/home/home-owner/home-owner.component';
import { NotifyOwnerComponent } from './core/components/owner/home/notify-owner/notify-owner.component';
import { ServiceOwnerComponent } from './core/components/owner/home/service-owner/service-owner.component';
import { MainOwnerComponent } from './core/components/owner/home/main-owner/main-owner.component';
import { PersonalOwnerComponent } from './core/components/owner/home/personal-owner/personal-owner.component';
import { ChangePasswordOwnerComponent } from './core/components/owner/change-password-owner/change-password-owner.component';
import { EditProfileOwnerComponent } from './core/components/owner/edit-profile-owner/edit-profile-owner.component';
import { HomeBuildingOwnerComponent } from './core/components/owner/building/home-building-owner/home-building-owner.component';
import { AddBuildingOwnerComponent } from './core/components/owner/building/add-building-owner/add-building-owner.component';
import { EditBuildingOwnerComponent } from './core/components/owner/building/edit-building-owner/edit-building-owner.component';
import { ownerGuard } from './shared/guards/owner.guard';

export const routes: Routes = [
    {path:'',component:MainComponent},
    {path: 'login', component:LoginComponent},
    {path: 'register-owner', component:RegisterOwnerComponent},
    { path: 'home-owner', component: HomeOwnerComponent, canActivate: [ownerGuard],
    children: [
        { path: '', redirectTo: 'main-owner', pathMatch: 'full' },
        { path: 'main-owner', component: MainOwnerComponent, title: 'Owner Main' },
        { path: 'notify-owner', component: NotifyOwnerComponent, title: 'Owner Notify'},
        { path: 'service-owner', component: ServiceOwnerComponent, title: 'Owner Service'},
        { path: 'personal-owner', component: PersonalOwnerComponent, title: 'Owner Personal'},
        { path: 'homeBuilding-owner', component: HomeBuildingOwnerComponent, title: 'Home Building Owner'},
    ]
},
{ path: 'changePassword-owner', component: ChangePasswordOwnerComponent, title: 'Change Password Owner', canActivate: [ownerGuard] },
{ path: 'editProfile-owner', component: EditProfileOwnerComponent, title: 'Edit Profile Owner', canActivate: [ownerGuard] },
{ path: 'addBuilding-owner', component: AddBuildingOwnerComponent, title: 'Add Building Owner', canActivate: [ownerGuard] },
{ path: 'editBuilding-owner', component: EditBuildingOwnerComponent, title: 'Edit Building Owner', canActivate: [ownerGuard] },

  ];