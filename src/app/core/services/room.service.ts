import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl = 'https://sakanapi.runasp.net/api'
  constructor(private httpclient :HttpClient) { }

  getAll(flatId:number): Observable<any>{
    return this.httpclient.get<any>(`${this.baseUrl}/Room?flatId=${flatId}`);
  }
  getById(id:number): Observable<any>{
    return this.httpclient.get<any>(`${this.baseUrl}/Room/getbyid/${id}`);
  }
  add(data:FormData): Observable<any>{
    return this.httpclient.post<any>(`${this.baseUrl}/Room/Add`,data);
  }
  update(id:number,data:FormData): Observable<any>{
    return this.httpclient.put<any>(`${this.baseUrl}/Room?id=${id}`,data);
  }
  delete(id:number): Observable<any>{
    return this.httpclient.delete<any>(`${this.baseUrl}/Room?RoomId=${id}`);
  }
  GetAllRoomsRecommended(studentId:string): Observable<any>{
    return this.httpclient.get<any>(`${this.baseUrl}/Home/allRoomsRecommended?studentId=${studentId}`);
  }
  GetRoomDetails(roomId: number): Observable<any>{
    return this.httpclient.get<any>(`${this.baseUrl}/Home/${roomId}`);
  }

  GetAllRooms(): Observable<any>{
    return this.httpclient.get<any>(`${this.baseUrl}/Home/allRooms`);
  }

  set roomId(roomId: number){
    localStorage.setItem('roomId',roomId.toString());
  }
  get roomId():number {
    return  Number(localStorage.getItem('roomId'));
  }
}
