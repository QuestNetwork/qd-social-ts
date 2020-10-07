import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'social-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SocialSidebarLeftComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectedStream = 'Network';

}
