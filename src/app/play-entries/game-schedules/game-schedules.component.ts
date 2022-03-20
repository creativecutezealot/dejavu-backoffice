import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CoreService } from 'src/app/core/core.service';
import { PlayEntriesService } from '../play-entries.service';

@Component({
  selector: 'app-game-schedules',
  templateUrl: './game-schedules.component.html',
  styleUrls: ['./game-schedules.component.css']
})
export class GameSchedulesComponent implements OnInit {
  showAddGame = false;
  method: string = "add";
  data_form: FormGroup;
  coreService: CoreService;
  onProgress = false;
  games: any;
  teams: any;
  selectedItem: any;
  statuses = ['Scheduled', 'InProgress', 'Final'];
  page = 1;
  total_page;
  operators;
  subscription = new Subscription();
  userSubjectSubscription = new Subscription();
  role: number;
  userId: any;
  searchForm: FormGroup;
  isMaxLoad = false;
  constructor(
    private modalConfig: NgbModalConfig,
    private modalService: NgbModal,
    private cs: CoreService,
    private router: Router,
    private pe: PlayEntriesService,
    private datePipe: DatePipe,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
    this.coreService = this.cs;
  }

  ngOnInit() {
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
    this.subscription = this.authService.me().subscribe(
      (data) => {

        // this.authService.userSubject.next(data);
        console.log(data)
        if (data) {
          this.role = data.user_type;
          this.userId = data._id;
          this.getTeams();
          this.getGames();
          this.getOperators();
          this.setSearchForm()
        }
      }, (error) => {
        localStorage.removeItem('token');
      });


  }

  getGames() {
    this.onProgress = true;
    this.pe.getGameSchedules(this.page, this.userId, this.role).subscribe(r => {
      if (this.page != 1 && this.games && this.games.length > 0) {
        if (r && r["data"] && r["data"].length > 0) {
          r["data"].forEach(e => {
            this.games.push(e)
          });
        }
      } else {
        this.games = r && r["data"] ? r["data"] : [];
        this.total_page = r && r['total_page'] ? r['total_page'] : undefined;
      }

      if (r["total_page"] == 0) {
        this.isMaxLoad = true;
      } else {
        if (this.page == r["total_page"]) {
          this.isMaxLoad = true;
        } else {
          this.isMaxLoad = false;
        }
      }
    }).add(() => {
      this.onProgress = false;
    })
  }

  getTeams() {
    this.pe.getTeams().subscribe(r => {
      this.teams = r;
    })
  }

  addGame(content) {
    this.openModal('add', content);
  }

  editGame(item, content) {
    this.selectedItem = item;
    this.openModal('edit', content);
  }

