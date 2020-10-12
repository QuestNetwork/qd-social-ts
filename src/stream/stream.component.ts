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
  selector: 'app-social-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  pubKey = "NoProfileSelected";

  postList = [ ]




  constructor(private _sanitizer: DomSanitizer, private dialog:NbDialogService, private cd: ChangeDetectorRef, private q: QuestOSService) {
    //parse channels
  }
  DEVMODE = swarmJson['dev'];

  @Input() buttonTitle: string = '';
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




    syncSub = {};
    groupedTimeline = [];
    replyTree = {};
    syncStatus = true;
    updateListen(){
      this.groupedTimeline = [];
        this.replyTree = {};

      // this.q.os.ui.showSnack('Syncing Timeline...','Please Wait');
      if(typeof this.syncSub['all'] == 'undefined'){
        this.syncSub['all'] = this.q.os.social.timeline.agent.onSync('all').subscribe( async(timeline) => {
          this.syncStatus = false;

        if(typeof timeline != 'undefined' && typeof timeline['groupedTimeline'] != 'undefined'){

          this.replyTree = {};
          this.groupedTimeline = [];
          this.replyTree = JSON.parse(JSON.stringify(timeline['replyTree']));
          this.groupedTimeline = JSON.parse(JSON.stringify(timeline['groupedTimeline']));
          // console.log(this.groupedTimeline);
          this.q.os.ui.showSnack('Stream Synced!','Yeah',{duration: 1000});
          this.cd.detectChanges();

          setTimeout( () => {
            //update timeline
            this.cd.detectChanges();

          },2000);

          setTimeout( () => {
            //update timeline
            this.cd.detectChanges();

          },5000);

          setTimeout( () => {
            //update timeline
            this.syncStatus = true;
            this.cd.detectChanges();

          },10000);
        }
        else{
          this.syncStatus = true;

        }
      });
    }
    }


    ngOnDestroy(){
      let keys = Object.keys(this.syncSub);
      for(let key of keys){
        this.syncSub[key].unsubscribe();
      }
    }

   async ngOnInit(){
     this.updateListen();
     await this.q.os.social.timeline.agent.sync('all');

  }

 async ngOnChanges(){
   this.updateListen();
   await this.q.os.social.timeline.agent.sync('all');
 }


  searchBarClicked(){
    if(this.searchResults.length > 0){
      // this.searchResultsActive = true;
    }
  }

  async syncMore(){
    this.q.os.ui.showSnack('Syncing Stream...','Please Wait');
    await this.q.os.utilities.delay(1000);
    let limit = this.q.os.social.timeline.agent.getLimit('all');
    limit += 5;
    this.q.os.social.timeline.agent.sync('all', {limit: limit});
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
