import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UsersViewGamePlayedBetsService } from './users-view-game-played-bets.service';
import { FormGroup, FormControl } from '@angular/forms';
import { BetsResult } from 'src/app/models/bets/bets-result.model';
import { Subscription } from 'rxjs';
import { Bets } from 'src/app/models/bets/bets.model';

@Component({
  selector: 'app-users-view-game-played-bets',
  templateUrl: './users-view-game-played-bets.component.html',
  styleUrls: ['./users-view-game-played-bets.component.css']
})
export class UsersViewGamePlayedBetsComponent implements OnInit, OnDestroy {
  @Input('data') user;
  @Input('gameTable') gameTable;
  @Output('closed') closed = new EventEmitter<boolean>();
  private subscription: Subscription;
  private dataSubjectSubscription: Subscription;
  method: string;
  onProgress = false;
  isMaxLoad = false;
  data: Bets[];
  filter_form: FormGroup;
  q = "";
  total_win: number = 0;
  total_lose: number = 0;
  filter_place: string;
  filter_passline: string;
  filter_win: string;
  constructor(private dataService: UsersViewGamePlayedBetsService) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.loadData();
    this.loadOverview();
    this.filter_form = new FormGroup({
      'place': new FormControl(""),
      'passline': new FormControl(""),
      'win': new FormControl(""),
    })
  }

  loadOverview() {
    this.dataService.getOverview(this.user._id, this.gameTable._id).subscribe(resp => {
      this.total_win = resp.total_win;
      this.total_lose = resp.total_lose;
    });
  }

  loadData() {
    this.onProgress = true;
    this.subscription = this.dataService.get(this.user._id, this.gameTable._id, 1).subscribe(
      (resp) => {
        this.dataService.data = resp.data;
        this.dataService.dataSubject.next(resp);
        this.onProgress = false;
      },
      (error) => {
        this.onProgress = false;
      });

    this.dataSubjectSubscription = this.dataService.dataSubject.subscribe((resp) => {

      this.data = resp.data;
      this.dataService.total_page = resp.total_page;
      this.dataService.total_result = resp.total_result;
      this.dataService.page = resp.page;
      if (this.dataService.total_page == 0) {
        this.isMaxLoad = true;
      } else {
        if (this.dataService.page == this.dataService.total_page) {
          this.isMaxLoad = true;
        } else {
          this.isMaxLoad = false;
        }
      }
    });
  }

  onSearch(event,filter) {
    this.onProgress = true;
    if(filter=='place'){
      this.filter_place = event.target.value;
    }
    if(filter=='passline'){
      this.filter_passline = event.target.value;
    }
    if(filter=='win'){
      this.filter_win = event.target.value;
    }
    
    this.subscription = this.dataService.get(this.user._id,this.gameTable._id,1,this.filter_place,this.filter_passline,this.filter_win).subscribe(
      (resp) => {
        this.dataService.data = resp.data;
        this.dataService.dataSubject.next(resp);
        this.onProgress = false;
      },
      (error) => {
        this.onProgress = false;
      });

      this.dataService.getOverview(this.user._id, this.gameTable._id,this.filter_place,this.filter_passline,this.filter_win).subscribe(resp => {
        this.total_win = resp.total_win;
        this.total_lose = resp.total_lose;
      });

  }


  onLoadMore() {
    if (this.dataService.page < this.dataService.total_page) {
      this.onProgress = true;
      this.dataService.page++;
      this.dataService.get(this.user._id, this.gameTable._id, this.dataService.page,this.filter_place,this.filter_passline,this.filter_win).subscribe(
        (resp) => {
          this.onProgress = false;
          this.dataService.data.push(...resp.data);
          this.dataService.dataSubject.next(new BetsResult(
            this.dataService.total_result,
            this.dataService.total_page,
            this.dataService.page,
            this.dataService.data
          ));
        }, (error) => {
          this.onProgress = false;

        }
      )

    }//end
  }

  onBack() {
    this.closed.next(true);
  }

}
