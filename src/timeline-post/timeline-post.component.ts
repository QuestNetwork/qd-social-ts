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
  selector: 'social-timeline-post',
  templateUrl: './timeline-post.component.html',
  styleUrls: ['./timeline-post.component.scss']
})
export class TimelinePostComponent implements OnInit {

  pubKey = "NoProfileSelected";

  postList = [ ]


  constructor(private _sanitizer: DomSanitizer, private dialog:NbDialogService, private cd: ChangeDetectorRef, private q: QuestOSService) {
    //parse channels
  }
  DEVMODE = swarmJson['dev'];


  @Input() buttonTitle: string = '';
  @Input() qHash: string = '';

  status: NbComponentStatus | '' = '';
  inputFocus: boolean = false;
  inputHover: boolean = false;



  searchPhrase ="";
  searchResults = [];

  searchResultsActive = false;
  noProfileSelected = "NoProfileSelected";



    parseSearchBar(){
      if(this.searchPhrase.length > 0){
        this.search();
      }
      else{
        // this.searchResultsActive = false;
        this.cd.detectChanges();
      }
    }

    timeline;

      async search(){
        this.searchResults = await this.q.os.social.timeline.search(this.searchPhrase);
        if(this.searchResults.length > 0){
          this.timeline = this.searchResults;
        }
        else{
          this.timeline = this.q.os.social.timeline.get();
        }
        this.cd.detectChanges();
      }


    syncSub;
    @Input() replies = [];
    @Input() groupedTimeline = [];
    @Input() replyTree;

    syncStatus = false;

    updateListen(){
      this.syncingStatus = false;
      console.log('QD Social Timeline Post: Subscribing To Sync..',this.qHash);
      if(typeof this.syncSub != 'undefined'){
        this.syncSub.unsubscribe();
      }
      this.syncSub = this.q.os.social.timeline.agent.onSync('all').subscribe( async(timeline) => {



        try{
        console.log(timeline['timeline']);
        this.groupedTimeline = [];
        this.replies = [];
        this.replyTree = [];



        let t = timeline['timeline'];
        for(let p of t){

          if(p['replyTo'] == this.qHash){
            this.replies.push(p)
          //   this.cd.detectChanges();
          }

          if(p['qHash'] == this.qHash){
            this.groupedTimeline.push([p]);
            // this.cd.detectChanges();
          }

        }

        this.replyTree = timeline['replyTree'];
        this.syncingStatus = true;
        console.log('QD Social Timeline Post View: Replies Synced!');
        this.q.os.ui.showSnack('Replies Synced!','Yeah',{duration: 1000});
        this.cd.detectChanges();

        setTimeout( () => {
          //update timeline
          this.cd.detectChanges();

        },2000);



        setTimeout( () => {
          //update timeline
          this.cd.detectChanges();

        },6000);



        setTimeout( () => {
          //update timeline
          this.cd.detectChanges();

        },10000);

        setTimeout( () => {
          //update timeline
          this.cd.detectChanges();

        },15000);
      }
      catch(e){
        console.log(e);
      }

      });
    }

    syncingStatus = false;


   async ngOnInit(){
     this.q.os.ui.showSnack('Syncing Replies...','Please Wait');
     this.cd.detectChanges();


      // this.groupedTimeline = [];
      //       this.replyTree = [];
      //       this.replies = [];
      //
      // this.updateListen();
      // await this.q.os.social.timeline.agent.sync('all');
      // this.syncingStatus = false;
      // this.cd.detectChanges();
  }

  async ngOnChanges(){
    this.q.os.ui.showSnack('Syncing Replies...','Please Wait');

    this.groupedTimeline = [];
          this.replyTree = [];
          this.replies = [];

    this.updateListen();
    await this.q.os.social.timeline.agent.sync('all', {limit: 0});
    this.syncingStatus = false;



  }
   ngOnDestroy(){
    if(typeof this.syncSub != 'undefined'){
      this.syncSub.unsubscribe();
    }
  }


  searchBarClicked(){
    if(this.searchResults.length > 0){
      // this.searchResultsActive = true;
    }
  }



    @ViewChild('qrPop') qrPop;
    @ViewChild('createPop') createPop;



    popupRef = [];
    open(dialog: TemplateRef<any>) {
          this.popupRef.push(this.dialog.open(dialog, { context: 'this is some additional data passed to dialog' }));
      }
    closePopup(){
      console.log('close toggled');
      // for(i=0;i<this.popupRef.length;i++){
        this.popupRef[this.popupRef.length-1].close();
        this.popupRef.pop();
      // }
    }




}
