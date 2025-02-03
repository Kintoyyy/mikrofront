import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component,Input } from '@angular/core';

@Component({
  selector: 'app-iradio-data',
  templateUrl: './radio-data.component.html',
  styleUrls: ['./radio-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class RadioDataComponent implements AfterContentInit {
  @Input() raddata: any;
  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  objectlen(object:any){
    return Object.keys(object).length;
  }
  strangth_at_rate_extract(data:string){
    return data.split(',');
  }
  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }
}
