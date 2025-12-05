import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  whetherdata: any = {
    "temp": [10, 20, 30, 40, 50],
    "humidity": [10, 20, 30, 40, 50],
    "time": ["10AM", "11AM", "12PM", "1PM", "2PM", "3PM"],
  }

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false
  chartOptions: Highcharts.Options = {
    xAxis: {
      categories: this.whetherdata.time
    },
    yAxis: {
      categories: this.whetherdata.temp
    },
    series: [
      {
        name: 'temp',
        data: this.whetherdata.temp,
        type: 'line',
      },
      {
        name: 'humidity',
        data: this.whetherdata.humidity,
        type: 'line',
      }
    ]
  };

  piechartOptions: Highcharts.Options = {
    series: [
      {
        type: 'pie',
        data: [
          { name: 'Electronics', y: 45 },
          { name: 'Fashion', y: 25 },
          { name: 'Groceries', y: 20 },
          { name: 'others', y: 20 },

        ]

      }
    ]
  }
}
