import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/users';
  constructor(private http: HttpClient) {}
  getUsers(): Observable<any[]>{
  return this.http.get<any[]>(this.apiUrl);
  }
}
