import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { PlayEntriesService } from '../play-entries.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-play-entry',
  templateUrl: './play-entry.component.html',
  styleUrls: ['./play-entry.component.css']
})
export class PlayEntryComponent implements OnInit {

  constructor(private pe: PlayEntriesService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private coreService: CoreService, 
    private modalConfig: NgbModalConfig,
    private modalService: NgbModal) { }
  gameId: String;
  game: any;
  awayTeam: any;
  homeTeam: any;
  players: any;
  awayTeamPlayers = [];
  homeTeamPlayers = [];
  onProgress = false;
  playForm: FormGroup;
  
  // playResults = [
  //   'Strikeout Swinging',
  //   'Fly Out',
  //   'Strikeout Looking',
  //   'Single',
  //   'Ground Out',
  //   'Walk',
  //   "Fielder's Choice",
  //   'Double',
  //   'Ground Into Double Play',
  //   'Home Run',
  //   'Infield Fly Out',
  //   'Sacrifice Fly Out',
  //   'Sacrifice Ground Out',
  //   'Sacrifice Bunt Out',
  //   'Triple',
  //   'Reached On An Error'
  // ];
  playResults = [
    {
      item: [
        {
          result: 'Strikeout Swinging',
          out: 1,
          base: 0,
          desc: 'Struck Out Swinging',
          isDropDown: false
        },
        {
          result: 'Strikeout Looking',
          out: 1,
          base: 0,
          desc: 'Struck Out Looking',
          isDropDown: false
        },
      ],
      isDropDown: false
    },
    {
      item: [
        {
          result: 'Walk',
          base: 1,
          out: 0,
          desc: 'Walked',
          isDropDown: false
        },
        {
          result: 'Reached on an Error',
          base: 1,
          out: 0,
          desc: 'Reached Base On An Error',
          isDropDown: false,
          prompt: 'Update status of any base runners'
        },
      ],
      isDropDown: false
    },
    {
      item: [
        {
          result: 'Ground Out',
          out: 1,
          base: 0,
          desc: 'Grounded Out',
          isDropDown: false,
          prompt: 'Update status of any base runners'
        },
        {
          result: 'Ground Into Double Play',
          out: 2,
          base: 0,
          desc: 'Grounded Into A Double Play',
          isDropDown: false,
          prompt: 'Update status of any base runners'
        },
        {
          result: "Fielder's Choice",
          out: 1,
          base: 1,
          desc: 'Grounded Into A Feilder\'s Choice',
          isDropDown: false,
          prompt: 'Update status of any base runners'
        },
      ],
      isDropDown: false
    },
    {
      item: [
        {
          result: 'Sacrifice Ground Out',
          out: 1,
          base: 0,
          desc: 'Hit A Sacrafice Ground Out',
          isDropDown: false,
          prompt: 'Update status of any base runners'
        },
        {
          result: 'Sacrifice Bunt Out',
          out: 1,
          base: 0,
          desc: 'Sacrifice Bunted',
          isDropDown: false,
          prompt: 'Update status of any base runners'
        },
      ],
      isDropDown: false
    },
    {
      item: [
        {
          result: 'Infield Fly Out',
          out: 1,
          base: 0,
          desc: 'Flied Out To The Infield',
          isDropDown: false
        },
        {
          result: 'Fly Out',
          out: 1,
          base: 0,
          desc: 'Flied Out',
          isDropDown: false
        },
        {
          result: 'Sacrifice Fly Out',
          out: 1,
          base: 0,
          desc: 'Hit A Sacrifice Fly Out',
          isDropDown: false,
          prompt: 'Update status of any base runners'
        },
      ],
      isDropDown: false
    },
    {
      item: [
        {
          result: 'Single',
          base: 1,
          out: 0,
          desc: 'Singled',
          isDropDown: false,
          prompt: 'Update status of any base runners'
        },
        {
          result: 'Double',
          base: 2,
          out: 0,
          desc: 'Doubled',
          isDropDown: false,
          prompt: 'Update status of any base runners'
        },
        {
          result: 'Triple',
          base: 3,
          out: 0,
          desc: 'Tripled',
          isDropDown: false,
          prompt: 'Update status of any base runners'
        },
        {
          result: 'Home Run',
          base: 0,
          out: 0,
          desc: 'Hit A Home Run',
          isDropDown: false
        },
      ],
      isDropDown: false
    },
    {
      item: [
        {
          result: 'Batter\'s Interference',
          out: 1,
          base: 0,
          desc: 'Called Out On Batter\'s Interference',
          isDropDown: true
        },
        {
          result: 'Bunted Into Double Play',
          out: 2,
          base: 0,
          desc: 'Bunted Into A Double Play',
          isDropDown: true
        },
        {
          result: 'Catcher\'s Interference',
          base: 1,
          out: 0,
          desc: 'Reached Base On Catcher\'s Interference',
          isDropDown: true
        },
        {
          result: 'Fielder\'s Choice Double Play',
          out: 2,
          base: 1,
          desc: 'Grounded Into A Fielder\'s Choice Double Play',
          isDropDown: true
        },
        {
          result: 'Fielder\'s Interference',
          base: 1,
          out: 0,
          desc: 'Reached base on Fielder\'s Interference.',
          isDropDown: true
        },
        {
          result: 'Fly Out Into Double Play',
          out: 2,
          base: 0,
          desc: 'Flied Out Into A Double Play',
          isDropDown: true
        },
        {
          result: 'Foul Out',
          out: 1,
          base: 0,
          desc: 'Fouled Out',
          isDropDown: true
        },
        {
          result: 'Fouled Into Double Play',
          out: 2,
          base: 0,
          desc: 'Fouled Into A Double Play Fly Out',
          isDropDown: true
        },
        {
          result: 'Hit By Pitch',
          base: 1,
          out: 0,
          desc: 'Was Hit By A Pitch',
          isDropDown: true
        },
        {
          result: 'Intentional Walk',
          base: 1,
          out: 0,
          desc: 'Was Intentionally Walked',
          isDropDown: true
        },
        {
          result: 'Infield Fly Into Double Play',
          out: 2,
          base: 0,
          desc: 'Flied Into An Infield Double Play',
          isDropDown: true
        },
        {
          result: 'Sitrikeout Bunting',
          out: 1,
          base: 0,
          desc: 'Struck Out Bunting',
          isDropDown: true
        },
        {
          result: 'Triple Play',
          out: 3,
          base: 0,
          desc: 'Hit Into A Triple Play',
          isDropDown: true
        },
        {
          result: 'Advanced On Strikeout',
          base: 1,
          out: 0,
          desc: 'Advanced On A Dropped Third Strike',
          isDropDown: true
        }
      ],
      isDropDown: true
    }
  ];

