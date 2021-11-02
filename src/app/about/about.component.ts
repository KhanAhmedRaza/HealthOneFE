import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { DrugService } from '@app/drug/drug.service';
import { single } from './data';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  version: string | null = environment.version;
  quotes: [];
  quote: any;
  index = 0;
  disablePrev = false;
  disableNext = false;
  single: any[];
  view: any[] = [700, 400];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  legendPosition = 'below';
  showLabels = true;
  isDoughnut = false;
  constructor(private drugService: DrugService) {}

  ngOnInit() {
    Object.assign(this, { single });
    this.drugService.getQuotes().subscribe((result) => {
      this.quotes = result.splice(0, 5);
      /* result.forEach((res:any) => {
        // @ts-ignore
        this.quotes.push(res);
      })*/
      // @ts-ignore
      this.quote = this.quotes[0];
    });
  }

  nextQuote() {
    this.index++;

    this.quote = this.quotes[this.index];
    if (this.index > this.quotes.length - 2) {
      this.disableNext = true;
    }
    if (this.index > 0) {
      this.disablePrev = false;
    }
  }
  prevQuote() {
    this.index--;
    this.quote = this.quotes[this.index];
    if (this.index < 1) {
      this.disablePrev = true;
    }
    if (this.index < this.quotes.length - 1) {
      this.disableNext = false;
    }
  }
  onSelect(event: any) {
    console.log(event);
  }
  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
