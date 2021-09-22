import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImagePathResponse } from '../models/image-path-response';
import { Member } from '../models/member';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getPayment(): Observable<Payment[]> {
    return this.http.get<Payment[]>("http://localhost:22424/api/Payments");
  }
  getPaymentId(id: number): Observable<Payment> {
    return this.http.get<Payment>(`http://localhost:22424/api/Payments/${id}`);
  }
  postPayment(data: Payment): Observable<Payment> {
    return this.http.post<Payment>('http://localhost:22424/api/Payments', data);
  }
  putPayment(data: Payment): Observable<any> {
    return this.http.put<Payment>(`http://localhost:22424/api/Payments/${data.paymentId}`, data);
  }
  deletePayment(id: Number): Observable<Payment> {
    return this.http.delete<Payment>(`http://localhost:22424/api/Payments/${id}`);
  }


  getMember(): Observable<Member[]> {
    return this.http.get<Member[]>("http://localhost:22424/api/Members");
  }
  getMemberById(id: number): Observable<Member> {
    return this.http.get<Member>(`http://localhost:22424/api/Members/${id}`);
  }
  postMember(data: Member): Observable<Member> {
    return this.http.post<Member>(`http://localhost:22424/api/Members`, data);
  }
  putMember(data: Member): Observable<any> {
    return this.http.put<Member>(`http://localhost:22424/api/Members/${data.memberId}`, data);
  }
  deleteMember(id: number): Observable<Member> {
    return this.http.delete<Member>(`http://localhost:22424/api/Members/${id}`);
  }
  upload(id: number, f: File): Observable<ImagePathResponse> {
    const formData = new FormData();
    formData.append('file', f);
    return this.http.post<ImagePathResponse>(`http://localhost:22424/api/Members/Uploads/${id}`, formData);
  }
}
