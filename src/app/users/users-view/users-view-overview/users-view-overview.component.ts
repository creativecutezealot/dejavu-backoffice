import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js'; 
import { UsersViewPointsService } from '../users-view-points/users-view-points.service';
import { UsersService } from '../../users.service';
@Component({
  selector: 'app-users-view-overview',
  templateUrl: './users-view-overview.component.html',
  styleUrls: ['./users-view-overview.component.css']
})
export class UsersViewOverviewComponent implements OnInit {
  @Input('data') user;
  points_remaining:number;
  constructor( private usersViewPointsService:UsersViewPointsService,
    private usersService:UsersService) { }

  ngOnInit() {

    this.usersService.getOverview(this.user._id).subscribe(resp=>{
      if(resp.winlose.total_win > 0 || resp.winlose.total_lose >0){
      this.loadWinLoseChart(resp.winlose)
      }
    })
    

    
  this.usersViewPointsService.getBalance(this.user._id).subscribe(resp=>{
    this.points_remaining = resp.remaining;
  });
  
}//end

loadWinLoseChart(data){
  var WinLoseChartCtx  = document.getElementById("WinLoseChart");
    var WinLoseChart = new Chart(WinLoseChartCtx, {
      type: 'pie',
      data: {
        datasets: [{
            data: [data.total_win, data.total_lose],
            backgroundColor:["#40C057","#FA5252"]
        }],
        labels: [
            'Win',
            'Lose'
        ]
    },
   });
}//end

}
