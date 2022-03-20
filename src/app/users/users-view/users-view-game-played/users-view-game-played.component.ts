import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersGames } from 'src/app/models/users-games/users-games.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersViewGamesPlayedService } from './users-view-game-played.service';

import { UsersGamesResult } from 'src/app/models/users-games/users-games-result.model';

@Component({
  selector: 'app-users-view-game-played',
  templateUrl: './users-view-game-played.component.html',
  styleUrls: ['./users-view-game-played.component.css']
})
export class UsersViewGamePlayedComponent implements OnInit {
  @Input('data') user;
  private subscription: Subscription;
  private dataSubjectSubscription: Subscription;
  data: UsersGames[];
  method: string;
  data_form: FormGroup;
  onProgress = false;
  isMaxLoad = false;
  selectedData: UsersGames;
  filter_form: FormGroup;
  q = "";
  total_win:number = 0;
  total_lose:number = 0;
  selectedGameTable:UsersGames;
  constructor(private modalConfig: NgbModalConfig,
    private modalService: NgbModal,
    private dataService: UsersViewGamesPlayedService){
      this.modalConfig.backdrop = 'static';
      this.modalConfig.keyboard = false;
  }
  ngOnInit(){
    this.loadData();
    this.loadOverview();
  }

  loadOverview(){
    this.dataService.getOverview(this.user._id).subscribe(resp=>{
      this.total_win = resp.total_win;
      this.total_lose = resp.total_lose;
    });
  }

  onSelectGame(gameTable:UsersGames){
    this.selectedGameTable = gameTable;
  }

  loadData() {
  this.onProgress = true;
    this.subscription = this.dataService.get(this.user._id, 1).subscribe(
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

  onLoadMore() {
    if (this.dataService.page < this.dataService.total_page) {
      this.onProgress = true;
      this.dataService.page++;
      this.dataService.get(this.user._id, this.dataService.page, this.q).subscribe(
        (resp) => {
          this.onProgress = false;
          this.dataService.data.push(...resp.data);
          this.dataService.dataSubject.next(new UsersGamesResult(
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

  onBack(){
      this.selectedGameTable = null;
  }



}