  hitResult = [
    {
      result: 'Walk',
      base: 1,
      desc: 'walked'
    },
    {
      result: 'Single',
      base: 1,
      desc: 'singled'
    },
    {
      result: 'Fielder’s Choice',
      base: 1,
      desc: 'fielder\'s choice'
    },
    {
      result: 'Catcher\'s Interference',
      base: 1
    },
    {
      result: 'Intentional Walk',
      base: 1,
      desc: 'intentional walked'
    },
    {
      result: 'Reached on an Error',
      base: 1,
      desc: 'reached on error'
    },
    {
      result: 'Double',
      base: 2,
      desc: 'doubled'
    },
    {
      result: 'Triple',
      base: 3,
      desc: 'tripled'
    }
  ]

  selectedResult: String;
  selectedResultData: any;
  atBatError = false;
  atNextBatError = false;
  batters = [];
  addedOutFlag = false;
  currentGame: any;
  immutableGame: any;
  isSubmitted = false;
  lastPlay: String;
  currentPlay: any;
  immutablePlay: any;
  currentBatterTeam: any;
  currentBatter: any;
  awayBatters = [];
  homeBatters = [];
  onProgressAddBatter = false;
  btnCounter = 5;
  playResultsOpen = [];
  playResultsDropDown = [];
  gameCache: any;
  selectedUndoPlay: any;
  currentPitcherTeam: any;
  currentPitcher: any;
  awayPitchers = [];
  homePitchers = [];
  pitchers = [];
  ngOnInit() {
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
    this.playResultsOpen = this.playResults.filter(x => x.isDropDown == false)
    this.playResultsDropDown = this.playResults.filter(x => x.isDropDown == true)
    this.onProgress = true;
    this.route.params.subscribe(p => {
      if (p["id"]) {
        this.gameId = p["id"];
        this.setForm()
        this.getGameSchedule()
      } else {
        this.router.navigateByUrl("admin/play/game-schedules")
      }
    })
  }

  getGameSchedule() {
    this.pe.getSingleGameSchedule(this.gameId).subscribe(r => {
      console.log(r)
      if (r["data"] && r["data"].length > 0) {
        this.game = r["data"][0]
        this.awayTeam = this.game.AwayTeam;
        this.homeTeam = this.game.HomeTeam;
        this.fc.game_id.setValue(this.game._id)
        this.fc.team_a.setValue(this.awayTeam.Key)
        this.fc.team_b.setValue(this.homeTeam.Key)
        this.getTeamPlayers()
        this.getGame()
        this.getLineups()
        this.getBatters()  
        this.getPitchers()
      }
    })
  }

  getTeamPlayers() {
    this.pe.getTeamPlayers(this.awayTeam.TeamID, this.homeTeam.TeamID).subscribe(r => {
      if (r["data"] && r["data"].length > 0) {
        this.players = r["data"]
        this.awayTeamPlayers = this.players.filter(x => x.Team == this.awayTeam.Key)
        this.homeTeamPlayers = this.players.filter(x => x.Team == this.homeTeam.Key)
      }
    }).add(() => {
      this.onProgress = false;
    })

  }

  awayTeamLineups: any;
  homeTeamLineups: any;
  getLineups() {
    this.pe.getLineUps(this.awayTeam.TeamID).subscribe(r => {
      this.awayTeamLineups = r["data"] ? r["data"] : [];
    })

    this.pe.getLineUps(this.homeTeam.TeamID).subscribe(r => {
      this.homeTeamLineups = r["data"] ? r["data"] : [];
    })
  }

  setForm() {
    this.playForm = this.formBuilder.group({
      game_id: ['', Validators.required],
      game_status: ['', Validators.required],
      team_a: ['', Validators.required],
      score_a: [0, Validators.required],
      team_b: ['', Validators.required],
      score_b: [0, Validators.required],
      inning_number: [1, Validators.required],
      inning_half: ['T', Validators.required],
      balls: [0, Validators.required],
      strikes: [0, Validators.required],
      outs: [0, Validators.required],
      runneron_first: [''],
      runneron_second: [''],
      runneron_third: [''],
      description: [''],
      result: [''],
      betting_line: [''],
      lock_bet: [false]
    });
  }

  get fc() { return this.playForm.controls }

