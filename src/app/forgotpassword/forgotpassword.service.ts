import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '@app/signup/signup.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ForgotpasswordService {
  constructor(private httpClient: HttpClient) {}

  forgotService(primaryEmail: string): Observable<boolean> {
    return this.httpClient.post<boolean>('/email', primaryEmail).pipe(
      catchError((err) => {
        throw 'error in source. Details: ' + err;
      })
    );
  }
}
