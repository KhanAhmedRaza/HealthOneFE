import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { DrugService } from '@app/drug/drug.service';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss'],
})
export class HealthComponent implements OnInit {
  version: string | null = environment.version;
  quotes: [];
  quote: any;
  index = 0;
  disablePrev = false;
  disableNext = false;
  constructor(private drugService: DrugService) {}

  ngOnInit() {
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
}
