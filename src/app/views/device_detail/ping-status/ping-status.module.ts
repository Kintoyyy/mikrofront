import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ProgressModule,
  NavbarModule,
  ModalModule,
  TableModule, 
  UtilitiesModule,
  BadgeModule,
  TooltipModule,
} from '@coreui/angular';

// import { WidgetsRoutingModule } from './widgets-routing.module';
import { PingStatsComponent } from './ping-status.component';

@NgModule({
  declarations: [
    PingStatsComponent,
  ],
  imports: [  
      CardModule,
      CommonModule,
      GridModule,
      ProgressModule,
      FormModule,
      ButtonModule,
      ButtonGroupModule,
      NavbarModule,
      ModalModule,
      TableModule, 
      UtilitiesModule,
      BadgeModule,
      TooltipModule,
  ],
  exports: [
    PingStatsComponent,
  ]
})
export class PingStatsModule {
}