  submitPlay() {
    this.atNextBatError = false;
    // this.saveData();
    this.atBatError = false;
    if (this.isSubmitted == false) {
      this.isSubmitted = true;
      if (this.playForm.invalid || this.fc.game_status.value == "Scheduled") {
        window.scrollTo(0,0)
        this.isSubmitted = false;
        console.log(this.playForm)
        this.coreService.showAlertAutoClose("danger", 'Select a game status');
      } else {
        if (this.currentBatter) {
          this.saveData();
        } else {
          this.coreService.showAlertAutoClose("info", 'Please create a batter list.');
          window.scrollTo(0,0);
          this.isSubmitted = false;
          this.onProgress = false;
        }
      }
    }
  }

  addNumber(e, field) {
    e.preventDefault();
    switch (field) {
      case 'score_a':
        this.fc.score_a.setValue(parseInt(this.fc.score_a.value) + 1);
        break;
      case 'score_b':
        this.fc.score_b.setValue(parseInt(this.fc.score_b.value) + 1);
        break;
      case 'balls':
        if (this.fc.balls.value < 3) {
          this.fc.balls.setValue(parseInt(this.fc.balls.value) + 1);
        }
        break;
      case 'strikes':
        if (this.fc.strikes.value < 3) {
          this.fc.strikes.setValue(parseInt(this.fc.strikes.value) + 1);
        }
        break;
      case 'outs':
        if (this.fc.outs.value < 3) {
          this.fc.outs.setValue(parseInt(this.fc.outs.value) + 1);
        }
        break;
      default:
    }
  }

  subNumber(e, field) {
    e.preventDefault();
    switch (field) {
      case 'score_a':
        this.fc.score_a.value != 0
          ? this.fc.score_a.setValue(parseInt(this.fc.score_a.value) - 1)
          : null;
        break;
      case 'score_b':
        this.fc.score_b.value != 0
          ? this.fc.score_b.setValue(parseInt(this.fc.score_b.value) - 1)
          : null;
        break;
      case 'balls':
        this.fc.balls.value != 0
          ? this.fc.balls.setValue(parseInt(this.fc.balls.value) - 1)
          : null;
        break;
      case 'strikes':
        this.fc.strikes.value != 0
          ? this.fc.strikes.setValue(parseInt(this.fc.strikes.value) - 1)
          : null;
        break;
      case 'outs':
        this.fc.outs.value != 0
          ? this.fc.outs.setValue(parseInt(this.fc.outs.value) - 1)
          : null;
        break;
      default:
    }
  }

  selectResult(e, pr, obj) {
    e.preventDefault();
    // this.fc.description.setValue('');
    console.log(this.currentGame)
    if (this.currentBatter) {
      if (this.selectedResult && pr == this.selectedResult) {
        this.selectedResult = '';
        this.selectedResultData = {};
        this.fc.outs.setValue(this.currentGame.Outs == 3 ? 0 : this.currentGame.Outs)
        this.fc.runneron_first.setValue(this.currentGame.RunnerOnFirstName)
        this.fc.runneron_second.setValue(this.currentGame.RunnerOnSecondName)
        this.fc.runneron_third.setValue(this.currentGame.RunnerOnThirdName)
        this.fc.description.setValue('');
        
        this.fc.score_b.setValue(this.currentGame.HomeTeamRuns)
        this.fc.score_a.setValue(this.currentGame.AwayTeamRuns)
      } else {
        this.selectedResult = pr;
        this.selectedResultData = obj;
        this.fc.result.setValue(this.selectedResult);
        for(var b = 0; b < this.playResults.length; b++) {
        let i = this.playResults[b].item.findIndex(x => x.result == this.selectedResult)
          if (i != -1) {
            if (this.playResults[b].item[i].out) {
              // if(this.fc.outs.value < 3 && this.playResults[i].out) {
                if(this.currentGame.Outs == 3) {
                  this.fc.outs.setValue(this.playResults[b].item[i].out)
                } else {
                  console.log(this.playResults[b].item[i].out);
                  let o = parseInt(this.currentGame.Outs) + this.playResults[b].item[i].out
                  console.log(o)
                  this.fc.outs.setValue(o < 4 ? o : 3)
                }
              
              // }
            }
            
            // if((this.playResults[b].item[i].base)) {
              // this.fc.outs.setValue(this.currentGame.Outs)
              if (this.playResults[b].item[i].base) {
                this.fc.runneron_first.setValue(this.currentGame.RunnerOnFirstName)
                this.fc.runneron_second.setValue(this.currentGame.RunnerOnSecondName)
                this.fc.runneron_third.setValue(this.currentGame.RunnerOnThirdName)
                this.movePlayerToBase(this.playResults[b].item[i])
              }

              if (this.playResults[b].item[i].result == "Home Run") {
                this.homeRun()
              }
            // }
            
            if (this.currentBatter) {
              this.fc.description.setValue(this.currentBatter.Player.FirstName + " " + this.currentBatter.Player.LastName + " " + this.playResults[b].item[i].desc + this.fc.description.value)
            }
          }
        }
      }
    }

  }

  seeMore(e) {
    e.preventDefault();
  }

  inningOver(e) {
    e.preventDefault();
    this.switchBatter(this.currentBatterTeam == 'home' ? 'away' : 'home')
    this.fc.outs.setValue('0');
    this.fc.strikes.setValue('0');
    this.fc.balls.setValue('0');
    this.fc.runneron_first.setValue('');
    this.fc.runneron_second.setValue('');
    this.fc.runneron_third.setValue('');
    this.fc.description.setValue('');
    if (this.fc.inning_half.value == "B") {
      this.fc.inning_half.setValue("T")
      this.fc.inning_number.setValue(this.fc.inning_number.value + 1)
    } else {
      this.fc.inning_half.setValue("B")
    }
  }

