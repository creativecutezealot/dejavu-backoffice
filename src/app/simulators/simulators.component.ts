import { Component, OnInit, OnDestroy } from '@angular/core';
import { GamesService } from '../games/games.service';
import { Games } from '../models/games/games.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GamePlaysService } from '../games/games-plays/games-plays.service';
import { Plays } from '../models/plays/plays.model';
import { AppService } from '../app-service';


@Component({
  selector: 'app-simulators',
  templateUrl: './simulators.component.html',
  styleUrls: ['./simulators.component.css']
})
export class SimulatorsComponent implements OnInit, OnDestroy {

  games:any;
  dataForm: FormGroup;
  isPlaying: boolean = false;
  selectedInterval = 0;
  selectedPlayIndex = 0;
  plays = [];

  intervalTime;
  intervalTimeCounter;
  intervalTimeCounterIndex = 1;
  constructor(private gamesService: GamesService, private gamePlayService: GamePlaysService, private appService: AppService) {
    this.appService.init();
  }
  ngOnDestroy() {
    this.onStop();
  }
  ngOnInit() {
    this.dataForm = new FormGroup({
      'games': new FormControl("", Validators.required),
      'interval': new FormControl(""),
      'mode': new FormControl("", Validators.required),
      'selectedPlayIndex': new FormControl(0, Validators.required)
    })
    /*  this.gamesService.getAllTopFromPlays(50).subscribe(resp => {
      this.games = resp;
    });*/
    this.gamesService.getAllTop(50).subscribe(resp=>{
      this.games = resp;
      
    });
  }//end

  onChangeGame() {
    const id = this.dataForm.get('games').value;
   
    if (id != "") {
      var lastPlayID = -1;
      this.gamePlayService.getAll(id).subscribe(data => {

        this.plays = [];
        var temp_plays: Plays[] = [...data];

        for (var i = 0; i < temp_plays.length; i++) {
          
          var pitches = temp_plays[i].Pitches;
          var strikes = 0;
          var balls = 0;
          for(var x = 0;x < pitches.length; x++){
            var pitch = pitches[x];
            
            
            var pitchPlay:Plays = Object.assign({},temp_plays[i])//{...temp_plays[i]};
            pitchPlay.PlayID = lastPlayID;
            if(pitch.Strike==true){
              strikes++;
            }
            if(pitch.Ball==true){
              balls++;
            }
            pitchPlay.Strikes = strikes; 
            pitchPlay.Balls = balls; 

            if(x!=pitches.length-1){
              pitchPlay.Result = "";
              pitchPlay.Description = "";
            }

          //this.plays.push(pitchPlay);
            
          }
          this.plays.push(temp_plays[i]);
          lastPlayID = temp_plays[i].PlayID;
         

        }
      });
    }
  }//end

  onPlay(e) {
    this.isPlaying = !this.isPlaying;
    this.selectedInterval = this.dataForm.get('interval').value;

    if (this.isPlaying == true) {

      if (this.dataForm.get("mode").value == "auto") {
        this.intervalTime = setInterval(() => {
          if (this.selectedPlayIndex < this.plays.length) {

            this.onNextPlay(this.selectedPlayIndex);
          }
        }, (this.selectedInterval * 1000));
      }

      this.intervalTimeCounterIndex = this.selectedInterval;
      this.intervalTimeCounter = setInterval(() => {
        if (this.intervalTimeCounterIndex > 1) {
          this.intervalTimeCounterIndex--;
        } else {
          this.intervalTimeCounterIndex = this.selectedInterval;
        }
        this.appService.socket.emit('activate_simulator_game_in_progress', { game_id: this.dataForm.get('games').value, play_number: this.plays[this.selectedPlayIndex].PlayNumber - 1 })
      }, 1000);


    } else {
      clearInterval(this.intervalTime);
      clearInterval(this.intervalTimeCounter);
    }


  }//end


  onNextPlay(index) {
    this.selectedPlayIndex = index;
    let inning = this.plays[this.selectedPlayIndex].InningNumber;
    let play_id = this.plays[this.selectedPlayIndex].PlayID;
    let outs = this.plays[this.selectedPlayIndex].Outs;
    let game_status = "InProgress";


    var submit_play: Plays;
    if (this.plays[this.selectedPlayIndex].change_inning_half) {

      submit_play = new Plays();
      submit_play._id = this.plays[this.selectedPlayIndex - 1]._id;
      submit_play.HitterName = this.plays[this.selectedPlayIndex - 1].HitterName;
      submit_play.InningHalf = this.plays[this.selectedPlayIndex + 1].InningHalf;
      submit_play.Runner1ID = this.plays[this.selectedPlayIndex - 1].Runner1ID;
      submit_play.Runner2ID = this.plays[this.selectedPlayIndex - 1].Runner2ID;
      submit_play.Runner3ID = this.plays[this.selectedPlayIndex - 1].Runner3ID;
      inning = this.plays[this.selectedPlayIndex + 1].InningNumber;

    } else {
      submit_play = this.plays[this.selectedPlayIndex];
    }


    this.appService.socket.emit('set_simulator_roll_lastplay_v3', {
      lastplay: this.plays[this.selectedPlayIndex],
      game_id: this.dataForm.get('games').value,
      current_inning: inning,
      game_status: game_status,
      play_id: play_id,
      play: this.plays[this.selectedPlayIndex],
      outs: outs,
      is_final: (this.selectedPlayIndex == this.plays.length - 1)
    });

    if ((this.selectedPlayIndex == this.plays.length - 1)) {
      this.onStop();
    }

    document.getElementById("p" + (this.selectedPlayIndex)).className = "table-success";

    this.selectedPlayIndex++;
  }

  onStop() {
    this.isPlaying = false;
    this.plays = [];
    this.dataForm.get('games').setValue("");
    this.dataForm.get('interval').setValue("");
    this.selectedPlayIndex = 0;
    this.intervalTimeCounterIndex = 0;
    clearInterval(this.intervalTime);
    clearInterval(this.intervalTimeCounter);

    this.appService.socket.emit('activate_simulator_game_in_progress', { game_id: "-1" })
  }//end

  updateSelectedPlay(e) {
    if (e.target.value != "") {
      this.selectedPlayIndex = parseInt(e.target.value);
    } else {
      this.selectedPlayIndex = 0;
    }
  }

}
