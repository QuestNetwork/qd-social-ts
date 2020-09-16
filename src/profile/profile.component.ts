import { Component, OnInit, Input,ViewChild, ChangeDetectorRef} from '@angular/core';
import { UiService} from '../../../qDesk/src/app/services/ui.service';
import { QuestOSService } from '../../../qDesk/src/app/services/quest-os.service';

import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import swarmJson from '../swarm.json';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {




  @Input() profile: string;


  constructor(private _sanitizer: DomSanitizer, private aChD: ChangeDetectorRef, private ui: UiService, private q: QuestOSService) {
    //parse channels
  }
  DEVMODE = swarmJson['dev'];

  noProfileSelected = "NoProfileSelected";

  ngOnInit(): void {

    console.log("Profile: Initializing...");

    //load channel
    console.log("Profile: Bootstrapping Profile...");
    if(this.profile != 'NoProfileSelected'){
      // this.attemptJoinChannel(this.channel);
    }
}


}
