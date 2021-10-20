import { Component, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { QuoteService } from './quote.service';
import { DashboardService } from '@app/home/dashboard.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgbTypeahead, NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  dashboardResult: DashboardResult;
  dashboardFilters: DashboardFilters;
  years: string[] = [];
  drugName: any;
  manufacturer: any;
  indicator: any;
  outcome: any;
  selectedYear: any;
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  homeForm = this.fb.group({
    gender: [''],
    ageGrp: [''],
    fromYear: [''],
    toYear: [''],
    quarter: [''],
    location: [''],
    drugName: [''],
    manufacturer: [''],
    indicator: [''],
    outcome: [''],
  });
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;
  // images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/418/600`);
  images: any = [];
  links: any = [];
  constructor(private _dashboardService: DashboardService, private sanitizer: DomSanitizer, private fb: FormBuilder) {}

  formatter = (x: { drugName: string }) => x.drugName;
  //@ts-ignore
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.dashboardResult.drugs
              .filter((v) => v.drugName.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .map((drug) => drug.drugName)
              .slice(0, 10)
      )
    );

  searchManu = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.dashboardResult.manufatureres
              .filter((v) => v.manuName.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .map((manu) => manu.manuName)
              .slice(0, 10)
      )
    );

  searchDisease = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.dashboardResult.indicators
              .filter((v) => v.indicationPt.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .map((indi) => indi.indicationPt)
              .slice(0, 10)
      )
    );

  searchOutcome = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.dashboardResult.outcomes
              .filter((v) => v.outcomeDesc.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .map((outc) => outc.outcomeDesc)
              .slice(0, 10)
      )
    );

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      // this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
    }
  }

  ngOnInit() {
    this.isLoading = true;
    this.loadYear();
    this._dashboardService.getResult().subscribe((result) => {
      this.dashboardResult = result;
      this.dashboardResult.gender = this.loadGender();
      this.dashboardResult.indicators = this.loadDisease();
      /*this.dashboardResult.ageGrps.forEach( (grp) => {
          console.log('group'+grp.ageGrpDesc);
        })*/
      /*this.dashboardResult.drugs.filter((drug) => {
          console.log(drug.drugName);
        })*/
      if (this.dashboardResult.imageResult != null) {
        if (this.dashboardResult.imageResult.images != null) {
          this.dashboardResult.imageResult.images.forEach((img) => {
            this.images.push(this.convertToBase64(img));
          });
        }

        this.dashboardResult.img1 = this.images[0];
        this.dashboardResult.img2 = this.images[1];
        this.dashboardResult.img3 = this.images[2];
        this.dashboardResult.img4 = this.images[1];
        //const image = this.convertToBase64(result.dashboardImages.img);
        //this.dashboardResult.dashboardImages.image = image;
      }
    });

    /*this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });*/
  }

  convertToBase64(img: any) {
    let objectURl = 'data:image/jpg;base64,' + img;
    console.log('object url' + objectURl);
    return this.sanitizeURL(objectURl);
  }
  sanitizeURL(url: any) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  sanitizeHtml(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  submitForm() {
    console.log('in register' + this.homeForm.value.drugName);
    let jsonVal: JSON = this.homeForm.value;
    let map = new Map();
    for (let key in jsonVal) {
      if (jsonVal[key] != null && jsonVal[key].length > 0) {
        map.set(key, jsonVal[key]);
      }
    }

    this.dashboardFilters = this.strMapToObj(map);
    console.log('result' + this.dashboardFilters.indicator);
    this._dashboardService.setDashboardFilters(this.dashboardFilters);
    this._dashboardService.getFilterResult(this.dashboardFilters).subscribe(
      (data) => {
        console.log('data' + data);
        this.dashboardResult = data;
        this.dashboardResult.gender = this.loadGender();
        this.dashboardResult.indicators = this.loadDisease();
        if (this.dashboardResult.imageResult != null) {
          /*if(this.dashboardResult.imageResult.images!= null) {
            this.dashboardResult.imageResult.images.forEach((img) => {
              this.images.push(this.convertToBase64(img));
            })
          }*/
          if (this.dashboardResult.imageResult.images != null) {
            this.dashboardResult.imageResult.images.forEach((lnk) => {
              const link = this.sanitizeHtml(lnk);
              this.links.push(link);
            });
          }
          this.dashboardResult.link1 = this.links[0];
          /*this.dashboardResult.img2 = this.images[1];
          this.dashboardResult.img3 = this.images[2];
          this.dashboardResult.img4 = this.images[1];*/
        }
      },
      (err) => {
        if (err != 401) {
          console.log('Error occurred');
        }
      }
    );
  }
  strMapToObj(strMap: Map<string, string>) {
    let obj = Object.create(null);
    strMap.forEach((val: string, key: string) => {
      obj[key] = val;
    });
    return obj;
  }
  loadGender() {
    const gender = [
      {
        code: 'UNK',
        desc: 'Unknown',
      },
      {
        code: 'M',
        desc: 'Male',
      },
      {
        code: 'F',
        desc: 'Female',
      },
    ];

    return gender;
  }
  loadYear() {
    this.years = [
      '2000',
      '2001',
      '2002',
      '2003',
      '2004',
      '2005',
      '2006',
      '2007',
      '2008',
      '2009',
      '2010',
      '2011',
      '2012',
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018',
      '2019',
      '2020',
      '2021',
    ];
  }

  loadDisease() {
    const dis = [
      {
        indicationPt: 'Epilepsy',
      },
      {
        indicationPt: 'Cardiovascular event prophylaxis',
      },

      {
        indicationPt: 'Blood cholesterol abnormal',
      },

      {
        indicationPt: 'Low density lipoprotein increased',
      },

      {
        indicationPt: 'Myelofibrosis',
      },

      {
        indicationPt: 'Neuroendocrine tumour',
      },

      {
        indicationPt: 'Diabetes mellitus',
      },

      {
        indicationPt: 'Hyperlipidaemia',
      },

      {
        indicationPt: 'Pain',
      },

      {
        indicationPt: 'Typhoid',
      },
      {
        indicationPt: 'Fatty Liver',
      },
      {
        indicationPt: 'Cirhossis',
      },
      {
        indicationPt: 'Gall Bladder stone',
      },
    ];
    return dis;
  }
}

export class DashboardResult {
  ageGrps: AgeGroup[] = [];
  imageResult: DashboardImages;
  gender: Gender[] = [];
  countries: Country[] = [];
  drugs: Drug[] = [];
  manufatureres: Manufacturer[] = [];
  indicators: Indicator[] = [];
  outcomes: Outcome[] = [];
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  link1: string;
  filteredData: boolean;
}

export class DashboardFilters {
  ageGrp: string;
  gender: string;
  location: string;
  quarter: [];
  fromYear: string;
  toYear: string;
  drugName: string;
  manufacturer: string;
  indicator: string;
  outcome: string;
}

export class DashboardImages {
  images: string[];
  img: string;
  status: string;
  image: SafeUrl;
}

export class AgeGroup {
  ageGrp: string;
  ageGrpDesc: string;
}

export class Gender {
  code: string;
  desc: string;
}

export class Country {
  countryName: string;
  countryCode: string;
}

export class Drug {
  drugName: string;
}

export class Manufacturer {
  manuName: string;
}

export class Indicator {
  indicationPt: string;
}

export class Outcome {
  outcomeCode: string;
  outcomeDesc: string;
}
