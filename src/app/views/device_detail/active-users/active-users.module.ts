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
import { ActiveUsersComponent } from './active-users.component';

@NgModule({
  declarations: [
    ActiveUsersComponent,
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
    ActiveUsersComponent,
  ]
})
export class ActiveUsersModule {
}
