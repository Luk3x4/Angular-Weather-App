import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, retry } from 'rxjs';
import { ApiService } from './Services/api.service';
import { IWeatherData } from './interfaces';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  city: string = "";
  weatherData: IWeatherData | null = null
  query: string = 'Tbilisi';
  error: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getWeatherData()
  }

  getWeatherData(): void | string {
    if(!this.query) {
      this.setWeatherData(null)
      return this.error = 'Please Enter City'
    }
    this.error = ''
    this.apiService.getWeather(this.query).subscribe(res => {
      const { name,
              main: { temp },
              coord: { lon, lat },
              wind: { speed: windSpeed },
              weather: [{main}]
            } = res

      this.setWeatherData({name, temp, lon, lat, windSpeed, main })
    },
    (error: HttpErrorResponse): void => {
      this.setWeatherData(null)
      this.error = error.error.message
      console.log(this.error)
    })
  }

  setWeatherData(data: IWeatherData | null): void {
    this.weatherData = data
  }
}