import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterOwner } from '../models/register-owner';
import { Observable } from 'rxjs';
import { Login } from '../../shared/models/login';
import { ProfileOwner } from '../models/profile-owner';
import { EditprofileOwner } from '../models/editprofile-owner';
import { Changepassword } from '../../shared/models/changepassword';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = 'http://sakanapi.runasp.net/api'
  constructor(private httpclient :HttpClient) { }

  OwnerRegister(ownerData: RegisterOwner): Observable<any> { 
    return this.httpclient.post<any>(`${this.baseUrl}/Account/registerOwner`,ownerData);
  }

  login(userData: Login): Observable<any> {
    
    return this.httpclient.post<any>(`${this.baseUrl}/Account/login`,userData);
  }

  getOwnerProfile(id:string): Observable<any> {
    return this.httpclient.get<any>(`${this.baseUrl}/Account/OwnerProfile?id=${id}`);
  }

  editOwnerProfile(ownerId:string,data:EditprofileOwner): Observable<any> {
    return this.httpclient.put<any>(`${this.baseUrl}/Account/EditOwnerProfile?ownerId=${ownerId}`,data);
  }

  changePassword(data:Changepassword): Observable<any>{
    return this.httpclient.post<any>(`${this.baseUrl}/Account/ChangePassword`,data);
  }

  get token():string|null {  
    return localStorage.getItem('token');
  }
  set token(token: string){
    localStorage.setItem('token',token);
  }
  removeToken():boolean{
    localStorage.removeItem('token');
    return true;
  }
  isAuthenticated():boolean{
    return this.token!=null;
  }
  isOwner() : boolean{
    return this.role === 'Owner';
  }
  get role():string|null {
    return localStorage.getItem('role');
  }
  set role(role: string){
    localStorage.setItem('role',role);
  }
  removeRole():boolean{
    localStorage.removeItem('role');
    return true;
  }
  get id():string|null{
    return localStorage.getItem('id');
  }
  set id(id: string){
    localStorage.setItem('id',id);
}
  removeId():boolean{
    localStorage.removeItem('id');
    return true;
  }
  logout(){
    this.removeToken();
    this.removeRole();
    this.removeId();
    }
}
