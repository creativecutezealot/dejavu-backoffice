import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Teams } from '../models/teams/teams.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamsService } from './teams.service';
import { TeamsResult } from '../models/teams/teams-result.model';
import { CoreService } from '../core/core.service';
import { PlayEntriesModule } from '../play-entries/play-entries.module';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  private subscription: Subscription;
  private dataSubjectSubscription: Subscription;
  data: Teams[];

  onProgress = false;
  isMaxLoad = false;
  selectedData: Teams;
  filter_form: FormGroup;
  q = "";
  coreService;
  teamForm: FormGroup;
  selectedItem: any;
  lineupForm: FormGroup;
  lineupErr = false;
  constructor(
    private modalConfig: NgbModalConfig,
    private modalService: NgbModal,
    private dataService: TeamsService,
    private cs: CoreService,
    private formBuilder: FormBuilder,
    private teamService: TeamsService
  ) {
    this.modalConfig.backdrop = 'static';
    this.modalConfig.keyboard = false;
    this.coreService = this.cs;
  }


  ngOnInit() {

    this.filter_form = new FormGroup({
      'q': new FormControl(this.q)
    });
    this.loadData();
  }

  loadData() {

    this.onProgress = true;
    this.subscription = this.dataService.get().subscribe(
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


  onCancel() {
    this.modalService.dismissAll();
  }

  onResync() {
    this.onProgress = true;
    this.coreService.loading = true;
    this.dataService.resync().subscribe(resp => {
      this.coreService.loading = false;
      this.loadData();
    })
  }//end

  onSearch(event) {
    this.onProgress = true;
    this.subscription = this.dataService.get(1, event.target.value).subscribe(
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
      this.dataService.get(this.dataService.page, this.q).subscribe(
        (resp) => {
          this.onProgress = false;
          this.dataService.data.push(...resp.data);
          this.dataService.dataSubject.next(new TeamsResult(
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

  addTeam(content) {
    this.openModal('add', content);
  }

  editTeam(item, content) {
    this.selectedItem = item;
    this.openModal('edit', content);
  }

  openLineup(item, content) {
    this.selectedItem = item;
    this.getSelectedTeamLineups()
    this.getTeamPlayers()
    console.log(this.selectedItem)
    this.lineupForm = new FormGroup({
      'team_id': new FormControl(this.selectedItem.TeamID, Validators.required),
      'lineup_name': new FormControl("", Validators.required)
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "lg" }).result.then((result) => {
      console.log(this.selectedItem)
    }, (reason) => {

    });
  }

  method: String = "add";
  openModal(sec, content) {
    console.log(sec)
    if (sec == 'add') {
      this.method = 'add';
      this.teamForm = new FormGroup({
        'key': new FormControl("", Validators.required),
        'name': new FormControl("", Validators.required),
        'image': new FormControl("")
      });
    }

    if (sec == 'edit') {
      this.method = 'edit';
      this.teamForm = new FormGroup({
        'id': new FormControl(this.selectedItem._id, Validators.required),
        'key': new FormControl(this.selectedItem.Key, Validators.required),
        'name': new FormControl(this.selectedItem.Name, Validators.required),
        'image': new FormControl(this.selectedItem.WikipediaLogoUrl)
      });
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: "lg" }).result.then((result) => {

    }, (reason) => {

    });

  }

  get fc() { return this.teamForm.controls }

  onSave() {
    if (this.teamForm.invalid) {

    } else {
      if (this.method == 'add') {
        let data = {
          name: this.fc.name.value,
          key: this.fc.key.value,
          image: this.fc.image.value
        }

        this.teamService.saveTeam(data).subscribe(r => {
          if (r["status"] == "success") {
            this.coreService.showAlertAutoClose("success", "You have successfully added new item");
            this.loadData();
            this.modalService.dismissAll();

          } else {
            this.coreService.showAlertAutoClose("danger", r["message"]);
          }
        }, error => {
          console.log(error)
          this.coreService.showAlertAutoClose("danger", error["error"]["message"]);
        })
      } else if (this.method == 'edit') {
        let data = {
          id: this.fc.id.value,
          name: this.fc.name.value,
          key: this.fc.key.value,
          image: this.fc.image.value
        }
        console.log(data.id)

        this.teamService.updateTeam(data).subscribe(r => {
          if (r["success"]) {
            this.coreService.showAlertAutoClose("success", "You have successfully updated the item");
            this.loadData();
            // this.modalService.dismissAll();

          } else {
            this.coreService.showAlertAutoClose("danger", r["message"]);
          }
        }, error => {
          console.log(error)
          this.coreService.showAlertAutoClose("danger", error["error"]["message"]);
        })
      }
    }
  }

  deleteItem(item, content) {
    this.selectedItem = item;
    this.openModal('delete', content);
  }

  onDelete() {
    if (!this.onProgress) {
      this.onProgress = true;
      this.teamService.deleteTeam(this.selectedItem._id).subscribe(
        (r) => {
          if (r["status"] == "success") {
            this.coreService.showAlertAutoClose("success", "You have successfully deleted an item");
            this.loadData()
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

  onSaveLineup(){
    if(!this.onProgress) {
      this.onProgress = true;
      this.lineupErr = false;
      if(this.lineupForm.invalid) {
        this.lineupErr = true;
        this.onProgress = false;
      } else {
        let data = {team_id: this.lineupFc.team_id.value, lineup_name: this.lineupFc.lineup_name.value}
        this.teamService.createLineup(data)
        .subscribe(r => {
          if(r["status"] == "success") {
            this.coreService.showAlertAutoClose("success", "Successfully added");
            this.lineupFc.lineup_name.setValue('')
            this.getSelectedTeamLineups();
          } else {
            this.coreService.showAlertAutoClose("error", r["message"]);
          }
        })
        .add(() => {
          this.onProgress = false;
        })
      }
    }
  }

  get lineupFc() { return this.lineupForm.controls }

  getSelectedTeamLineups() {
    this.teamService.getLineUps(this.selectedItem.TeamID).subscribe(r => {
      this.selectedItem.lineups = r["data"] ? r["data"] : [];
    })
  }

  getTeamPlayers() {
    this.teamService.getTeamPlayers(this.selectedItem.TeamID).subscribe(r => {
      this.selectedItem.players = r["data"] ? r["data"] : [];
    })
  }

  lineupPlayers: any;
  selectedLineup: any;
  editTeamLineup(lineup_id) {
    this.selectedLineup = lineup_id
    this.getSelectedLineupPlayers()
    this.showDeleteLineupConfirm = false;
  }

  getSelectedLineupPlayers() {
    this.teamService.getLineUpPlayers(this.selectedLineup).subscribe( r => {
      this.lineupPlayers = r["data"];
    })
  }

  selectedPlayer: String;
  selectPlayer(e) {
    console.log(e)
    if (e) {
      this.selectedPlayer = e
    }
  }

  addToLineUpErr: any;
  addToLineUp(lineup_id) {
    this.addToLineUpErr = '';
    this.teamService.addToLineUp(lineup_id, this.selectedPlayer).subscribe( r => {
      if(r["status"] == "success") {
        this.getSelectedLineupPlayers()
      } else {
        this.addToLineUpErr = r["message"]
      }
    })
  }


  showDeleteLineupConfirm = false;
  deleteLineupId: any;
  deleteTeamLineup(lineup_id) {
    this.deleteLineupId = lineup_id
    this.editTeamLineup(lineup_id)
    this.showDeleteLineupConfirm = true;
  }

  onDeleteLineup () {
   if(this.deleteLineupId) {
     this.teamService.deleteLineup(this.deleteLineupId).subscribe( r => {
       if(r["status"] == "success") {
        this.deleteLineupId = undefined;
        this.showDeleteLineupConfirm = false;
        this.selectedLineup = undefined;
        this.getSelectedTeamLineups()
       } else {

       }
     })
   }
  }

  onCancelDeleteLineup() {
    this.showDeleteLineupConfirm = false;
  }

  deleteLineupPlayer(id) {
    this.teamService.deleteLineupPlayer(id).subscribe( r => {
      if(r["status"] == "success") {
        this.getSelectedLineupPlayers()
      }
    })
  }

}
