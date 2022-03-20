import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { GamesService } from '../games.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit {
  @Input('data') games;
  selectedNav:string;
  constructor(private gameService:GamesService,private route:ActivatedRoute,private router:Router) { 
    this.selectedNav = "overview";
  }

  ngOnInit() {
  
    this.loadData();
  }

  loadData(){
    this.gameService.getShow(this.route.snapshot.params['id']).subscribe(data=>{
        this.games = data;
      
    });
  }

  onReload(){
    this.loadData();
    this.gameService.reloadDataSubject.next();
  }

  onBack(){
   this.router.navigate(["admin/games"]);
  }

  selectNav(selected:string){
    this.selectedNav = selected;
  }

}
