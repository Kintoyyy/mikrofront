import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component,Input } from '@angular/core';
import { dataProvider } from "../../../providers/mikrowizard/data";
import { formatInTimeZone } from "date-fns-tz";

@Component({
  selector: 'app-dhcp-info',
  templateUrl: './dhcp-info.component.html',
  styleUrls: ['./dhcp-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DhcpInfoComponent implements AfterContentInit {
  @Input() dhcp_server_data: any;
  @Input() small_screen: boolean=false;
  @Input() columnMenu: any;
  @Input() sorting: any;
  @Input() searching: any;
  @Input() infoPanel: any;
  @Input() paging: any;
  @Input() rowSelectionMode: any;
  @Input() tz: any;
  dhcp_history:any;
  dhcp_history_modal: boolean = false;
  current_dhcp:any;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private data_provider: dataProvider,
  ) {}

  show_history(item:any) {
    var _self = this;
    this.data_provider.getDhcpHistory(item).then((res) => {
      _self.current_dhcp = item;
      this.dhcp_history = res.map((d: any) => {
        d.eventtime = formatInTimeZone(
          d.eventtime.split(".")[0] + ".000Z",
          _self.tz,
          "yyyy-MM-dd HH:mm:ss XXX"
        );
        return d;
      });
      this.dhcp_history_modal=!this.dhcp_history_modal;
    });
  }
  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }
}
