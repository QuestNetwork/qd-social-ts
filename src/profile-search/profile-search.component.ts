import { Component, OnInit,NgZone, Input, ChangeDetectorRef } from '@angular/core';
import { QuestOSService } from '../../../qDesk/src/app/services/quest-os.service';
import { NbSidebarService } from '@nebular/theme';
import { Router,NavigationEnd, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'social-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.scss']
})
export class ProfileSearchComponent implements OnInit {
  constructor(private cd: ChangeDetectorRef, private router:Router,private ngZone:NgZone,private sidebarService: NbSidebarService,private q: QuestOSService){}

  @Input() mode = "big";

  showAlgo(name){
    if(this.q.os.bee.config.getSideBarFixed()['left']){
      this.sidebarService.collapse('left');
    }

    // this.q.os.social.algo.select(name);
    this.selectedStream = name;

    this.ngZone.run(() => this.router.navigate(['/social/stream/'+name.toLowerCase()]));



  }

  parseSearchBar(){
    if(this.searchPhrase.length > 0){
      this.search();
    }
    else{
      this.searchResultsActive = false;
      this.cd.detectChanges();
    }
  }


    searchBarClicked(){
      if(this.searchResults.length > 0){
        this.searchResultsActive = true;
      }
    }



      async openMessages(pubKey){
        let channelName = this.q.os.channel.find(pubKey);
        this.q.os.channel.select(channelName);
        this.ngZone.run(() => this.router.navigate(['/messages']));

      }


  searchPhrase ="";
  searchResults = [];
  async search(){
    console.log((this.searchPhrase);
    this.searchResults = await this.q.os.social.profile.search(this.searchPhrase);
    console.log(this.searchResults);
    if(this.searchResults.length > 0){
      this.searchResultsActive = true;
    }
    else{
      this.searchResultsActive = false;
    }
    this.cd.detectChanges();
  }


  searchResultsActive = false;


  ngOnInit(): void {
  }

  selectedStream = 'Network';

}
