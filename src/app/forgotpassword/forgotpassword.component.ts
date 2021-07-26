import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotpasswordService } from '@app/forgotpassword/forgotpassword.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent implements OnInit {
  forgotForm!: FormGroup;
  error: string | undefined;
  isLoading = false;
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  constructor(
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private forgotPasswordServ: ForgotpasswordService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  forgotPassword() {
    console.log('email==' + this.forgotForm.controls.email.value);
    this.forgotPasswordServ.forgotService(this.forgotForm.controls.email.value).subscribe((data: any) => {
      if (data) {
        this.toaster.success('Email sent successfuly');
        this.router.navigate(['/login']);
      }
    });
  }

  private createForm() {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    });
  }
}
