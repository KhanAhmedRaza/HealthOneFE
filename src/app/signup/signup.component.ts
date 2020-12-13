import { Component, OnInit } from '@angular/core';
import { SignupService, User } from './signup.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  user: User;
  isContinue: boolean;
  signupForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    //profession: ['',Validators.required],
    country: ['', Validators.required],
    rePassword: ['', Validators.required],
    //terms:['',Validators.required]
  });

  constructor(
    private _signUpService: SignupService,
    private fb: FormBuilder,
    private route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  register() {
    console.log('in register' + this.signupForm.value.firstName);
    let jsonVal: JSON = this.signupForm.value;
    let map = new Map();
    for (let key in jsonVal) {
      if (jsonVal[key] != null && jsonVal[key].length > 0) {
        map.set(key, jsonVal[key]);
      }
    }

    this.user = this.strMapToObj(map);
    console.log('User' + this.user.email);
    this._signUpService.setUser(this.user);
    //this.route.navigate(['/signup-success']);
    this._signUpService.addUser(this.user).subscribe(
      (data) => {
        console.log('data' + data);
        this.route.navigate(['/signup-success']);
        this.showSuccess();
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

  continue() {
    if (!this.signupForm.invalid) {
      this.isContinue = true;
    }
  }

  reset() {
    this.signupForm.reset();
    this.isContinue = false;
    //this.signupForm.markAsUntouched();
  }

  showSuccess() {
    this.toastr.success('User is successfully added!', 'Success!');
  }

  showError() {
    this.toastr.error('Unable to add user!');
  }
}