  moveRunnerMessage = `You are moving a player to an occupied base.  Please update that player’s position first.`
  runnerOnBat = false;
  runnerOnFirstError = false;
  runnerOnSecondError = false;
  runnerOnThridError = false;
  moveRunner(e, runner, moveTo) {
    e.preventDefault()

    if (runner == 0 && this.currentBatter) {
      if (moveTo == 1) {
        if (this.fc.runneron_first.value == '') {
          this.fc.runneron_first.setValue(this.currentBatter.Player.FirstName + ' ' + this.currentBatter.Player.LastName)
        } else {
          this.runnerOnBat = true
          setTimeout(() => {
            this.runnerOnBat = false
          }, 3e3)
        }
      }

      if (moveTo == 2 && this.currentBatter) {
        if (this.fc.runneron_second.value == '') {
          this.fc.runneron_second.setValue(this.currentBatter.Player.FirstName + ' ' + this.currentBatter.Player.LastName)
        } else {
          this.runnerOnBat = true
          setTimeout(() => {
            this.runnerOnBat = false
          }, 3e3)
        }
      }

      if (moveTo == 3 && this.currentBatter) {
        if (this.fc.runneron_third.value == '') {
          this.fc.runneron_third.setValue(this.currentBatter.Player.FirstName + ' ' + this.currentBatter.Player.LastName)
        } else {
          this.runnerOnBat = true
          setTimeout(() => {
            this.runnerOnBat = false
          }, 3e3)
        }
      }
    }

    if (runner == 1 && this.fc.runneron_first.value != '') {
      if (moveTo == 2) {
        if (this.fc.runneron_second.value == '') {
          this.fc.runneron_second.setValue(this.fc.runneron_first.value)
          this.fc.runneron_first.setValue('')
        } else {
          this.runnerOnFirstError = true
          setTimeout(() => {
            this.runnerOnFirstError = false
          }, 3e3)
        }
      }

      if (moveTo == 3) {
        if (this.fc.runneron_third.value == '') {
          this.fc.runneron_third.setValue(this.fc.runneron_first.value)
          this.fc.runneron_first.setValue('')
        } else {
          this.runnerOnFirstError = true
          setTimeout(() => {
            this.runnerOnFirstError = false
          }, 3e3)
        }
      }
    }

    if (runner == 2 && this.fc.runneron_second.value != '') {
      if (moveTo == 3) {
        if (this.fc.runneron_third.value == '') {
          this.fc.runneron_third.setValue(this.fc.runneron_second.value)
          this.fc.runneron_second.setValue('')
        } else {
          this.runnerOnSecondError = true

          setTimeout(() => {
            this.runnerOnSecondError = false
          }, 3e3)
        }
      }
    }
  }

  out(e, runner) {
    e.preventDefault()
    if (runner == 1 && this.fc.runneron_first.value) {
      this.fc.description.setValue(this.fc.description.value + ", " + this.fc.runneron_first.value + ' out')
      this.fc.runneron_first.setValue('')
    }

    if (runner == 2 && this.fc.runneron_second.value) {
      this.fc.description.setValue(this.fc.description.value + ", " + this.fc.runneron_second.value + ' out')
      this.fc.runneron_second.setValue('')
    }

    if (runner == 3 && this.fc.runneron_third.value) {
      this.fc.description.setValue(this.fc.description.value + ", " + this.fc.runneron_third.value + ' out')
      this.fc.runneron_third.setValue('')
    }
  }

  scored(e, runner) {
    e.preventDefault()
    if (runner == 1 && this.fc.runneron_first.value) {
      this.fc.description.setValue(this.fc.description.value + ", " + this.fc.runneron_first.value + ' scored')
      this.fc.runneron_first.setValue('')
    }

    if (runner == 2 && this.fc.runneron_second.value) {
      this.fc.description.setValue(this.fc.description.value + ", " + this.fc.runneron_second.value + ' scored')
      this.fc.runneron_second.setValue('')
    }

    if (runner == 3 && this.fc.runneron_third.value) {
      this.fc.description.setValue(this.fc.description.value + ", " + this.fc.runneron_third.value + ' scored')
      this.fc.runneron_third.setValue('')
    }
  }

  clear($event, field) {
    this.fc[field].setValue('')
  }

  selectedPlayer: String;
  selectPlayer(e) {
    console.log(e)
    if (e) {
      this.selectedPlayer = e
    }
  }

  addBatter(saveGame = false) {
    if (this.selectedPlayer) {
      let data = {
        game_id: this.game._id,
        player_id: this.selectedPlayer,
        order_number: this.batters.length > 0 ? this.batters[this.batters.length - 1].order_number + 1 : 1
      }
      this.onProgressAddBatter = true;
      this.pe.saveBatter(data).subscribe(r => {
        console.log(r)
        this.getBatters(saveGame);
      }, error => {
        console.log(error)
      }).add(() => {
        this.onProgressAddBatter = false;
      })
    }
  }

  getBatters(saveGame = false, delCurrentBatter = false) {
    this.pe.getBatter(this.game._id).subscribe(r => {
      if (r["data"] && r["data"].length > 0) {
        this.batters = r["data"]

        this.awayBatters = this.batters.filter(x => x.Player.Team == this.awayTeam.Key)
        this.homeBatters = this.batters.filter(x => x.Player.Team == this.homeTeam.Key)
        this.currentBatterTeam = this.currentGame && this.currentGame.CurrentHittingTeamID ? this.currentGame.CurrentHittingTeamID : 'away'
        this.currentBatter = this.currentGame && this.currentGame.CurrentHittingTeamID == 'home' ? this.homeBatters[0] : this.awayBatters[0];

      } else {
        this.batters = []
        this.awayBatters = this.batters.filter(x => x.Player.Team == this.awayTeam.Key)
        this.homeBatters = this.batters.filter(x => x.Player.Team == this.homeTeam.Key)
        this.currentBatter = undefined
      }

      console.log("homeBatters")
      console.log(this.homeBatters)
      console.log("awayBatters")
      console.log(this.awayBatters)
    })
    .add(() => {
      if(saveGame) {
      this.saveData()
      }

      if(delCurrentBatter) {
        
        this.pe.deleteBatter(this.currentBatter._id).subscribe(r => {
          console.log('DELETE')
          this.selectedPlayer = this.currentBatter.Player._id;
          this.addBatter(true);
        })

      }
    })
    
  }

