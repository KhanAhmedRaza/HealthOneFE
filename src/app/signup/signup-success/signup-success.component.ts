import { Component, OnInit } from '@angular/core';
import { SignupService, User } from '../signup.service';

@Component({
  selector: 'app-signup-success',
  templateUrl: './signup-success.component.html',
  styleUrls: ['./signup-success.component.scss'],
})
export class SignupSuccessComponent implements OnInit {
  user: User;
  constructor(private _signUpService: SignupService) {}

  ngOnInit(): void {
    this.user = this._signUpService.getUser();
  }
}
