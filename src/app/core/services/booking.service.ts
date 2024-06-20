import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestBooking } from '../models/request-booking';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'https://sakanapi.runasp.net/api/Booking'
  constructor(private httpclient :HttpClient) { }

  GetAllConfirmedBookings(ownerId: string): Observable<any>{
    return this.httpclient.get<any>(`${this.baseUrl}/GetAllConfirmedBookings?OwnerId=${ownerId}`);
  }

  GetNotConfirmedRequests(ownerId: string): Observable<any>{
    return this.httpclient.get<any>(`${this.baseUrl}/GetNotConfirmedRequests?OwnerId=${ownerId}`);
  }

  GetAllBookingForStudent(studentId:string):Observable<any>{
    return this.httpclient.get<any>(`${this.baseUrl}/GetAllBookingForStudent?studentId=${studentId}`);
  }

  BookingRequest(booking: RequestBooking): Observable<any> { 
    return this.httpclient.post<any>(`${this.baseUrl}/BookingRequest`,booking);
  }

  AddStudentInRoomByEmail(roomId:number,email:string,ownerId:string):Observable<any>{
    return this.httpclient.put<any>(`${this.baseUrl}/AddStudentInRoomByEmail?roomId=${roomId}&email=${email}&ownerId=${ownerId}`,{});
  }

  ConfirmRequest(bookingId:number,ownerId:string):Observable<any> {
    return this.httpclient.put<any>(`${this.baseUrl}/ConfirmRequest?bookingId=${bookingId}&OwnerId=${ownerId}`,{});
  }

  StudentCancelRequest(bookingId:number):Observable<any>{
    return this.httpclient.delete<any>(`${this.baseUrl}/StudentCancelRequist?id=${bookingId}`);
  }

  OwnerDeleteStudentRequest(bookingId:number):Observable<any>{
    return this.httpclient.delete<any>(`${this.baseUrl}/OwnerDeleteStudentRequist?id=${bookingId}`);
  }

  EndBooking(bookingId:number):Observable<any>{
    return this.httpclient.delete<any>(`${this.baseUrl}/EndBooking?id=${bookingId}`);
  }

}