  getPitchers(saveGame = false, delCurrentPitcher = false) {
    this.pe.getPitchers(this.game._id).subscribe(r => {
      if (r["data"] && r["data"].length > 0) {
        this.pitchers = r["data"]

        this.awayPitchers = this.pitchers.filter(x => x.Player.Team == this.awayTeam.Key)
        this.homePitchers = this.pitchers.filter(x => x.Player.Team == this.homeTeam.Key)
        this.currentPitcherTeam = this.currentGame && this.currentGame.CurrentHittingTeamID == 'home' ? 'home' : 'away'
        this.currentPitcher = this.currentGame && this.currentGame.CurrentHittingTeamID == 'home' ? this.awayPitchers[0] : this.homePitchers[0];

      } else {
        this.batters = []
        this.awayPitchers = this.batters.filter(x => x.Player.Team == this.awayTeam.Key)
        this.homePitchers = this.batters.filter(x => x.Player.Team == this.homeTeam.Key)
        this.currentPitcher = undefined
      }

    })
    .add(() => {
      if(saveGame) {
      this.saveData()
      }

      // if(delCurrentBatter) {
        
      //   this.pe.deleteBatter(this.currentBatter._id).subscribe(r => {
      //     console.log('DELETE')
      //     this.selectedPlayer = this.currentBatter.Player._id;
      //     this.addBatter(true);
      //   })

      // }
    })
    
  }

  onProgressAddPitcher = false;
  addPitcher(saveGame = false) {
    if (this.selectedPlayer) {
      let data = {
        game_id: this.game._id,
        player_id: this.selectedPlayer,
        order_number: this.pitchers.length > 0 ? this.pitchers[this.pitchers.length - 1].order_number + 1 : 1
      }
      this.onProgressAddPitcher = true;
      this.pe.savePitcher(data).subscribe(r => {
        console.log(r)
        this.getPitchers(saveGame);
      }, error => {
        console.log(error)
      }).add(() => {
        this.onProgressAddPitcher = false;
      })
    }
  }

  saveData() {
    let data = {
      GameID: this.fc.game_id.value,
      Status: this.fc.game_status.value,
      AwayTeam: this.fc.team_a.value,
      HomeTeam: this.fc.team_b.value,
      AwayTeamID: this.game.team_a,
      HomeTeamID: this.game.team_b,
      Inning: this.fc.inning_number.value,
      InningHalf: this.fc.inning_half.value,
      AwayTeamRuns: this.fc.score_a.value,
      HomeTeamRuns: this.fc.score_b.value,
      Outs: this.fc.outs.value,
      Balls: this.fc.balls.value,
      Strikes: this.fc.strikes.value,
      RunnerOnFirst: this.fc.runneron_first.value ? true : false,
      RunnerOnSecond: this.fc.runneron_second.value ? true : false,
      RunnerOnThird: this.fc.runneron_third.value ? true : false,
      RunnerOnFirstName: this.fc.runneron_first.value,
      RunnerOnSecondName: this.fc.runneron_second.value,
      RunnerOnThirdName: this.fc.runneron_third.value,
      CurrentHitter: this.currentBatter.Player.FirstName + ' ' + this.currentBatter.Player.LastName,
      LastPlay: this.fc.description.value
        ? this.fc.description.value
        : this.currentGame && this.currentGame.LastPlay
          ? this.currentGame.LastPlay
          : '',
      CurrentHittingTeamID: this.currentBatterTeam,
      BettingLine: this.fc.betting_line.value,
      LockBet: this.fc.strikes.value != this.currentGame.Strikes || this.fc.balls.value != this.currentGame.Balls ? false : this.fc.lock_bet.value
    };
    this.onProgress = true;
    this.atNextBatError = false;
    this.pe
      .saveGamePlay(data)
      .subscribe(
        (r) => {
          console.log(r);
          if (
            this.fc.description.value &&
            this.fc.result.value && this.batters.length > 0
          ) {
            this.currentGame = r['data'];
            this.savePlay();
          } else if (
            this.fc.description.value &&
            this.fc.result.value &&
            this.selectedResult && this.batters.length == 0
          ) {
            this.isSubmitted = false;
            this.atNextBatError = true;
          } else {
            var t = setInterval(() => {
              this.btnCounter -= 1;
              if (this.btnCounter == 0) {
                this.isSubmitted = false;
                clearInterval(t);
                this.btnCounter = 5;
              }
            }, 1e3)
            this.currentGame = r['data'];
            this.coreService.showAlertAutoClose("success", 'Saved');
            window.scrollTo(0,0);
          }
        },
        (error) => {
          this.isSubmitted = false;
          console.log(error);
        }
      )
      .add(() => {
        this.onProgress = false;
        this.currentGame.Outs = this.currentGame.Outs == 3 ? 0 : this.currentGame.Outs;
        this.fc.lock_bet.setValue(this.currentGame.LockBet)
        
      });
  }

