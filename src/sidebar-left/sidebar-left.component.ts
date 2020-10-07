import { Component, OnInit } from '@angular/core';
import { QuestOSService } from '../../../qDesk/src/app/services/quest-os.service';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'social-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SocialSidebarLeftComponent implements OnInit {
  constructor(private sidebarService: NbSidebarService,private q: QuestOSService){}


  showAlgo(name){
    if(this.q.os.bee.config.getSideBarFixed()['left']){
      this.sidebarService.collapse('left');
    }
    this.q.os.social.algo.select(name);
    this.selectedStream = name;
  }


  ngOnInit(): void {
  }

  selectedStream = 'Network';

}
