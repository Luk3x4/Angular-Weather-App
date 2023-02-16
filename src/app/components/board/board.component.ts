import { Component, Input } from '@angular/core';
import { IWeatherData } from 'src/app/interfaces';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input() data!: IWeatherData | null;
  @Input() error!: string
}
