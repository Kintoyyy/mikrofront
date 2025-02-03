import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PingStatsComponent } from './ping-status.component';

const routes: Routes = [
  {
    path: '',
    component: PingStatsComponent,
    data: {
      title: 'Widgets'
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PingStatsRoutingModule {
}
