import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { User } from '@app/signup/signup.service';
import { DrugSearchObj, DrugSearchResult } from '@app/drug/drug-search/drug-search.component';

@Injectable({
  providedIn: 'root',
})
export class DrugService {
  private drugSearch: DrugSearchObj;
  private _jsonURL = 'assets/data.json';
  constructor(private httpClient: HttpClient) {}

  search(drugSearch: DrugSearchObj) {
    return this.httpClient.post<DrugSearchResult>('/drug/search', drugSearch).pipe(
      catchError((err) => {
        throw 'error in source. Details: ' + err;
      })
    );
    /* let filename = '';
    if(drugSearch.max_depth === '1') {
      filename = 'data_response1.json';
    } else  if(drugSearch.max_depth === '2') {
      filename = 'data_response2.json';
    } else  if(drugSearch.max_depth === '3') {
      filename = 'data_response3.json';
    } else {
      filename = 'data_response4.json';
    }
    return this.httpClient.get<DrugSearchResult>('/assets/'+filename)
      .pipe(data =>{
      console.log(data);
      return data;
    })*/
  }
}
