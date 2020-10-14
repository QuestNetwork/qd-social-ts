import { Component, ViewChild, ElementRef, Inject, AfterContentInit,ChangeDetectorRef, Input, NgZone } from '@angular/core';
import { QuestOSService } from '../../qDesk/src/app/services/quest-os.service';
import { NbSidebarService } from '@nebular/theme';

import { Router,NavigationEnd, ActivatedRoute  } from '@angular/router';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'quest-messenger-root',
  templateUrl: './qd-social-ts.component.html',
  styleUrls: ['./qd-social-ts.component.scss']
})
export class QDSocialComponent {

  // activateRoutes(){
  //   if(this.router.url.indexOf('/social/timeline') > -1 || this.router.url.indexOf('/social/stream/') > -1){
  //     this.routeActive = true;
  //   }
  //   else{
  //     this.routeActive = false;
  //   }
  // }

  constructor(private ngZone:NgZone,private cd: ChangeDetectorRef, private sidebarService: NbSidebarService,private q: QuestOSService,private activatedRoute: ActivatedRoute, private router: Router){
    // console.log(this.router.url);
    // this.activateRoutes();

    // this.router.events.pipe(
    //            filter(event => event instanceof NavigationEnd)
    //        ).subscribe(() => {
    //          // this.activateRoutes();
    //        });
    }


  initRnd = 0;

  sideBarFixedSub;
sideBarVisibleSub;
postActive = false
routeActive = true;
  async ngOnInit() {



    let selectedProfile = this.q.os.social.profile.getSelected();
    if(typeof selectedProfile != 'undefined'){
      this.selectedProfile = selectedProfile;
      this.postActive = false;
    }
    // this.q.os.social.profile.onSelect().subscribe( (selected) => {
    //   this.selectedProfile = selected;
    //   this.postActive = false;
    //   this.routeActive = false;
    // })

    // this.q.os.social.timeline.post.onSelect().subscribe( async(selected) => {
    //   console.log('QD Social: Selecting Post..',selected);
    //   this.postActive = true;
    //   this.streamsActive = false;
    //   this.selectedPost = selected;
    //   this.cd.detectChanges();
    // })


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




      this.sidebarService.onCollapse().subscribe(() => {
        console.log('collapsed')
        if(this.sideBarFixed['left']){
          this.sideBarVisible['left'] = false;
          this.sideBarLockedClass = "";
        }
        else{
          this.sideBarLockedClass = this.sideBarLockedClassA;
        }
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
      if( this.sideBarVisible[side] ){
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
  selectedPost = "NoPostSelected";



  goToMyProfile(){
    // this.q.os.social.profile.select('NoProfileSelected');
    this.ngZone.run(() => this.router.navigate(['/social/profile']));


    if(this.sideBarFixed['left']){
      this.sideBarVisible['left'] = false;
      this.sideBarLockedClass = "";
      this.sidebarService.collapse('left');
    }
    else{
      this.sideBarLockedClass = this.sideBarLockedClassA;
    }
  }


}
