import { Component, OnInit } from '@angular/core';
import { QuestOSService } from '../../../qDesk/src/app/services/quest-os.service';

@Component({
  selector: 'social-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SocialSidebarLeftComponent implements OnInit {
  constructor(private q: QuestOSService) {
    //parse channels
  }


  showAlgo(name){
    this.q.os.social.algo.select(name);
    this.selectedStream = name;
  }


  ngOnInit(): void {
  }

  selectedStream = 'Network';

}
