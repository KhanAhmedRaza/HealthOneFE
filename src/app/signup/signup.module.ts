import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { I18nModule } from '@app/i18n';
import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupSuccessComponent } from './signup-success/signup-success.component';

@NgModule({
  imports: [CommonModule, SignupRoutingModule, NgbModule, TranslateModule, I18nModule, ReactiveFormsModule],
  declarations: [SignupComponent, SignupSuccessComponent],
})
export class SignupModule {}
