import { QuestOSService } from '../../../qDesk/src/app/services/quest-os.service';

import {
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';

import { BarcodeFormat } from '@zxing/library';
import {NbDialogService } from '@nebular/theme';


import { DomSanitizer } from '@angular/platform-browser';

import { NbComponentStatus } from '@nebular/theme';
// import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
//
// import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import swarmJson from '../swarm.json';


@Component({
  selector: 'social-timeline-post-combined-timeline',
  templateUrl: './timeline-post-combined-timeline.component.html',
  styleUrls: ['./timeline-post-combined-timeline.component.scss']
})
export class TimelinePostCombinedTimelineComponent implements OnInit {

  pubKey = "NoProfileSelected";

  postList = [ ]

  @Input() combinedTimeline = [];

  constructor(private _sanitizer: DomSanitizer, private dialog:NbDialogService, private cd: ChangeDetectorRef, private q: QuestOSService) {
    //parse channels
  }
  DEVMODE = swarmJson['dev'];

replyTree = []
@Input() isMyProfile = false;
   async ngOnInit(){

     if(typeof this.combinedTimeline[0]['replyTo'] != 'undefined'){
       this.replyTree = await this.q.os.social.timeline.agent.resolveReplyTreeRec(this.combinedTimeline[0]);
       console.log(this.replyTree);
     }
     // this.updateListen();
     // await this.q.os.social.timeline.agent.sync('all');
     // this.isMyProfile = this.q.os.social.profile.isMyProfileId(combine.pubKey);
  }

 async ngOnChanges(){
   // this.updateListen();
   // await this.q.os.social.timeline.agent.sync('all');
 }



}
