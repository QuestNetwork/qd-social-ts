import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QDProfileComponent } from './qd-profile-ts.component';

const routes: Routes = [
  { path: '', component: QDProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QDProfileRoutingModule { }
