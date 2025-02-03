import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DhcpInfoComponent } from './dhcp-info.component';

const routes: Routes = [
  {
    path: '',
    component: DhcpInfoComponent,
    data: {
      title: 'Widgets'
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DhcpInfoRoutingModule {
}
