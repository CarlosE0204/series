import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  constructor(private http:HttpClient) { }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  }

   getUsers(): Observable<any[]>{
   return this.http.get<any[]>('https://api.escuelajs.co/api/v1/users');
   }

  getSeries():Observable <any> {
    const url = 'https://movies-api14.p.rapidapi.com/movies';
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': '3fafeca5bfmshf84fc1424a9819ep15691ajsn48232be0cb4d',
      'X-RapidAPI-Host': 'movies-api14.p.rapidapi.com',
    });
    return this.http.get<any>(url, { headers });

  }

}
 // login(email: string, password: string): Observable<any> {
  //   const body = { email, password };
  //   return this.http.post('https://api.escuelajs.co/api/v1/auth/login', body);
  // }private apiUrl = 'https://api.escuelajs.co/api/v1';

  // getPerfil(): Observable<any> {
  //   const token = (typeof localStorage !== 'undefined') ? localStorage.getItem('access_token') : String;
  //   if (!token) {
  //      throw new Error('No se encontró el token');
  //   }
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`
  //   });
  //   return this.http.get('https://api.escuelajs.co/api/v1/auth/profile', { headers });
  // }
