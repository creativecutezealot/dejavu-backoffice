import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Games } from '../models/games/games.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GamesService } from './games.service';
import { GamesResult } from '../models/games/games-result.model';
import { TeamsService } from '../teams/teams.service';
import { Teams } from '../models/teams/teams.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  private subscription: Subscription;
  private dataSubjectSubscription: Subscription;
  data: Games[];

  onProgress = false;
  isMaxLoad = false;
  method: string = "add";
  data_form: FormGroup;
  selectedData: Games;
  filter_form: FormGroup;
  q = "";
  teams:Teams[];
  filter_date_m;
  filter_games: Games = new Games();
  selectedGames:Games;
  constructor(
    private modalConfig: NgbModalConfig,
    private modalService: NgbModal,
    private dataService: GamesService,
    private teamsService: TeamsService,
    private router:Router
  ) {
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
    this.teamsService.getAll().subscribe(data=>{
      this.teams = data;
    });
    
  }


  ngOnInit() {
    this.filter_form = new FormGroup({
      'filter_date': new FormControl(""),
      'Season': new FormControl(""),
      'Schedule': new FormControl(""),
      'Status': new FormControl(""),
      'InningHalf': new FormControl(""),
      'Inning': new FormControl(""),
      'AwayTeam': new FormControl(""),
      'HomeTeam': new FormControl(""),
    });
    this.loadData();
  }

  loadData() {

    this.onProgress = true;
    this.subscription = this.dataService.get(1,this.filter_games).subscribe(
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

    this.dataSubjectSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  onAdd(content) {
    this.openModal('add', content);
  }

  openModal(sec, content) {

    if (sec == 'add') {
      this.method = 'add';
      this.data_form = new FormGroup({
        'from': new FormControl("", Validators.required),
        'to': new FormControl(""),
        'check_desc': new FormControl("", Validators.required),
        'comments': new FormControl(""),

      });
    }


    if (sec == "edit") {
      this.method = 'edit';
     /* this.data_form = new FormGroup({
        'from': new FormControl(this.selectedData., Validators.required),
        'to': new FormControl(this.selectedData.to),
        'check_desc': new FormControl(this.selectedData.check_desc, Validators.required),
        'comments': new FormControl(this.selectedData.comments),
      });*/
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "lg" }).result.then((result) => {

    }, (reason) => {

    });

  }//end

  onSelect(data: Games, content) {

    this.selectedData = data;
    this.openModal('edit', content);
  }

  onSelectGame(data:Games){
    //this.selectedGames = data;
    this.router.navigate(["/admin/games/view/",data._id]);
  }
  onBack(){
    this.selectedGames = null;
  }
  
  onCancel() {
    this.modalService.dismissAll();
  }


  onReload(){
    this.onProgress = true;
   

      this.filter_games.Season = this.filter_form.get('Season').value;
      this.filter_games.Status = this.filter_form.get('Status').value;
      this.filter_games.InningHalf = this.filter_form.get('InningHalf').value;
      this.filter_games.Inning = this.filter_form.get('Inning').value;
      this.filter_games.AwayTeam = this.filter_form.get('AwayTeam').value;
      this.filter_games.HomeTeam = this.filter_form.get('HomeTeam').value;
      if(this.filter_date_m=="" || this.filter_date_m == undefined){

      this.filter_games.DateTime = undefined;
      }else{
        this.filter_games.DateTime = new Date(this.filter_date_m.year,this.filter_date_m.month-1,this.filter_date_m.day);
  
      }
      
    this.subscription = this.dataService.get(1, this.filter_games).subscribe(
      (resp) => {
        this.dataService.data = resp.data;
        this.dataService.dataSubject.next(resp);
        this.onProgress = false;
      },
      (error) => {
        this.onProgress = false;
      });
  }

  

  onSearch(event,filter) {
    this.onProgress = true;
    if(filter=='season'){

      this.filter_games.Season = event.target.value;
      
    }
    if(filter=='status'){
      this.filter_games.Status = event.target.value;
    }
    if(filter=='inning_half'){
      this.filter_games.InningHalf = event.target.value;
    }
    if(filter=='inning'){
      this.filter_games.Inning = event.target.value;
    }
    if(filter=='away_team'){
      this.filter_games.AwayTeam = event.target.value;
    }
    if(filter=='home_team'){
      this.filter_games.HomeTeam = event.target.value;
    }
    if(filter=='filter_date_reset'){
      this.filter_date_m = '';
      this.filter_games.DateTime = undefined;
    }
    if(filter=="filter_date"){
      
      this.filter_games.DateTime = new Date(this.filter_date_m.year,this.filter_date_m.month-1,this.filter_date_m.day);

    }
    this.subscription = this.dataService.get(1, this.filter_games).subscribe(
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
      this.dataService.get(this.dataService.page, this.filter_games).subscribe(
        (resp) => {
          this.onProgress = false;
          this.dataService.data.push(...resp.data);
          this.dataService.dataSubject.next(new GamesResult(
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