  savePlay() {
    let playId = Math.floor(Math.random() * 900000) + 100000;
    let play = {
      PlayID: playId,
      InningNumber: this.fc.inning_number.value,
      InningHalf: this.fc.inning_half.value,
      AwayTeamRuns: this.fc.score_a.value,
      HomeTeamRuns: this.fc.score_b.value,
      HitterName: this.currentBatter.Player.FirstName + ' ' + this.currentBatter.Player.LastName,
      Outs: this.fc.outs.value,
      Balls: this.fc.balls.value,
      Strikes: this.fc.strikes.value,
      Result: this.fc.result.value,
      NumberOfOutsOnPlay: 0,
      Description: this.fc.description.value,
    };

    this.currentGame.LockBet = false;

    let data = {
      play: play,
      gameId: this.currentGame._id,
      game: this.currentGame,
      batters: this.batters
    };

    this.pe
      .savePlayByPlay(data)
      .subscribe(
        (r) => {
          console.log(r);
          if (r["message"] == 'success') {
            this.pe.deleteBatter(this.currentBatter._id).subscribe(r => {
              this.selectedPlayer = this.currentBatter.Player._id;
              this.addBatter(true);
            })
            this.fc.description.setValue('');
            if (this.fc.outs.value == 3) {
              this.fc.outs.setValue(0)
            }

            
            this.fc.balls.setValue(0)
            this.fc.strikes.setValue(0)
            this.selectedResult = ''
            this.addedOutFlag = false;
            this.coreService.showAlertAutoClose("success", 'Saved.');
            this.getGameCache()
            // this.fc.next_batter.setValue('');
          } else {
            this.coreService.showAlertAutoClose("error", r["message"]);
          }
        },
        (error) => {
          console.log(error);
          this.coreService.showAlertAutoClose("error", error);
        }
      )
      .add(() => {
        this.onProgress = false;
        this.fc.lock_bet.setValue(this.currentGame.LockBet)
        setTimeout(() => {
          this.isSubmitted = false;
        }, 5e3)
        window.scrollTo(0,0);
      });
  }

  getGame() {
    this.onProgress = true;
    this.pe
      .getGamePlay(this.game._id)
      .subscribe((r) => {
        console.log(r);
        if (r['data']) {
          this.immutableGame = r['data'];
          this.currentGame = r['data'];
          this.fc.game_status.setValue(this.currentGame.Status);
          this.fc.score_a.setValue(this.currentGame.AwayTeamRuns);
          this.fc.score_b.setValue(this.currentGame.HomeTeamRuns);
          this.fc.inning_number.setValue(this.currentGame.Inning);
          this.fc.inning_half.setValue(this.currentGame.InningHalf);
          this.fc.balls.setValue(this.currentGame.Balls);
          this.fc.strikes.setValue(this.currentGame.Strikes);
          this.currentGame.Outs = this.currentGame.Outs == 3 ? 0 : this.currentGame.Outs;
          this.fc.outs.setValue(this.currentGame.Outs);
          // if (this.batters.length > 0 && this.currentGame.CurrentHitter == this.batters[0].Player.FirstName + ' ' + this.batters[0].Player.LastName) {
          // } else {
          //   this.fc.at_bat.setValue(this.currentGame.CurrentHitter);
          // }
          this.fc.runneron_first.setValue(this.currentGame.RunnerOnFirstName);
          this.fc.runneron_second.setValue(this.currentGame.RunnerOnSecondName);
          this.fc.runneron_third.setValue(this.currentGame.RunnerOnThirdName);
          // this.fc.description.setValue(this.fc.at_bat.value);
          this.currentBatterTeam = this.currentGame.CurrentHittingTeamID ? this.currentGame.CurrentHittingTeamID : 'away'
          this.fc.betting_line.setValue(this.currentGame.BettingLine)
          this.fc.lock_bet.setValue(this.currentGame.LockBet)
          this.getPlay();
          this.getGameCache()
        } else {
          // this.fc.at_bat.setValue(this.currentBatter.Player.FirstName)
        }

      })
      .add(() => {
        this.onProgress = false;
      });
  }

  getPlay() {
    this.pe.getPlayByPlay(this.currentGame._id).subscribe((r) => {
      this.currentPlay = r['data'];
      this.immutablePlay = r['data'];
      // this.selectedResult = this.currentPlay.Result;
    });
  }

  removeBatter(id) {
    this.pe.deleteBatter(id).subscribe(r => {
      this.getBatters()
    })
  }

  removePitcher(id) {
    this.pe.deletePitcher(id).subscribe(r => {
      this.getPitchers()
    })
  }

  checkValue(e) {
    console.log(e.target.value)
  }

  moveDown(i, team) {
    let batters = team == 'away' ? this.awayBatters : this.homeBatters
    if (batters.length - 1 > i) {
      let data = {
        down_id: batters[i]._id,
        down_order_number: batters[i + 1].order_number,
        up_id: batters[i + 1]._id,
        up_order_number: batters[i].order_number,
      }
      this.pe.moveBatterUpdate(data).subscribe(r => {
        this.getBatters();
      })
    }
  }

  moveUp(i, team) {
    let batters = team == 'away' ? this.awayBatters : this.homeBatters
    if (i != 0) {
      let data = {
        down_id: batters[i - 1]._id,
        down_order_number: batters[i].order_number,
        up_id: batters[i]._id,
        up_order_number: batters[i - 1].order_number,
      }
      this.pe.moveBatterUpdate(data).subscribe(r => {
        this.getBatters();
      })
    }
  }

  selectTeamBatter(e) {
    this.switchBatter(e.target.value)
  }

  switchBatter(v) {
    this.currentBatterTeam = v;
    if (this.currentBatterTeam == 'home') {
      this.currentBatter = this.homeBatters && this.homeBatters.length > 0 ? this.homeBatters[0] : undefined
    } else if (this.currentBatterTeam == 'away') {
      this.currentBatter = this.homeBatters && this.awayBatters.length > 0 ? this.awayBatters[0] : undefined
    }
  }

