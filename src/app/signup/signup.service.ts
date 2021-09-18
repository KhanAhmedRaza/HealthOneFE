import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OstfError } from '@app/signup/signup.component';
import { ToastrService } from 'ngx-toastr';

/*const routes = {
 u: User => `/user`,
// quote: (c: RandomQuoteContext) => `/jokes/random?category=${c.category}`,
};*/

export interface User {
  // The quote's category: 'dev', 'explicit'...
  email: string;
  password: string;
  profession: string;
  country: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private user: User;
  private error: OstfError;

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {}

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>('/user', user).pipe(
      catchError((err) => {
        this.error = err.error;
        console.log('Error occurred' + this.error.errorCode);
        this.showError(this.error.errorMessage);
        throw new Error('error in source. Details: ' + this.error.errorMessage);
      })
    );
  }

  getUser() {
    return this.user;
  }

  setUser(usr: User) {
    this.user = usr;
  }

  showError(message: string) {
    this.toastr.error('Unable to add user!' + message);
  }
}
