import { QuestOSService } from '../../../qDesk/src/app/services/quest-os.service';

import {
  ChangeDetectionStrategy,
  OnInit,
  OnChanges,
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

import {NbDialogService } from '@nebular/theme';


import { DomSanitizer } from '@angular/platform-browser';

import { NbComponentStatus } from '@nebular/theme';
// import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
//
// import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-social-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePostComponent implements OnInit,OnChanges {
  @Input() postObj = { id:"123",timestamp:0,content:"Demo", dTimestamp: "" };
  @Input() isMyProfile = false;

  profile = {};
  dev = false;
  selectedNode = "";
  replyCount = 0;
  reply(qHash){
    this.selectedNode = qHash;
    this.cd.detectChanges();
  }
  cancel(){
    this.selectedNode = "";
  }

  selectPost(qHash){
    this.q.os.social.timeline.post.select(qHash);
  }



    addEmoji($event, qHash = ""){
      // let data = this.emojiForm.get('inputField');
      // data.patchValue(data.value + $event.emoji.native)
      if(typeof this.reply[qHash] == 'undefined'){
        this.reply[qHash] = $event.emoji.colons + ' ';
      }
      else{
        this.reply[qHash] +=  ' ' + $event.emoji.colons + ' ';
      }

      this.cd.detectChanges();

    }

    imeline = [];

    async post(qHash){
      this.q.os.ui.showSnack('Syncing Timeline...','Please Wait');
      let mp = await this.q.os.social.profile.getMyProfile();
      //console.log(mp);
      if(typeof mp['alias'] == 'undefined'){
        alert('Please set your Alias first!');
        throw('no name set')
      }

      let postObj = { content: this.reply[qHash], socialPubKey: mp['key']['pubKey'], replyTo: qHash };
      await this.q.os.social.timeline.post.new(postObj);

      this.selectedNode = "";
      this.reply[qHash] = "";
      this.cd.detectChanges();

      setTimeout( () => {
        this.q.os.social.timeline.agent.reload();
        //update timeline
        this.cd.detectChanges();

      },2000);
    }


  postRows


  async ngOnInit(){
    if(typeof this.postObj['content'] != 'undefined'){


      this.postRows = this.getArray(this.postObj['content']);
      this.postObj['dTimestamp'] = new Date(this.postObj['timestamp']).toString();

      this.replyCount = this.q.os.social.timeline.agent.getReplyCount(this.postObj['qHash']);

      //console.log('qD Social ProfilePost: Getting profile...',this.postObj['socialPubKey'])
      try{
      this.profile = await this.q.os.social.profile.get(this.postObj['socialPubKey']);
      if(typeof this.profile['alias'] == 'undefined'){
        this.profile['alias'] = "Anonymous";
      }
      if(typeof this.profile['timestamp'] == 'undefined'){
        this.profile['timestamp'] = 0;
      }



    }catch(e){ this.profile = { alias: 'Anonymous', timestamp: 0 }; }

  //  console.log(this.postRows );

      this.cd.detectChanges();
    }
  }
  async ngOnChanges(){
    if(typeof this.postObj['content'] != 'undefined'){
      this.postRows = this.getArray(this.postObj['content']);
      this.postObj['dTimestamp'] = new Date(this.postObj['timestamp']).toString();
      this.profile = await this.q.os.social.profile.get(this.postObj['socialPubKey']);
      this.cd.detectChanges();
    }
  }

  constructor(private _sanitizer: DomSanitizer, private dialog:NbDialogService, private cd: ChangeDetectorRef, private q: QuestOSService) {
    //parse channels
  }

  postDelete(postObj){
    console.log('qD Social/Profile: Deleting...',postObj);
    this.q.os.social.timeline.post.delete(postObj['qHash'], postObj['socialPubKey']);
    this.postObj['timestamp'] = 0;
    this.postObj['dTimestamp'] = "";
  }

  getArray(message){
    let messageArray = [];
    let inputArray =  [];

    let inputRows =  [];
    let rows = [];

    let inputString =  String(message).trim();

    try{
      let replacers = [ '\n:', '\n :', '\n  :'];
      for(let replacer of replacers){
        inputString = inputString.replace(new RegExp(replacer,"g"),' :');
      }

    }catch(e){}



    try{

       let replacers = [ ':D', ':\\)', '=\\)', ':-\\)', '=D'];
       for(let replacer of replacers){
         inputString = inputString.replace(new RegExp(replacer,"g"),':grinning:');
       }

       let colonedEmojis = /:(?![\n])[()#$@-\w]+:/g
       let emojis = colonedEmojis.exec(inputString);
       // alert(emojis);
       for(let emoji of emojis){
         // console.log(emoji.substr(1,emoji.length-2));
         if(emoji.substr(1,emoji.length-2).indexOf(':') < 0){
           inputString = inputString.replace(emoji,' '+emoji+' ');
         }
       }
       // alert(inputString);


    }catch(e){this.dev && console.log(e); }

    inputRows =  inputString.trim().split('\n');
    rows = [];
    for(let row of inputRows){
      rows.push(row.trim().split(" "));
    }

    for(let i=0;i<rows.length;i++){
      for(let i2=0;i2<rows[i].length;i2++){

        let chunk = String(rows[i][i2]).trim();

        if(chunk.indexOf(':') == 0 && chunk.substr(1).indexOf(':') == chunk.length-2){
          let emojiChunk = { isEmoji: true, emojiColon: chunk.substr(1,chunk.length-2) };
          if(inputArray.length == 1){
            return emojiChunk;
          }
          rows[i][i2] = emojiChunk;
        }
        else{
          let thisChunk = { isEmoji: false, text: chunk }
          rows[i][i2] = thisChunk;
        }
      }
    }


    // setTimeout( () => {
    // },1000)

    return rows;



  }

}
