import { QuestOSService } from '../../../qDesk/src/app/services/quest-os.service';

import {
  ChangeDetectionStrategy,
  OnInit,
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

  async updateStream(){
    try{
      this.postList = this.q.os.social.post.get();
    }catch(e){

    }

    this.cd.detectChanges();
  }


    parseSearchBar(){
      if(this.searchPhrase.length > 0){
        this.search();
      }
      else{
        // this.searchResultsActive = false;
        this.cd.detectChanges();
      }
    }



      async search(){
        this.searchResults = await this.q.os.social.post.search(this.searchPhrase);
        if(this.searchResults.length > 0){
          this.postList = this.searchResults;
        }
        else{
          this.postList = this.q.os.social.post.get();
        }
        this.cd.detectChanges();
      }




   ngOnInit(){
     // this.q.os.social.onSelect().subscribe( () => {
     //   setTimeout( () => {
     //     this.updateStream();
     //   },2000);
     // });
     this.updateStream();

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
