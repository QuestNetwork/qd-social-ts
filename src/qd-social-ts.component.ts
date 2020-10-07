import { Component, ViewChild, ElementRef, Inject, AfterContentInit,ChangeDetectorRef } from '@angular/core';
import { QuestOSService } from '../../qDesk/src/app/services/quest-os.service';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'quest-messenger-root',
  templateUrl: './qd-social-ts.component.html',
  styleUrls: ['./qd-social-ts.component.scss']
})
export class QDSocialComponent {
  constructor(private sidebarService: NbSidebarService,private q: QuestOSService){}

  sideBarFixedSub;
sideBarVisibleSub;
  async ngOnInit() {

    let selectedProfile = this.q.os.social.profile.getSelected();
    if(typeof selectedProfile != 'undefined'){
      this.selectedProfile = selectedProfile;
    }
    this.q.os.social.profile.onSelect().subscribe( (selected) => {
      this.selectedProfile = selected;
      this.streamsActive = false;
    })



      this.sideBarFixed = this.q.os.bee.config.getSideBarFixed();
      this.sideBarVisible = this.q.os.bee.config.getSideBarVisible();
      console.log('toggling:',this.sideBarVisible);
      if(!this.sideBarVisible['left']){
        this.sideBarLockedClass = "";
        this.sidebarService.collapse('left');
      }
      else if(this.sideBarVisible['left']){
        if(!this.sideBarFixed['left']){
          this.sideBarLockedClass = this.sideBarLockedClassA;
        }
        this.sidebarService.expand('left');
      }
      if(!this.sideBarVisible['right']){
        this.sidebarService.collapse('right');
      }
      if(this.sideBarVisible['right']){
        this.sidebarService.expand('right');
      }

      this.sideBarFixedSub = this.q.os.bee.config.sideBarFixedSub.subscribe( (sideBarFixed) => {
        this.sideBarFixed = this.q.os.bee.config.getSideBarFixed();
      });

      this.sideBarVisibleSub = this.q.os.bee.config.sideBarVisibleSub.subscribe( (sideBarVisible) => {
        console.log('getting',sideBarVisible);
        this.sideBarVisible = this.q.os.bee.config.getSideBarVisible();
        if(!this.sideBarVisible['left']){
          this.sidebarService.collapse('left');
        }
        else if(this.sideBarVisible['left']){
          this.sidebarService.expand('left');
        }
        if(!this.sideBarVisible['right']){
          this.sidebarService.collapse('right');
        }
        if(this.sideBarVisible['right']){
          this.sidebarService.expand('right');
        }
    });



      setTimeout( () => {
            this.sideBarFixed = this.q.os.bee.config.getSideBarFixed();
            this.sideBarVisible = this.q.os.bee.config.getSideBarVisible();
            console.log('toggling:',this.sideBarVisible);
            if(!this.sideBarVisible['left']){
              this.sidebarService.collapse('left');
            }
            else if(this.sideBarVisible['left']){
              this.sidebarService.expand('left');
            }
            if(!this.sideBarVisible['right']){
              this.sidebarService.collapse('right');
            }
            if(this.sideBarVisible['right']){
              this.sidebarService.expand('right');
            }


      },100);


      this.q.os.social.algo.onSelect().subscribe( (name) => {
        this.streamsActive = true;
      });

    }





  sideBarFixed = { right: true, left: true };
  sideBarVisible = { right: false, left: true };


   lockSideBar(side,value){
     this.sideBarFixed[side] = value;
     this.q.os.bee.config.setSideBarFixed(this.sideBarFixed);
     if(!value){
       this.sideBarLockedClass = this.sideBarLockedClassA;
     }
     else{
       this.sideBarLockedClass = "";
     }

     this.q.os.bee.config.commitNow();
   }

    toggleSideBar(side) {
      this.sideBarVisible = this.q.os.bee.config.getSideBarVisible();
      if( this.sideBarVisible[side] == true ){
        this.sideBarVisible[side]  = false;
        this.sideBarLockedClass = "";
      }
      else{
        if(!this.sideBarFixed['left']){
          this.sideBarLockedClass = this.sideBarLockedClassA;
        }
        this.sideBarVisible[side]  = true;
      }
      this.q.os.bee.config.setSideBarVisible(this.sideBarVisible);
      this.q.os.bee.config.commitNow();
    }


  sideBarLockedClass = "";
  sideBarLockedClassA = "sideBarLocked";

  selectedProfile = "NoProfileSelected";
  streamsActive = false;
  goToMyProfile(){
    this.q.os.social.profile.select('NoProfileSelected');
    if(this.sideBarFixed['left']){
      this.sideBarVisible['left'] = false;
      this.sideBarLockedClass = "";
      this.sidebarService.collapse('left');
    }
    else{
      this.sideBarLockedClass = this.sideBarLockedClassA;
    }
  }
  toggleStreams(){
    if(!this.streamsActive){
      this.q.os.social.profile.select('NoProfileSelected');
    }
    this.streamsActive = !this.streamsActive;
  }


}
