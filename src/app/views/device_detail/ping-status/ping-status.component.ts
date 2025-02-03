import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component,Input } from '@angular/core';

@Component({
  selector: 'app-ping-stats',
  templateUrl: './ping-status.component.html',
  styleUrls: ['./ping-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PingStatsComponent implements AfterContentInit {
  @Input() ping: any;
  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterContentInit(): void {

    this.changeDetectorRef.detectChanges();
  }
}
