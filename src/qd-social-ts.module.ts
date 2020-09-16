import { QDSocialRoutingModule } from './qd-social-ts-routing.module';
import { QDSocialComponent } from './qd-social-ts.component';


import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {ClipboardModule} from '@angular/cdk/clipboard';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatTreeModule} from '@angular/material/tree';
import { FlexLayoutModule } from '@angular/flex-layout'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';

import { HttpClientModule } from '@angular/common/http';



import { NbDialogService } from '@nebular/theme';
import { NbChatModule } from '@nebular/theme';
import { NbSidebarModule,NbMenuModule } from '@nebular/theme';

import { FsIconComponent } from './nb-fs-icon/nb-fs-icon.component';
import { MatMenuComponent } from './mat-menu/mat-menu.component';



import { ProfileComponent } from './profile/profile.component';

import {MatIconModule} from '@angular/material/icon';




import { NbLayoutModule, NbTabsetModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule,    NbCardModule } from '@nebular/theme';
import { NbThemeModule, NbContextMenuModule,  NbDialogModule} from '@nebular/theme';


@NgModule({
  declarations: [

    QDSocialComponent,
    MatMenuComponent,

    FsIconComponent,
    ProfileComponent
  ],
  imports: [
  NbSidebarModule,
    CdkTableModule,
    CdkTreeModule,
    NbMenuModule,
    ClipboardModule,
    HttpClientModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    CommonModule,
    QDSocialRoutingModule,
    FontAwesomeModule,
    NbThemeModule,
    NbLayoutModule,
    NbChatModule,
    NbTabsetModule,
    NbEvaIconsModule,
    NbIconModule,
    FormsModule,
    NbContextMenuModule,
    NbDialogModule.forRoot(),
    NbCardModule,
    MatTreeModule,
    DragDropModule,
    MatButtonModule,
   MatCheckboxModule,
   MatInputModule,
   MatFormFieldModule,
   ZXingScannerModule,
   MatSliderModule,
   FlexLayoutModule,
   MatIconModule


  ],
  exports: [
    QDSocialComponent,
    CdkTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTreeModule,
    MatMenuModule,
    ],
  providers: [
  NbDialogService
  ],
  bootstrap: [QDSocialComponent]
})
export class QDSocialModule { }
