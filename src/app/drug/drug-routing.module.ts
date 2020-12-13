import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { DrugComponent } from './drug.component';
import { extract } from '@app/i18n';
import { DrugSearchComponent } from './drug-search/drug-search.component';
import { DrugResultComponent } from './drug-result/drug-result.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'drug',
      component: DrugComponent,
      data: { title: extract('Drug') },
      children: [
        { path: '', redirectTo: 'search', pathMatch: 'full' },
        { path: 'search', component: DrugSearchComponent },
        { path: 'results', component: DrugResultComponent },
      ],
    },
  ]),
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class DrugRoutingModule {}
