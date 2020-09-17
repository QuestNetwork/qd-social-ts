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




  @Input() pubKey: string;


  constructor(private _sanitizer: DomSanitizer, private aChD: ChangeDetectorRef, private ui: UiService, private q: QuestOSService) {
    //parse channels
  }
  DEVMODE = swarmJson['dev'];

  noProfileSelected = "NoProfileSelected";

  ngOnInit(): void {

    console.log("Profile: Initializing...");

    //load channel
    console.log("Profile: Bootstrapping Profile...");
    this.select(this.pubKey);

  }


  alias = "Anonymous";
  fullName = "Anonymous";
  about = "The Universe is under no obligation to make sense to you. I'd rather not say anything. do@not-find-me.com";

  editDetails = false;
  newAlias;
  newFullName;
  newAbout;
  edit(value = true){

    if(value){
      this.newAlias = this.alias;
      this.newFullName = this.fullName;
      this.newAbout = this.about;
    }

    this.editDetails = value;
  }

  save(){
    let socialComb = { private: this.private, alias: this.newAlias, fullName: this.newFullName, about: this.newAbout};
    this.q.os.social.saveProfile(this.pubKey,socialComb);
    this.select(this.pubKey);
    this.edit(false);
  }

  isMyProfile = false;
  async select(profileId){
    console.log("Selecting profile...")
    // console.log(this.q.os.social.getProfile(profileId));

    try{
     let socialComb = await this.q.os.social.getProfile(profileId);
     if(socialComb['key']['pubKey'] != profileId){
       this.pubKey = socialComb['key']['pubKey'];
     }

     console.log(this.pubKey);

     this.isMyProfile = this.q.os.social.isMyProfile(this.pubKey);
     console.log('Social: Is my profile:',this.isMyProfile);

     if(typeof socialComb['alias'] != 'undefined'){
       this.alias = socialComb['alias'];
     }
     if(typeof socialComb['fullName'] != 'undefined'){
       this.fullName = socialComb['fullName'];
     }
     if(typeof socialComb['about'] != 'undefined'){
       this.about = socialComb['about'];
     }
     if(typeof socialComb['private'] != 'undefined'){
       this.private = socialComb['private'];
     }

    }catch(e){console.log(e)}
  }

  private = true;
async  togglePrivacy(){
    await this.q.os.social.togglePrivacy(this.pubKey);

    if(this.private){
      this.private = false;
    }
    else{
      this.private = true;
    }
  }



}
