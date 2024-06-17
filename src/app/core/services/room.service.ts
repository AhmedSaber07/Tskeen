import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl = 'https://sakanapi.runasp.net/api/Room'
  constructor(private httpclient :HttpClient) { }

  getAll(flatId:number): Observable<any>{
    return this.httpclient.get<any>(`${this.baseUrl}?flatId=${flatId}`);
  }
  getById(id:number): Observable<any>{
    return this.httpclient.get<any>(`${this.baseUrl}/getbyid/${id}`);
  }
  add(data:FormData): Observable<any>{
    return this.httpclient.post<any>(`${this.baseUrl}/Add`,data);
  }
  update(id:number,data:FormData): Observable<any>{
    return this.httpclient.put<any>(`${this.baseUrl}?id=${id}`,data);
  }
  delete(id:number): Observable<any>{
    return this.httpclient.delete<any>(`${this.baseUrl}?RoomId=${id}`);
  }
}
