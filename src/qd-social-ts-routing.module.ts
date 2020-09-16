import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QDSocialComponent } from './qd-social-ts.component';

const routes: Routes = [
  { path: '', component: QDSocialComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QDSocialRoutingModule { }
