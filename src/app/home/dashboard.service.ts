import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DrugSearchResult } from '@app/drug/drug-search/drug-search.component';
import { catchError } from 'rxjs/operators';
import { DashboardFilters, DashboardResult } from '@app/home/home.component';
import { User } from '@app/signup/signup.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private dashboardResult: DashboardResult;
  private dashboardFilters: DashboardFilters;
  constructor(private httpClient: HttpClient) {}

  getResult() {
    return this.httpClient.get<DashboardResult>('/dashboard').pipe(
      catchError((err) => {
        throw 'error in source. Details: ' + err;
      })
    );
  }

  getFilterResult(dashboardFilters: DashboardFilters) {
    console.log(dashboardFilters);
    return this.httpClient.post<DashboardResult>('/dashboard', dashboardFilters).pipe(
      catchError((err) => {
        throw 'error in source. Details: ' + err;
      })
    );
  }

  getDashboardResult() {
    return this.dashboardResult;
  }

  setDashboardResult(result: DashboardResult) {
    this.dashboardResult = result;
  }

  getDashboardFilters() {
    return this.dashboardFilters;
  }

  setDashboardFilters(result: DashboardFilters) {
    this.dashboardFilters = result;
  }
}
