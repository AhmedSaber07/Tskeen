import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddEditBuilding } from '../models/add-edit-building';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  private baseUrl = 'https://sakanapi.runasp.net/api'
  constructor(private httpclient :HttpClient) { }

  getAll(ownerId:string): Observable<any>{
    return this.httpclient.get<any>(`${this.baseUrl}/Building/getall?ownerId=${ownerId}`);
  }
  getById(id:number): Observable<any>{
    return this.httpclient.get<any>(`${this.baseUrl}/Building/getbyid/${id}`);
  }
  add(data:FormData): Observable<any>{
    return this.httpclient.post<any>(`${this.baseUrl}/Building/Add`,data);
  }
  update(id:number,data:FormData): Observable<any>{
    return this.httpclient.put<any>(`${this.baseUrl}/Building?id=${id}`,data);
  }
  delete(id:number): Observable<any>{
    return this.httpclient.delete<any>(`${this.baseUrl}/Building?id=${id}`);
  }
  
  get buildId():number {
    return  Number(localStorage.getItem('buildId'));
  }
  set buildId(buildId: number){
    localStorage.setItem('buildId',buildId.toString());
  }
  removeBuildId():boolean{
    localStorage.removeItem('buildId');
    return true;
  }
}
