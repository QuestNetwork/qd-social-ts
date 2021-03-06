import { Component, OnInit, Input,ViewChild, ChangeDetectorRef} from '@angular/core';
import { QuestOSService } from '../../../qDesk/src/app/services/quest-os.service';

// import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
//
// import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import swarmJson from '../swarm.json';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() pubKey: string;


  constructor(private aChD: ChangeDetectorRef, private q: QuestOSService) {
    //parse channels
  }
  DEVMODE = swarmJson['dev'];

  noProfileSelected = "NoProfileSelected";

  ngOnInit(): void {

    console.log("Profile: Initializing...");

    //load channel
    console.log("Profile: Bootstrapping Profile...");

    this.select(this.pubKey);

    this.isConnection = this.q.os.social.isFavorite(this.pubKey);
    console.log('qSocial Profile: ',this.q.os.social.isRequestedFavorite(this.pubKey));
    this.isRequestedConnection = this.q.os.social.isRequestedFavorite(this.pubKey);

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
    console.log("Selecting profile...",profileId)
    // console.log(this.q.os.social.getProfile(profileId));

    try{
     let socialComb = await this.q.os.social.getProfile(profileId);
     if(socialComb['key']['pubKey'] != profileId){
       this.pubKey = socialComb['key']['pubKey'];
     }

     console.log(this.pubKey);

     this.isMyProfile = this.q.os.social.isMyProfileId(this.pubKey);
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

     this.aChD.detectChanges();

    }catch(e){console.log(e)}
  }

  private = true;
  isConnection = false;
  isRequestedConnection = false;
  requestLock = false;
  async setConnection(v){
    if(this.requestLock){
      return false;
    }
    this.requestLock = true;
    // this.isConnection = v;
    if(v){
      let mpk = await this.q.os.social.getMyProfileId();
      console.log('qSocial: trying to add New Favorite Request...',this.pubKey);
      if(!this.q.os.social.isRequestedFavorite(this.pubKey)){
        let chName = await this.q.os.channel.create('qprivatedch-'+mpk+'-'+this.pubKey,"",true);
        this.q.os.social.addFavoriteRequest(this.pubKey,chName);
        this.isRequestedConnection = v;
        this.requestLock = false;
      }
    }
    else{
      //remove also the channelList
      // this.q.os.channel.remove(this.q.os.social.getRequestedFavoriteChannel(this.pubKey));
      let channel = this.q.os.channel.find(this.pubKey);
      this.q.os.channel.remove(channel);
      this.q.os.social.removeFavorite(this.pubKey);
      this.q.os.social.removeFavoriteRequest(this.pubKey);
      this.isRequestedConnection = v;
      this.isConnection = v;
      this.requestLock = false;
    }
  }
  async  togglePrivacy(){
    if(!this.isMyProfile){
      return false;
    }

    await this.q.os.social.togglePrivacy(this.pubKey);

    if(this.private){
      this.private = false;
    }
    else{
      this.private = true;
    }
  }


  async openMessages(pubKey){
    let channelName = this.q.os.channel.find(pubKey);
    this.q.os.channel.select(channelName);
    this.q.os.ui.toTabIndex('1');
  }



}
