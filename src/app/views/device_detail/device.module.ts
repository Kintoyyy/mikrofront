import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ProgressModule,
  NavbarModule,
  AlertModule,
  ModalModule,
  TableModule, 
  UtilitiesModule,
  BadgeModule,
  NavModule, 
  TabsModule,
  SpinnerModule,
} from "@coreui/angular";
import { ChartjsModule } from "@coreui/angular-chartjs";

import { DeviceRoutingModule } from "./device-routing.module";
import { DeviceComponent } from "./device.component";
import { GuiGridModule } from "@generic-ui/ngx-grid";

import { WidgetsModule } from "../widgets/widgets.module";
import { DeviceInfoModule } from "./device-info/device-info.module";
import { DhcpInfoModule } from "./dhcp-info/dhcp-info.module";
import { DevLogsModule } from "../device_logs/devlogs.module";
import { PingStatsModule } from "./ping-status/ping-status.module";
import { ActiveUsersModule } from "./active-users/active-users.module";
import { AuthModule } from "../auth_log/auth.module";
import { AccModule } from "../acc_log/acc.module";
@NgModule({
  imports: [
    DeviceRoutingModule,
    CardModule,
    AlertModule,
    CommonModule,
    GridModule,
    ProgressModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    WidgetsModule,
    DeviceInfoModule,
    DhcpInfoModule,
    DevLogsModule,
    PingStatsModule,
    ActiveUsersModule,
    AuthModule,
    AccModule,
    SpinnerModule,
    GuiGridModule,
    NavbarModule,
    ModalModule,
    TableModule, 
    UtilitiesModule,
    BadgeModule,
    NavModule, 
    TabsModule,
  ],
  declarations: [DeviceComponent],
})
export class DeviceModule {}
