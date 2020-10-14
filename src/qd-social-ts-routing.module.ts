import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QDSocialComponent } from './qd-social-ts.component';

import { ProfileComponent } from './profile/profile.component';
import { StreamComponent } from './stream/stream.component';
import { TimelinePostComponent } from './timeline-post/timeline-post.component';


const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch:'full' },
  { path: '', component: QDSocialComponent, children: [
    { path: 'profile/:pubKey', component: ProfileComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'stream/:algoName', component: StreamComponent },
    { path: 'timeline/post/:qHash', component: TimelinePostComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QDSocialRoutingModule { }
