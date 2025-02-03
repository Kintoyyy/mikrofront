import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";

import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  ButtonGroupModule,
  ToastModule,
  TooltipModule,
  NavModule, 
  TabsModule,
} from "@coreui/angular";
import { ClonerRoutingModule } from "./cloner-routing.module";
import { ClonerComponent } from "./cloner.component";
import { GuiGridModule } from "@generic-ui/ngx-grid";

import { NgxSuperSelectModule} from "ngx-super-select";

@NgModule({
  imports: [
    ClonerRoutingModule,
    CardModule,
    CommonModule,
    GridModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    GuiGridModule,
    ModalModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSuperSelectModule,
    ToastModule,
    TooltipModule,
    NavModule, 
    TabsModule,
  ],
  declarations: [ClonerComponent],
})
export class ClonerModule {}
