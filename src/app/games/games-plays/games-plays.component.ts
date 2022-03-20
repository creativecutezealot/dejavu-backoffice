import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GamePlaysService } from '../games-plays/games-plays.service';
import { Subscription } from 'rxjs';
import { Plays } from 'src/app/models/plays/plays.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlaysResult } from 'src/app/models/plays/plays-result.model';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-games-plays',
  templateUrl: './games-plays.component.html',
  styleUrls: ['./games-plays.component.css']
})
export class GamePlaysComponent implements OnInit,OnDestroy {
  @Input('data') games;


  private subscription: Subscription;
  private reloadSubscription: Subscription;
  private dataSubjectSubscription: Subscription;
  data: Plays[];

  onProgress = false;
  isMaxLoad = false;
  method: string = "add";
  data_form: FormGroup;
  selectedData: Plays;
  filter_form: FormGroup;
  q = "";

  filter_date_m;
  filter_plays: Plays = new Plays();

  constructor(
    private modalConfig: NgbModalConfig,
    private modalService: NgbModal,
    private dataService: GamePlaysService,
    private gameService: GamesService
  ) {
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
 
   this.reloadSubscription = this.gameService.reloadDataSubject.subscribe(()=>{
        this.loadData();
    });
  }


  ngOnInit() {
    this.filter_form = new FormGroup({
      'InningHalf': new FormControl(""),
      'Inning': new FormControl(""),
    });
    this.loadData();
  }

  loadData() {

    this.onProgress = true;
    this.subscription = this.dataService.get(this.games._id,1,this.filter_plays).subscribe(
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

  onSelect(data: Plays, content) {

    this.selectedData = data;
    this.openModal('edit', content);
  }



  onCancel() {
    this.modalService.dismissAll();
  }

  onSearch(event,filter) {
    this.onProgress = true;
 
    if(filter=='inning_half'){
      this.filter_plays.InningHalf = event.target.value;
    }
    if(filter=='inning'){
      this.filter_plays.InningNumber = event.target.value;
    }
  
 
    this.subscription = this.dataService.get(this.games._id,1, this.filter_plays).subscribe(
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
      this.dataService.get(this.games._id,this.dataService.page, this.filter_plays).subscribe(
        (resp) => {
          this.onProgress = false;
          this.dataService.data.push(...resp.data);
          this.dataService.dataSubject.next(new PlaysResult(
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
