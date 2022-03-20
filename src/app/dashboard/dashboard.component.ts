import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { TopPlayersResult } from '../models/dashboard/top-players-result.model';
import { Chart } from 'chart.js'; 
import { GameBets } from '../models/bets/game-bets.model';
import { first } from 'rxjs-compat/operator/first';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  total_users = 0;
  total_win = 0;
  total_lose = 0;
  top_players: TopPlayersResult[];
  game_bets:GameBets[];
  game_bets_count:GameBets[];
  constructor(private dashboardService:DashboardService) { }

  ngOnInit() {
    this.dashboardService.getNumberPlayers().subscribe(resp=>{
      this.total_users = resp.total_users;
    });
    this.dashboardService.getTotalWinLoseOverview().subscribe(resp=>{
      this.total_win = resp.total_win;
      this.total_lose = resp.total_lose;
      this.loadWinloseOverviewChart(resp);
    });
    this.dashboardService.getTopPlayers().subscribe(resp=>{
        this.top_players = resp.data;
        
    });
    this.dashboardService.getBetsOverview().subscribe(resp=>{
        this.game_bets = resp;
        this.game_bets = this.game_bets.map(item=>{
          if(item.label!=""){
            return item;
          }
        });

        this.loadbetsOverviewChart(resp,"betsOverviewChart");
    })
    this.dashboardService.getBetsCountOverview().subscribe(resp=>{
      this.game_bets_count = resp;
      this.loadbetsOverviewChart(resp,"betsOverviewCountChart");
    })
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

  }//end

  loadbetsOverviewChart(data,elId){
    var betsOverviewChartCtx  = document.getElementById(elId);
    var passline = 0;
    var come = 0;
    var ground_out = 0;
    var hit = 0;
    var strikeout = 0;
    var walk = 0;
    var infield_fly = 0;
    var fly_out = 0;
    var place_8_ways = 0;
    var first_to_home = 0;
   
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
          if(item._id == "place_8_ways"){
            place_8_ways = item.total;
          }
          if(item._id == "first_to_home"){
            first_to_home = item.total;
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
              data: [passline,come,ground_out,hit,strikeout,walk,infield_fly,fly_out,place_8_ways,first_to_home],
              backgroundColor:[
              "#FFA94D",
              "#40C057",
              "#FA5252",
              "#C92A2A",
              "#FFEB3B",
              "#1976D2",
              "#5E35B1",
              "#00ACC1",
              "#f57242",
              "#9c42f5",

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
              '8 Ways',
              'First to Home',
          ]
      },
     });
  }//end

}
