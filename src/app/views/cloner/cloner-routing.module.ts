import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClonerComponent } from './cloner.component';

const routes: Routes = [
  {
    path: '',
    component: ClonerComponent,
    data: {
      title: $localize`synchronization and cloner` 
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClonerRoutingModule {
}