  openModal(sec, content) {
    console.log(sec)
    if (sec == 'add') {
      this.method = 'add';
      this.data_form = new FormGroup({
        'betting_line': new FormControl(""),
        'assigned_to': new FormControl(""),
        'away_team': new FormControl("", Validators.required),
        'home_team': new FormControl("", Validators.required),
        'schedule_date': new FormControl("", Validators.required),
        'schedule_time': new FormControl("", Validators.required),
      });
    } else if (sec == 'edit') {
      this.method = 'edit';
      let y = this.datePipe.transform(this.selectedItem.schedule, "yyyy");
      let m = this.datePipe.transform(this.selectedItem.schedule, "MM");
      let d = this.datePipe.transform(this.selectedItem.schedule, "dd");
      let h = this.datePipe.transform(this.selectedItem.schedule, "HH");
      let min = this.datePipe.transform(this.selectedItem.schedule, "mm");
      let setDate = { year: parseInt(y), month: parseInt(m), day: parseInt(d) }
      let setTime = { hour: parseInt(h), minute: parseInt(min) }
      this.data_form = new FormGroup({
        'id': new FormControl(this.selectedItem._id, Validators.required),
        'betting_line': new FormControl(this.selectedItem.betting_line),
        'assigned_to': new FormControl(this.selectedItem.assigned_to),
        'away_team': new FormControl(this.selectedItem.team_a, Validators.required),
        'home_team': new FormControl(this.selectedItem.team_b, Validators.required),
        'schedule_date': new FormControl(setDate, Validators.required),
        'schedule_time': new FormControl(setTime, Validators.required),
      });
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "lg" }).result.then((result) => {

    }, (reason) => {

    });

  }

  get fc() { return this.data_form.controls }

  onSave() {
    if (this.data_form.invalid) {

    } else {
      if (this.fc.away_team.value == this.fc.home_team.value) {
        this.coreService.showAlertAutoClose("warning", "Please select a different team.");
      } else {
        this.onProgress = true;
        if (this.method == "add") {
          let data = {
            sport_id: 1,
            betting_line: this.fc.betting_line.value,
            assigned_to: this.fc.assigned_to.value,
            away_team: this.fc.away_team.value,
            home_team: this.fc.home_team.value,
            schedule_date: this.fc.schedule_date.value,
            schedule_time: this.fc.schedule_time.value,
          }
          this.pe.saveGame(data).subscribe(r => {
            if (r["success"]) {
              this.coreService.showAlertAutoClose("success", "You have successfully added new item");

              this.modalService.dismissAll()
              if (this.page == 1) {
                this.getGames()
              }
            } else {
              this.coreService.showAlertAutoClose("danger", r["message"]);
            }
          }, error => {
            console.log(error)
            this.coreService.showAlertAutoClose("danger", error["error"]["message"]);
          }).add(() => {
            this.onProgress = false
          })
        } else if (this.method == "edit") {
          let data = {
            id: this.fc.id.value,
            betting_line: this.fc.betting_line.value,
            assigned_to: this.fc.assigned_to.value,
            away_team: this.fc.away_team.value,
            home_team: this.fc.home_team.value,
            schedule_date: this.fc.schedule_date.value,
            schedule_time: this.fc.schedule_time.value,
          }
          this.pe.updateGame(data).subscribe(r => {
            if (r["success"]) {
              this.coreService.showAlertAutoClose("success", "You have successfully updated the item");

              this.modalService.dismissAll()
              let i = this.games.findIndex(x => x._id == r["data"][0]._id)
              if (i != -1) {
                this.games[i] = r["data"][0];
              }
              // this.getGames()
            } else {
              this.coreService.showAlertAutoClose("danger", r["message"]);
            }
          }, error => {
            console.log(error)
            this.coreService.showAlertAutoClose("danger", error["error"]["message"]);
          }).add(() => {
            this.onProgress = false
          })
        }

      }

    }
  }

  onCancel() {
    this.modalService.dismissAll();
  }

  deleteItem(item, content) {
    this.selectedItem = item;
    this.openModal('delete', content);
  }

  onDelete() {
    if (!this.onProgress) {
      this.onProgress = true;
      this.pe.deleteGameSchedule(this.selectedItem._id).subscribe(
        (r) => {
          if (r["status"] == "success") {
            this.coreService.showAlertAutoClose("success", "You have successfully deleted an item");
            this.games.splice(this.games.findIndex(x => x._id == this.selectedItem._id), 1)
            this.modalService.dismissAll()
          }
        }, (error) => {
          if (error.message) {
            alert(error.error);
          } else {
            alert(error.error.message);
          }
        }).add(() => {

          this.onProgress = false;
        });
    }
  }

  onLoadMore() {
    if (this.page < this.total_page) {
      this.onProgress = true;
      this.page++;
      this.getGames();
    }//end
  }

  getOperators() {
    this.pe.getOperators().subscribe(r => {
      if (r["data"] && r["data"].length > 0) {
        this.operators = r["data"]
      } else {
        this.operators = []
      }
    })
  }

  setSearchForm() {
    this.searchForm = this.formBuilder.group({
      status: ['']
    })
  }

}
