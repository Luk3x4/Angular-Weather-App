import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL: string = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private readonly units: string = 'units=metric&'
  private readonly API_KEY: string = 'appid=98c97de810cb707cd1554021d107e09c'

  constructor(private http: HttpClient) { }

  public getWeather(city: string): Observable<any> {
    return this.http.get<any>(this.API_URL+city+'&'+this.units+this.API_KEY)
    .pipe(
      catchError(this.handleError)
    )
  }

  public handleError(error: any) {
    return throwError(error)
  }
}