  resetBS(e) {
    this.fc.balls.setValue(0)
    this.fc.strikes.setValue(0)
  }

  undoOnce() {
    // this.currentGame = this.immutableGame;
    // this.currentPlay = this.immutablePlay;
    this.getGameSchedule()
  }

  movePlayerToBase(p) {
    if (p.base == 1) {
      if (this.fc.runneron_first.value == '') {
        this.fc.runneron_first.setValue(this.currentBatter.Player.FirstName + ' ' + this.currentBatter.Player.LastName)
      } else {
        if (this.fc.runneron_second.value == '') {
          this.fc.runneron_second.setValue(this.fc.runneron_first.value)
          this.fc.runneron_first.setValue(this.currentBatter.Player.FirstName + ' ' + this.currentBatter.Player.LastName)
        } else {
          this.fc.runneron_third.setValue(this.fc.runneron_second.value)
          this.fc.runneron_second.setValue(this.fc.runneron_first.value)
          this.fc.runneron_first.setValue(this.currentBatter.Player.FirstName + ' ' + this.currentBatter.Player.LastName)

          // if(this.currentGame.RunnerOnThirdName) {
          //   this.addScore([this.currentGame.RunnerOnThirdName])
          // }
        }

        
      }
    } else if (p.base == 2) {
      if (this.currentGame.RunnerOnFirstName == '' && this.currentGame.RunnerOnSecondName == '' && this.currentGame.RunnerOnThirdName == '') {
        this.fc.runneron_second.setValue(this.currentBatter.Player.FirstName + ' ' + this.currentBatter.Player.LastName)
      } else {
        if (this.currentGame.RunnerOnFirstName != '' && this.currentGame.RunnerOnSecondName == '' && this.currentGame.RunnerOnThirdName == '') {
          this.fc.runneron_second.setValue(this.currentBatter.Player.FirstName + ' ' + this.currentBatter.Player.LastName)
          this.fc.runneron_third.setValue(this.currentGame.RunnerOnFirstName)
          this.fc.runneron_first.setValue('')
        } else if (this.currentGame.RunnerOnFirstName != '' && this.currentGame.RunnerOnSecondName != '' && this.currentGame.RunnerOnThirdName == '') {
          this.fc.runneron_third.setValue(this.currentGame.RunnerOnFirstName)
          this.fc.runneron_second.setValue(this.currentBatter.Player.FirstName + ' ' + this.currentBatter.Player.LastName)
          this.fc.runneron_first.setValue('')

          // if(this.currentGame.RunnerOnSecondName) {
          //   this.addScore([this.currentGame.RunnerOnSecondName])
          // }
        } else {
          this.fc.runneron_third.setValue(this.currentGame.RunnerOnFirstName)
          this.fc.runneron_second.setValue(this.currentBatter.Player.FirstName + ' ' + this.currentBatter.Player.LastName)
          this.fc.runneron_first.setValue('')

          // if(this.currentGame.RunnerOnThirdName && this.currentGame.RunnerOnSecondName) {
          //   this.addScore([this.currentGame.RunnerOnSecondName, this.currentGame.RunnerOnThirdName])
          // } else if(this.currentGame.RunnerOnThirdName) {
          //   this.addScore([this.currentGame.RunnerOnThirdName])
          // }

        }
      }
    } else if (p.base == 3) {
      if (this.currentGame.RunnerOnFirstName == '' && this.currentGame.RunnerOnSecondName == '' && this.currentGame.RunnerOnThirdName == '') {
        this.fc.runneron_third.setValue(this.currentBatter.Player.FirstName + ' ' + this.currentBatter.Player.LastName)
      } else {
          this.fc.runneron_third.setValue(this.currentBatter.Player.FirstName + ' ' + this.currentBatter.Player.LastName)
          this.fc.runneron_second.setValue('')
          this.fc.runneron_first.setValue('')

          // if(this.currentGame.RunnerOnFirstName && this.currentGame.RunnerOnSecondName && this.currentGame.RunnerOnThirdName) {
          //   this.addScore([this.currentGame.RunnerOnFirstName, this.currentGame.RunnerOnSecondName, this.currentGame.RunnerOnThirdName])
          // } else if(this.currentGame.RunnerOnFirstName && this.currentGame.RunnerOnSecondName) {
          //   this.addScore([this.currentGame.RunnerOnFirstName, this.currentGame.RunnerOnSecondName])
          // } else if(this.currentGame.RunnerOnSecondName && this.currentGame.RunnerOnThirdName) {
          //   this.addScore([this.currentGame.RunnerOnSecondName, this.currentGame.RunnerOnThirdName])
          // } else if(this.currentGame.RunnerOnFirstName && this.currentGame.RunnerOnThirdName) {
          //   this.addScore([this.currentGame.RunnerOnFirstName, this.currentGame.RunnerOnThirdName])
          // } else if(this.currentGame.RunnerOnThirdName) {
          //   this.addScore([this.currentGame.RunnerOnThirdName])
          // }
      }
    }
  }

  addScore(players) {
    let score = 0;
    let text = ''
    players.forEach(p => {
      score += 1;
      text += ', ' + p + ' scored'
    });

    if (this.homeTeam.Key == this.currentBatter.Player.Team) {
      this.fc.score_b.setValue(parseInt(this.currentGame.HomeTeamRuns) + score)
    }

    if (this.awayTeam.Key == this.currentBatter.Player.Team) {
      this.fc.score_a.setValue(parseInt(this.currentGame.AwayTeamRuns) + score)
    }

    this.fc.description.setValue(text)
    
  }

