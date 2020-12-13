import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrugRoutingModule } from './drug-routing.module';
import { DrugComponent } from './drug.component';
import { DrugSearchComponent } from './drug-search/drug-search.component';
import { DrugResultComponent } from './drug-result/drug-result.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { DrugService } from '@app/drug/drug.service';

@NgModule({
  imports: [CommonModule, DrugRoutingModule, NgbModule, ReactiveFormsModule],
  declarations: [DrugComponent, DrugSearchComponent, DrugResultComponent],
})
export class DrugModule {}
