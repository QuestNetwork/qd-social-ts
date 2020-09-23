import { Component, ViewChild, ElementRef, Inject, AfterContentInit,ChangeDetectorRef } from '@angular/core';
import { QuestOSService } from '../../qDesk/src/app/services/quest-os.service';

@Component({
  selector: 'quest-messenger-root',
  templateUrl: './qd-social-ts.component.html',
  styleUrls: ['./qd-social-ts.component.scss']
})
export class QDSocialComponent {
  constructor(private q: QuestOSService){}

  ngOnInit(){
    let selectedProfile = this.q.os.social.getSelected();
    if(typeof selectedProfile != 'undefined'){
      this.selectedProfile = selectedProfile;
    }
    this.q.os.social.onSelect().subscribe( (selected) => {
      this.selectedProfile = selected;
    })
  }

  selectedProfile = "NoProfileSelected";

}
