import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlatService {
  private baseUrl = 'https://sakanapi.runasp.net/api/Flat'
  constructor(private httpclient :HttpClient) { }

  getAll(buildingId:number): Observable<any>{
    return this.httpclient.get<any>(`${this.baseUrl}?buildingId=${buildingId}`);
  }
  getById(id:number): Observable<any>{
    return this.httpclient.get<any>(`${this.baseUrl}/getbyid?id=${id}`);
  }
  add(data:FormData): Observable<any>{
    return this.httpclient.post<any>(`${this.baseUrl}/Add`,data);
  }
  update(id:number,data:FormData): Observable<any>{
    return this.httpclient.put<any>(`${this.baseUrl}?id=${id}`,data);
  }
  delete(id:number): Observable<any>{
    return this.httpclient.delete<any>(`${this.baseUrl}?id=${id}`);
  }

  get flatId():number {
    return  Number(localStorage.getItem('flatId'));
  }
  set flatId(flatId: number){
    localStorage.setItem('flatId',flatId.toString());
  }
  removeFlatId():boolean{
    localStorage.removeItem('flatId');
    return true;
  }

}
