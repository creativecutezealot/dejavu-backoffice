import { Component, OnInit, Input } from '@angular/core';
import { GamePlaysService } from '../games-plays/games-plays.service';
import { Plays } from 'src/app/models/plays/plays.model';
import { GamesService } from '../games.service';
import { Chart } from 'chart.js'; 

@Component({
  selector: 'app-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.css']
})
export class GameOverviewComponent implements OnInit {
  @Input('data') games;
  lastPlay:Plays;
  loadbetsOverviewData;
  loadWinloseOverviewData;
  loadBetsPerPlaceWinLoseData;
  constructor(private gameService:GamesService,private gamesPlaysService:GamePlaysService) { 
    this.gameService.reloadDataSubject.subscribe(()=>{
      this.loadData();
    })
  }

  ngOnInit() {
    this.loadData();
  }
  
  loadData(){
    this.gamesPlaysService.getLastPlay(this.games._id).subscribe(data=>{
      this.lastPlay = data;
    });
    this.gameService.getBetsOverview(this.games._id).subscribe(resp=>{
      this.loadbetsOverviewData = resp;
       
        this.loadbetsOverviewChart(resp);
    });
    this.gameService.getBetsWinLoseOverview(this.games._id).subscribe(resp=>{
      this.loadWinloseOverviewData = resp;
      this.loadWinloseOverviewChart(resp);
    });
    this.gameService.getBetsPerPlaceWinLoseOverview(this.games._id).subscribe(resp=>{
      //console.log(resp);
      this.loadBetsPerPlaceWinLoseData = resp;
      //console.log(resp);
      setTimeout(()=>{
        this.loadBetsPerPlaceWinLose(resp);
      },1000);
      
    });
  }//end

  loadBetsPerPlaceWinLose(data){
    for(var i =0;i < data.length;i++){
      var item = data[i];
      var chart =  document.getElementById(item.key+"WinLoseChart");
     

      new Chart(chart, {
        type: 'pie',
        data: {
          datasets: [{
              data: [item.total_win,item.total_lose],
              backgroundColor:[
              "#40C057",
              "#C92A2A",
            ]
          }],
          labels: [
              'Win',
              'Lose',   
          ]
      }
     });

    }
  }

  loadWinloseOverviewChart(data){
    var betsWinloseChartCtx =  document.getElementById("betsWinloseChart");
    var total_win = data?data.total_win:0;
    var total_lose = data?data.total_lose:0;
    if(data){
    
      if(betsWinloseChartCtx==undefined){
        return false;
      }
     
      new Chart(betsWinloseChartCtx, {
        type: 'pie',
        data: {
          datasets: [{
              data: [total_win,total_lose],
              backgroundColor:[
              "#40C057",
              "#C92A2A",
            ]
          }],
          labels: [
              'Win',
              'Lose',   
          ]
      }
     });
    }

  }

  loadbetsOverviewChart(data){
    var betsOverviewChartCtx  = document.getElementById("betsOverviewChart");
    var passline = 0;
    var come = 0;
    var ground_out = 0;
    var hit = 0;
    var strikeout = 0;
    var walk = 0;
    var infield_fly = 0;
    var fly_out = 0;
   
      if(data.length>0){
        for(var i=0;i<data.length;i++){
          var item = data[i];
        
          if(item._id == "passline"){
            passline = item.total;
          }
          if(item._id == "come"){
            come = item.total;
          }
          if(item._id == "ground_out"){
            ground_out = item.total;
          }
          if(item._id == "hit"){
            hit = item.total;
          }
          if(item._id == "k"){
            strikeout = item.total;
          }
          if(item._id == "bb"){
            walk = item.total;
          }
          if(item._id == "infield_fly"){
            infield_fly = item.total;
          }
          if(item._id == "fly_out"){
            fly_out = item.total;
          }
        }
      }

      if(betsOverviewChartCtx==undefined){
        return false;
      }

      new Chart(betsOverviewChartCtx, {
        type: 'pie',
        data: {
          datasets: [{
              data: [passline,come,ground_out,hit,strikeout,walk,infield_fly,fly_out],
              backgroundColor:[
              "#FFA94D",
              "#40C057",
              "#FA5252",
              "#C92A2A",
              "#FFEB3B",
              "#1976D2",
              "#5E35B1",
              "#00ACC1"

            ]
          }],
          labels: [
              'Passline',
              'Come',
              'Ground Out',
              'Hit',
              'Strikeout',
              'Walk',
              'Infield Fly',
              'Fly Out',
          ]
      },
     });
  }//end

}
