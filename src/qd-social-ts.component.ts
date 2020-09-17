import { Component, ViewChild, ElementRef, Inject, AfterContentInit,ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'quest-messenger-root',
  templateUrl: './qd-social-ts.component.html',
  styleUrls: ['./qd-social-ts.component.scss']
})
export class QDSocialComponent {
  constructor( ){}

  selectedProfile = "NoProfileSelected";

}
