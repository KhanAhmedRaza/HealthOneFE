import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DrugService } from '@app/drug/drug.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-drug-search',
  templateUrl: './drug-search.component.html',
  styleUrls: ['./drug-search.component.scss'],
})
export class DrugSearchComponent implements OnInit {
  orderCriteria = false;
  drugSearch: DrugSearchObj;
  drugResult: DrugSearchResult;

  drugSearchForm = this.fb.group({
    drug_name: ['', Validators.required],
    outcome: ['', Validators.required],
    max_depth: ['', Validators.required],
  });
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    protected drugService: DrugService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {}
  search() {
    console.log('drug search ' + this.drugSearchForm.value.drugName);
    let jsonVal: JSON = this.drugSearchForm.value;
    let map = new Map();
    for (let key in jsonVal) {
      if (jsonVal[key] != null && jsonVal[key].length > 0) {
        map.set(key, jsonVal[key]);
      }
    }

    this.drugSearch = this.strMapToObj(map);

    // this.router.navigate(['drug/results']);
    this.drugService.search(this.drugSearch).subscribe(
      (data) => {
        const image = this.convertToBase64(data.img);
        this.drugResult = data;
        this.drugResult.image = image;
        this.orderCriteria = true;
      },
      (err) => {
        if (err != 401) {
          this.showError();
          console.log('Error occurred');
        }
      }
    );
  }
  convertToBase64(img: any) {
    let objectURl = 'data:image/jpg;base64,' + img;
    console.log('object url' + objectURl);
    return this.sanitizer.bypassSecurityTrustUrl(objectURl);
  }
  strMapToObj(strMap: Map<string, string>) {
    let obj = Object.create(null);
    strMap.forEach((val: string, key: string) => {
      obj[key] = val;
    });
    return obj;
  }

  showError() {
    this.toaster.error('failed to get result');
    // this.toaster.toastrConfig.preventDuplicates(true);
  }
}

export class DrugSearchObj {
  drug_name: string;
  gender: string;
  ageGroup: string;
  startDate: Date;
  endDate: Date;
  roleName: string;
  countryName: string;
  reportType: string;
  outcome: string;
  max_depth: string;
}

export class DrugSearchResult {
  img: string;
  status: string;
  image: SafeUrl;
}
