import { Component, OnInit,NgZone } from '@angular/core';
import { QuestOSService } from '../../../qDesk/src/app/services/quest-os.service';
import { NbSidebarService } from '@nebular/theme';
import { Router,NavigationEnd, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'social-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SocialSidebarLeftComponent implements OnInit {
  constructor(private router:Router,private ngZone:NgZone,private sidebarService: NbSidebarService,private q: QuestOSService){}


  showAlgo(name){
    if(this.q.os.bee.config.getSideBarFixed()['left']){
      this.sidebarService.collapse('left');
    }

    // this.q.os.social.algo.select(name);
    this.selectedStream = name;

    this.ngZone.run(() => this.router.navigate(['/social/stream/'+name.toLowerCase()]));



  }


  ngOnInit(): void {
  }

  selectedStream = 'Network';

}
