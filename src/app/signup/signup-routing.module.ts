import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { SignupComponent } from './signup.component';
import { extract } from '@app/i18n';
import { SignupSuccessComponent } from './signup-success/signup-success.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'signup-success',
        component: SignupSuccessComponent,
      },
    ],
    data: { title: extract('Signup') },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class SignupRoutingModule {}
