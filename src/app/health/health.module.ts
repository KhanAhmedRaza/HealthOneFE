import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthRoutingModule } from './health-routing.module';
import { HealthComponent } from './health.component';
import { MentalHealthComponent } from './mental-health/mental-health.component';

@NgModule({
  declarations: [HealthComponent, MentalHealthComponent],
  imports: [CommonModule, HealthRoutingModule],
})
export class HealthModule {}
