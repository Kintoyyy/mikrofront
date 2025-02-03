import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component,Input } from '@angular/core';
import { dataProvider } from "../../../providers/mikrowizard/data";
@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ActiveUsersComponent implements AfterContentInit {
  @Input() active_users: any;
  @Input() devid: number;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private data_provider: dataProvider,
  ) {}
  killsession(item:any){
    console.log(item);
    this.data_provider.killSession(this.devid,item).then((res) => {
      this.active_users = res;
    });
  }
  ngAfterContentInit(): void {

    this.changeDetectorRef.detectChanges();
  }
}