  homeRun() {
    let score = 1;
    let text = ''
    // console.log(this.currentGame.RunnerOnFirstName)

    console.log(this.fc.runneron_third.value)
    if (this.currentGame.RunnerOnFirstName != '') {
      score += 1;
      text += ', ' + this.currentGame.RunnerOnFirstName + ' scored'
    }

    if (this.currentGame.RunnerOnSecondName != '') {
      score += 1;
      text += ', ' + this.currentGame.RunnerOnSecondName + ' scored'
    }

    if (this.currentGame.RunnerOnThirdName != '') {
      score += 1;
      text += ', ' + this.currentGame.RunnerOnThirdName + ' scored'
    }

    // if (this.awayTeam.Key == this.currentBatter.Player.Team) {
    //   this.currentGame.AwayTeamRuns = parseInt(this.currentGame.AwayTeamRuns) + score
    // }

    if (this.homeTeam.Key == this.currentBatter.Player.Team) {
      this.fc.score_b.setValue(parseInt(this.currentGame.HomeTeamRuns) + score)
    }

    if (this.awayTeam.Key == this.currentBatter.Player.Team) {
      this.fc.score_a.setValue(parseInt(this.currentGame.AwayTeamRuns) + score)
    }

    console.log(score)
    this.fc.runneron_first.setValue('');
    this.fc.runneron_second.setValue('');
    this.fc.runneron_third.setValue('');
    this.fc.description.setValue(text)
  }

  dropAway(event: CdkDragDrop<string[]>) {
    if(event.previousIndex != event.currentIndex) {
      moveItemInArray(this.awayBatters, event.previousIndex, event.currentIndex);
      console.log(this.awayBatters)
      console.log(event.previousIndex)
      console.log(event.currentIndex)
      var x = 1;
      this.awayBatters.forEach(b => {
        b.order_number = x;
        this.pe.updateBatter(b).subscribe(r => {
        })
        .add(() => {
          this.getBatters();
        })
        x++;
      })
    }
  }

  dropHome(event: CdkDragDrop<string[]>) {
    if(event.previousIndex != event.currentIndex) {
      moveItemInArray(this.homeBatters, event.previousIndex, event.currentIndex);
      var x = 1;
      this.homeBatters.forEach(b => {
        b.order_number = x;
        this.pe.updateBatter(b).subscribe(r => {
        })
        .add(() => {
          this.getBatters();
        })
        x++;
      })
    }
  }

  dropAwayPitcher(event: CdkDragDrop<string[]>) {
    if(event.previousIndex != event.currentIndex) {
      moveItemInArray(this.awayPitchers, event.previousIndex, event.currentIndex);
      var x = 1;
      this.awayPitchers.forEach(b => {
        b.order_number = x;
        this.pe.updatePitcher(b).subscribe(r => {
        })
        .add(() => {
          this.getPitchers();
        })
        x++;
      })
    }
  }

  dropHomePitcher(event: CdkDragDrop<string[]>) {
    if(event.previousIndex != event.currentIndex) {
      moveItemInArray(this.homePitchers, event.previousIndex, event.currentIndex);
      var x = 1;
      this.homePitchers.forEach(b => {
        b.order_number = x;
        this.pe.updatePitcher(b).subscribe(r => {
        })
        .add(() => {
          this.getPitchers();
        })
        x++;
      })
    }
  }

  getGameCache() {
    this.pe.getGameCache(this.currentGame._id).subscribe(r => {
      this.gameCache = r["data"]
    })
  }

  undoError = false;
  selectPlayToUndo(e, g, content) {
    e.preventDefault();
    this.selectedUndoPlay = g;
    console.log(g)
    console.log(this.currentGame)
    this.undoError = false;
    if(g.Games.Inning != this.currentGame.Inning || g.Games.InningHalf != this.currentGame.InningHalf) {
      this.undoError = true;
      setTimeout(() => {
        this.undoError = false
      }, 3000)
    } else {
      this.openModal('delete', content);
    }
  }

  openModal(sec, content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "lg" }).result.then((result) => {

    }, (reason) => {

    });

  }

  onCancel() {
    this.modalService.dismissAll();
  }

  onUndo() {
    this.modalService.dismissAll()
    console.log(this.selectedUndoPlay)
    if(this.selectedUndoPlay) {
      this.onProgress = true
    this.pe.postUndo(this.selectedUndoPlay).subscribe(r => {
      this.getGame()
      this.getBatters(false, true)
      this.getPitchers(false, true)
    }).add(() => {
      this.onProgress = false
    })
    }
  }

  onProgressAddLineup = false;
  selectedLineup: any;
  selectedTeamLineup: any;
  selectLineup(lineup_id, selectedTeam) {
    this.selectedLineup = lineup_id;
    this.selectedTeamLineup = selectedTeam;
  }

  addLineupToBatterList() {
    if(this.selectedLineup && this.selectedTeamLineup) {
      this.onProgressAddLineup = true;
      this.pe.getLineUpPlayers(this.selectedLineup).subscribe( r => {
        if(r["data"] && r["data"].length > 0) {
          let players = r["data"];
          players.forEach(p => {
            let data = {
              game_id: this.game._id,
              player_id: p.PlayerId,
              order_number: this.batters.length > 0 ? this.batters[this.batters.length - 1].order_number + 1 : 1
            }
            this.pe.saveBatter(data).subscribe(r => {
              console.log(r)
            }, error => {
              console.log(error)
            }).add(() => {
              this.getBatters()
            })
          });

          
        }
      })
      .add(() => {
        this.onProgressAddLineup = false;
        // this.selectedLineup
      })
    }
  }

}
