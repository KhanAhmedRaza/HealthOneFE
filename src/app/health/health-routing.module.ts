import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HealthComponent } from './health.component';
import { Shell } from '@app/shell/shell.service';
import { extract } from '@app/i18n';

const routes: Routes = [
  Shell.childRoutes([{ path: 'health', component: HealthComponent, data: { title: extract('Health') } }]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HealthRoutingModule {}
