import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { GamesUsers } from 'src/app/models/games-users/games-users.model';
import { FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { GameUsersService } from './game-users.service';
import { GamesService } from '../games.service';
import { GamesUsersResult } from 'src/app/models/games-users/games-users-result.model';

@Component({
  selector: 'app-game-users',
  templateUrl: './game-users.component.html',
  styleUrls: ['./game-users.component.css']
})
export class GameUsersComponent implements OnInit {
  @Input('data') games;
  

  private subscription: Subscription;
  private reloadSubscription: Subscription;
  private dataSubjectSubscription: Subscription;
  data: GamesUsers[];

  onProgress = false;
  isMaxLoad = false;
  method: string = "add";
  data_form: FormGroup;
  selectedData: GamesUsers;
  filter_form: FormGroup;
  q = "";

  filter_date_m;
  filter_data: GamesUsers = new GamesUsers();

  constructor(
    private modalConfig: NgbModalConfig,
    private modalService: NgbModal,
    private dataService: GameUsersService,
    private gameService: GamesService
  ) {
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
 
   this.reloadSubscription = this.gameService.reloadDataSubject.subscribe(()=>{
        this.loadData();
    });
  }


  ngOnInit() {
    
    this.loadData();
  }

  loadData() {

    this.onProgress = true;
    this.subscription = this.dataService.get(this.games._id,1,this.filter_data).subscribe(
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

  ngOnDestroy() {
    this.reloadSubscription.unsubscribe();
    this.dataSubjectSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  onAdd(content) {
    this.openModal('add', content);
  }

  openModal(sec, content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "lg" }).result.then((result) => {

    }, (reason) => {

    });

  }//end

  onSelect(data: GamesUsers, content) {

    this.selectedData = data;
    this.openModal('edit', content);
  }



  onCancel() {
    this.modalService.dismissAll();
  }




  

  onSearch(event,filter) {
    this.onProgress = true;
 
  
  
 
    this.subscription = this.dataService.get(this.games._id,1, this.filter_data).subscribe(
      (resp) => {
        this.dataService.data = resp.data;
        this.dataService.dataSubject.next(resp);
        this.onProgress = false;
      },
      (error) => {
        this.onProgress = false;
      });

  }
  onLoadMore() {
    if (this.dataService.page < this.dataService.total_page) {
      this.onProgress = true;
      this.dataService.page++;
      this.dataService.get(this.games._id,this.dataService.page, this.filter_data).subscribe(
        (resp) => {
          this.onProgress = false;
          this.dataService.data.push(...resp.data);
          this.dataService.dataSubject.next(new GamesUsersResult(
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

}
