import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RadioDataComponent } from './radio-data.component';

const routes: Routes = [
  {
    path: '',
    component: RadioDataComponent,
    data: {
      title: 'Widgets'
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadioDataRoutingModule {
}
