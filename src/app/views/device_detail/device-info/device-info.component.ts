import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component,Input } from '@angular/core';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DeviceInfoComponent implements AfterContentInit {
  @Input() devdata: any;
  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  checkitem(item: any) {
    if (item.value && !item.key.match("sensors|id|_availble|interfaces|active_users|ping|status|created|online|syslog_configured|port")) {
      return true;
    } else {
      return false;
    }
  }
  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }
}
