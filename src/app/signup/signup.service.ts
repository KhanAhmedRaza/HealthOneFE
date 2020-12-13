import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  constructor(private httpClient: HttpClient) {}

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>('/user', user).pipe(
      catchError((err) => {
        throw 'error in source. Details: ' + err;
      })
    );
  }

  getUser() {
    return this.user;
  }

  setUser(usr: User) {
    this.user = usr;
  }
}
