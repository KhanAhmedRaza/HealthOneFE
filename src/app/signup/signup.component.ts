import { Component, OnInit } from '@angular/core';
import { SignupService, User } from './signup.service';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
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
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  passwordPattern: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';

  signupForm = this.fb.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],
      profession: [''],
      country: ['', Validators.required],
      rePassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],

      //terms:['',Validators.required]
    },
    { validator: this.validateAreEqual }
  );
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
          this.showError();
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

  continue(event: any) {
    if (!this.signupForm.invalid && event.target.checked) {
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

  /*showError() {
    this.toastr.error('User is successfully added!', 'Success!');
  }*/

  showError() {
    this.toastr.error('Unable to add user!');
  }
  onSelectCard(value: any) {
    this.signupForm.value.profession = value;
    console.log('profession ' + this.signupForm.value.profession);
    console.log('value ' + value);
  }

  private validateAreEqual(frmGrp: FormGroup) {
    return frmGrp.controls['password'].value !== frmGrp.controls['rePassword'].value
      ? {
          mismatch: true,
        }
      : null;
  }

  get email(): any {
    return this.email.get('email');
  }

  /*getEmail() {
    return this.signupForm.value.email;
  }*/
}
